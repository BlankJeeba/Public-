import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Language, LocalizedText } from '../content/site';

const STORAGE_KEY = 'blankjeeba_lang';

interface LanguageContextValue {
  lang: Language;
  /** Translate a LocalizedText object into the active language */
  t: (text: LocalizedText) => string;
  /** Build an English or Hindi path for a route slug (e.g. "/videos" -> "/hi/videos") */
  localePath: (enPath: string) => string;
  /** Strip the optional /hi prefix to get the canonical English route path */
  basePath: string;
  /** Switch language explicitly, saving preference in localStorage and navigating */
  switchLanguage: (targetLang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function stripHiPrefix(pathname: string): string {
  if (pathname === '/hi' || pathname === '/hi/') {
    return '/';
  }
  if (pathname.startsWith('/hi/')) {
    return pathname.slice(3);
  }
  return pathname || '/';
}

export function buildLocalePath(enPath: string, lang: Language): string {
  const normalized = enPath.startsWith('/') ? enPath : `/${enPath}`;
  if (lang === 'hi') {
    return normalized === '/' ? '/hi' : `/hi${normalized}`;
  }
  return normalized;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const lang: Language =
    location.pathname === '/hi' || location.pathname.startsWith('/hi/') ? 'hi' : 'en';

  const basePath = useMemo(() => stripHiPrefix(location.pathname), [location.pathname]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const switchLanguage = (targetLang: Language) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, targetLang);
    } catch {
      // Ignore storage failures in restricted browsing contexts
    }

    if (targetLang === lang) return;
    const nextPath = buildLocalePath(basePath, targetLang);
    navigate(`${nextPath}${location.search}${location.hash}`);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: (text: LocalizedText) => text[lang],
      localePath: (enPath: string) => buildLocalePath(enPath, lang),
      basePath,
      switchLanguage,
    }),
    [lang, basePath, location.search, location.hash]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
