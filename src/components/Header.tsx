import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { SITE_CONFIG } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { BrandSymbol, BrandWordmark } from './BrandMark';

export function Header() {
  const { lang, t, localePath, switchLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { key: 'home', path: '/', label: t(SITE_CONFIG.nav.home), end: true },
    { key: 'videos', path: '/videos', label: t(SITE_CONFIG.nav.videos), end: false },
    { key: 'about', path: '/about', label: t(SITE_CONFIG.nav.about), end: false },
    { key: 'contact', path: '/contact', label: t(SITE_CONFIG.nav.contact), end: false },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-[#F8FAFC]/85 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#0A0C14]/80 transition-colors duration-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:gap-8 sm:px-6">
        {/* Zone 1: Personal profile picture (preserved) + theme-aware BlankJeeba wordmark */}
        <Link
          to={localePath('/')}
          onClick={() => setMobileOpen(false)}
          className="group flex shrink-0 items-center gap-3 whitespace-nowrap"
          aria-label="BlankJeeba Home"
        >
          <img
            src={SITE_CONFIG.assets.headerAvatar}
            alt="Jitendra Ahirwar"
            width={38}
            height={38}
            className="h-9 w-9 shrink-0 rounded-full object-cover object-top ring-1 ring-slate-900/15 dark:ring-white/20 shadow-sm transition-transform duration-200 group-hover:scale-105"
          />
          <BrandWordmark size="md" />
        </Link>

        {/* Zone 2: Desktop single-line navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 md:flex"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={localePath(item.path)}
              end={item.end}
              className={({ isActive }) =>
                `relative whitespace-nowrap shrink-0 py-1 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-[#0F172A] dark:text-[#F3F4F8]'
                    : 'text-[#475569] hover:text-[#0F172A] dark:text-[#9AA0B4] dark:hover:text-[#F3F4F8]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full bg-[#4F46E5] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Theme switcher + Language switch (EN | हिं) + Mobile menu button */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-slate-900/10 bg-white text-[#475569] transition-colors hover:border-[#4F46E5]/40 hover:text-[#0F172A] dark:border-white/[0.08] dark:bg-[#11141F] dark:text-[#9AA0B4] dark:hover:border-white/20 dark:hover:text-[#F3F4F8]"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          <div
            role="group"
            aria-label="Language switch"
            className="inline-flex items-center rounded-lg border border-slate-900/10 bg-white p-0.5 text-xs font-medium dark:border-white/[0.08] dark:bg-[#11141F]"
          >
            <button
              type="button"
              onClick={() => switchLanguage('en')}
              aria-pressed={lang === 'en'}
              className={`whitespace-nowrap shrink-0 cursor-pointer rounded-md px-2.5 py-1 transition-colors duration-150 ${
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
              className={`whitespace-nowrap shrink-0 cursor-pointer rounded-md px-2.5 py-1 transition-colors duration-150 ${
                lang === 'hi'
                  ? 'bg-[#4F46E5] text-white'
                  : 'text-[#475569] hover:text-[#0F172A] dark:text-[#9AA0B4] dark:hover:text-[#F3F4F8]'
              }`}
            >
              हिं
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-900/10 bg-white text-[#0F172A] transition-colors hover:border-slate-900/20 dark:border-white/[0.08] dark:bg-[#11141F] dark:text-[#F3F4F8] dark:hover:border-white/20 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer featuring official BlankJeeba J brand symbol */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-slate-900/10 bg-[#F8FAFC]/95 px-4 py-4 dark:border-white/[0.08] dark:bg-[#0A0C14]/95 md:hidden"
        >
          <div className="mb-3 flex items-center gap-2.5 border-b border-slate-900/10 pb-3 dark:border-white/[0.06]">
            <BrandSymbol size={24} className="h-6 w-6" decorative />
            <BrandWordmark size="sm" />
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.key}
                to={localePath(item.path)}
                end={item.end}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-[44px] items-center rounded-lg px-3 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-200/70 text-[#0F172A] dark:bg-[#11141F] dark:text-[#F3F4F8]'
                      : 'text-[#475569] hover:bg-slate-200/50 hover:text-[#0F172A] dark:text-[#9AA0B4] dark:hover:bg-[#11141F]/60 dark:hover:text-[#F3F4F8]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
