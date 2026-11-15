# AI Rebuild Prompt — BlankJeeba (`blankjeeba.com`)

Copy and paste this prompt (together with the backed-up `public/assets/` images and `src/content/site.ts`) into any AI coding assistant or website builder to recreate the exact **BlankJeeba** website from scratch.

---

Build the production React + TypeScript + Vite + Tailwind CSS website for **BlankJeeba** (`blankjeeba.com`), owned by **Jitendra Ahirwar**, around the tagline **"Simplify Everything"**. Keep it 100% front-end static (`vite build` -> `dist/`), with no backend, no database, no login, no fake statistics, and no stock photos.

### 1. Brand Identity Separation (Strict)
Maintain three distinct visual elements:
1. **Personal Identity**: Jitendra Ahirwar's circular profile photo (`/assets/aistudio/1794411310079_50923635.jpg`) preserved on the left side of the sticky header. Never replace it with the J symbol or crop/distort it.
2. **Brand Symbol**: The official purple J-with-gap symbol (`/j-symbol.svg`, `#4F46E5`, extracted directly from `BlankJeeba_logo_5893802c.svg`). Use it on the animated loading screen, footer branding, mobile menu drawer header, and selected headings (*My Vision*, *Videos & Tutorials*, *What I believe*, *404*).
3. **Wordmark**: Theme-aware **BlankJeeba** typography in **Poppins** (`"Blank"` weight `400` in `#F3F4F8` dark mode / `#0F172A` light mode; `"Jeeba"` weight `700` in `#4F46E5`) with no unnecessary white rounded box.

### 2. Design System & Dual Themes
- **Dark Mode (Default)**: Canvas `#0A0C14`, surface `#11141F`, hairline border `rgba(255,255,255,0.08)`, primary ink `#F3F4F8`, muted ink `#9AA0B4`, brand indigo `#4F46E5`, tint `#8B84FF`.
- **Light Mode**: Canvas `#F8FAFC`, surface `#FFFFFF`, hairline border `rgba(15,23,42,0.09)`, primary ink `#0F172A`, muted ink `#475569`, brand indigo `#4F46E5`.
- Configure Tailwind v4 `@custom-variant dark (&:where(.dark, .dark *));` and pre-paint theme initialization in `index.html`, with a Sun/Moon toggle in the header.
- Typography: **Poppins** for headings, **Inter** for body (`display=swap`), subtle film-grain overlay, subtle indigo radial glow behind hero, `prefers-reduced-motion` compliance.

### 3. Pages, Bilingual Routing & Features
- **Bilingual Routes**: English default at `/` and Hindi (Devanagari, keeping brand/tech terms in English) at `/hi/...` with an `EN | हिं` switcher stored in `localStorage` (no forced redirects).
- **Header**: Profile photo + BlankJeeba wordmark, single-line links (`Home`, `Videos`, `About`, `Contact`), theme toggle, `EN | हिं` switch, and responsive mobile drawer with J symbol branding.
- **Animated Loading Screen**: Shows once on initial page load with fade-in, scale-up, and gentle float/tilt on `/j-symbol.svg`, reveals `BlankJeeba` beneath it, respects `prefers-reduced-motion`, and uses a strict fail-safe timeout so it never blocks.
- **Home (`/`, `/hi`)**:
  - Hero: `"BlankJeeba"`, `"Simplify Everything"`, `"Making AI and tech simple, one video at a time."`, two CTAs (*Subscribe on YouTube* with `?sub_confirmation=1` and *Follow on Instagram*), and a staggered non-overlapping side-by-side dual-portrait composition (`hero-1`: `1794411310217_099f3b84.jpg`, `hero-2`: `1794411310176_718edf52.jpg`) with scroll parallax and gentle float. Do NOT call Jitendra a "teacher" in the hero.
  - Featured Videos: 5 newest-first IDs (`FI202Yv8Bh0`, `8fLK5sGqG1A`, `GSGk6on0Zs4`, `WQXNViIcq0o`, `GEGLV95Ps7w`) using click-to-load `youtube-nocookie.com` facades, `hqdefault.jpg` thumbnails, and resilient client-side YouTube oEmbed title fetching with config/label fallbacks.
  - My Vision: Vision statement + balanced 3×2 spring-animated grid linking to `/youtube`, `/photo-download`, `/ai-assistant`, `/project-jeeba`, `/project-dream`, `/project-qr`.
  - What I Believe: 3 preview philosophy cards (never attributed to any named person) linking to `/about`.
  - Find Me Online: Exactly 4 large icon-only buttons (`X`, `Instagram`, `Facebook`, `WhatsApp Channel`) with tooltips, `aria-label`s, brand hover colors, and `"More places"` link to `/about`.
- **Videos (`/videos`, `/hi/videos`)**: Featured 5 videos followed at the end by the live playlist embed (`PLWHRjcOaoWBkSIvA7QZkW_BnlWVjOFLpl`) and `"View full playlist on YouTube"` button.
- **About (`/about`, `/hi/about`)**: Portfolio photo (`1794411310079_50923635.jpg`), bio (9 years tech, 2+ years AI, 1000+ online & 200+ offline English teaching, photography, travel, films), full 6-card philosophy grid, *Beyond AI* 4-card section, hidden `achievements` hook, and *All my links* (4 showcase icons + 9 *Other places* icons + marquee).
- **Contact (`/contact`, `/hi/contact`)**: `jitendra@blankjeeba.com` (`mailto:` + copy-to-clipboard button) and social icons. No contact form.
- **Coming Soon & Personal Pages**: Reusable config-driven `noindex` template for the 6 Vision routes and 4 hidden personal routes (`/lab`, `/notes`, `/ideas`, `/playground`), plus a branded `404` page.
- **Single-File Config & SEO**: Keep all editable content in `src/content/site.ts`. Include `public/sitemap.xml` (indexable pages + `hreflang`), `public/robots.txt`, `public/site.webmanifest`, `public/og-image.png`, SVG + 16/32/48/180/192/512 PNG favicons, JSON-LD (`WebSite` & `Person`), and commented GA4/GSC slots in `index.html`.
