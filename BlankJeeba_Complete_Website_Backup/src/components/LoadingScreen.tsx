import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE_CONFIG } from '../content/site';
import { BrandWordmark } from './BrandMark';

/**
 * Animated brand splash screen displayed once on initial page load.
 * Uses CSS transforms and opacity only, respects prefers-reduced-motion,
 * and includes a strict fail-safe timeout so the site never gets stuck.
 */
export function LoadingScreen() {
  const prefersReduced = useReducedMotion();
  const [phase, setPhase] = useState<'enter' | 'exit' | 'done'>('enter');

  useEffect(() => {
    const enterDuration = prefersReduced ? 120 : 950;
    const exitDuration = prefersReduced ? 180 : 420;

    const exitTimer = window.setTimeout(() => {
      setPhase('exit');
    }, enterDuration);

    const doneTimer = window.setTimeout(() => {
      setPhase('done');
    }, enterDuration + exitDuration);

    // Absolute fail-safe so the splash overlay can never block the website
    const failsafeTimer = window.setTimeout(() => {
      setPhase('done');
    }, 2200);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      window.clearTimeout(failsafeTimer);
    };
  }, [prefersReduced]);

  if (phase === 'done') return null;

  return (
    <div
      role="status"
      aria-label="Loading BlankJeeba"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0A0C14] transition-opacity duration-400 ease-out ${
        phase === 'exit' ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Subtle radial glow behind J icon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-64 w-64 rounded-full bg-[#4F46E5]/15 blur-[90px]"
      />

      <motion.div
        initial={
          prefersReduced
            ? { opacity: 1 }
            : { opacity: 0, scale: 0.82, rotate: -6, y: 8 }
        }
        animate={
          prefersReduced
            ? { opacity: 1 }
            : {
                opacity: 1,
                scale: 1,
                rotate: [0, 3, -2, 0],
                y: [0, -6, 0],
              }
        }
        transition={{
          opacity: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
          scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          rotate: { duration: 1.4, ease: 'easeInOut' },
          y: { duration: 1.4, ease: 'easeInOut' },
        }}
        className="relative flex items-center justify-center"
      >
        <img
          src={SITE_CONFIG.assets.jSymbol}
          alt="BlankJeeba"
          width={64}
          height={66}
          className="h-16 w-16 object-contain drop-shadow-[0_10px_28px_rgba(79,70,229,0.45)]"
        />
      </motion.div>

      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: prefersReduced ? 0 : 0.22, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-5 flex flex-col items-center gap-1"
      >
        <BrandWordmark size="lg" />
      </motion.div>
    </div>
  );
}
