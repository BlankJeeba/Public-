import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  Lock,
  Moon,
  RotateCw,
  Search,
  Sun,
} from 'lucide-react';
import {
  SiFacebook,
  SiInstagram,
  SiTelegram,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import { PageHead } from '../components/PageHead';
import { ME_TABS, type MeLinkItem, type MeTabId } from '../data/meLinks';
import type { SocialPlatformId } from '../content/site';

type MeTheme = 'light' | 'dark';

const ME_THEME_STORAGE_KEY = 'blankjeeba_me_theme';

const SOCIAL_ICON_MAP: Partial<
  Record<SocialPlatformId, React.ComponentType<{ className?: string }>>
> = {
  instagram: SiInstagram,
  x: SiX,
  facebook: SiFacebook,
  telegram: SiTelegram,
  whatsapp: SiWhatsapp,
  youtube: SiYoutube,
};

const SOCIAL_COLOR_MAP: Partial<Record<SocialPlatformId, string>> = {
  instagram: 'text-[#E4405F]',
  x: 'text-[var(--me-text)]',
  facebook: 'text-[#1877F2]',
  telegram: 'text-[#26A5E4]',
  whatsapp: 'text-[#25D366]',
  youtube: 'text-[#FF0000]',
};

function readSavedMeTheme(): MeTheme | null {
  try {
    const saved = window.localStorage.getItem(ME_THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return null;
  } catch {
    return null;
  }
}

function writeSavedMeTheme(theme: MeTheme): void {
  try {
    window.localStorage.setItem(ME_THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors if blocked or unavailable
  }
}

function getDeviceTheme(): MeTheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return '';
  }
}

function resolveSearchOrUrl(rawInput: string): string | null {
  const trimmed = rawInput.trim();
  if (!trimmed) return null;

  const looksLikeUrl = !/\s/.test(trimmed) && trimmed.includes('.');
  if (looksLikeUrl) {
    const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    try {
      const parsed = new URL(candidate);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        return parsed.href;
      }
    } catch {
      // Fall through to Google search if URL parsing fails
    }
  }

  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
}

function openExternalInNewTab(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

function MeLinkTile({ item }: { item: MeLinkItem }) {
  const [logoFailed, setLogoFailed] = useState(false);

  const SocialIcon = item.socialId ? SOCIAL_ICON_MAP[item.socialId] : undefined;
  const domain = item.faviconDomain || extractDomain(item.url);
  const faviconUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`
    : '';

  const fallbackLetter = item.name.trim().charAt(0).toUpperCase() || '?';
  const socialColorClass = item.socialId
    ? SOCIAL_COLOR_MAP[item.socialId] ?? 'text-[var(--me-accent)]'
    : '';

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex min-h-[44px] min-w-0 flex-col items-center gap-2 rounded-xl p-1 text-center transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--me-accent)]"
    >
      <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[12px] border border-[var(--me-border)] bg-[var(--me-surface)] transition-colors duration-200 group-hover:border-[var(--me-accent)]">
        {SocialIcon ? (
          <span
            className={`inline-flex items-center justify-center text-[22px] ${socialColorClass}`}
          >
            <SocialIcon />
          </span>
        ) : faviconUrl && !logoFailed ? (
          <img
            src={faviconUrl}
            alt=""
            width={28}
            height={28}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setLogoFailed(true)}
            onLoad={(event) => {
              if (event.currentTarget.naturalWidth === 0) {
                setLogoFailed(true);
              }
            }}
            className="h-[28px] w-[28px] object-contain"
          />
        ) : (
          <span className="text-base font-semibold text-[var(--me-accent)]">
            {fallbackLetter}
          </span>
        )}
      </span>

      <span className="line-clamp-2 w-full break-words text-[12px] font-medium leading-[1.3] text-[var(--me-text)]">
        {item.name}
      </span>
    </a>
  );
}

export default function Page6() {
  // Independent theme state for /me (device preference first, saved choice overrides)
  const [savedTheme, setSavedTheme] = useState<MeTheme | null>(() => readSavedMeTheme());
  const [deviceTheme, setDeviceTheme] = useState<MeTheme>(() => getDeviceTheme());
  const activeTheme: MeTheme = savedTheme ?? deviceTheme;

  // In-page browser tab history stack
  const [tabHistory, setTabHistory] = useState<MeTabId[]>(['home']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const tabButtonRefs = useRef<Partial<Record<MeTabId, HTMLButtonElement | null>>>({});

  const activeTabId = tabHistory[historyIndex] ?? 'home';
  const activeTab = useMemo(
    () => ME_TABS.find((tab) => tab.id === activeTabId) ?? ME_TABS[0],
    [activeTabId]
  );

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < tabHistory.length - 1;

  // Follow device prefers-color-scheme changes automatically while no choice is saved
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setDeviceTheme(event.matches ? 'dark' : 'light');
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  // Keep the active tab scrolled into view in the horizontal tab bar
  useEffect(() => {
    const activeButton = tabButtonRefs.current[activeTabId];
    if (activeButton && typeof activeButton.scrollIntoView === 'function') {
      activeButton.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [activeTabId]);

  const handleSelectTab = (tabId: MeTabId) => {
    if (tabId === activeTabId) return;
    const nextHistory = [...tabHistory.slice(0, historyIndex + 1), tabId];
    setTabHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleBack = () => {
    if (canGoBack) {
      setHistoryIndex((prev) => prev - 1);
    }
  };

  const handleForward = () => {
    if (canGoForward) {
      setHistoryIndex((prev) => prev + 1);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleToggleTheme = () => {
    const nextTheme: MeTheme = activeTheme === 'dark' ? 'light' : 'dark';
    setSavedTheme(nextTheme);
    writeSavedMeTheme(nextTheme);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const targetUrl = resolveSearchOrUrl(searchQuery);
    if (!targetUrl) return;
    openExternalInNewTab(targetUrl);
  };

  return (
    <>
      <PageHead
        title="Me | BlankJeeba"
        description="Personal browser-style start page and link hub on BlankJeeba."
        indexable={false}
        canonicalBasePath="/me"
      />

      <div
        data-me-theme={activeTheme}
        className="me-browser-theme min-h-screen w-full overflow-x-clip bg-[var(--me-bg)] text-[var(--me-text)] transition-colors duration-200 md:px-6 md:py-8"
      >
        <div className="mx-auto flex min-h-screen w-full max-w-[960px] flex-col bg-[var(--me-bg)] transition-colors duration-200 md:min-h-[calc(100vh-4rem)] md:overflow-hidden md:rounded-2xl md:border md:border-[var(--me-border)]">
          {/* 1. Browser Tab Bar */}
          <div className="me-no-scrollbar overflow-x-auto bg-[var(--me-tabbar)] transition-colors duration-200">
            <div
              role="tablist"
              aria-label="Categories"
              className="relative flex min-w-full w-max items-end gap-1 px-2 pt-2"
            >
              {/* Bottom hairline behind inactive tabs; active tab covers it seamlessly */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-[var(--me-border)]"
              />
              {ME_TABS.map((tab) => {
                const isActive = tab.id === activeTab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabButtonRefs.current[tab.id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`me-tab-${tab.id}`}
                    aria-selected={isActive}
                    aria-controls={`me-panel-${tab.id}`}
                    onClick={() => handleSelectTab(tab.id)}
                    className={`relative min-h-[44px] shrink-0 cursor-pointer whitespace-nowrap rounded-t-[10px] px-3.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--me-accent)] sm:px-4 sm:text-sm ${
                      isActive
                        ? 'z-10 border-l border-r border-t border-[var(--me-border)] bg-[var(--me-bg)] text-[var(--me-text)]'
                        : 'z-0 border border-transparent text-[var(--me-muted)] hover:text-[var(--me-text)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Browser Address Bar */}
          <div className="flex items-center gap-1 border-b border-[var(--me-border)] bg-[var(--me-bg)] px-2 py-2 transition-colors duration-200 sm:gap-1.5 sm:px-3">
            {/* Back */}
            <button
              type="button"
              onClick={handleBack}
              disabled={!canGoBack}
              aria-label="Back to previous tab"
              title="Back"
              className="inline-flex h-11 min-w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--me-text)] transition-colors duration-200 hover:bg-[var(--me-tabbar)] disabled:cursor-not-allowed disabled:opacity-35 sm:w-11"
            >
              <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>

            {/* Forward */}
            <button
              type="button"
              onClick={handleForward}
              disabled={!canGoForward}
              aria-label="Forward to next tab"
              title="Forward"
              className="inline-flex h-11 min-w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--me-text)] transition-colors duration-200 hover:bg-[var(--me-tabbar)] disabled:cursor-not-allowed disabled:opacity-35 sm:w-11"
            >
              <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>

            {/* Refresh */}
            <button
              type="button"
              onClick={handleRefresh}
              aria-label="Refresh page"
              title="Refresh"
              className="inline-flex h-11 min-w-[36px] shrink-0 cursor-pointer items-center justify-center rounded-lg text-[var(--me-text)] transition-colors duration-200 hover:bg-[var(--me-tabbar)] sm:w-11"
            >
              <RotateCw className="h-[17px] w-[17px]" aria-hidden="true" />
            </button>

            {/* Non-editable Address Field */}
            <div
              aria-label="Page address blankjeeba.com/me"
              className="flex h-[38px] min-w-0 flex-1 items-center gap-2 rounded-full border border-[var(--me-border)] bg-[var(--me-surface)] px-3.5 text-[13px] text-[var(--me-text)] transition-colors duration-200 sm:text-sm"
            >
              <Lock
                className="h-3.5 w-3.5 shrink-0 text-[var(--me-accent)]"
                aria-hidden="true"
              />
              <span className="truncate font-medium">blankjeeba.com/me</span>
            </div>

            {/* Website Home Button */}
            <Link
              to="/"
              aria-label="Go to BlankJeeba Home"
              title="BlankJeeba Home"
              className="inline-flex h-11 min-w-[36px] shrink-0 items-center justify-center rounded-lg text-[var(--me-text)] transition-colors duration-200 hover:bg-[var(--me-tabbar)] sm:w-11"
            >
              <Home className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>

            {/* Light / Dark Mode Toggle (34px round visual inside 44px tap hitbox) */}
            <button
              type="button"
              onClick={handleToggleTheme}
              aria-label="Switch light and dark mode"
              title="Switch light and dark mode"
              className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--me-accent)]"
            >
              <span className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[var(--me-border)] bg-[var(--me-surface)] text-[var(--me-accent)] transition-colors duration-200 hover:border-[var(--me-accent)]">
                {activeTheme === 'dark' ? (
                  <Sun className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Moon className="h-4 w-4" aria-hidden="true" />
                )}
              </span>
            </button>
          </div>

          {/* 3. Tab Content Area */}
          <div
            role="tabpanel"
            id={`me-panel-${activeTab.id}`}
            aria-labelledby={`me-tab-${activeTab.id}`}
            className="flex-1 bg-[var(--me-bg)] px-4 py-6 transition-colors duration-200 sm:px-6 sm:py-8"
          >
            {/* Home Tab Centered Search Box */}
            {activeTab.id === 'home' && (
              <form
                onSubmit={handleSearchSubmit}
                role="search"
                className="mx-auto mb-8 max-w-lg"
              >
                <div className="flex items-center rounded-full border border-[var(--me-border)] bg-[var(--me-surface)] pl-4 pr-1.5 transition-colors duration-200 focus-within:border-[var(--me-accent)]">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search Google or enter a web address"
                    aria-label="Search Google or enter a web address"
                    autoComplete="off"
                    className="min-h-[48px] w-full min-w-0 bg-transparent text-base text-[var(--me-text)] placeholder:text-[var(--me-muted)] focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search"
                    className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full text-[var(--me-accent)] transition-colors duration-200 hover:bg-[var(--me-tabbar)]"
                  >
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}

            {/* Link Sections & Responsive Icon Grids */}
            <div className="space-y-7">
              {activeTab.sections.map((section, sectionIndex) => (
                <section key={`${activeTab.id}-${section.title ?? sectionIndex}`}>
                  {section.title && (
                    <h2 className="mb-3.5 text-xs font-medium tracking-wide text-[var(--me-muted)]">
                      {section.title}
                    </h2>
                  )}

                  <div className="grid grid-cols-4 gap-[14px] sm:grid-cols-6 lg:grid-cols-8">
                    {section.links.map((link) => (
                      <MeLinkTile key={`${activeTab.id}-${link.name}-${link.url}`} item={link} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
