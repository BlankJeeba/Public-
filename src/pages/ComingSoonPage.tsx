import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { SITE_CONFIG, type ComingSoonPageConfig } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { PageHead } from '../components/PageHead';
import { VisionIcon } from '../components/BrandIcons';
import { SectionReveal } from '../components/MotionPrimitives';

interface ComingSoonPageProps {
  config: ComingSoonPageConfig;
}

export default function ComingSoonPage({ config }: ComingSoonPageProps) {
  const { t, localePath } = useLanguage();
  const navigate = useNavigate();

  const title = t(config.title);
  const teaser = t(config.teaser);
  const description = t(config.description);

  return (
    <>
      <PageHead
        title={`${title} | BlankJeeba`}
        description={`${teaser} ${description}`}
        indexable={config.indexable}
        canonicalBasePath={`/${config.slug}`}
      />

      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#4F46E5]/10 blur-[120px] dark:bg-[#4F46E5]/12"
        />

        <div className="relative mx-auto max-w-3xl px-4 py-24 sm:px-6 sm:py-32">
          <SectionReveal>
            <div className="rounded-2xl border border-slate-900/10 bg-white p-8 shadow-xs dark:border-white/[0.08] dark:bg-[#11141F]/90 dark:shadow-none sm:p-12">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-900/10 bg-[#F8FAFC] text-[#4F46E5] dark:border-white/[0.08] dark:bg-[#0A0C14] dark:text-[#8B84FF]">
                <VisionIcon iconKey={config.iconKey} className="h-6 w-6" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F3F4F8] sm:text-5xl">
                {title}
              </h1>

              <p className="mt-4 text-lg font-medium text-[#4F46E5] dark:text-[#8B84FF]">
                {t(SITE_CONFIG.comingSoon.line)}
              </p>

              <p className="mt-3 text-base leading-relaxed text-[#0F172A]/90 dark:text-[#F3F4F8]/90">
                {teaser}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#9AA0B4] sm:text-base">
                {description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border border-slate-900/12 bg-[#F8FAFC] px-4 py-2.5 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#4F46E5]/60 hover:bg-slate-100 dark:border-white/[0.12] dark:bg-[#0A0C14] dark:text-[#F3F4F8] dark:hover:bg-[#171B2B]"
                >
                  <ArrowLeft className="h-4 w-4 text-[#475569] dark:text-[#9AA0B4]" />
                  <span>{t(SITE_CONFIG.comingSoon.backPrevious)}</span>
                </button>

                <Link
                  to={localePath('/')}
                  className="inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#4F46E5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
                >
                  <Home className="h-4 w-4" />
                  <span>{t(SITE_CONFIG.comingSoon.backButton)}</span>
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </>
  );
}
