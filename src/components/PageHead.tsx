import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../content/site';
import { buildLocalePath, useLanguage } from '../context/LanguageContext';

interface PageHeadProps {
  title: string;
  description: string;
  /** Set to false on coming-soon, personal, and 404 routes to emit noindex */
  indexable?: boolean;
  /** Canonical base path without /hi prefix (defaults to current basePath) */
  canonicalBasePath?: string;
}

export function PageHead({
  title,
  description,
  indexable = true,
  canonicalBasePath,
}: PageHeadProps) {
  const { lang, basePath } = useLanguage();
  const pathForCanonical = canonicalBasePath ?? basePath;

  const enUrl = `${SITE_CONFIG.brand.domain}${buildLocalePath(pathForCanonical, 'en')}`;
  const hiUrl = `${SITE_CONFIG.brand.domain}${buildLocalePath(pathForCanonical, 'hi')}`;
  const currentUrl = lang === 'hi' ? hiUrl : enUrl;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />

      {!indexable && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={currentUrl} />
      {indexable && <link rel="alternate" hrefLang="en" href={enUrl} />}
      {indexable && <link rel="alternate" hrefLang="hi" href={hiUrl} />}
      {indexable && <link rel="alternate" hrefLang="x-default" href={enUrl} />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:locale" content={lang === 'hi' ? 'hi_IN' : 'en_US'} />
      <meta property="og:image" content={SITE_CONFIG.assets.ogImage} />

      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={SITE_CONFIG.assets.ogImage} />
    </Helmet>
  );
}
