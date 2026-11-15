# Restore & Deployment Guide — BlankJeeba (`blankjeeba.com`)

Use this guide if your original AI Studio project is deleted or if you want to restore, host, or move **blankjeeba.com** anywhere else.

---

## 1. Restoring Locally or Into a New Repository

1. Unzip `BlankJeeba_Complete_Website_Backup.zip`.
2. Open the extracted `BlankJeeba_Complete_Website_Backup/` folder.
3. Verify all folders and files are present (`index.html`, `package.json`, `src/`, `public/`).
4. Run:
   ```bash
   npm install
   npm run lint
   npm run build
   ```
5. The ready-to-host static website will be generated in `dist/`.

> **Important:** If you downloaded `BlankJeeba_Complete_Website_Backup.zip` from `public/`, make sure `public/BlankJeeba_Complete_Website_Backup.zip` is **not** inside your deployment `public/` folder before publishing to `blankjeeba.com` (this backup folder already excludes any ZIP files from `public/`).

---

## 2. Restoring Into a New Google AI Studio Project

1. Create a new blank React + Vite project in AI Studio (or upload the backup files into a GitHub repo and import it).
2. Copy `index.html`, `package.json`, `tsconfig.json`, `vite.config.ts`, `metadata.json`, `src/`, and `public/` into the new workspace.
3. If needed, provide `AI_REBUILD_PROMPT.md` alongside the backup files to any AI coding assistant.

---

## 3. Hosting on Static Providers (Free & Fast)

Because BlankJeeba is a 100% static single-page React app (`dist/`), you can deploy it directly to:

- **Cloudflare Pages**:
  - Build command: `npm run build`
  - Build output directory: `dist`
  - SPA fallback is handled automatically by `public/_redirects` (`/* /index.html 200`).
- **Vercel**:
  - Framework preset: `Vite`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Add a `vercel.json` with `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` so refreshing `/videos` or `/hi/about` never returns a server 404.
- **Netlify**:
  - Build command: `npm run build`
  - Publish directory: `dist`
  - `public/_redirects` handles SPA routing automatically.

---

## 4. Connecting `blankjeeba.com` on Spaceship

1. Log in to **Spaceship** -> **Domain Manager** -> select `blankjeeba.com` -> **DNS Records**.
2. Point your domain to your chosen host:
   - **Cloudflare Pages**: Add CNAME / ALIAS records for `@` and `www` pointing to `<your-project>.pages.dev` (or switch nameservers to Cloudflare).
   - **Vercel**: Add an `A` record for `@` (`76.76.21.21`) and a `CNAME` record for `www` (`cname.vercel-dns.com`).
3. Enable automatic **HTTPS / SSL** in your hosting dashboard. DNS propagation usually completes within 5–30 minutes.
