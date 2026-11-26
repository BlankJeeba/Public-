import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  HelpCircle,
  Home,
  RefreshCw,
  Search,
  X,
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { PageHead } from '../components/PageHead';

// ============================================================================
// EDITABLE DATA SOURCE — Update this Google Apps Script URL anytime if needed
// ============================================================================
const LESSONS_API_URL =
  'https://script.google.com/macros/s/AKfycbw23Lml_VhxBXp5AejQG73W1AzcLSuLRyxW6eOfzQ3dl9FYA-0csBvJjl5dYsznNsuv/exec';

const STORAGE_KEY = 'blankjeeba_daily_learning_last_day';

interface DaySummary {
  day: number;
  title: string;
  hasPrompt?: boolean;
  hasActivity?: boolean;
  hasLinks?: boolean;
}

interface LessonDetail {
  day: number;
  title: string;
  prompt: string;
  links: string;
  activity: string;
}

interface SafeLinkItem {
  href: string;
  label: string;
}

function readSavedDay(): number | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
  } catch {
    return null;
  }
}

function writeSavedDay(day: number): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(day));
  } catch {
    // Ignore storage errors (private mode, quota, or blocked storage)
  }
}

function formatDayOption(day: number, title: string): string {
  const cleanTitle = title.trim();
  return cleanTitle ? `Day ${day} · ${cleanTitle}` : `Day ${day}`;
}

function parseSafeLinks(rawLinks: string): SafeLinkItem[] {
  if (!rawLinks || !rawLinks.trim()) return [];
  const results: SafeLinkItem[] = [];

  for (const rawLine of rawLinks.split(/\r?\n/)) {
    const trimmed = rawLine.trim();
    if (!trimmed) continue;

    const candidate = /^https?:\/\//i.test(trimmed)
      ? trimmed
      : /^www\./i.test(trimmed)
        ? `https://${trimmed}`
        : '';

    if (!candidate) continue;

    try {
      const parsed = new URL(candidate);
      if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
        results.push({ href: parsed.href, label: trimmed });
      }
    } catch {
      // Skip invalid URLs silently
    }
  }

  return results;
}

async function copyTextWithFallback(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to legacy textarea copy for older mobile browsers / webviews
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    textarea.style.fontSize = '16px';
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

function normalizeDayList(data: unknown): DaySummary[] {
  if (!Array.isArray(data)) return [];
  const seen = new Set<number>();
  const normalized: DaySummary[] = [];

  for (const item of data) {
    if (!item || typeof item !== 'object') continue;
    const record = item as Record<string, unknown>;
    const dayNum = Number(record.day);
    if (!Number.isFinite(dayNum) || seen.has(dayNum)) continue;
    seen.add(dayNum);

    normalized.push({
      day: dayNum,
      title: typeof record.title === 'string' ? record.title.trim() : '',
      hasPrompt: Boolean(record.hasPrompt),
      hasActivity: Boolean(record.hasActivity),
      hasLinks: Boolean(record.hasLinks),
    });
  }

  return normalized;
}

function normalizeLesson(data: unknown, expectedDay: number): LessonDetail | null {
  if (!data || typeof data !== 'object') return null;
  const record = data as Record<string, unknown>;
  const dayNum = record.day !== undefined && record.day !== null ? Number(record.day) : expectedDay;

  if (!Number.isFinite(dayNum) || dayNum !== expectedDay) {
    return null;
  }

  return {
    day: dayNum,
    title: typeof record.title === 'string' ? record.title.trim() : '',
    prompt: typeof record.prompt === 'string' ? record.prompt : '',
    links: typeof record.links === 'string' ? record.links : '',
    activity: typeof record.activity === 'string' ? record.activity : '',
  };
}

export default function Page1() {
  const prefersReducedMotion = useReducedMotion();

  // Lesson index state
  const [days, setDays] = useState<DaySummary[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);

  // Selected day & detail state
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<LessonDetail | null>(null);
  const [lessonLoading, setLessonLoading] = useState(false);
  const [lessonError, setLessonError] = useState<string | null>(null);

  // Interactive UI state
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [howToUseOpen, setHowToUseOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Refs for in-memory cache, race guard, outside-click detection, and copy timer
  const lessonCacheRef = useRef<Map<number, LessonDetail | null>>(new Map());
  const activeDayRef = useRef<number | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const copyTimerRef = useRef<number | null>(null);

  const fetchDayList = useCallback(async () => {
    setListLoading(true);
    setListError(null);

    try {
      const response = await fetch(LESSONS_API_URL);
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const rawData: unknown = await response.json();
      const parsedDays = normalizeDayList(rawData);
      setDays(parsedDays);

      if (parsedDays.length > 0) {
        const savedDay = readSavedDay();
        const hasSavedDay = savedDay !== null && parsedDays.some((item) => item.day === savedDay);
        const initialDay = hasSavedDay ? savedDay : parsedDays[0].day;
        setSelectedDay(initialDay);
      } else {
        setSelectedDay(null);
        setActiveLesson(null);
      }
    } catch {
      setListError('Could not load the lesson list. Please check your internet connection and try again.');
    } finally {
      setListLoading(false);
    }
  }, []);

  const fetchLessonByDay = useCallback(async (day: number, forceRefresh = false) => {
    activeDayRef.current = day;

    if (!forceRefresh && lessonCacheRef.current.has(day)) {
      setActiveLesson(lessonCacheRef.current.get(day) ?? null);
      setLessonLoading(false);
      setLessonError(null);
      return;
    }

    // Clear previous day's content immediately so data from another day is never shown
    setActiveLesson(null);
    setLessonError(null);
    setLessonLoading(true);

    try {
      const url = `${LESSONS_API_URL}?day=${encodeURIComponent(String(day))}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      const rawData: unknown = await response.json();
      const normalized = normalizeLesson(rawData, day);
      lessonCacheRef.current.set(day, normalized);

      if (activeDayRef.current === day) {
        setActiveLesson(normalized);
        setLessonLoading(false);
      }
    } catch {
      if (activeDayRef.current === day) {
        setLessonError('Could not load this lesson. Please try again.');
        setLessonLoading(false);
      }
    }
  }, []);

  // Fetch lesson list once when page opens
  useEffect(() => {
    void fetchDayList();
  }, [fetchDayList]);

  // Fetch selected day (from memory cache or network) and persist to localStorage
  useEffect(() => {
    if (selectedDay === null) return;
    writeSavedDay(selectedDay);

    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
      copyTimerRef.current = null;
    }
    setCopied(false);

    void fetchLessonByDay(selectedDay);
  }, [selectedDay, fetchLessonByDay]);

  // Cleanup copy timer on unmount
  useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        window.clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  // Close searchable dropdown on outside click or Escape key
  useEffect(() => {
    if (!dropdownOpen) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [dropdownOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (dropdownOpen) {
      const id = window.setTimeout(() => {
        searchInputRef.current?.focus();
      }, 40);
      return () => window.clearTimeout(id);
    }
  }, [dropdownOpen]);

  const currentIndex = useMemo(() => {
    if (selectedDay === null) return -1;
    return days.findIndex((item) => item.day === selectedDay);
  }, [days, selectedDay]);

  const selectedSummary = currentIndex >= 0 ? days[currentIndex] : null;
  const previousDayItem = currentIndex > 0 ? days[currentIndex - 1] : null;
  const nextDayItem =
    currentIndex >= 0 && currentIndex < days.length - 1 ? days[currentIndex + 1] : null;

  const filteredDays = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return days;

    return days.filter((item) => {
      const dayText = String(item.day);
      const prefixedDay = `day ${dayText}`;
      const titleText = item.title.toLowerCase();
      return (
        dayText.includes(query) ||
        prefixedDay.includes(query) ||
        titleText.includes(query)
      );
    });
  }, [days, searchQuery]);

  const handleSelectDay = (day: number) => {
    setSelectedDay(day);
    setDropdownOpen(false);
    setSearchQuery('');
  };

  const handleCopyPrompt = async (promptText: string) => {
    const success = await copyTextWithFallback(promptText);
    if (!success) return;

    setCopied(true);
    if (copyTimerRef.current !== null) {
      window.clearTimeout(copyTimerRef.current);
    }
    copyTimerRef.current = window.setTimeout(() => {
      setCopied(false);
      copyTimerRef.current = null;
    }, 2000);
  };

  // Strict per-day content checks (never render empty sections)
  const verifiedLesson =
    activeLesson && selectedDay !== null && activeLesson.day === selectedDay
      ? activeLesson
      : null;

  const promptContent = verifiedLesson ? verifiedLesson.prompt.trim() : '';
  const activityContent = verifiedLesson ? verifiedLesson.activity.trim() : '';
  const safeLinks = useMemo(
    () => (verifiedLesson ? parseSafeLinks(verifiedLesson.links) : []),
    [verifiedLesson]
  );

  const hasPrompt = promptContent.length > 0;
  const hasActivity = activityContent.length > 0;
  const hasLinks = safeLinks.length > 0;
  const hasAnyContent = hasPrompt || hasActivity || hasLinks;

  const lessonHeadingTitle =
    verifiedLesson?.title || selectedSummary?.title || '';

  return (
    <>
      <PageHead
        title="Daily Learning | BlankJeeba"
        description="Daily English speaking prompts and practice activities for BlankJeeba students."
        indexable={false}
        canonicalBasePath="/page1"
      />

      <div className="min-h-[75vh] w-full overflow-x-clip font-['Inter','Noto_Sans_Devanagari','Kohinoor_Devanagari','Nirmala_UI','Mangal',system-ui,sans-serif] text-base">
        <div className="mx-auto w-full max-w-3xl px-4 pb-12 pt-4 sm:px-6 sm:pb-16 sm:pt-6">
          {/* Top utility row: preserved small Home button linking to "/" */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              to="/"
              aria-label="Home"
              title="Home"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-900/10 bg-white text-[#475569] transition-colors duration-150 hover:border-[#4F46E5]/50 hover:text-[#0F172A] active:scale-[0.98] dark:border-white/[0.08] dark:bg-[#11141F] dark:text-[#9AA0B4] dark:hover:border-white/20 dark:hover:text-[#F3F4F8]"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
            </Link>

            {days.length > 0 && selectedDay !== null && (
              <p className="text-sm font-medium tabular-nums text-[#475569] dark:text-[#9AA0B4]">
                Day {selectedDay}
                <span className="mx-1.5 opacity-50" aria-hidden="true">
                  ·
                </span>
                {currentIndex + 1} of {days.length}
              </p>
            )}
          </div>

          {/* 1. Title area */}
          <header className="mb-6">
            <h1 className="text-3xl font-semibold tracking-tight text-[#0F172A] dark:text-[#F3F4F8] sm:text-4xl">
              Daily Learning
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
              Pick your day. Copy the prompt. Paste it in your AI app and speak.
            </p>
          </header>

          {/* 6. Collapsible 'How to use' box (collapsed by default) */}
          <section className="mb-6" aria-label="How to use guide">
            <div className="overflow-hidden rounded-2xl border border-slate-900/10 bg-white dark:border-white/[0.08] dark:bg-[#11141F]">
              <button
                type="button"
                onClick={() => setHowToUseOpen((prev) => !prev)}
                aria-expanded={howToUseOpen}
                aria-controls="how-to-use-steps"
                className="flex min-h-[48px] w-full items-center justify-between gap-3 px-4 py-3 text-left text-base font-medium text-[#0F172A] transition-colors duration-150 hover:bg-slate-50 dark:text-[#F3F4F8] dark:hover:bg-white/[0.03]"
              >
                <span className="inline-flex items-center gap-2.5">
                  <HelpCircle
                    className="h-5 w-5 shrink-0 text-[#4F46E5] dark:text-[#8B84FF]"
                    aria-hidden="true"
                  />
                  <span>How to use</span>
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-[#475569] transition-transform duration-200 dark:text-[#9AA0B4] ${
                    howToUseOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {howToUseOpen && (
                <div
                  id="how-to-use-steps"
                  className="border-t border-slate-900/10 px-4 py-4 dark:border-white/[0.08]"
                >
                  <ol className="space-y-2.5 text-base leading-relaxed text-[#334155] dark:text-[#CBD5E1]">
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold tabular-nums text-[#4F46E5] dark:text-[#8B84FF]">
                        1)
                      </span>
                      <span>Choose your day</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold tabular-nums text-[#4F46E5] dark:text-[#8B84FF]">
                        2)
                      </span>
                      <span>Tap Copy Prompt</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="font-semibold tabular-nums text-[#4F46E5] dark:text-[#8B84FF]">
                        3)
                      </span>
                      <span>Open your AI app, paste, and start speaking.</span>
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </section>

          {/* Initial list loading skeleton */}
          {listLoading && (
            <div className="space-y-4" aria-busy="true" aria-label="Loading lessons">
              <div className="h-14 w-full animate-pulse rounded-2xl border border-slate-900/10 bg-white dark:border-white/[0.08] dark:bg-[#11141F]" />
              <div className="grid grid-cols-2 gap-3">
                <div className="h-12 animate-pulse rounded-xl border border-slate-900/10 bg-white dark:border-white/[0.08] dark:bg-[#11141F]" />
                <div className="h-12 animate-pulse rounded-xl border border-slate-900/10 bg-white dark:border-white/[0.08] dark:bg-[#11141F]" />
              </div>
              <div className="rounded-2xl border border-slate-900/10 bg-white p-5 dark:border-white/[0.08] dark:bg-[#11141F] sm:p-6">
                <div className="h-5 w-24 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                <div className="mt-3 h-7 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                <div className="mt-6 h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-white/10 sm:w-48" />
                <div className="mt-4 space-y-2.5">
                  <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                  <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                </div>
              </div>
            </div>
          )}

          {/* Initial list error state */}
          {!listLoading && listError && (
            <div
              role="alert"
              className="rounded-2xl border border-rose-500/25 bg-white p-6 dark:bg-[#11141F]"
            >
              <div className="flex items-start gap-3">
                <AlertCircle
                  className="mt-0.5 h-6 w-6 shrink-0 text-rose-500 dark:text-rose-400"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-[#0F172A] dark:text-[#F3F4F8]">
                    Unable to load lessons
                  </h2>
                  <p className="mt-1.5 text-base leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
                    {listError}
                  </p>
                  <button
                    type="button"
                    onClick={() => void fetchDayList()}
                    className="mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-3 text-base font-medium text-white transition-colors duration-150 hover:bg-[#4338CA] active:scale-[0.99] sm:w-auto"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    <span>Try again</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty lesson list fallback */}
          {!listLoading && !listError && days.length === 0 && (
            <div className="rounded-2xl border border-slate-900/10 bg-white p-6 text-base text-[#475569] dark:border-white/[0.08] dark:bg-[#11141F] dark:text-[#9AA0B4]">
              No lessons are available right now.
            </div>
          )}

          {/* Main interactive workspace when day list is ready */}
          {!listLoading && !listError && days.length > 0 && (
            <>
              {/* 2. Day picker controls */}
              <section className="mb-6 space-y-3" aria-label="Choose lesson day">
                {/* Searchable dropdown trigger & panel */}
                <div ref={dropdownContainerRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="listbox"
                    aria-controls="day-picker-listbox"
                    className="flex min-h-[54px] w-full items-center justify-between gap-3 rounded-2xl border border-slate-900/12 bg-white px-4 py-3 text-left text-base font-medium text-[#0F172A] transition-colors duration-150 hover:border-[#4F46E5]/50 dark:border-white/[0.12] dark:bg-[#11141F] dark:text-[#F3F4F8] dark:hover:border-[#8B84FF]/50"
                  >
                    <span className="min-w-0 flex-1 truncate tabular-nums">
                      {selectedSummary
                        ? formatDayOption(selectedSummary.day, selectedSummary.title)
                        : 'Select a day'}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#475569] transition-transform duration-200 dark:text-[#9AA0B4] ${
                        dropdownOpen ? 'rotate-180 text-[#4F46E5] dark:text-[#8B84FF]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {dropdownOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-slate-900/15 bg-white shadow-2xl dark:border-white/[0.14] dark:bg-[#11141F] dark:shadow-[0_20px_50px_rgba(0,0,0,0.65)]">
                      {/* Search input */}
                      <div className="border-b border-slate-900/10 p-3 dark:border-white/[0.08]">
                        <div className="relative flex items-center">
                          <Search
                            className="pointer-events-none absolute left-3.5 h-5 w-5 text-[#64748B] dark:text-[#9AA0B4]"
                            aria-hidden="true"
                          />
                          <input
                            ref={searchInputRef}
                            type="search"
                            inputMode="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search day number or title..."
                            aria-label="Search day number or title"
                            className="min-h-[48px] w-full rounded-xl border border-slate-900/12 bg-[#F8FAFC] pl-11 pr-11 text-base text-[#0F172A] placeholder:text-[#64748B] focus:border-[#4F46E5] focus:outline-none dark:border-white/[0.1] dark:bg-[#171B2B] dark:text-[#F3F4F8] dark:placeholder:text-[#9AA0B4] dark:focus:border-[#8B84FF]"
                          />
                          {searchQuery && (
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery('');
                                searchInputRef.current?.focus();
                              }}
                              aria-label="Clear search"
                              className="absolute right-1.5 inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#64748B] hover:text-[#0F172A] dark:text-[#9AA0B4] dark:hover:text-[#F3F4F8]"
                            >
                              <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Filtered day options */}
                      <div
                        id="day-picker-listbox"
                        role="listbox"
                        aria-label="Available lesson days"
                        className="max-h-72 overflow-y-auto overscroll-contain p-1.5"
                      >
                        {filteredDays.length === 0 ? (
                          <p className="px-4 py-6 text-center text-base text-[#475569] dark:text-[#9AA0B4]">
                            No matching days found.
                          </p>
                        ) : (
                          filteredDays.map((item) => {
                            const isSelected = item.day === selectedDay;
                            return (
                              <button
                                key={item.day}
                                type="button"
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleSelectDay(item.day)}
                                className={`flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left text-base transition-colors duration-150 ${
                                  isSelected
                                    ? 'bg-[#4F46E5]/12 font-semibold text-[#4338CA] dark:bg-[#4F46E5]/25 dark:text-[#F3F4F8]'
                                    : 'text-[#0F172A] hover:bg-slate-100 dark:text-[#E2E8F0] dark:hover:bg-white/[0.06]'
                                }`}
                              >
                                <span className="min-w-0 flex-1 break-words tabular-nums">
                                  {formatDayOption(item.day, item.title)}
                                </span>
                                {isSelected && (
                                  <Check
                                    className="h-5 w-5 shrink-0 text-[#4F46E5] dark:text-[#8B84FF]"
                                    aria-hidden="true"
                                  />
                                )}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Big Previous Day & Next Day buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    disabled={!previousDayItem}
                    onClick={() => {
                      if (previousDayItem) handleSelectDay(previousDayItem.day);
                    }}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-base font-medium text-[#0F172A] transition-colors duration-150 hover:border-[#4F46E5]/50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.1] dark:bg-[#11141F] dark:text-[#F3F4F8] dark:hover:border-[#8B84FF]/50"
                  >
                    <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden="true" />
                    <span className="whitespace-nowrap">Previous Day</span>
                  </button>

                  <button
                    type="button"
                    disabled={!nextDayItem}
                    onClick={() => {
                      if (nextDayItem) handleSelectDay(nextDayItem.day);
                    }}
                    className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-900/12 bg-white px-4 py-3 text-base font-medium text-[#0F172A] transition-colors duration-150 hover:border-[#4F46E5]/50 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/[0.1] dark:bg-[#11141F] dark:text-[#F3F4F8] dark:hover:border-[#8B84FF]/50"
                  >
                    <span className="whitespace-nowrap">Next Day</span>
                    <ChevronRight className="h-5 w-5 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </section>

              {/* 3. Selected day lesson card */}
              {selectedDay !== null && (
                <AnimatePresence mode="wait" initial={false}>
                  <motion.article
                    key={selectedDay}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-2xl border border-slate-900/10 bg-white p-5 dark:border-white/[0.08] dark:bg-[#11141F] sm:p-7"
                  >
                    {/* Card Header: Day number and title */}
                    <div className="pb-5">
                      <p className="text-sm font-semibold tabular-nums text-[#4F46E5] dark:text-[#8B84FF]">
                        Day {selectedDay}
                      </p>
                      {lessonHeadingTitle && (
                        <h2 className="mt-1 break-words text-2xl font-semibold leading-snug text-[#0F172A] dark:text-[#F3F4F8]">
                          {lessonHeadingTitle}
                        </h2>
                      )}
                    </div>

                    {/* Single-day loading skeleton */}
                    {lessonLoading && (
                      <div
                        className="space-y-4 border-t border-slate-900/10 pt-5 dark:border-white/[0.08]"
                        aria-busy="true"
                        aria-label={`Loading Day ${selectedDay}`}
                      >
                        <div className="h-5 w-28 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200 dark:bg-white/10 sm:w-48" />
                        <div className="space-y-2.5 rounded-xl bg-[#F1F5F9] p-4 dark:bg-[#171B2B]">
                          <div className="h-4 w-full animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                          <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                          <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                          <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-white/10" />
                        </div>
                      </div>
                    )}

                    {/* Single-day error state */}
                    {!lessonLoading && lessonError && (
                      <div
                        role="alert"
                        className="border-t border-slate-900/10 pt-5 dark:border-white/[0.08]"
                      >
                        <div className="flex items-start gap-3">
                          <AlertCircle
                            className="mt-0.5 h-5 w-5 shrink-0 text-rose-500 dark:text-rose-400"
                            aria-hidden="true"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-base leading-relaxed text-[#475569] dark:text-[#9AA0B4]">
                              {lessonError}
                            </p>
                            <button
                              type="button"
                              onClick={() => void fetchLessonByDay(selectedDay, true)}
                              className="mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] px-5 py-3 text-base font-medium text-white transition-colors duration-150 hover:bg-[#4338CA] active:scale-[0.99] sm:w-auto"
                            >
                              <RefreshCw className="h-4 w-4" aria-hidden="true" />
                              <span>Try again</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Empty lesson content state */}
                    {!lessonLoading && !lessonError && !hasAnyContent && (
                      <div className="border-t border-slate-900/10 pt-5 dark:border-white/[0.08]">
                        <p className="text-base text-[#475569] dark:text-[#9AA0B4]">
                          No content for this day.
                        </p>
                      </div>
                    )}

                    {/* Lesson sections (only rendered when non-empty) */}
                    {!lessonLoading && !lessonError && hasAnyContent && (
                      <div className="divide-y divide-slate-900/10 border-t border-slate-900/10 dark:divide-white/[0.08] dark:border-white/[0.08]">
                        {/* Section 1: AI Prompt */}
                        {hasPrompt && (
                          <section className="py-6 first:pt-5 last:pb-0">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#F3F4F8]">
                                AI Prompt
                              </h3>

                              <button
                                type="button"
                                onClick={() => void handleCopyPrompt(promptContent)}
                                className={`inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-semibold transition-colors duration-150 active:scale-[0.99] sm:w-auto ${
                                  copied
                                    ? 'bg-emerald-600 text-white hover:bg-emerald-600'
                                    : 'bg-[#4F46E5] text-white hover:bg-[#4338CA]'
                                }`}
                              >
                                {copied ? (
                                  <>
                                    <Check className="h-5 w-5 shrink-0" aria-hidden="true" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-5 w-5 shrink-0" aria-hidden="true" />
                                    <span>Copy Prompt</span>
                                  </>
                                )}
                              </button>
                            </div>

                            <div className="mt-4 rounded-xl bg-[#F1F5F9] p-4 dark:bg-[#171B2B] sm:p-5">
                              <p className="whitespace-pre-wrap break-words text-base leading-[1.7] text-[#0F172A] dark:text-[#F3F4F8]">
                                {promptContent}
                              </p>
                            </div>
                          </section>
                        )}

                        {/* Section 2: Activity */}
                        {hasActivity && (
                          <section className="py-6 first:pt-5 last:pb-0">
                            <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#F3F4F8]">
                              Activity
                            </h3>
                            <p className="mt-3 whitespace-pre-wrap break-words text-base leading-[1.75] text-[#1E293B] dark:text-[#E2E8F0]">
                              {activityContent}
                            </p>
                          </section>
                        )}

                        {/* Section 3: Links */}
                        {hasLinks && (
                          <section className="py-6 first:pt-5 last:pb-0">
                            <h3 className="text-lg font-semibold text-[#0F172A] dark:text-[#F3F4F8]">
                              Links
                            </h3>
                            <ul className="mt-3 space-y-2.5">
                              {safeLinks.map((link, index) => (
                                <li key={`${link.href}-${index}`}>
                                  <a
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-xl border border-slate-900/10 bg-[#F8FAFC] px-4 py-3 text-base font-medium text-[#4338CA] transition-colors duration-150 hover:border-[#4F46E5]/50 hover:bg-[#4F46E5]/5 dark:border-white/[0.08] dark:bg-[#171B2B] dark:text-[#A5B4FC] dark:hover:border-[#8B84FF]/50 dark:hover:text-[#F3F4F8]"
                                  >
                                    <span className="min-w-0 flex-1 break-all">
                                      {link.label}
                                    </span>
                                    <ExternalLink
                                      className="h-4 w-4 shrink-0 opacity-80"
                                      aria-hidden="true"
                                    />
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}
                      </div>
                    )}
                  </motion.article>
                </AnimatePresence>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
