# QuoteMate — Voice Carpet Quotes

A mobile, app-style web tool for carpet fitters. Speak the job ("living room four point two by three point eight, stairs and landing thirteen steps, mid-range carpet, uplift the old one") and it asks any missing details back in a British voice, then produces a fully priced, professional quote in seconds.

## Live app

Once GitHub Pages finishes its first deploy (Actions tab → "Deploy QuoteMate to GitHub Pages"), the app is live at:

**https://dezbucks.github.io/Quote-App/**

Open that link on your phone in Safari/Chrome, then **Add to Home Screen** to use it like a native app (full screen, no browser bar).

## What it does

- **Voice in:** tap the mic and describe the whole job naturally.
- **Conversational follow-up:** it speaks back (British male voice) to ask for any missing room sizes, step counts, or carpet range.
- **Correct carpet maths:** works out carpet to order off a fixed-width roll (4 m / 5 m) including unavoidable waste — plus underlay, gripper, door bars, uplift/disposal, fitting, stairs per step, and optional VAT.
- **Professional quote:** branded breakdown you can share by text/email, save as PDF, or store on the device.
- **Your prices:** set your own rates once in Settings (stored on your device).

## How it's built

Pure static web app — no backend, no accounts, no API keys, no running costs.

| File | Purpose |
|------|---------|
| `index.html` | App shell / screens |
| `styles.css` | iOS-style mobile UI |
| `engine.js` | Deterministic pricing engine (carpet/stairs/extras/VAT) |
| `parser.js` | Turns spoken notes into structured rooms |
| `app.js` | Navigation, voice (Web Speech API), conversation flow, quotes |

Voice uses the browser's built-in Web Speech API. Speech **output** works on all modern browsers; speech **input** works best in Chrome and iOS Safari (a typed fallback is always available).

## Run locally

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```
