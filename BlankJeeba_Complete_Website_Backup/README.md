# BlankJeeba (`blankjeeba.com`) — Complete Website Backup & Overview

**BlankJeeba** (*"Simplify Everything"*) is the official creator website of **Jitendra Ahirwar**—an AI and technology creator sharing simple video tutorials, vision initiatives, philosophy, and social channels in **English (`/`)** and **Hindi (`/hi/...`)**.

This folder (`BlankJeeba_Complete_Website_Backup/`) is a complete, standalone, front-end-only React + TypeScript + Vite backup of the live project. It requires **no backend server, no database, and no private API keys** to install, run, or deploy.

---

## Key Features Preserved in This Backup

- **Three Separated Identity Elements**:
  1. **Personal Identity**: Jitendra Ahirwar's circular profile portrait preserved on the left side of the sticky header (`/assets/aistudio/1794411310079_50923635.jpg`).
  2. **Brand Symbol**: Official purple J symbol (`/j-symbol.svg`, extracted from `BlankJeeba_logo_5893802c.svg`) used on the animated loading screen, footer branding, mobile navigation header, and selected section headings.
  3. **Theme-Aware Wordmark**: Poppins `BlankJeeba` wordmark (`Blank` in `#F3F4F8` dark / `#0F172A` light, `Jeeba` in `#4F46E5`) with zero unnecessary box wrappers.
- **Dual Color Themes**: Dark premium default (`#0A0C14`) and high-contrast Light mode (`#F8FAFC`), switchable from the header and persisted in `localStorage`.
- **Bilingual Routing (`EN | हिं`)**: English routes at `/` and Hindi routes at `/hi/...` with `hreflang`, canonical tags, and `localStorage` language preference memory without forced redirects.
- **Animated Brand Loading Screen**: Lightweight transform/opacity splash screen featuring the purple J symbol and wordmark on initial load, respecting `prefers-reduced-motion` with a fail-safe exit timer.
- **Resilient YouTube Media**:
  - 5 newest-first featured videos using click-to-load `youtube-nocookie.com` embeds and `hqdefault.jpg` thumbnails.
  - Client-side YouTube oEmbed title lookup with automatic fallback to config titles or `"Watch on YouTube"`.
  - Live auto-updating playlist embed (`PLWHRjcOaoWBkSIvA7QZkW_BnlWVjOFLpl`) on `/videos`.
- **Single-File Content Editing**: Almost all bilingual copy, videos, playlist settings, social URLs, Vision routes, Personal routes, and optional `achievements` live in `src/content/site.ts`.
- **Production SEO Ready**: Static `public/sitemap.xml`, `public/robots.txt`, `public/site.webmanifest`, `public/og-image.png` (`1200×630`), SVG + `16×16`/`32×32`/`48×48`/`180×180`/`192×192`/`512×512` favicons, and `WebSite` + `Person` JSON-LD in `index.html`.

---

## Documentation Included

| File | Purpose |
| :--- | :--- |
| `README.md` | Project overview & quick owner guide |
| `INSTALLATION_GUIDE.md` | How to install dependencies and run locally |
| `RESTORE_GUIDE.md` | How to restore, deploy, and connect `blankjeeba.com` (Spaceship) |
| `PROJECT_STRUCTURE.md` | Detailed map of every directory and source file |
| `DEPENDENCIES.md` | Installed npm packages and external runtime services |
| `ENVIRONMENT_SETUP.md` | Environment variables (`.env.example`) & analytics setup |
| `AI_REBUILD_PROMPT.md` | Full prompt for another AI or developer to rebuild this exact site |
| `BACKUP_MANIFEST.md` | Complete inventory of every exported file, byte size, and exclusions |

---

## Quick Owner Guide: Editing `src/content/site.ts`

1. **Add a new featured YouTube video**: Paste the 11-character video ID at the **top** of `featuredVideos` in `src/content/site.ts`.
2. **Update social links**: Edit `social.showcase` (4 showcase buttons) or `social.otherPlaces` (9 secondary platforms) in `src/content/site.ts`.
3. **Launch a Coming Soon page**: Update copy in `vision.items` (or `personalPages`), switch `indexable: false` to `indexable: true`, and add the URL to `public/sitemap.xml`.
4. **Show Achievements on `/about`**: Add entries to `about.achievements` in `src/content/site.ts`; the section stays hidden while empty.
