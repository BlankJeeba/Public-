import React, { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa6';
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
  SiPinterest,
  SiReddit,
  SiSnapchat,
  SiSpotify,
  SiTelegram,
  SiTiktok,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import type { SocialLinkItem, SocialPlatformId } from '../content/site';
import { useLanguage } from '../context/LanguageContext';

const ICON_MAP: Record<SocialPlatformId, React.ComponentType<{ className?: string }>> = {
  x: SiX,
  instagram: SiInstagram,
  facebook: SiFacebook,
  whatsapp: SiWhatsapp,
  youtube: SiYoutube,
  tiktok: SiTiktok,
  reddit: SiReddit,
  linkedin: FaLinkedin,
  github: SiGithub,
  telegram: SiTelegram,
  snapchat: SiSnapchat,
  pinterest: SiPinterest,
  spotify: SiSpotify,
};

interface SocialIconButtonProps {
  item: SocialLinkItem;
  size?: 'lg' | 'md' | 'sm';
  showTooltip?: boolean;
}

export function SocialIconButton({
  item,
  size = 'lg',
  showTooltip = true,
}: SocialIconButtonProps) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);
  const Icon = ICON_MAP[item.id];

  const sizeClasses = {
    lg: 'w-14 h-14 rounded-2xl text-[22px]',
    md: 'w-11 h-11 rounded-xl text-[18px]',
    sm: 'w-10 h-10 rounded-xl text-[17px]',
  }[size];

  // Ensure light-mode hover contrast for brands whose native color is near-white
  const resolvedHoverColor =
    item.id === 'x' || item.id === 'github'
      ? undefined
      : item.id === 'snapchat'
      ? '#EAB308'
      : item.brandColor;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="me noopener noreferrer"
      aria-label={t(item.ariaLabel)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        color: hovered ? resolvedHoverColor : undefined,
        borderColor: hovered && resolvedHoverColor ? `${resolvedHoverColor}55` : undefined,
      }}
      className={`group relative inline-flex items-center justify-center ${sizeClasses} border border-slate-900/10 bg-white text-[#475569] shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:text-[#0F172A] dark:border-white/[0.08] dark:bg-[#11141F] dark:text-[#9AA0B4] dark:shadow-none dark:hover:bg-[#161A29] dark:hover:text-[#F3F4F8]`}
    >
      <Icon className="shrink-0 transition-transform duration-200 group-hover:scale-110" />

      {showTooltip && (
        <span
          role="tooltip"
          className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-slate-900/10 bg-[#0F172A] px-2.5 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 dark:border-white/10 dark:bg-[#171B2B] dark:text-[#F3F4F8]"
        >
          {item.name}
        </span>
      )}
    </a>
  );
}

interface SocialRowProps {
  items: readonly SocialLinkItem[];
  size?: 'lg' | 'md' | 'sm';
  className?: string;
}

export function SocialIconRow({ items, size = 'lg', className = '' }: SocialRowProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {items.map((item) => (
        <SocialIconButton key={item.id} item={item} size={size} />
      ))}
    </div>
  );
}

/** Subtle infinite marquee strip of brand icons for About/Other places visual rhythm */
export function SocialIconMarquee({ items }: { items: readonly SocialLinkItem[] }) {
  const { t } = useLanguage();
  const doubled = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-3 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      aria-label="Social platforms strip"
    >
      <div className="animate-marquee flex w-max items-center gap-4">
        {doubled.map((item, idx) => {
          const Icon = ICON_MAP[item.id];
          return (
            <a
              key={`${item.id}-${idx}`}
              href={item.url}
              target="_blank"
              rel="me noopener noreferrer"
              aria-label={t(item.ariaLabel)}
              title={item.name}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-900/10 bg-white text-[#475569] transition-colors duration-200 hover:border-slate-900/20 hover:text-[#0F172A] dark:border-white/[0.08] dark:bg-[#11141F]/80 dark:text-[#9AA0B4] dark:hover:border-white/20 dark:hover:text-[#F3F4F8]"
            >
              <Icon className="h-4 w-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
