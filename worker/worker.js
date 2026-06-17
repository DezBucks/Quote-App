/**
 * QuoteMate Gemini Proxy Worker
 *
 * A Cloudflare Worker that proxies WebSocket connections to the
 * Gemini Multimodal Live API, keeping the API key secure server-side.
 *
 * The client connects via WebSocket to this worker. The worker opens
 * a WebSocket to Gemini's BidiGenerateContent endpoint (appending
 * the secret GEMINI_API_KEY), then relays all messages in both directions.
 *
 * Environment secret required:
 *   GEMINI_API_KEY - Your Google AI / Gemini API key
 */

const GEMINI_WS_URL =
  "wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent";

export default {
  async fetch(request, env) {
    // Only handle WebSocket upgrade requests
    const upgradeHeader = request.headers.get("Upgrade");
    if (!upgradeHeader || upgradeHeader.toLowerCase() !== "websocket") {
      return new Response(
        JSON.stringify({ error: "Expected WebSocket upgrade request" }),
        { status: 426, headers: { "Content-Type": "application/json" } }
      );
    }

    // Validate that the API key secret is configured
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY not configured on worker" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create the WebSocket pair for the client connection
    const [client, server] = Object.values(new WebSocketPair());

    // Accept the client-side WebSocket
    server.accept();

    // Connect to Gemini with the secret API key
    const geminiUrl = GEMINI_WS_URL + "?key=" + encodeURIComponent(apiKey);

    let geminiWs = null;
    let clientClosed = false;
    let geminiClosed = false;

    try {
      const geminiResp = await fetch(geminiUrl, {
        headers: { Upgrade: "websocket" },
      });

      geminiWs = geminiResp.webSocket;
      if (!geminiWs) {
        server.send(JSON.stringify({ error: "Failed to connect to Gemini API" }));
        server.close(1011, "Failed to connect upstream");
        return new Response(null, { status: 101, webSocket: client });
      }

      geminiWs.accept();
    } catch (err) {
      server.send(JSON.stringify({ error: "Failed to connect to Gemini: " + err.message }));
      server.close(1011, "Upstream connection failed");
      return new Response(null, { status: 101, webSocket: client });
    }

    // Proxy: client -> Gemini
    server.addEventListener("message", (event) => {
      if (!geminiClosed) {
        try {
          geminiWs.send(event.data);
        } catch (e) {
          // Gemini connection lost
        }
      }
    });

    // Proxy: Gemini -> client
    geminiWs.addEventListener("message", (event) => {
      if (!clientClosed) {
        try {
          server.send(event.data);
        } catch (e) {
          // Client connection lost
        }
      }
    });

    // Handle client close
    server.addEventListener("close", (event) => {
      clientClosed = true;
      if (!geminiClosed) {
        try {
          geminiWs.close(event.code || 1000, event.reason || "Client disconnected");
        } catch (e) {}
      }
    });

    // Handle Gemini close
    geminiWs.addEventListener("close", (event) => {
      geminiClosed = true;
      if (!clientClosed) {
        try {
          server.close(event.code || 1000, event.reason || "Upstream closed");
        } catch (e) {}
      }
    });

    // Handle client error
    server.addEventListener("error", () => {
      clientClosed = true;
      if (!geminiClosed) {
        try { geminiWs.close(1011, "Client error"); } catch (e) {}
      }
    });

    // Handle Gemini error
    geminiWs.addEventListener("error", () => {
      geminiClosed = true;
      if (!clientClosed) {
        try { server.close(1011, "Upstream error"); } catch (e) {}
      }
    });

    return new Response(null, { status: 101, webSocket: client });
  },
};
