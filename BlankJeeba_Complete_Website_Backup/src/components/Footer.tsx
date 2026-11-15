import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { BrandSymbol, BrandWordmark } from './BrandMark';
import { SocialIconRow } from './SocialIcons';

export function Footer() {
  const { lang, t, localePath, switchLanguage } = useLanguage();

  return (
    <footer className="border-t border-slate-900/10 bg-[#F8FAFC] dark:border-white/[0.08] dark:bg-[#0A0C14] transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Official purple J symbol + theme-aware BlankJeeba wordmark (no white box) */}
          <div className="flex flex-col items-start gap-2.5">
            <Link
              to={localePath('/')}
              aria-label="BlankJeeba Home"
              className="group inline-flex items-center gap-3 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <BrandSymbol
                size={34}
                className="h-8 w-8 transition-transform duration-200 group-hover:scale-105"
                decorative
              />
              <BrandWordmark size="lg" />
            </Link>
            <p className="text-sm text-[#475569] dark:text-[#9AA0B4]">
              {t(SITE_CONFIG.brand.tagline)}
            </p>
          </div>

          {/* Showcase social icons (only the 4 main icons) */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <SocialIconRow items={SITE_CONFIG.social.showcase} size="md" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-900/10 pt-6 text-xs text-[#475569] dark:border-white/[0.06] dark:text-[#9AA0B4] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>
              © {SITE_CONFIG.brand.copyrightYear} {SITE_CONFIG.brand.name} ·{' '}
              {SITE_CONFIG.brand.owner}
            </span>
            <span aria-hidden="true">·</span>
            <Link
              to={localePath('/about')}
              className="transition-colors hover:text-[#0F172A] dark:hover:text-[#F3F4F8]"
            >
              {t(SITE_CONFIG.nav.about)}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              to={localePath('/videos')}
              className="transition-colors hover:text-[#0F172A] dark:hover:text-[#F3F4F8]"
            >
              {t(SITE_CONFIG.nav.videos)}
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              to={localePath('/contact')}
              className="transition-colors hover:text-[#0F172A] dark:hover:text-[#F3F4F8]"
            >
              {t(SITE_CONFIG.nav.contact)}
            </Link>
          </div>

          {/* Footer language switch */}
          <div
            role="group"
            aria-label="Footer language switch"
            className="inline-flex items-center rounded-lg border border-slate-900/10 bg-white p-0.5 text-xs font-medium dark:border-white/[0.08] dark:bg-[#11141F]"
          >
            <button
              type="button"
              onClick={() => switchLanguage('en')}
              aria-pressed={lang === 'en'}
              className={`whitespace-nowrap shrink-0 cursor-pointer rounded-md px-2.5 py-1 transition-colors ${
                lang === 'en'
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#475569] hover:text-[#0F172A] dark:text-[#9AA0B4] dark:hover:text-[#F3F4F8]'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => switchLanguage('hi')}
              aria-pressed={lang === 'hi'}
              className={`whitespace-nowrap shrink-0 cursor-pointer rounded-md px-2.5 py-1 transition-colors ${
                lang === 'hi'
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#475569] hover:text-[#0F172A] dark:text-[#9AA0B4] dark:hover:text-[#F3F4F8]'
              }`}
            >
              हिं
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
