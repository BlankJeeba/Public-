# Project Structure — BlankJeeba Website

```text
BlankJeeba_Complete_Website_Backup/
├── .env.example                 # Template of optional environment variables (no secrets)
├── .gitignore                   # Git ignore rules (node_modules, dist, .env*)
├── bun.lock                     # Locked dependency tree (Bun)
├── index.html                   # HTML shell, Google Fonts, favicons, OG/Twitter tags, JSON-LD, GA4/GSC slots
├── metadata.json                # AI Studio applet metadata
├── package.json                 # Dependencies & scripts (dev, build, preview, lint, clean)
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite + React + Tailwind v4 configuration
│
├── public/                      # Static files copied verbatim into dist/
│   ├── _redirects               # SPA fallback rule (/* /index.html 200) for Netlify/Cloudflare Pages
│   ├── apple-touch-icon.png     # 180x180 Apple touch icon
│   ├── favicon-16x16.png        # 16x16 PNG favicon
│   ├── favicon-32x32.png        # 32x32 PNG favicon
│   ├── favicon.ico              # Multi-size ICO favicon (16/32/48)
│   ├── icon-48.png              # 48x48 PNG favicon (Google Search requirement)
│   ├── icon-192.png             # 192x192 PWA manifest icon
│   ├── icon-512.png             # 512x512 PWA manifest icon
│   ├── icon.svg                 # Scalable vector J favicon using official SVG paths
│   ├── j-symbol.svg             # Official purple J brand symbol (transparent background)
│   ├── og-image.png             # 1200x630 Open Graph / Twitter share card
│   ├── robots.txt               # Search crawler rules pointing to sitemap.xml
│   ├── site.webmanifest         # Web app manifest for BlankJeeba
│   ├── sitemap.xml              # Indexable EN & HI URLs with hreflang alternates
│   └── assets/aistudio/         # Uploaded original photos, logos, and reference screenshots
│
└── src/                         # Application source code
    ├── App.tsx                  # Root router, HelmetProvider, ThemeProvider, LanguageProvider, LoadingScreen
    ├── index.css                # Tailwind v4 setup, @custom-variant dark, light/dark CSS tokens, grain & marquee
    ├── main.tsx                 # React 19 root mount
    │
    ├── content/
    │   └── site.ts              # Single source of truth for all EN/HI copy, videos, playlist, vision, social links
    │
    ├── context/
    │   ├── LanguageContext.tsx  # Bilingual EN (/) and HI (/hi/*) state + localStorage persistence
    │   └── ThemeContext.tsx     # Dark/Light theme switcher + localStorage persistence
    │
    ├── components/
    │   ├── BrandIcons.tsx       # Lucide icon mappers for Vision, Philosophy, and Beyond AI sections
    │   ├── BrandMark.tsx        # Official BrandSymbol (j-symbol.svg) & theme-aware BrandWordmark
    │   ├── Footer.tsx           # Footer with J symbol + wordmark, tagline, 4 showcase icons, language toggle
    │   ├── Header.tsx           # Sticky header: circular profile photo + wordmark, nav links, theme & lang switches
    │   ├── LoadingScreen.tsx    # Initial animated J-symbol splash screen with reduced-motion & failsafe timer
    │   ├── MotionPrimitives.tsx # Reusable Motion scroll reveal & spring stagger helpers
    │   ├── PageHead.tsx         # Per-route SEO meta tags, canonicals, hreflang, and noindex via react-helmet-async
    │   ├── SocialIcons.tsx      # Brand icons (react-icons) with brand-colored hover, tooltips, and marquee strip
    │   └── YouTubeEmbed.tsx     # Click-to-load youtube-nocookie facades + resilient oEmbed + live playlist embed
    │
    └── pages/
        ├── AboutPage.tsx        # Bio, portfolio portrait, full 6 beliefs, Beyond AI, optional achievements, all links
        ├── ComingSoonPage.tsx   # Config-driven noindex template for 6 Vision pages & 4 personal pages
        ├── ContactPage.tsx      # Email mailto + one-click copy-to-clipboard + social icons (no form)
        ├── HomePage.tsx         # Hero with dual staggered portraits, featured videos, 3x2 Vision grid, beliefs, social
        ├── NotFoundPage.tsx     # Branded 404 page with noindex and return-home button
        └── VideosPage.tsx       # 5 newest-first featured videos + live YouTube playlist embed
```
