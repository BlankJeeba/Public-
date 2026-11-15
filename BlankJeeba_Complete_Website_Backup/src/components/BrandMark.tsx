import { SITE_CONFIG } from '../content/site';

interface BrandSymbolProps {
  className?: string;
  size?: number;
  decorative?: boolean;
}

/** Official BlankJeeba purple J brand symbol (exact uploaded SVG geometry) */
export function BrandSymbol({
  className = 'h-6 w-6',
  size = 24,
  decorative = false,
}: BrandSymbolProps) {
  return (
    <img
      src={SITE_CONFIG.assets.jSymbol}
      alt={decorative ? '' : 'BlankJeeba J symbol'}
      aria-hidden={decorative ? true : undefined}
      width={size}
      height={size}
      className={`shrink-0 object-contain select-none ${className}`}
    />
  );
}

interface BrandWordmarkProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Theme-aware premium BlankJeeba wordmark:
 * - Dark mode: "Blank" in light ink (#F3F4F8), "Jeeba" in official purple (#4F46E5)
 * - Light mode: "Blank" in deep navy (#0F172A), "Jeeba" in official purple (#4F46E5)
 */
export function BrandWordmark({ size = 'md', className = '' }: BrandWordmarkProps) {
  const sizeClass = {
    sm: 'text-[1.15rem]',
    md: 'text-[1.32rem] sm:text-[1.4rem]',
    lg: 'text-[1.6rem] sm:text-[1.8rem]',
  }[size];

  return (
    <span
      className={`inline-flex items-baseline leading-none tracking-[-0.03em] select-none ${sizeClass} ${className}`}
      style={{ fontFamily: 'var(--font-heading)' }}
    >
      <span className="font-normal text-[#0F172A] dark:text-[#F3F4F8] transition-colors duration-200">
        Blank
      </span>
      <span className="font-bold text-[#4F46E5]">Jeeba</span>
    </span>
  );
}
