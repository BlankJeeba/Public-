# How to update my site

This guide explains how to update videos, links, text, and pages on **blankjeeba.com** in plain English—no coding experience needed.

Almost everything on the website lives in **one single file**:

`src/content/site.ts`

---

## 1. How to add a new YouTube video

1. Open `src/content/site.ts`.
2. Find `featuredVideos` (around line 115).
3. Copy the 11-character ID from your YouTube video link.
   - Example: if your link is `https://www.youtube.com/watch?v=ABC123xyz99`, the ID is `ABC123xyz99`.
4. Paste it at the **top** of the list so it appears first (newest-first):

```ts
featuredVideos: [
  { id: 'ABC123xyz99' }, // <-- Newest video at the top!
  { id: 'FI202Yv8Bh0' },
  { id: '8fLK5sGqG1A' },
  // ...
],
```

Optional: If you want to provide your own custom fallback title (used if YouTube's title lookup is ever unreachable), add `title`:

```ts
{
  id: 'ABC123xyz99',
  title: {
    en: 'My New AI Video Title',
    hi: 'मेरा नया AI वीडियो',
  },
},
```

> **Note:** Your live playlist on `/videos` updates **automatically** whenever you add a video to playlist `PLWHRjcOaoWBkSIvA7QZkW_BnlWVjOFLpl` on YouTube—you don't need to touch any code for the playlist!

---

## 2. How to change or add a social link

1. Open `src/content/site.ts`.
2. Scroll to `social`.
   - `showcase` holds the 4 large icons shown on the Home page and Footer (`X`, `Instagram`, `Facebook`, `WhatsApp Channel`).
   - `otherPlaces` holds the extra platforms shown on `/about` and `/contact` (`YouTube`, `TikTok`, `Reddit`, `LinkedIn`, `GitHub`, `Telegram`, `Snapchat`, `Pinterest`, `Spotify`).
3. Update the `url` string for any platform and save the file.

---

## 3. How to edit a Coming Soon page (and make it searchable)

1. Open `src/content/site.ts`.
2. Find `vision.items` (or `personalPages` for `/lab`, `/notes`, `/ideas`, `/playground`).
3. Change `title`, `teaser`, or `description` in `en` (English) and `hi` (Hindi).
4. When a page is finished and ready for Google Search, change `indexable: false` to `indexable: true`, and add its URL to `public/sitemap.xml`.

---

## 4. How to add a new Coming Soon or info page

1. Open `src/content/site.ts` and add a new object inside `vision.items` (or `personalPages`):

```ts
{
  slug: 'my-new-page',
  iconKey: 'project-jeeba',
  indexable: false,
  title: { en: 'My New Page', hi: 'मेरा नया पेज' },
  teaser: { en: 'Short one-line teaser.', hi: 'एक लाइन का संक्षिप्त परिचय।' },
  description: { en: 'Longer details here.', hi: 'विस्तृत जानकारी यहाँ।' },
}
```

2. Because `src/App.tsx` reads routes straight from `src/content/site.ts`, `/my-new-page` and `/hi/my-new-page` work automatically!

---

## 5. How to add Achievements

1. Open `src/content/site.ts` and find `about.achievements` (currently `[]`).
2. Add items like this—the Achievements section on `/about` will appear automatically as soon as there is at least 1 item:

```ts
achievements: [
  {
    id: 'milestone-1',
    year: '2026',
    title: { en: '10,000 YouTube Subscribers', hi: '10,000 YouTube सब्सक्राइबर्स' },
    detail: { en: 'Reached 10k learners following AI tutorials.', hi: 'AI ट्यूटोरियल से जुड़ने वाले 10,000 सीखने वाले।' },
  },
],
```

---

## 6. How to turn on Google Analytics & Search Console

1. Open `index.html`.
2. Look for the clearly marked comment blocks:
   - `GOOGLE SEARCH CONSOLE VERIFICATION`
   - `GOOGLE ANALYTICS 4 (GA4)`
3. Paste your verification code / Measurement ID (`G-XXXXXXXXXX`) and remove the surrounding `<!--` and `-->` comment markers.

---

## 7. Building & Connecting `blankjeeba.com` (Spaceship)

Run this command to create the production static site in `dist/`:

```bash
npm run build
```

Upload the contents of `dist/` to any static host (Cloudflare Pages, Vercel, Netlify, GitHub Pages, or AI Studio deployment). Then connect your domain in **Spaceship**:

1. Log in to **Spaceship** -> **Domain Manager** -> select `blankjeeba.com` -> **DNS Records**.
2. Point the root domain (`@`) and `www`:
   - If your host gives you IP addresses (e.g., Vercel `76.76.21.21` or GitHub Pages IPs): add an **A** record with Host `@` pointing to that IP, and a **CNAME** record with Host `www` pointing to your host's target URL (e.g., `cname.vercel-dns.com` or `<your-project>.pages.dev`).
   - If your host supports ALIAS / CNAME flattening (such as Cloudflare Pages): point `@` and `www` to your host's `.pages.dev` address.
3. Make sure your host has **SPA fallback** enabled (`public/_redirects` is already included for Netlify/Cloudflare Pages) so refreshing `/videos` or `/hi/about` never shows a server 404.
4. Enable **HTTPS / SSL** in your hosting dashboard (Spaceship DNS propagates typically within 5–30 minutes).

---

## 8. Assets & Assumptions Made

- **Uploaded Assets Used**:
  - Header circular avatar & About portrait: `/assets/aistudio/1794411310079_50923635.jpg`
  - Hero front portrait (`hero-1`): `/assets/aistudio/1794411310217_099f3b84.jpg`
  - Hero secondary portrait (`hero-2`): `/assets/aistudio/1794411310176_718edf52.jpg`
  - Unedited footer logo (`BlankJeeba_logo.png`): `/assets/aistudio/BlankJeeba_logo_534dcdc9.png`
  - Favicon, Apple touch icon, manifest icons, and `public/og-image.png` generated from your uploaded J icon (`/assets/aistudio/BlankJeeba_icon_ec4022c9.png`), alongside a crisp vector `public/icon.svg`.
- **Assumptions**:
  - YouTube video titles load live in the browser via YouTube's public oEmbed endpoint with zero API key; if a network blocks oEmbed, cards fall back cleanly to any title in `src/content/site.ts` or `"Watch on YouTube"`.
  - Language switching (`/hi/...`) stores your visitor's preference in `localStorage` without forcing automatic redirects on direct URL visits so English and Hindi pages remain independently crawlable by search engines.
