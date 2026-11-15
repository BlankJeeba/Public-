# Environment Setup — BlankJeeba Website

## Overview

The **BlankJeeba** website is a 100% static client-side React application (`vite build` -> `dist/`). **No private API keys, database credentials, or backend secrets are required** to develop, build, or host the website.

---

## `.env.example` Variables

The workspace includes `.env.example` from the Google AI Studio template:

```env
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"
```

- **`GEMINI_API_KEY`**: Not used by the BlankJeeba website. Leave unset or placeholder when hosting on Vercel/Cloudflare Pages/Netlify.
- **`APP_URL`**: Optional platform URL placeholder; the live domain (`https://blankjeeba.com`) is configured in `src/content/site.ts`, `index.html`, and `public/sitemap.xml`.

---

## Browser Storage Keys Used at Runtime

- `blankjeeba_lang`: Stores explicit user language toggle (`"en"` or `"hi"`).
- `blankjeeba_theme`: Stores explicit user theme toggle (`"dark"` or `"light"`, defaulting to `"dark"`).

---

## Optional Future Integrations (`index.html`)

In `index.html`, two clearly commented slots are reserved for when you set up analytics:

1. **Google Search Console**:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```
2. **Google Analytics 4 (GA4)**:
   Replace `G-XXXXXXXXXX` with your Measurement ID and uncomment the `gtag.js` snippet in `index.html`.
