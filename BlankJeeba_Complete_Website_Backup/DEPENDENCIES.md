# Dependencies & External Services — BlankJeeba Website

## 1. Runtime Dependencies (`package.json`)

| Package | Version | Role in This Project |
| :--- | :--- | :--- |
| `react` | `^19.0.1` | Core UI library |
| `react-dom` | `^19.0.1` | React DOM renderer (`createRoot`) |
| `react-router-dom` | `^7.18.5` | Client-side routing for English (`/`), Hindi (`/hi/...`), Vision, Personal, and 404 routes |
| `react-helmet-async` | `^3.1.0` | Dynamic per-route `<title>`, `<meta>`, `canonical`, `hreflang`, and `noindex` management |
| `motion` | `^12.23.24` | Framer Motion v12 animations (hero parallax, scroll reveals, spring cards, loading splash) |
| `lucide-react` | `^0.546.0` | UI & feature icons (navigation, theme toggle, video play/external links, Vision/Philosophy cards) |
| `react-icons` | `^5.7.0` | Official brand social icons (`react-icons/si` + `FaLinkedin` from `react-icons/fa6`) |
| `@tailwindcss/vite` | `^4.3.3` | Tailwind CSS v4 Vite plugin |
| `@vitejs/plugin-react` | `^6.1.1` | Vite React fast-refresh & JSX transform plugin |
| `vite` | `^8.3.0` | Development server & production static bundler (`dist/`) |
| `@google/genai` | `^2.4.0` | Installed in default AI Studio template (not imported by the static BlankJeeba frontend) |
| `express` | `^4.21.2` | Installed in default AI Studio template (not required; app is static-first) |
| `dotenv` | `^17.2.3` | Installed in default AI Studio template (not required at runtime) |

---

## 2. Development Dependencies (`package.json`)

| Package | Version | Role |
| :--- | :--- | :--- |
| `typescript` | `^7.0.2` | Type checking (`tsc --noEmit`) |
| `@types/react` | `^19.3.0` | TypeScript types for React 19 |
| `@types/react-dom` | `^19.3.0` | TypeScript types for ReactDOM 19 |
| `@types/node` | `^22.14.0` | Node types used by `vite.config.ts` |
| `@types/express` | `^4.17.21` | Express types from base template |
| `tailwindcss` | `^4.3.3` | Tailwind CSS core |
| `autoprefixer` | `^10.4.21` | CSS vendor prefixing |
| `esbuild` | `^0.25.0` | Fast JS/TS bundler used by tooling |
| `tsx` | `^4.21.0` | TypeScript execution utility from base template |

---

## 3. External Services & Public Endpoints (No API Keys Required)

1. **Google Fonts (`fonts.googleapis.com` / `fonts.gstatic.com`)**:
   - Loads `Poppins` (`400`, `500`, `600`, `700`) for headings/wordmark and `Inter` (`400`, `500`, `600`, `700`) for body prose with `display=swap` (includes Devanagari support).
2. **YouTube Thumbnails (`i.ytimg.com`)**:
   - Loads `https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg` inside video preview facades before user click.
3. **YouTube oEmbed (`https://www.youtube.com/oembed`)**:
   - Optional client-side lookup for real video titles (`?url=...&format=json`); fails gracefully to config `title` or `"Watch on YouTube"` if blocked.
4. **YouTube Privacy-Enhanced Embeds (`www.youtube-nocookie.com` & `www.youtube.com/embed/videoseries`)**:
   - Video cards load `youtube-nocookie.com/embed/<ID>?autoplay=1&rel=0` on click; `/videos` embeds the live playlist `PLWHRjcOaoWBkSIvA7QZkW_BnlWVjOFLpl`.
5. **Optional Analytics / Verification (`index.html`, commented out)**:
   - Commented placeholders ready for **Google Analytics 4 (`gtag.js`)** and **Google Search Console** meta verification.
