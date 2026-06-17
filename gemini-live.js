/* ============================================================
   GeminiLive - Multimodal Live API WebSocket client
   Real-time voice-to-voice conversation with Gemini 2.0 Flash
   ============================================================ */
(function () {
  "use strict";

  /* ---------- state ---------- */
  let ws = null;
  let audioCtx = null;
  let micStream = null;
  let scriptNode = null;
  let sourceNode = null;
  let playbackCtx = null;
  let connected = false;
  let streaming = false;
  let setupAcked = false;

  /* ---------- callbacks (set by consumer) ---------- */
  let onJobComplete = null;   // function(jobJSON)
  let onTextResponse = null;  // function(text) - any text part from model
  let onStateChange = null;   // function(state: 'connecting'|'connected'|'disconnected')
  let onError = null;         // function(errMsg)

  /* ---------- constants ---------- */
  const INPUT_SAMPLE_RATE = 16000;
  const OUTPUT_SAMPLE_RATE = 24000;
  const BUFFER_SIZE = 4096;
  const ENDPOINT = "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

  /* ==========================================================
     PUBLIC API
     ========================================================== */

  /**
   * Connect to Gemini Live API.
   * @param {string} apiKey - Gemini API key
   * @param {string} systemPrompt - Dynamic system instruction text
   * @returns {Promise<void>} resolves when setup is acknowledged
   */
  function connect(apiKey, systemPrompt) {
    return new Promise(function (resolve, reject) {
      if (connected) { resolve(); return; }

      fireState("connecting");
      setupAcked = false;

      var url = ENDPOINT + "?key=" + encodeURIComponent(apiKey);
      ws = new WebSocket(url);

      ws.onopen = function () {
        // Send setup message
        var setup = {
          setup: {
            model: "models/gemini-2.0-flash-live-001",
            generationConfig: {
              response_modalities: ["AUDIO"],
              speech_config: {
                voice_config: {
                  prebuilt_voice_config: {
                    voice_name: "Kore"
                  }
                }
              }
            },
            system_instruction: {
              parts: [{ text: systemPrompt }]
            }
          }
        };
        ws.send(JSON.stringify(setup));
      };

      ws.onmessage = function (event) {
        handleMessage(event.data);
        // First message after setup is the ack
        if (!setupAcked) {
          setupAcked = true;
          connected = true;
          fireState("connected");
          resolve();
        }
      };

      ws.onerror = function (err) {
        var msg = "WebSocket error connecting to Gemini";
        if (onError) onError(msg);
        reject(new Error(msg));
      };

      ws.onclose = function (event) {
        var wasConnected = connected;
        connected = false;
        streaming = false;
        fireState("disconnected");
        if (!setupAcked) {
          reject(new Error("Connection closed before setup completed (code: " + event.code + ")"));
        }
      };
    });
  }

  /**
   * Disconnect from Gemini Live.
   */
  function disconnect() {
    stopStreaming();
    if (ws) {
      try { ws.close(); } catch (e) {}
      ws = null;
    }
    connected = false;
    setupAcked = false;
    fireState("disconnected");
  }

  /**
   * Start capturing microphone audio and streaming to Gemini.
   * @returns {Promise<void>}
   */
  function startStreaming() {
    if (streaming) return Promise.resolve();
    if (!connected) return Promise.reject(new Error("Not connected"));

    return navigator.mediaDevices.getUserMedia({ audio: { sampleRate: INPUT_SAMPLE_RATE, channelCount: 1, echoCancellation: true, noiseSuppression: true } })
      .then(function (stream) {
        micStream = stream;
        // Create audio context at whatever rate the browser gives us, we will resample
        audioCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: INPUT_SAMPLE_RATE });
        sourceNode = audioCtx.createMediaStreamSource(stream);

        // Use ScriptProcessorNode for broad compatibility (AudioWorklet requires HTTPS + separate file)
        scriptNode = audioCtx.createScriptProcessor(BUFFER_SIZE, 1, 1);
        scriptNode.onaudioprocess = function (e) {
          if (!connected || !ws || ws.readyState !== WebSocket.OPEN) return;
          var inputData = e.inputBuffer.getChannelData(0);
          // Resample if needed, then convert to 16-bit PCM
          var pcm16 = float32ToInt16(resample(inputData, audioCtx.sampleRate, INPUT_SAMPLE_RATE));
          var base64 = arrayBufferToBase64(pcm16.buffer);
          var msg = {
            realtime_input: {
              media_chunks: [{
                data: base64,
                mime_type: "audio/pcm;rate=16000"
              }]
            }
          };
          ws.send(JSON.stringify(msg));
        };

        sourceNode.connect(scriptNode);
        scriptNode.connect(audioCtx.destination); // required for onaudioprocess to fire
        streaming = true;
      });
  }

  /**
   * Stop mic capture.
   */
  function stopStreaming() {
    streaming = false;
    if (scriptNode) {
      try { scriptNode.disconnect(); } catch (e) {}
      scriptNode = null;
    }
    if (sourceNode) {
      try { sourceNode.disconnect(); } catch (e) {}
      sourceNode = null;
    }
    if (audioCtx) {
      try { audioCtx.close(); } catch (e) {}
      audioCtx = null;
    }
    if (micStream) {
      micStream.getTracks().forEach(function (t) { t.stop(); });
      micStream = null;
    }
  }

  /**
   * Check connection status.
   */
  function isConnected() {
    return connected;
  }

  /* ==========================================================
     MESSAGE HANDLING
     ========================================================== */
  var pendingText = "";

  function handleMessage(raw) {
    var msg;
    try { msg = JSON.parse(raw); } catch (e) { return; }

    // Setup complete acknowledgement
    if (msg.setupComplete) return;

    // Server content (model turn or turn complete)
    var sc = msg.serverContent;
    if (!sc) return;

    // Turn complete - process accumulated text
    if (sc.turnComplete) {
      if (pendingText) {
        processTextResponse(pendingText);
        pendingText = "";
      }
      return;
    }

    // Model turn parts
    var mt = sc.modelTurn;
    if (!mt || !mt.parts) return;

    mt.parts.forEach(function (part) {
      // Audio part - play it
      if (part.inlineData && part.inlineData.data) {
        playAudioChunk(part.inlineData.data, part.inlineData.mimeType || "audio/pcm;rate=24000");
      }
      // Text part - accumulate
      if (part.text) {
        pendingText += part.text;
        if (onTextResponse) onTextResponse(part.text);
      }
    });
  }

  /**
   * Process accumulated text from a complete turn.
   * Look for JSON job data wrapped in ```json ... ```
   */
  function processTextResponse(text) {
    var jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
    if (jsonMatch) {
      try {
        var jobData = JSON.parse(jsonMatch[1].trim());
        if (jobData && jobData.rooms && Array.isArray(jobData.rooms)) {
          if (onJobComplete) onJobComplete(jobData);
        }
      } catch (e) {
        // JSON parse failed, not a valid job yet
      }
    }
  }

  /* ==========================================================
     AUDIO PLAYBACK
     ========================================================== */
  var playbackQueue = [];
  var isPlaying = false;

  function playAudioChunk(base64Data, mimeType) {
    // Parse sample rate from mime type
    var rate = OUTPUT_SAMPLE_RATE;
    var rateMatch = mimeType && mimeType.match(/rate=(\d+)/);
    if (rateMatch) rate = parseInt(rateMatch[1], 10);

    var pcmBytes = base64ToArrayBuffer(base64Data);
    var int16 = new Int16Array(pcmBytes);
    var float32 = int16ToFloat32(int16);

    playbackQueue.push({ samples: float32, rate: rate });
    if (!isPlaying) drainPlaybackQueue();
  }

  function drainPlaybackQueue() {
    if (playbackQueue.length === 0) { isPlaying = false; return; }
    isPlaying = true;

    var chunk = playbackQueue.shift();
    if (!playbackCtx || playbackCtx.state === "closed") {
      playbackCtx = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: chunk.rate });
    }

    var buffer = playbackCtx.createBuffer(1, chunk.samples.length, chunk.rate);
    buffer.getChannelData(0).set(chunk.samples);

    var src = playbackCtx.createBufferSource();
    src.buffer = buffer;
    src.connect(playbackCtx.destination);
    src.onended = function () { drainPlaybackQueue(); };
    src.start();
  }

  /* ==========================================================
     UTILITY FUNCTIONS
     ========================================================== */

  function resample(inputBuffer, fromRate, toRate) {
    if (fromRate === toRate) return inputBuffer;
    var ratio = fromRate / toRate;
    var outputLength = Math.round(inputBuffer.length / ratio);
    var output = new Float32Array(outputLength);
    for (var i = 0; i < outputLength; i++) {
      var srcIdx = i * ratio;
      var low = Math.floor(srcIdx);
      var high = Math.min(low + 1, inputBuffer.length - 1);
      var frac = srcIdx - low;
      output[i] = inputBuffer[low] * (1 - frac) + inputBuffer[high] * frac;
    }
    return output;
  }

  function float32ToInt16(float32Array) {
    var int16 = new Int16Array(float32Array.length);
    for (var i = 0; i < float32Array.length; i++) {
      var s = Math.max(-1, Math.min(1, float32Array[i]));
      int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16;
  }

  function int16ToFloat32(int16Array) {
    var float32 = new Float32Array(int16Array.length);
    for (var i = 0; i < int16Array.length; i++) {
      float32[i] = int16Array[i] / 0x7FFF;
    }
    return float32;
  }

  function arrayBufferToBase64(buffer) {
    var bytes = new Uint8Array(buffer);
    var binary = "";
    for (var i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function base64ToArrayBuffer(base64) {
    var binary = atob(base64);
    var bytes = new Uint8Array(binary.length);
    for (var i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  }

  function fireState(state) {
    if (onStateChange) onStateChange(state);
  }

  /* ==========================================================
     EXPOSE MODULE
     ========================================================== */
  window.GeminiLive = {
    connect: connect,
    disconnect: disconnect,
    startStreaming: startStreaming,
    stopStreaming: stopStreaming,
    isConnected: isConnected,
    set onJobComplete(fn) { onJobComplete = fn; },
    get onJobComplete() { return onJobComplete; },
    set onTextResponse(fn) { onTextResponse = fn; },
    get onTextResponse() { return onTextResponse; },
    set onStateChange(fn) { onStateChange = fn; },
    get onStateChange() { return onStateChange; },
    set onError(fn) { onError = fn; },
    get onError() { return onError; }
  };

})();
