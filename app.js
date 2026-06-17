/* ============================================================
   QuoteMate app controller
   Wires UI, voice (TTS + STT), conversation flow, settings, quotes.
   ============================================================ */
(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const { Engine, Parser, Professions } = window;

  let settings = Engine.loadSettings();

  /* ---------------- navigation ---------------- */
  const screens = {
    wizard: $("#screen-wizard"),
    home: $("#screen-home"),
    capture: $("#screen-capture"),
    quote: $("#screen-quote"),
    settings: $("#screen-settings")
  };
  const bottomBarScreens = new Set(["capture", "quote"]);

  function show(name) {
    Object.entries(screens).forEach(([k, el]) => { el.hidden = (k !== name); });
    document.body.classList.toggle("has-bottom-bar", bottomBarScreens.has(name));
    // Hide tabbar on wizard screen
    const tabbar = $("#tabbar");
    if (tabbar) tabbar.style.display = (name === "wizard") ? "none" : "";
    $$(".tab").forEach(t => t.classList.toggle("is-active", t.dataset.go === name));
    if (name === "home") renderRecent();
    if (name === "settings") fillSettingsForm();
    window.scrollTo(0, 0);
  }

  // generic [data-go] navigation
  $$("[data-go]").forEach(el => {
    el.addEventListener("click", (e) => {
      const dest = el.dataset.go;
      if (dest === "capture") { startCapture(); }
      else show(dest);
    });
  });
  $("#home-settings-btn").addEventListener("click", () => show("settings"));

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg; t.hidden = false;
    clearTimeout(toastT);
    toastT = setTimeout(() => { t.hidden = true; }, 2200);
  }

  /* ============================================================
     VOICE: text-to-speech (British male) + speech recognition
     ============================================================ */
  const synth = window.speechSynthesis;
  let voice = null;
  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    if (!voices.length) return;
    const byName = (re) => voices.find(v => re.test(v.name) && /en[-_]?GB/i.test(v.lang));
    voice =
      byName(/daniel/i) ||                       // Apple British male
      byName(/arthur|oliver|george|james/i) ||
      voices.find(v => /en[-_]?GB/i.test(v.lang) && /male/i.test(v.name)) ||
      voices.find(v => /UK English Male/i.test(v.name)) || // Google
      voices.find(v => /en[-_]?GB/i.test(v.lang)) ||
      voices.find(v => /en[-_]/i.test(v.lang)) ||
      voices[0] || null;
  }
  if (synth) {
    pickVoice();
    synth.onvoiceschanged = pickVoice;
  }
  function speak(text) {
    if (!synth) return;
    try {
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-GB";
      if (voice) u.voice = voice;
      u.rate = 1.0; u.pitch = 1.0;
      synth.speak(u);
    } catch (e) {}
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const sttSupported = !!SR;
  let recog = null, listening = false;
  let onResultCb = null;

  function ensureRecog() {
    if (!sttSupported || recog) return;
    recog = new SR();
    recog.lang = "en-GB";
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (e) => {
      const txt = e.results[0][0].transcript;
      if (onResultCb) onResultCb(txt);
    };
    recog.onerror = () => setListening(false);
    recog.onend = () => setListening(false);
  }
  function setListening(on) {
    listening = on;
    $("#capture-mic").classList.toggle("is-live", on);
  }
  function startListening(cb) {
    onResultCb = cb;
    if (!sttSupported) { toast("Voice input not supported here — type instead."); return; }
    ensureRecog();
    try {
      if (synth) synth.cancel();   // don't listen to ourselves
      recog.start();
      setListening(true);
    } catch (e) { /* already started */ }
  }
  function stopListening() { try { recog && recog.stop(); } catch (e) {} setListening(false); }

  /* ============================================================
     GEMINI LIVE SESSION
     ============================================================ */
  const GeminiLive = window.GeminiLive;
  let geminiSessionActive = false;

  function buildGeminiSystemPrompt() {
    const profession = localStorage.getItem("cq_profession") || settings.profession || "tradesperson";
    const tradePricing = settings.tradePricing || {};
    const prices = settings.prices || {};

    // Look up the profession display name from Professions catalogue if available
    let professionName = profession;
    if (window.Professions && Professions.getById) {
      const profObj = Professions.getById(profession);
      if (profObj && profObj.name) professionName = profObj.name;
    }

    let prompt = "You are a friendly, professional quoting assistant for a " + professionName + ". ";
    prompt += "You help the user describe a job by asking natural follow-up questions in conversation. ";
    prompt += "Speak in a clear, concise British English style. Be warm but efficient.\n\n";

    prompt += "The user's trade is: " + professionName + "\n";
    prompt += "The user's saved price list:\n";
    prompt += JSON.stringify({ tradePricing: tradePricing, prices: prices }, null, 2) + "\n\n";

    prompt += "Your task:\n";
    prompt += "1. Ask about each room, area, or zone that needs work (name, relevant dimensions or quantities)\n";
    prompt += "2. Ask follow-up questions that are relevant to the user's trade (" + professionName + "). ";
    prompt += "For example, a carpet fitter needs room dimensions, carpet tier, and whether old carpet needs removing. ";
    prompt += "A plumber needs fixture types, pipe runs, and access details. An electrician needs circuit counts, socket positions, etc.\n";
    prompt += "3. Ask for any material grade/tier choices relevant to the trade (e.g. budget, mid-range, premium)\n";
    prompt += "4. Ask for the customer name for the quote\n";
    prompt += "5. When you have ALL the information needed to price the job, confirm it back to the user, then output a JSON block.\n\n";

    prompt += "IMPORTANT: When all job details are gathered, return structured JSON wrapped in triple backticks like this:\n";
    prompt += "```json\n";
    prompt += '{\n  "rooms": [\n    {"type": "room", "name": "Living Room", "length": 4.2, "width": 3.8, "uplift": false, "doors": 1},\n';
    prompt += '    {"type": "stairs", "name": "Stairs", "steps": 13, "uplift": false, "doors": 0}\n  ],\n';
    prompt += '  "carpetTier": "mid",\n  "customer": "John Smith"\n}\n';
    prompt += "```\n\n";
    prompt += "Rules for the JSON:\n";
    prompt += "- rooms is an array of areas/zones. Each entry has: type ('room' or 'stairs' or other relevant area type), name (string), and relevant measurements (length/width in metres for floor areas, steps for staircases, qty for counted items)\n";
    prompt += "- Include boolean flags relevant to the trade (e.g. uplift for removal of old materials, doors for transition bars)\n";
    prompt += "- carpetTier (or equivalent material grade) is one of: 'budget', 'mid', 'premium'. Use this field for any tiered material choice.\n";
    prompt += "- customer is the customer name string\n";
    prompt += "- Only output the JSON block once you have confirmed all details with the user\n";
    prompt += "- Adapt your questions to be relevant to " + professionName + " - do not ask about carpet if the user is not a carpet fitter\n";

    return prompt;
  }

  function geminiStatusBubble(text) {
    const d = document.createElement("div");
    d.className = "bubble bubble--status";
    d.textContent = text;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
    return d;
  }

  function startGeminiSession() {
    if (geminiSessionActive) return;
    const apiKey = localStorage.getItem("cq_gemini_key");
    if (!apiKey) { startListening(handleUserText); return; }

    geminiSessionActive = true;
    const micBtn = $("#capture-mic");
    micBtn.classList.add("is-live", "gemini-active");

    // Connection status indicator
    var statusEl = geminiStatusBubble("Connecting to AI...");

    const systemPrompt = buildGeminiSystemPrompt();

    GeminiLive.onStateChange = function (state) {
      if (state === "connected") {
        statusEl.textContent = "AI listening";
        statusEl.classList.add("status--connected");
        statusEl.classList.remove("status--error");
      } else if (state === "connecting") {
        statusEl.textContent = "Connecting to AI...";
        statusEl.classList.remove("status--connected", "status--error");
      } else if (state === "disconnected" && geminiSessionActive) {
        stopGeminiSession();
      }
    };

    GeminiLive.onError = function (msg) {
      toast(msg);
      // If it looks like an API key issue, update the status and fall back
      if (/api key|invalid|auth/i.test(msg)) {
        statusEl.textContent = "Connection failed - using basic voice";
        statusEl.classList.add("status--error");
        statusEl.classList.remove("status--connected");
        stopGeminiSession(true); // graceful fallback
      }
    };

    GeminiLive.onThinking = function () {
      botSay("Still thinking...", true);
    };

    GeminiLive.onTurnComplete = function (fullText) {
      // Show the full turn text as a chat bubble (mute since Gemini speaks via audio)
      // Strip any JSON code blocks from display text
      var displayText = fullText.replace(/```json[\s\S]*?```/g, "").trim();
      if (displayText) {
        botSay(escapeHtml(displayText), true);
      }
    };

    GeminiLive.onTextResponse = function (text) {
      // Streaming text arrives here piece by piece - we use onTurnComplete for display
    };

    GeminiLive.onJobComplete = function (jobData) {
      // Gemini has returned the structured job JSON
      job = jobData;
      // Ensure defaults
      if (!job.carpetTier) job.carpetTier = "mid";
      job.rooms = (job.rooms || []).map(function (r) {
        return {
          type: r.type || "room",
          name: r.name || "Room",
          length: r.length || 0,
          width: r.width || 0,
          steps: r.steps || null,
          uplift: !!r.uplift,
          doors: r.doors || 0
        };
      });
      jobCardBubble(job);
      $("#capture-build").disabled = false;
      mode = "done";
      bubble("Job details captured. Tap Build to generate your quote.", "bot");
      stopGeminiSession();
    };

    GeminiLive.connect(apiKey, systemPrompt)
      .then(function () {
        // Show intro help message
        botSay("Connected to AI assistant. Speak naturally about the job - rooms, sizes, carpet type. I will build your quote when I have everything.", true);
        return GeminiLive.startStreaming();
      })
      .then(function () {
        // Streaming started successfully
      })
      .catch(function (err) {
        var errMsg = err.message || "Unknown error";
        // Check if API key issue
        if (/api key|invalid|auth|closed before setup/i.test(errMsg)) {
          statusEl.textContent = "Connection failed - using basic voice";
          statusEl.classList.add("status--error");
          toast("AI connection failed. Check your API key in Settings.");
        } else {
          statusEl.textContent = "Connection failed - using basic voice";
          statusEl.classList.add("status--error");
          toast("Could not start AI voice: " + errMsg);
        }
        stopGeminiSession(true); // graceful fallback to browser STT
      });
  }

  function stopGeminiSession(fallbackToBrowserSTT) {
    if (!geminiSessionActive) return;
    geminiSessionActive = false;
    GeminiLive.disconnect();
    const micBtn = $("#capture-mic");
    micBtn.classList.remove("is-live", "gemini-active");

    if (!fallbackToBrowserSTT) {
      bubble("AI voice ended", "bot");
    }

    // Handle partial job data: if we have some rooms but are missing info, use the queue system
    if (job && job.rooms && job.rooms.length > 0 && mode !== "done") {
      // We have partial data from Gemini - check for gaps
      var hasMissing = false;
      job.rooms.forEach(function (r) {
        if (r.type === "room" && (!r.length || !r.width)) hasMissing = true;
        if (r.type === "stairs" && r.steps == null) hasMissing = true;
      });
      if (!job.carpetTier) hasMissing = true;

      if (hasMissing) {
        botSay("I have some details from our conversation. Let me fill in what is missing.", true);
        mode = "await_job"; // Reset so buildQueue works properly
        jobCardBubble(job);
        $("#capture-build").disabled = false;
        buildQueue();
        askNext();
        return;
      }
    }

    // If fallback was requested and no job data yet, hint the user can type or use basic voice
    if (fallbackToBrowserSTT && (!job || !job.rooms || job.rooms.length === 0)) {
      botSay("You can use the mic for basic voice input, or type your job details below.", true);
    }
  }

  /* ============================================================
     CHAT UI helpers
     ============================================================ */
  const chat = $("#chat");
  function bubble(text, who) {
    const d = document.createElement("div");
    d.className = "bubble bubble--" + who;
    d.innerHTML = text;
    chat.appendChild(d);
    chat.scrollTop = chat.scrollHeight;
    return d;
  }
  function botSay(text, mute) {
    bubble(text, "bot");
    if (!mute) speak(stripTags(text));
  }
  function stripTags(s) { return s.replace(/<[^>]+>/g, ""); }

  // tappable quick-reply chips inside the chat
  let quickEl = null;
  function clearQuick() { if (quickEl) { quickEl.remove(); quickEl = null; } }
  function showQuick(options) {
    clearQuick();
    const row = document.createElement("div");
    row.className = "quick-replies";
    options.forEach(o => {
      const b = document.createElement("button");
      b.className = "quick";
      b.textContent = o.label;
      b.addEventListener("click", () => handleUserText(o.value != null ? o.value : o.label));
      row.appendChild(b);
    });
    chat.appendChild(row);
    chat.scrollTop = chat.scrollHeight;
    quickEl = row;
  }

  function jobCardBubble(job) {
    const rows = job.rooms.map(r => {
      let val;
      if (r.type === "stairs") val = r.steps != null ? `${r.steps} steps` : "steps?";
      else val = (r.length && r.width) ? `${r.length} × ${r.width} m` : "size?";
      const extra = r.uplift ? " · uplift" : "";
      return `<div class="jobcard__row"><span class="q">${r.name}</span><span>${val}${extra}</span></div>`;
    }).join("");
    const tier = job.carpetTier ? cap(job.carpetTier) + " range" : "carpet?";
    bubble(
      `<div class="jobcard__row"><span class="q">Carpet</span><span>${tier}</span></div>${rows}`,
      "card"
    );
  }

  /* ============================================================
     CONVERSATION FLOW
     ============================================================ */
  let job = null;
  let mode = "idle";           // 'await_job' | 'await_answer' | 'done'
  let queue = [];
  let current = null;
  let retries = 0;

  const EXAMPLE_SENTENCE = "Living room four point two by three point eight, hallway one by four, stairs and landing thirteen steps, mid range carpet, uplift the old carpet";

  function startCapture() {
    show("capture");
    chat.innerHTML = "";
    clearQuick();
    job = null; mode = "await_job"; queue = []; current = null; retries = 0;
    $("#capture-build").disabled = true;
    $("#capture-input").value = "";
    if (!hasPrices()) {
      botSay("Heads up — set your prices in Settings first so quotes are accurate.", true);
    }
    botSay("Right, let's quote a job. Tell me the rooms and sizes, and which carpet.");
    botSay(sttSupported
      ? "Tap the mic to talk, or type below. You can also tap an example."
      : "Type your job below, or tap an example to see how it works.", true);
    showQuick([{ label: "✨ Try an example", value: "__example__" }]);
  }

  // One-tap full demo quote (proves it works without any typing/voice)
  function runExampleQuote() {
    show("capture");
    chat.innerHTML = "";
    clearQuick();
    job = Parser.parse(EXAMPLE_SENTENCE);
    job.customer = "Sample Customer";
    if (!job.carpetTier) job.carpetTier = "mid";
    mode = "done"; current = null;
    bubble(escapeHtml("“" + EXAMPLE_SENTENCE + "”"), "me");
    jobCardBubble(job);
    botSay("Here's the finished quote.", true);
    const q = Engine.buildQuote(job, settings);
    currentQuote = q;
    setTimeout(() => { renderQuote(q); show("quote"); }, 600);
  }

  // Home hero mic: navigate + listen immediately (uses the tap gesture)
  $("#home-mic").addEventListener("click", () => {
    startCapture();
    const geminiKey = localStorage.getItem("cq_gemini_key");
    if (geminiKey) {
      setTimeout(() => startGeminiSession(), 350);
    } else {
      setTimeout(() => startListening(handleUserText), 350);
    }
  });
  $("#home-type").addEventListener("click", () => startCapture());
  $("#home-example").addEventListener("click", runExampleQuote);

  // composer controls
  $("#capture-mic").addEventListener("click", () => {
    if (geminiSessionActive) { stopGeminiSession(); return; }
    if (listening) { stopListening(); return; }
    const geminiKey = localStorage.getItem("cq_gemini_key");
    if (geminiKey) { startGeminiSession(); return; }
    startListening(handleUserText);
  });
  $("#capture-send").addEventListener("click", sendTyped);
  $("#capture-input").addEventListener("keydown", (e) => { if (e.key === "Enter") sendTyped(); });
  function sendTyped() {
    const v = $("#capture-input").value.trim();
    if (!v) return;
    $("#capture-input").value = "";
    handleUserText(v);
  }
  $("#capture-build").addEventListener("click", finalize);

  function handleUserText(text) {
    stopListening();
    clearQuick();
    if (text === "__example__") text = EXAMPLE_SENTENCE;
    bubble(escapeHtml(text), "me");

    if (mode === "await_job") {
      job = Parser.parse(text);
      if (!job.rooms.length) {
        botSay("I didn't catch any rooms there. Try: living room four by three, stairs thirteen steps.");
        showQuick([{ label: "✨ Try an example", value: "__example__" }]);
        return;
      }
      jobCardBubble(job);
      $("#capture-build").disabled = false;
      buildQueue();
      askNext();
      return;
    }

    if (mode === "await_answer" && current) {
      const ok = applyAnswer(current, text);
      if (!ok) {
        retries++;
        if (retries >= 2) { // accept defaults / skip after struggling
          botSay("No worries, I'll leave that for you to tweak later.", true);
          retries = 0; askNext();
        } else {
          botSay(current.reask);
          armReply();
        }
        return;
      }
      retries = 0;
      askNext();
      return;
    }
  }

  function buildQueue() {
    queue = [];
    if (!job.customer) {
      queue.push({ kind: "customer", q: "Who's the quote for? Say their name, or say skip.", reask: "Say the customer's name, or say skip." });
    }
    job.rooms.forEach(r => {
      if (r.type === "room" && (!r.length || !r.width)) {
        queue.push({ kind: "dims", target: r, q: `What are the dimensions of the ${r.name}? For example, four by three.`, reask: `Say the ${r.name} size as length by width, like four by three.` });
      }
      if (r.type === "stairs" && r.steps == null) {
        queue.push({ kind: "steps", target: r, q: `How many steps on the ${r.name.toLowerCase()}?`, reask: "Just say the number of steps, like thirteen." });
      }
    });
    if (!job.carpetTier) {
      queue.push({ kind: "tier", q: "Which carpet range — budget, mid-range, or premium?", reask: "Say budget, mid-range, or premium." });
    }
  }

  function askNext() {
    current = queue.shift() || null;
    if (!current) { finalize(); return; }
    mode = "await_answer";
    botSay(current.q);
    armReply();
    // tappable options where it makes sense
    if (current.kind === "tier") {
      showQuick([{ label: "Budget" }, { label: "Mid-range" }, { label: "Premium" }]);
    } else if (current.kind === "customer") {
      showQuick([{ label: "Skip", value: "skip" }]);
    }
  }

  // keep Build tappable once we have a job to quote
  function armReply() {
    $("#capture-build").disabled = !(job && job.rooms.length);
  }

  function applyAnswer(c, text) {
    if (c.kind === "customer") {
      if (/^\s*(skip|no|none|nobody|n\/a)\s*$/i.test(text)) { job.customer = ""; }
      else job.customer = titleCase(text.trim());
      return true;
    }
    if (c.kind === "dims") {
      const d = Parser.parseDimensions(text);
      if (!d) return false;
      c.target.length = d.length; c.target.width = d.width;
      return true;
    }
    if (c.kind === "steps") {
      const n = Parser.parseSteps(text);
      if (!n) return false;
      c.target.steps = n; return true;
    }
    if (c.kind === "tier") {
      const t = Parser.detectTier(text) ||
        (/budget|cheap|basic/i.test(text) ? "budget" :
         /premium|luxury|best/i.test(text) ? "premium" :
         /mid|standard|medium/i.test(text) ? "mid" : null);
      if (!t) return false;
      job.carpetTier = t; return true;
    }
    return true;
  }

  function finalize() {
    mode = "done"; current = null;
    clearQuick();
    $("#capture-build").disabled = true;
    // any rooms still missing sizes? give them a tiny default & warn, so a quote always builds
    let warned = false;
    job.rooms.forEach(r => {
      if (r.type === "room" && (!r.length || !r.width)) { r.length = r.length || 3; r.width = r.width || 3; warned = true; }
      if (r.type === "stairs" && r.steps == null) { r.steps = 13; warned = true; }
    });
    if (!job.carpetTier) job.carpetTier = "mid";
    if (warned) botSay("I filled a couple of gaps with sensible defaults — you can adjust in Settings or re-quote.", true);

    const q = Engine.buildQuote(job, settings);
    currentQuote = q;
    botSay(`Done. That comes to ${Engine.money(q.total)}${q.vatEnabled ? " including VAT" : ""}.`);
    setTimeout(() => { renderQuote(q); show("quote"); speakQuoteSummary(q); }, 700);
  }

  /* ============================================================
     QUOTE SCREEN
     ============================================================ */
  let currentQuote = null;

  function renderQuote(q) {
    const biz = q.business && q.business.name ? q.business.name : "Your Business";
    const bizMeta = [q.business && q.business.phone, q.business && q.business.email].filter(Boolean).join("  ·  ");
    const dateStr = new Date(q.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

    const roomsHtml = q.rooms.map(r => {
      const lines = r.lines.map(l =>
        `<div class="line"><span>${l.label}<br><span class="calc">${l.calc}</span></span><span class="amt">${Engine.money(l.amount)}</span></div>`
      ).join("");
      return `<div class="quote-room">
        <div class="quote-room__title"><span>${r.name}</span><span class="sub">${r.meta}</span></div>
        ${lines}
        <div class="line" style="font-weight:700;margin-top:4px"><span>Subtotal</span><span class="amt">${Engine.money(r.subtotal)}</span></div>
      </div>`;
    }).join("");

    const adj = q.adjustment || 0;
    const grand = Engine.round2(q.total + adj);

    const vatLine = q.vatEnabled
      ? `<div class="totline"><span>VAT (${q.vatRate}%)</span><span class="amt">${Engine.money(q.vat)}</span></div>` : "";
    const adjLine = `<div class="totline"><span>Adjustment (£)</span>
        <input id="adj-input" type="number" step="0.01" inputmode="decimal" value="${adj}"
        style="width:90px;text-align:right;background:var(--bg-elev);border:1px solid var(--line);color:var(--text);border-radius:8px;padding:6px"></div>`;

    $("#quote-doc").innerHTML = `
      <div class="quote-head">
        <div class="quote-biz">${escapeHtml(biz)}</div>
        ${bizMeta ? `<div class="quote-biz-meta">${escapeHtml(bizMeta)}</div>` : ""}
        <div class="quote-cust">
          <div><b>Quote for:</b> ${escapeHtml(q.customer || "—")}</div>
          <div class="muted small">${dateStr} · ${cap(q.carpetTier)} range carpet · ${q.rollWidth}m roll</div>
        </div>
      </div>
      ${roomsHtml}
      <div class="quote-totals">
        <div class="totline"><span>Net</span><span class="amt">${Engine.money(q.net)}</span></div>
        ${vatLine}
        ${adjLine}
        <div class="totline grand"><span>Total</span><span class="amt" id="grand-amt">${Engine.money(grand)}</span></div>
      </div>`;

    const adjInput = $("#adj-input");
    if (adjInput) adjInput.addEventListener("input", () => {
      const a = parseFloat(adjInput.value) || 0;
      currentQuote.adjustment = a;
      $("#grand-amt").textContent = Engine.money(Engine.round2(currentQuote.total + a));
    });
  }

  function speakQuoteSummary(q) {
    const grand = Engine.round2(q.total + (q.adjustment || 0));
    const who = q.customer ? " for " + q.customer : "";
    speak(`Here's the quote${who}. ${q.rooms.length} ${q.rooms.length === 1 ? "area" : "areas"}, total ${spokenMoney(grand)}. Tap share to send it.`);
  }
  $("#quote-speak").addEventListener("click", () => { if (currentQuote) speakQuoteSummary(currentQuote); });

  // Save
  $("#quote-save").addEventListener("click", () => {
    if (!currentQuote) return;
    Engine.saveQuote(currentQuote);
    toast("Quote saved");
    show("home");
  });

  // Share
  $("#quote-share").addEventListener("click", async () => {
    if (!currentQuote) return;
    const text = quoteAsText(currentQuote);
    if (navigator.share) {
      try { await navigator.share({ title: "Your carpet quote", text }); return; } catch (e) {}
    }
    // fallbacks
    try { await navigator.clipboard.writeText(text); toast("Quote copied to clipboard"); }
    catch (e) { window.location.href = "sms:?&body=" + encodeURIComponent(text); }
  });

  // Save PDF / print
  $("#quote-pdf").addEventListener("click", () => { window.print(); });

  function quoteAsText(q) {
    const grand = Engine.round2(q.total + (q.adjustment || 0));
    const biz = (q.business && q.business.name) || "Your Business";
    let s = `${biz}\nQuote for ${q.customer || "—"}\n`;
    s += `${cap(q.carpetTier)} range carpet, ${q.rollWidth}m roll\n\n`;
    q.rooms.forEach(r => { s += `${r.name} (${r.meta}): ${Engine.money(r.subtotal)}\n`; });
    if (q.vatEnabled) s += `\nNet ${Engine.money(q.net)} + VAT ${Engine.money(q.vat)}`;
    s += `\nTOTAL: ${Engine.money(grand)}`;
    return s;
  }

  /* ============================================================
     RECENT QUOTES (home)
     ============================================================ */
  function renderRecent() {
    const list = $("#recent-list");
    const quotes = Engine.loadQuotes();
    $("#home-business-name").textContent = (settings.business && settings.business.name) || "QuoteMate";
    if (!quotes.length) {
      list.innerHTML = `<div class="empty">No quotes yet.<br>Tap “Speak a quote” to make your first one.</div>`;
      return;
    }
    list.innerHTML = quotes.map(q => {
      const grand = Engine.round2(q.total + (q.adjustment || 0));
      const dateStr = new Date(q.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
      const areas = q.rooms.length + (q.rooms.length === 1 ? " area" : " areas");
      return `<button class="recent" data-id="${q.id}">
        <span class="recent__main">
          <div class="recent__name">${escapeHtml(q.customer || "No name")}</div>
          <div class="recent__meta">${dateStr} · ${areas} · ${cap(q.carpetTier)}</div>
        </span>
        <span class="recent__total">${Engine.money(grand)}</span>
      </button>`;
    }).join("");
    $$(".recent", list).forEach(btn => btn.addEventListener("click", () => {
      const q = Engine.loadQuotes().find(x => x.id === btn.dataset.id);
      if (q) { currentQuote = q; renderQuote(q); show("quote"); }
    }));
  }

  /* ============================================================
     SETTINGS
     ============================================================ */
  const form = $("#settings-form");
  function fillSettingsForm() {
    const s = settings;
    form.business.value = s.business.name || "";
    form.phone.value = s.business.phone || "";
    form.email.value = s.business.email || "";
    form.gemini_key.value = localStorage.getItem("cq_gemini_key") || "";
    form.carpet_budget.value = s.prices.carpet.budget;
    form.carpet_mid.value = s.prices.carpet.mid;
    form.carpet_premium.value = s.prices.carpet.premium;
    form.underlay.value = s.prices.underlay;
    form.gripper.value = s.prices.gripper;
    form.doorBar.value = s.prices.doorBar;
    form.uplift.value = s.prices.uplift;
    form.labour.value = s.prices.labour;
    form.stairPerStep.value = s.prices.stairPerStep;
    form.rollWidth.value = String(s.rollWidth);
    form.wastePct.value = s.wastePct;
    form.vatEnabled.checked = !!s.vatEnabled;
    form.vatRate.value = s.vatRate;
  }
  function num(v, d) { const n = parseFloat(v); return isNaN(n) ? d : n; }
  $("#settings-save").addEventListener("click", () => {
    localStorage.setItem("cq_gemini_key", form.gemini_key.value.trim());
    settings = {
      business: { name: form.business.value.trim(), phone: form.phone.value.trim(), email: form.email.value.trim() },
      rollWidth: num(form.rollWidth.value, 4),
      wastePct: num(form.wastePct.value, 10),
      vatEnabled: form.vatEnabled.checked,
      vatRate: num(form.vatRate.value, 20),
      prices: {
        carpet: {
          budget: num(form.carpet_budget.value, 9),
          mid: num(form.carpet_mid.value, 13),
          premium: num(form.carpet_premium.value, 18)
        },
        underlay: num(form.underlay.value, 4),
        gripper: num(form.gripper.value, 1.2),
        doorBar: num(form.doorBar.value, 8),
        uplift: num(form.uplift.value, 3),
        labour: num(form.labour.value, 5),
        stairPerStep: num(form.stairPerStep.value, 25)
      }
    };
    Engine.saveSettings(settings);
    toast("Settings saved");
    show("home");
  });

  function hasPrices() {
    return settings && settings.prices && settings.prices.carpet && settings.prices.carpet.mid > 0;
  }

  /* ============================================================
     small utils
     ============================================================ */
  function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
  function titleCase(s) { return s.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()); }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function spokenMoney(n) {
    const pounds = Math.floor(n); const pence = Math.round((n - pounds) * 100);
    let s = pounds + (pounds === 1 ? " pound" : " pounds");
    if (pence) s += " " + pence;
    return s;
  }

  /* ============================================================
     SETUP WIZARD
     ============================================================ */
  let wizStep = 0;
  let wizProfession = null;
  const wizSteps = $$(".wiz-step");
  const wizDots = $$(".wiz-dot");

  function wizGoTo(step) {
    const prev = wizStep;
    wizStep = step;
    wizSteps.forEach((el, i) => {
      el.classList.remove("is-active", "is-left");
      if (i === step) el.classList.add("is-active");
      else if (i < step) el.classList.add("is-left");
    });
    wizDots.forEach((d, i) => {
      d.classList.remove("is-active", "is-done");
      if (i === step) d.classList.add("is-active");
      else if (i < step) d.classList.add("is-done");
    });
  }

  // Step 0 -> 1: Get Started
  $("#wiz-start").addEventListener("click", () => {
    wizGoTo(1);
    wizRenderProfessions("");
  });

  // Step 1: Profession selection with event delegation
  function wizRenderProfessions(query) {
    const container = $("#wiz-professions");
    const results = Professions.search(query);
    // Group by category
    const grouped = {};
    results.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });
    const cats = Object.keys(grouped).sort();
    let html = "";
    cats.forEach(cat => {
      html += '<div class="wiz-cat"><div class="wiz-cat__title">' + escapeHtml(cat) + '</div><div class="wiz-cat__list">';
      grouped[cat].forEach(p => {
        const sel = wizProfession && wizProfession.id === p.id ? " is-selected" : "";
        html += '<button type="button" class="wiz-prof' + sel + '" data-prof-id="' + p.id + '">' + escapeHtml(p.name) + '</button>';
      });
      html += '</div></div>';
    });
    if (!results.length) {
      html = '<p class="muted" style="text-align:center;padding:20px">No trades found. Try a different search.</p>';
    }
    container.innerHTML = html;
  }

  // Event delegation on #wiz-professions container (avoids re-registering listeners)
  $("#wiz-professions").addEventListener("click", function(e) {
    const btn = e.target.closest(".wiz-prof");
    if (!btn) return;
    $$(".wiz-prof", this).forEach(b => b.classList.remove("is-selected"));
    btn.classList.add("is-selected");
    wizProfession = Professions.getById(btn.dataset.profId);
    $("#wiz-next-1").disabled = false;
  });

  // Debounced search input handler (150ms)
  let wizSearchTimer = null;
  $("#wiz-search").addEventListener("input", (e) => {
    clearTimeout(wizSearchTimer);
    wizSearchTimer = setTimeout(() => {
      wizRenderProfessions(e.target.value.trim());
    }, 150);
  });

  $("#wiz-back-1").addEventListener("click", () => wizGoTo(0));
  $("#wiz-next-1").addEventListener("click", () => {
    if (!wizProfession) return;
    wizGoTo(2);
    wizRenderQuestions();
  });

  // Step 2: Trade-specific questions
  function wizRenderQuestions() {
    const container = $("#wiz-questions");
    $("#wiz-trade-label").textContent = wizProfession.name + " pricing";
    const questions = wizProfession.questions || [];
    // Determine unit system based on country selection
    const country = $("#wiz-country").value;
    const useImperial = (country === "US");
    let html = '<div class="card">';
    questions.forEach((q, i) => {
      // Convert unit labels for US users
      let unitLabel = q.unit || '';
      if (useImperial) {
        unitLabel = unitLabel
          .replace(/per m2/gi, "per sq ft")
          .replace(/per m²/gi, "per sq ft")
          .replace(/\/m2/gi, "/sq ft")
          .replace(/\/m²/gi, "/sq ft")
          .replace(/per m\b/gi, "per ft")
          .replace(/\/m\b/gi, "/ft");
      }
      if (q.type === "select") {
        const opts = (q.options || []).map(o => '<option value="' + escapeHtml(o) + '"' + (o === String(q.default) ? ' selected' : '') + '>' + escapeHtml(o) + '</option>').join("");
        html += '<label class="field"><span>' + escapeHtml(q.label) + '</span><div class="wiz-field-unit"><select data-qkey="' + q.key + '">' + opts + '</select><span class="unit-label">' + escapeHtml(unitLabel) + '</span></div></label>';
      } else if (q.type === "toggle") {
        const checked = q.default ? " checked" : "";
        html += '<label class="field field--row"><span>' + escapeHtml(q.label) + '</span><input type="checkbox" class="switch" data-qkey="' + q.key + '"' + checked + ' /></label>';
      } else {
        // number or text
        const inputType = q.type === "number" ? "number" : "text";
        const inputMode = q.type === "number" ? ' inputmode="decimal" step="0.01"' : '';
        const val = q.default != null ? ' value="' + escapeHtml(String(q.default)) + '"' : '';
        html += '<label class="field"><span>' + escapeHtml(q.label) + '</span><div class="wiz-field-unit"><input type="' + inputType + '"' + inputMode + ' data-qkey="' + q.key + '"' + val + ' /><span class="unit-label">' + escapeHtml(unitLabel) + '</span></div></label>';
      }
    });
    html += '</div>';
    container.innerHTML = html;
  }

  $("#wiz-back-2").addEventListener("click", () => wizGoTo(1));
  $("#wiz-next-2").addEventListener("click", () => wizGoTo(3));

  // Step 3: Business details
  $("#wiz-back-3").addEventListener("click", () => wizGoTo(2));
  $("#wiz-next-3").addEventListener("click", () => {
    wizComplete();
  });

  // Completion
  function wizComplete() {
    // Gather trade pricing answers
    const tradePricing = {};
    $$("[data-qkey]", $("#wiz-questions")).forEach(el => {
      const key = el.dataset.qkey;
      if (el.type === "checkbox") {
        tradePricing[key] = el.checked;
      } else if (el.type === "number") {
        tradePricing[key] = parseFloat(el.value) || 0;
      } else {
        tradePricing[key] = el.value;
      }
    });

    // Gather business details
    const country = $("#wiz-country").value;
    const bizName = $("#wiz-biz-name").value.trim();
    const bizPhone = $("#wiz-biz-phone").value.trim();
    const bizEmail = $("#wiz-biz-email").value.trim();
    const vatEnabled = $("#wiz-vat-enabled").checked;
    const vatRate = parseFloat($("#wiz-vat-rate").value) || 20;
    const markup = parseFloat($("#wiz-markup").value) || 0;

    // Build settings object
    const newSettings = Engine.loadSettings();
    newSettings.profession = wizProfession.id;
    newSettings.country = country;
    newSettings.markup = markup;
    newSettings.business = { name: bizName, phone: bizPhone, email: bizEmail };
    newSettings.vatEnabled = vatEnabled;
    newSettings.vatRate = vatRate;
    // Overwrite tradePricing entirely to clear stale keys from a previous profession
    newSettings.tradePricing = {};
    Object.keys(tradePricing).forEach(function(k) { newSettings.tradePricing[k] = tradePricing[k]; });

    // If profession is carpet-fitter, map trade pricing to the engine's carpet price structure
    if (wizProfession.id === "carpet-fitter") {
      if (tradePricing.carpet_budget_m2) newSettings.prices.carpet.budget = tradePricing.carpet_budget_m2;
      if (tradePricing.carpet_mid_m2) newSettings.prices.carpet.mid = tradePricing.carpet_mid_m2;
      if (tradePricing.carpet_premium_m2) newSettings.prices.carpet.premium = tradePricing.carpet_premium_m2;
      if (tradePricing.underlay_m2) newSettings.prices.underlay = tradePricing.underlay_m2;
      if (tradePricing.gripper_m) newSettings.prices.gripper = tradePricing.gripper_m;
      if (tradePricing.door_bar) newSettings.prices.doorBar = tradePricing.door_bar;
      if (tradePricing.uplift_m2) newSettings.prices.uplift = tradePricing.uplift_m2;
      if (tradePricing.fitting_m2) newSettings.prices.labour = tradePricing.fitting_m2;
      if (tradePricing.stairs_step) newSettings.prices.stairPerStep = tradePricing.stairs_step;
    }

    Engine.saveSettings(newSettings);
    settings = newSettings;
    localStorage.setItem("cq_wizard_done", "true");
    localStorage.setItem("cq_profession", wizProfession.id);

    // Show summary
    const currSymbol = country === "US" ? "$" : country === "AU" || country === "NZ" || country === "CA" ? "$" : "\u00a3";
    $("#wiz-summary").textContent = wizProfession.name + " - " + Object.keys(tradePricing).length + " prices configured. Currency: " + currSymbol + ". " + (vatEnabled ? "VAT at " + vatRate + "%." : "No VAT.");

    wizGoTo(4);
  }

  // Step 4: Start Quoting
  $("#wiz-finish").addEventListener("click", () => {
    show("home");
  });

  // Re-run wizard from settings
  $("#settings-rerun-wizard").addEventListener("click", () => {
    wizStep = 0;
    wizProfession = null;
    wizGoTo(0);
    $("#wiz-search").value = "";
    $("#wiz-next-1").disabled = true;
    show("wizard");
  });

  /* ---------------- boot ---------------- */
  if (localStorage.getItem("cq_wizard_done") !== "true") {
    show("wizard");
    wizRenderProfessions("");
  } else {
    show("home");
  }
  // warm up voices on first interaction (some browsers need it)
  document.addEventListener("click", function warm() {
    pickVoice();
    document.removeEventListener("click", warm);
  }, { once: true });

})();
