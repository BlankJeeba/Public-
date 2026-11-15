import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { SITE_CONFIG } from './content/site';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';

const HomePage = lazy(() => import('./pages/HomePage'));
const VideosPage = lazy(() => import('./pages/VideosPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

function PageFallback() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#4F46E5] border-t-transparent" />
    </div>
  );
}

function AppRoutes() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#F8FAFC] text-[#0F172A] dark:bg-[#0A0C14] dark:text-[#F3F4F8] transition-colors duration-200">
      {/* Initial brand splash loading screen (runs once per page load) */}
      <LoadingScreen />

      {/* Very light film-grain texture overlay */}
      <div
        aria-hidden="true"
        className="film-grain pointer-events-none fixed inset-0 z-50 opacity-30 dark:opacity-50"
      />

      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            {/* Primary English & Hindi Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/hi" element={<HomePage />} />
            <Route path="/hi/" element={<HomePage />} />

            <Route path="/videos" element={<VideosPage />} />
            <Route path="/hi/videos" element={<VideosPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/hi/about" element={<AboutPage />} />

            <Route path="/contact" element={<ContactPage />} />
            <Route path="/hi/contact" element={<ContactPage />} />

            {/* Six Vision Pages (Coming soon template, config-driven) */}
            {SITE_CONFIG.vision.items.map((item) => (
              <Route
                key={`en-${item.slug}`}
                path={`/${item.slug}`}
                element={<ComingSoonPage config={item} />}
              />
            ))}
            {SITE_CONFIG.vision.items.map((item) => (
              <Route
                key={`hi-${item.slug}`}
                path={`/hi/${item.slug}`}
                element={<ComingSoonPage config={item} />}
              />
            ))}

            {/* Four Personal Pages (public, noindex, hidden from nav & sitemap) */}
            {SITE_CONFIG.personalPages.map((item) => (
              <Route
                key={`en-${item.slug}`}
                path={`/${item.slug}`}
                element={<ComingSoonPage config={item} />}
              />
            ))}
            {SITE_CONFIG.personalPages.map((item) => (
              <Route
                key={`hi-${item.slug}`}
                path={`/hi/${item.slug}`}
                element={<ComingSoonPage config={item} />}
              />
            ))}

            {/* 404 Fallback */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <LanguageProvider>
            <AppRoutes />
          </LanguageProvider>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
