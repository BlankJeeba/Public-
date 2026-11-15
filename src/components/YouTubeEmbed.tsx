import { useEffect, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import { SITE_CONFIG, type VideoItem } from '../content/site';
import { useLanguage } from '../context/LanguageContext';

interface YouTubeVideoCardProps {
  video: VideoItem;
  featured?: boolean;
  priority?: boolean;
}

export function YouTubeVideoCard({
  video,
  featured = false,
  priority = false,
}: YouTubeVideoCardProps) {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [oembedTitle, setOembedTitle] = useState<string | null>(null);
  const [thumbFailed, setThumbFailed] = useState(false);

  const fallbackTitle = video.title
    ? t(video.title)
    : t(SITE_CONFIG.videosCopy.watchFallback);
  const displayTitle = oembedTitle || fallbackTitle;

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 4500);

    async function loadOembedTitle() {
      try {
        const watchUrl = `https://www.youtube.com/watch?v=${encodeURIComponent(video.id)}`;
        const endpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;
        const res = await fetch(endpoint, { signal: controller.signal });
        if (!res.ok) return;
        const data = (await res.json()) as { title?: string };
        if (active && data?.title) {
          setOembedTitle(data.title);
        }
      } catch {
        // Gracefully ignore blocked/offline oEmbed requests and rely on fallback title
      } finally {
        window.clearTimeout(timeoutId);
      }
    }

    loadOembedTitle();

    return () => {
      active = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [video.id]);

  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F46E5]/50 hover:shadow-[0_12px_40px_-15px_rgba(79,70,229,0.22)] dark:border-white/[0.08] dark:bg-[#11141F] dark:shadow-none dark:hover:shadow-[0_12px_40px_-15px_rgba(79,70,229,0.28)] ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900 dark:bg-[#0A0C14]">
        {isPlaying ? (
          <iframe
            className="h-full w-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={displayTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`${t(SITE_CONFIG.videosCopy.playLabel)}: ${displayTitle}`}
            className="relative block h-full w-full cursor-pointer text-left focus-visible:outline-none"
          >
            {!thumbFailed ? (
              <img
                src={thumbnailUrl}
                alt={displayTitle}
                width={480}
                height={360}
                loading={priority ? 'eager' : 'lazy'}
                referrerPolicy="no-referrer"
                onError={() => setThumbFailed(true)}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#11141F] via-[#161A2E] to-[#0A0C14] p-6 text-center">
                <Play className="mb-2 h-8 w-8 text-[#8B84FF]" />
                <span className="text-sm font-medium text-[#F3F4F8]">
                  {displayTitle}
                </span>
              </div>
            )}

            {/* Measured contrast scrim */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#0A0C14]/85 via-[#0A0C14]/20 to-transparent transition-opacity duration-200 group-hover:opacity-90"
            />

            {/* Centered Play Trigger */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-[#0A0C14]/80 text-white backdrop-blur-md transition-all duration-200 group-hover:scale-110 group-hover:border-[#4F46E5] group-hover:bg-[#4F46E5]">
                <Play className="ml-0.5 h-6 w-6 fill-current" />
              </span>
            </div>
          </button>
        )}
      </div>

      <div className="flex flex-1 items-start justify-between gap-3 p-4 sm:p-5">
        <div className="min-w-0 flex-1">
          {featured && (
            <span className="mb-1.5 block text-xs font-medium text-[#4F46E5] dark:text-[#8B84FF]">
              {t(SITE_CONFIG.videosCopy.featuredLabel)}
            </span>
          )}
          <h3
            className={`font-semibold leading-snug text-[#0F172A] dark:text-[#F3F4F8] ${
              featured ? 'text-lg sm:text-xl' : 'text-base'
            }`}
          >
            {displayTitle}
          </h3>
        </div>

        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${displayTitle} (${t(SITE_CONFIG.videosCopy.watchFallback)})`}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-900/10 bg-[#F8FAFC] text-[#475569] transition-colors hover:border-[#4F46E5]/50 hover:text-[#0F172A] dark:border-white/[0.08] dark:bg-[#0A0C14]/70 dark:text-[#9AA0B4] dark:hover:text-[#F3F4F8]"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function YouTubePlaylistEmbed() {
  const { t } = useLanguage();
  const playlistId = SITE_CONFIG.playlist.id;
  const playlistTitle = t(SITE_CONFIG.playlist.title);
  const playlistUrl = `https://www.youtube.com/playlist?list=${playlistId}`;

  return (
    <section className="mt-16 border-t border-slate-900/10 pt-14 dark:border-white/[0.08]">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-3xl">
            {playlistTitle}
          </h2>
        </div>

        <a
          href={playlistUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-slate-900/10 bg-white px-4 py-2.5 text-sm font-medium text-[#0F172A] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F46E5]/60 hover:bg-slate-50 dark:border-white/[0.1] dark:bg-[#11141F] dark:text-[#F3F4F8] dark:shadow-none dark:hover:bg-[#171B2B]"
        >
          <span>{t(SITE_CONFIG.playlist.buttonLabel)}</span>
          <ExternalLink className="h-4 w-4 text-[#4F46E5] dark:text-[#8B84FF]" />
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-sm dark:border-white/[0.08] dark:bg-[#11141F] dark:shadow-none">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full border-0"
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
            title={playlistTitle}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
