import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { PageHead } from '../components/PageHead';
import { BrandSymbol } from '../components/BrandMark';
import { YouTubeVideoCard } from '../components/YouTubeEmbed';
import { SocialIconRow } from '../components/SocialIcons';
import { PhilosophyIcon, VisionIcon } from '../components/BrandIcons';
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/MotionPrimitives';

export default function HomePage() {
  const { t, localePath } = useLanguage();
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const primaryY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [0, 28]);

  const [leadVideo, ...otherVideos] = SITE_CONFIG.featuredVideos;
  const previewBeliefs = SITE_CONFIG.philosophy.items.slice(0, 3);

  return (
    <>
      <PageHead
        title={t(SITE_CONFIG.seo.home.title)}
        description={t(SITE_CONFIG.seo.home.description)}
        canonicalBasePath="/"
      />

      {/* 1. HERO SECTION */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-slate-900/10 py-16 dark:border-white/[0.08] sm:py-24 lg:py-28"
      >
        {/* Subtle indigo radial glow behind hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-[540px] w-[780px] -translate-x-1/2 rounded-full bg-[#4F46E5]/10 blur-[130px] dark:bg-[#4F46E5]/15"
        />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Typographic focal anchor */}
          <div className="lg:col-span-6">
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-3 text-base font-medium text-[#4F46E5] dark:text-[#8B84FF] sm:text-lg">
                {t(SITE_CONFIG.hero.subline)}
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-[#0F172A] dark:text-[#F3F4F8] sm:text-6xl lg:text-[4.25rem] lg:leading-[1.05]">
                {t(SITE_CONFIG.hero.headline)}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#475569] dark:text-[#9AA0B4] sm:text-xl">
                {t(SITE_CONFIG.hero.description)}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.a
                  href={SITE_CONFIG.hero.primaryCta.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  whileHover={prefersReduced ? undefined : { y: -2, scale: 1.015 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.985 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex min-h-[46px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#4F46E5] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_28px_-6px_rgba(79,70,229,0.55)] transition-colors hover:bg-[#4338CA]"
                >
                  <span>{t(SITE_CONFIG.hero.primaryCta.label)}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0" />
                </motion.a>

                <motion.a
                  href={SITE_CONFIG.hero.secondaryCta.url}
                  target="_blank"
                  rel="me noopener noreferrer"
                  whileHover={prefersReduced ? undefined : { y: -2, scale: 1.015 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.985 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex min-h-[46px] items-center gap-2 whitespace-nowrap rounded-xl border border-slate-900/12 bg-white px-6 py-3 text-sm font-medium text-[#0F172A] shadow-xs transition-colors hover:border-[#4F46E5]/50 hover:bg-slate-50 dark:border-white/[0.12] dark:bg-[#11141F]/90 dark:text-[#F3F4F8] dark:shadow-none dark:hover:border-[#8B84FF]/50 dark:hover:bg-[#171B2B]"
                >
                  <span>{t(SITE_CONFIG.hero.secondaryCta.label)}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#475569] dark:text-[#9AA0B4]" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right column: Staggered dual-portrait composition with clean separation, parallax & float */}
          <div className="lg:col-span-6">
            <div className="mx-auto grid max-w-[500px] grid-cols-2 items-start gap-4 sm:gap-6 lg:ml-auto lg:mr-0">
              {/* Primary portrait (hero-1: navy shirt architectural portrait) */}
              <motion.div style={prefersReduced ? undefined : { y: primaryY }}>
                <motion.div
                  animate={prefersReduced ? undefined : { y: [0, -6, 0] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-[0_24px_50px_-15px_rgba(15,23,42,0.2)] ring-1 ring-[#4F46E5]/25 dark:border-white/[0.14] dark:bg-[#11141F] dark:shadow-[0_24px_60px_-15px_rgba(0,0,0,0.75)]"
                >
                  <img
                    src={SITE_CONFIG.assets.heroPrimary}
                    alt="Jitendra Ahirwar — BlankJeeba"
                    width={460}
                    height={600}
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </motion.div>
              </motion.div>

              {/* Secondary portrait (hero-2: striped shirt) offset cleanly beside it */}
              <motion.div
                style={prefersReduced ? undefined : { y: secondaryY }}
                className="mt-8 sm:mt-12"
              >
                <motion.div
                  animate={prefersReduced ? undefined : { y: [0, 6, 0] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-xl dark:border-white/[0.1] dark:bg-[#11141F] dark:shadow-2xl"
                >
                  <img
                    src={SITE_CONFIG.assets.heroSecondary}
                    alt="Jitendra Ahirwar outdoor portrait"
                    width={420}
                    height={560}
                    className="aspect-[3/4] w-full object-cover object-top"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED VIDEOS */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
                  {t(SITE_CONFIG.videosCopy.homeSectionTitle)}
                </h2>
                <p className="mt-2 text-base text-[#475569] dark:text-[#9AA0B4]">
                  {t(SITE_CONFIG.videosCopy.homeSectionSubtitle)}
                </p>
              </div>

              <Link
                to={localePath('/videos')}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-900/10 bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F46E5]/60 hover:bg-slate-50 dark:border-white/[0.1] dark:bg-[#11141F] dark:text-[#F3F4F8] dark:shadow-none dark:hover:bg-[#171B2B]"
              >
                <span>{t(SITE_CONFIG.videosCopy.viewAllButton)}</span>
                <ArrowRight className="h-4 w-4 text-[#4F46E5] dark:text-[#8B84FF]" />
              </Link>
            </div>
          </SectionReveal>

          <div className="space-y-6">
            {leadVideo && (
              <SectionReveal>
                <div className="grid grid-cols-1">
                  <YouTubeVideoCard video={leadVideo} featured priority />
                </div>
              </SectionReveal>
            )}

            <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {otherVideos.map((video) => (
                <StaggerItem key={video.id}>
                  <YouTubeVideoCard video={video} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* 3. MY VISION (accented with official BlankJeeba J symbol) */}
      <section className="border-t border-slate-900/10 py-20 dark:border-white/[0.08] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3">
                <BrandSymbol size={28} className="h-7 w-7" decorative />
                <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
                  {t(SITE_CONFIG.vision.sectionTitle)}
                </h2>
              </div>
              <p className="mt-4 text-lg leading-relaxed text-[#475569] dark:text-[#9AA0B4] sm:text-xl">
                {t(SITE_CONFIG.vision.statement)}
              </p>
            </div>
          </SectionReveal>

          {/* Balanced 3x2 grid of 6 Vision option cards with spring entrance */}
          <StaggerContainer className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SITE_CONFIG.vision.items.map((item) => (
              <StaggerItem key={item.slug} spring>
                <Link
                  to={localePath(`/${item.slug}`)}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-slate-900/10 bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#4F46E5]/55 hover:shadow-[0_14px_40px_-15px_rgba(79,70,229,0.22)] dark:border-white/[0.08] dark:bg-[#11141F] dark:shadow-none dark:hover:shadow-[0_14px_40px_-15px_rgba(79,70,229,0.28)]"
                >
                  <div>
                    <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-900/10 bg-[#F8FAFC] text-[#4F46E5] transition-colors group-hover:border-[#4F46E5]/40 group-hover:bg-[#4F46E5]/10 dark:border-white/[0.08] dark:bg-[#0A0C14] dark:text-[#8B84FF] dark:group-hover:bg-[#4F46E5]/15">
                      <VisionIcon iconKey={item.iconKey} className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-semibold text-[#0F172A] transition-colors dark:text-[#F3F4F8] dark:group-hover:text-white">
                      {t(item.title)}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
                      {t(item.teaser)}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-[#4F46E5] dark:text-[#8B84FF]">
                    <span>{localePath(`/${item.slug}`)}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. WHAT I BELIEVE */}
      <section className="border-t border-slate-900/10 py-20 dark:border-white/[0.08] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
                {t(SITE_CONFIG.philosophy.sectionTitle)}
              </h2>

              <Link
                to={localePath('/about')}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#4F46E5] transition-colors hover:text-[#0F172A] dark:text-[#8B84FF] dark:hover:text-[#F3F4F8]"
              >
                <span>{t(SITE_CONFIG.philosophy.readMoreLabel)}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </SectionReveal>

          <StaggerContainer className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {previewBeliefs.map((belief) => (
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
        </div>
      </section>

      {/* 5. FIND ME ONLINE */}
      <section className="border-t border-slate-900/10 py-20 dark:border-white/[0.08] sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionReveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-slate-900/10 bg-white p-8 shadow-xs dark:border-white/[0.08] dark:bg-[#11141F]/70 dark:shadow-none sm:flex-row sm:items-center sm:p-10">
              <div>
                <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
                  {t(SITE_CONFIG.findMeOnline.title)}
                </h2>
                <Link
                  to={localePath('/about')}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#4F46E5] transition-colors hover:text-[#0F172A] dark:text-[#8B84FF] dark:hover:text-[#F3F4F8]"
                >
                  <span>{t(SITE_CONFIG.findMeOnline.morePlaces)}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Exactly four large icon-only buttons: X, Instagram, Facebook, WhatsApp Channel */}
              <SocialIconRow items={SITE_CONFIG.social.showcase} size="lg" />
            </div>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
