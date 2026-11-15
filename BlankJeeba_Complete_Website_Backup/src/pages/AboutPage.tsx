import { SITE_CONFIG } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { PageHead } from '../components/PageHead';
import { BrandSymbol } from '../components/BrandMark';
import { BeyondAiIcon, PhilosophyIcon } from '../components/BrandIcons';
import { SocialIconMarquee, SocialIconRow } from '../components/SocialIcons';
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/MotionPrimitives';

export default function AboutPage() {
  const { lang, t } = useLanguage();
  const paragraphs = SITE_CONFIG.about.bioParagraphs[lang];
  const achievements = SITE_CONFIG.about.achievements;

  return (
    <>
      <PageHead
        title={t(SITE_CONFIG.seo.about.title)}
        description={t(SITE_CONFIG.seo.about.description)}
        canonicalBasePath="/about"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        {/* Top Split: Portfolio Photo + Polished Bio */}
        <SectionReveal>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-xl dark:border-white/[0.1] dark:bg-[#11141F] dark:shadow-2xl">
                <img
                  src={SITE_CONFIG.assets.portfolioPhoto}
                  alt="Jitendra Ahirwar — BlankJeeba"
                  width={600}
                  height={750}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#4F46E5] dark:text-[#8B84FF]">
                {t(SITE_CONFIG.about.subheading)}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F3F4F8] sm:text-5xl">
                {t(SITE_CONFIG.about.heading)}
              </h1>

              <div className="mt-6 space-y-4 text-base leading-relaxed text-[#475569] dark:text-[#9AA0B4] sm:text-lg">
                {paragraphs.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Full Philosophy Grid */}
        <section className="mt-20 border-t border-slate-900/10 pt-16 dark:border-white/[0.08]">
          <SectionReveal>
            <div className="flex items-center gap-3">
              <BrandSymbol size={26} className="h-6 w-6" decorative />
              <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
                {t(SITE_CONFIG.philosophy.sectionTitle)}
              </h2>
            </div>
          </SectionReveal>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.philosophy.items.map((belief) => (
              <StaggerItem key={belief.id}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-900/10 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-900/20 dark:border-white/[0.08] dark:bg-[#11141F] dark:shadow-none dark:hover:border-white/20">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-[#F8FAFC] text-[#4F46E5] dark:border-white/[0.08] dark:bg-[#0A0C14] dark:text-[#8B84FF]">
                    <PhilosophyIcon iconKey={belief.iconKey} className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#F3F4F8]">
                    {t(belief.title)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
                    “{t(belief.quote)}”
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Beyond AI */}
        <section className="mt-20 border-t border-slate-900/10 pt-16 dark:border-white/[0.08]">
          <SectionReveal>
            <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
              {t(SITE_CONFIG.about.beyondAiTitle)}
            </h2>
          </SectionReveal>

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SITE_CONFIG.about.beyondAiItems.map((item) => (
              <StaggerItem key={item.key}>
                <div className="flex h-full flex-col rounded-2xl border border-slate-900/10 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#11141F] dark:shadow-none">
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-[#F8FAFC] text-[#4F46E5] dark:border-white/[0.08] dark:bg-[#0A0C14] dark:text-[#8B84FF]">
                    <BeyondAiIcon itemKey={item.key} className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0F172A] dark:text-[#F3F4F8]">
                    {t(item.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
                    {t(item.detail)}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* Achievements (hidden until items are added in src/content/site.ts) */}
        {achievements.length > 0 && (
          <section className="mt-20 border-t border-slate-900/10 pt-16 dark:border-white/[0.08]">
            <SectionReveal>
              <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
                {t(SITE_CONFIG.about.achievementsTitle)}
              </h2>
            </SectionReveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#11141F] dark:shadow-none"
                >
                  {item.year && (
                    <span className="text-xs font-medium text-[#4F46E5] dark:text-[#8B84FF]">
                      {item.year}
                    </span>
                  )}
                  <h3 className="mt-1 text-lg font-semibold text-[#0F172A] dark:text-[#F3F4F8]">
                    {t(item.title)}
                  </h3>
                  <p className="mt-2 text-sm text-[#475569] dark:text-[#9AA0B4]">
                    {t(item.detail)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All my links: 4 showcase icons first, then Other places */}
        <section className="mt-20 border-t border-slate-900/10 pt-16 dark:border-white/[0.08]">
          <SectionReveal>
            <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
              {t(SITE_CONFIG.about.allLinksTitle)}
            </h2>

            <div className="mt-8">
              <SocialIconRow items={SITE_CONFIG.social.showcase} size="lg" />
            </div>

            <div className="mt-10">
              <h3 className="mb-4 text-sm font-medium text-[#475569] dark:text-[#9AA0B4]">
                {t(SITE_CONFIG.about.otherPlacesTitle)}
              </h3>
              <SocialIconRow items={SITE_CONFIG.social.otherPlaces} size="md" />
            </div>

            <div className="mt-8">
              <SocialIconMarquee items={SITE_CONFIG.social.otherPlaces} />
            </div>
          </SectionReveal>
        </section>
      </div>
    </>
  );
}
