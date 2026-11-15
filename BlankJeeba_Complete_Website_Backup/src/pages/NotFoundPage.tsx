import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { SITE_CONFIG } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { PageHead } from '../components/PageHead';
import { BrandSymbol } from '../components/BrandMark';

export default function NotFoundPage() {
  const { t, localePath } = useLanguage();

  return (
    <>
      <PageHead
        title={`${t(SITE_CONFIG.notFound.title)} | BlankJeeba`}
        description={t(SITE_CONFIG.notFound.message)}
        indexable={false}
      />

      <div className="mx-auto flex max-w-2xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
        <div className="mb-4 flex items-center gap-2.5">
          <BrandSymbol size={24} className="h-6 w-6" decorative />
          <p className="text-sm font-semibold text-[#4F46E5] dark:text-[#8B84FF]">
            {SITE_CONFIG.notFound.code}
          </p>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F3F4F8] sm:text-5xl">
          {t(SITE_CONFIG.notFound.title)}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#475569] dark:text-[#9AA0B4] sm:text-lg">
          {t(SITE_CONFIG.notFound.message)}
        </p>

        <Link
          to={localePath('/')}
          className="mt-8 inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
        >
          <Home className="h-4 w-4" />
          <span>{t(SITE_CONFIG.notFound.backHome)}</span>
        </Link>
      </div>
    </>
  );
}
