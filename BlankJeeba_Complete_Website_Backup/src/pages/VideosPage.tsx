import { SITE_CONFIG } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { PageHead } from '../components/PageHead';
import { BrandSymbol } from '../components/BrandMark';
import { YouTubePlaylistEmbed, YouTubeVideoCard } from '../components/YouTubeEmbed';
import {
  SectionReveal,
  StaggerContainer,
  StaggerItem,
} from '../components/MotionPrimitives';

export default function VideosPage() {
  const { t } = useLanguage();
  const [leadVideo, ...restVideos] = SITE_CONFIG.featuredVideos;

  return (
    <>
      <PageHead
        title={t(SITE_CONFIG.seo.videos.title)}
        description={t(SITE_CONFIG.seo.videos.description)}
        canonicalBasePath="/videos"
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SectionReveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <BrandSymbol size={30} className="h-7 w-7 sm:h-8 sm:w-8" decorative />
              <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F3F4F8] sm:text-5xl">
                {t(SITE_CONFIG.videosCopy.pageTitle)}
              </h1>
            </div>
            <p className="mt-4 text-lg leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
              {t(SITE_CONFIG.videosCopy.pageIntro)}
            </p>
          </div>
        </SectionReveal>

        {/* Featured 5 videos (newest first) */}
        <div className="mt-12 space-y-6">
          {leadVideo && (
            <SectionReveal>
              <div className="grid grid-cols-1">
                <YouTubeVideoCard video={leadVideo} featured priority />
              </div>
            </SectionReveal>
          )}

          <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {restVideos.map((video) => (
              <StaggerItem key={video.id}>
                <YouTubeVideoCard video={video} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Live YouTube playlist placed at the end */}
        <SectionReveal>
          <YouTubePlaylistEmbed />
        </SectionReveal>
      </div>
    </>
  );
}
