# QuoteMate Gemini Proxy Worker

A Cloudflare Worker that securely proxies WebSocket connections to Google's Gemini Multimodal Live API. The API key is stored as a Cloudflare secret and never exposed to clients.

## How it works

1. The QuoteMate frontend opens a WebSocket connection to this worker.
2. The worker opens a WebSocket to Gemini's `BidiGenerateContent` endpoint, appending the secret `GEMINI_API_KEY`.
3. All messages are relayed bidirectionally between the client and Gemini.
4. Customers never need their own API key -- it just works.

## Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is fine)
- [Node.js](https://nodejs.org/) 18+ installed
- A [Google AI / Gemini API key](https://aistudio.google.com/app/apikey)

## Deployment steps

### 1. Install Wrangler (Cloudflare CLI)

```bash
npm install -g wrangler
```

### 2. Authenticate with Cloudflare

```bash
wrangler login
```

This opens a browser window to authorize Wrangler with your Cloudflare account.

### 3. Deploy the worker

From this `/worker` directory:

```bash
cd worker
npx wrangler deploy
```

Wrangler will output the deployed URL, something like:

```
https://quotemate-proxy.<your-subdomain>.workers.dev
```

### 4. Set the API key secret

```bash
npx wrangler secret put GEMINI_API_KEY
```

When prompted, paste your Gemini API key and press Enter. The key is encrypted and stored securely by Cloudflare -- it never appears in source code or logs.

### 5. Configure the app

In the QuoteMate app, go to **Settings** and enter your Worker URL in the **Worker URL** field:

```
wss://quotemate-proxy.<your-subdomain>.workers.dev
```

Replace `<your-subdomain>` with your actual Cloudflare Workers subdomain.

## Updating

To update the worker code after making changes:

```bash
npx wrangler deploy
```

To rotate the API key:

```bash
npx wrangler secret put GEMINI_API_KEY
```

## Custom domain (optional)

To use a custom domain instead of the `workers.dev` subdomain:

1. Go to your Cloudflare dashboard
2. Navigate to Workers & Pages > quotemate-proxy > Settings > Triggers
3. Add a custom domain (e.g., `gemini-proxy.yourdomain.com`)

Then update the Worker URL in the QuoteMate app settings accordingly.

## Troubleshooting

- **"GEMINI_API_KEY not configured"**: Run `npx wrangler secret put GEMINI_API_KEY` and redeploy.
- **WebSocket connection fails**: Make sure you are using `wss://` (not `https://`) in the app's Worker URL field.
- **"Expected WebSocket upgrade"**: The worker only handles WebSocket connections. Regular HTTP requests get a 426 response.
- **Gemini returns errors**: Verify your API key is valid at [AI Studio](https://aistudio.google.com/app/apikey) and has the Generative Language API enabled.
