import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../content/site';
import { useLanguage } from '../context/LanguageContext';
import { PageHead } from '../components/PageHead';
import { SocialIconRow } from '../components/SocialIcons';
import { SectionReveal } from '../components/MotionPrimitives';

export default function ContactPage() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const email = SITE_CONFIG.brand.email;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <>
      <PageHead
        title={t(SITE_CONFIG.seo.contact.title)}
        description={t(SITE_CONFIG.seo.contact.description)}
        canonicalBasePath="/contact"
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionReveal>
          <h1 className="text-3xl font-bold tracking-tight text-[#0F172A] dark:text-[#F3F4F8] sm:text-5xl">
            {t(SITE_CONFIG.contact.heading)}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
            {t(SITE_CONFIG.contact.intro)}
          </p>

          {/* Email Card (no contact form, per specification) */}
          <div className="mt-10 rounded-2xl border border-slate-900/10 bg-white p-6 shadow-xs dark:border-white/[0.08] dark:bg-[#11141F] dark:shadow-none sm:p-8">
            <p className="text-sm font-medium text-[#4F46E5] dark:text-[#8B84FF]">
              {t(SITE_CONFIG.contact.emailLabel)}
            </p>

            <div className="mt-3 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-3 text-xl font-semibold text-[#0F172A] transition-colors hover:text-[#4F46E5] dark:text-[#F3F4F8] dark:hover:text-[#8B84FF] sm:text-2xl"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-900/10 bg-[#F8FAFC] text-[#4F46E5] dark:border-white/[0.08] dark:bg-[#0A0C14] dark:text-[#8B84FF]">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="break-all">{email}</span>
              </a>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex min-h-[42px] cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border border-slate-900/12 bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#0F172A] transition-colors hover:border-[#4F46E5]/60 hover:bg-slate-100 dark:border-white/[0.12] dark:bg-[#0A0C14] dark:text-[#F3F4F8] dark:hover:bg-[#171B2B]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                      <span>{t(SITE_CONFIG.contact.copiedLabel)}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 text-[#475569] dark:text-[#9AA0B4]" />
                      <span>{t(SITE_CONFIG.contact.copyLabel)}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${email}`}
                  className="inline-flex min-h-[42px] items-center gap-2 whitespace-nowrap rounded-xl bg-[#4F46E5] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#4338CA]"
                >
                  <span>{t(SITE_CONFIG.contact.openMailLabel)}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-14 border-t border-slate-900/10 pt-12 dark:border-white/[0.08]">
            <h2 className="text-xl font-semibold text-[#0F172A] dark:text-[#F3F4F8] sm:text-2xl">
              {t(SITE_CONFIG.contact.socialHeading)}
            </h2>

            <div className="mt-6">
              <SocialIconRow items={SITE_CONFIG.social.showcase} size="lg" />
            </div>

            <div className="mt-8">
              <p className="mb-4 text-sm font-medium text-[#475569] dark:text-[#9AA0B4]">
                {t(SITE_CONFIG.about.otherPlacesTitle)}
              </p>
              <SocialIconRow items={SITE_CONFIG.social.otherPlaces} size="md" />
            </div>
          </div>
        </SectionReveal>
      </div>
    </>
  );
}
