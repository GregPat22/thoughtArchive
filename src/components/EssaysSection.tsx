"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Type,
  Minus,
  Plus,
} from "lucide-react";

const TITLES = [
  "On silence and attention",
  "Notes on building tools",
  "Reading as a form of waiting",
  "Minimal surfaces",
  "The weight of defaults",
  "Local first, again",
  "Drafts and permanence",
  "Margin and line length",
  "In praise of constraints",
  "The ethics of slowness",
  "What we leave in the margins",
  "Tools and their defaults",
  "Against infinite scroll",
  "Paper as interface",
  "Handwriting and memory",
  "The shape of a year",
  "Rereading",
  "Unfinished thoughts",
  "Quiet interfaces",
  "Distance and clarity",
  "Small systems",
  "On not publishing",
  "Lists and order",
  "The cost of attention",
  "Minimalism as constraint",
  "Waiting as practice",
  "Local coherence",
  "Friction and intention",
  "Single-purpose tools",
  "The weight of choice",
  "Blank space",
  "Repetition and ritual",
  "Slow computation",
  "Analog residues",
  "Limited surfaces",
  "Margin of error",
  "Placeholder",
  "Draft mode",
  "Incomplete",
  "To be written",
  "Untitled",
  "Fragment",
  "Note to self",
  "Later",
  "Maybe",
  "\u2014",
];

const YEARS = [
  "2025",
  "2025",
  "2024",
  "2024",
  "2024",
  "2023",
  "2023",
  "2022",
  "\u2014",
];

const FAKE_ESSAYS = TITLES.map((title, i) => ({
  id: String(i + 1),
  title,
  date: YEARS[i % YEARS.length],
}));

type Essay = (typeof FAKE_ESSAYS)[number];

const SCROLL_ZONE_RATIO = 0.28;
const SCROLL_SPEED_BASE = 12;
const SCROLL_SPEED_MAX = 36;
const LERP = 0.28;

const ESSAY_FONT_SIZES = [
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
] as const;
const DEFAULT_FONT_SIZE_INDEX = 1;

export function EssaysSection({ onBack }: { onBack: () => void }) {
  const [hoveredEssay, setHoveredEssay] = useState<Essay | null>(null);
  const [selectedEssay, setSelectedEssay] = useState<Essay | null>(null);
  const [essayFontSizeIndex, setEssayFontSizeIndex] = useState(
    DEFAULT_FONT_SIZE_INDEX
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const displayEssay = hoveredEssay ?? selectedEssay;
  const listRef = useRef<HTMLDivElement>(null);
  const targetSpeedRef = useRef(0);
  const currentSpeedRef = useRef(0);
  const lastTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  // Track if we're on a touch device
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const el = listRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const y = e.clientY - rect.top;
      const h = rect.height;
      const zone = h * SCROLL_ZONE_RATIO;

      if (y < zone) {
        const t = 1 - y / zone;
        targetSpeedRef.current = -(
          SCROLL_SPEED_BASE +
          t * (SCROLL_SPEED_MAX - SCROLL_SPEED_BASE)
        );
      } else if (y > h - zone) {
        const t = (y - (h - zone)) / zone;
        targetSpeedRef.current =
          SCROLL_SPEED_BASE + t * (SCROLL_SPEED_MAX - SCROLL_SPEED_BASE);
      } else {
        targetSpeedRef.current = 0;
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    targetSpeedRef.current = 0;
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const el = listRef.current;
    if (!el) return;

    const tick = (now: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = now;
      const dt = Math.min(
        Math.max((now - lastTimeRef.current) / 16.66, 0),
        2
      );
      lastTimeRef.current = now;

      const target = targetSpeedRef.current;
      let current = currentSpeedRef.current;
      current += (target - current) * LERP;
      if (Math.abs(current) < 0.3) current = 0;
      currentSpeedRef.current = current;

      if (current !== 0) {
        el.scrollTop += current * Math.min(dt, 2);
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  // Mobile: stacked view (list OR detail)
  if (isMobile) {
    return (
      <div className="flex min-h-dvh w-full flex-col bg-transparent">
        <AnimatePresence mode="wait">
          {selectedEssay ? (
            <motion.div
              key={`essay-${selectedEssay.id}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{
                type: "spring",
                bounce: 0.08,
                stiffness: 320,
                damping: 32,
              }}
              className="flex min-h-dvh flex-col"
            >
              {/* Mobile top bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setSelectedEssay(null)}
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors active:text-foreground/90"
                >
                  <ChevronLeft className="size-4 shrink-0" aria-hidden />
                  <span>Essays</span>
                </button>
                <div className="flex items-center gap-1">
                  <Type
                    className="mr-1 size-3.5 shrink-0 text-foreground/50"
                    aria-hidden
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setEssayFontSizeIndex((i) => (i > 0 ? i - 1 : i))
                    }
                    disabled={essayFontSizeIndex === 0}
                    className="flex size-9 items-center justify-center text-foreground/70 transition-colors active:bg-foreground/10 disabled:opacity-40 disabled:pointer-events-none"
                    aria-label="Decrease text size"
                  >
                    <Minus className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setEssayFontSizeIndex((i) =>
                        i < ESSAY_FONT_SIZES.length - 1 ? i + 1 : i
                      )
                    }
                    disabled={
                      essayFontSizeIndex === ESSAY_FONT_SIZES.length - 1
                    }
                    className="flex size-9 items-center justify-center text-foreground/70 transition-colors active:bg-foreground/10 disabled:opacity-40 disabled:pointer-events-none"
                    aria-label="Increase text size"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              {/* Mobile essay content */}
              <article className="flex-1 px-5 py-6">
                <header className="mb-6">
                  <h2 className="text-xl font-normal tracking-tight text-foreground/95">
                    {selectedEssay.title}
                  </h2>
                  <p className="mt-2 text-xs font-medium uppercase tracking-widest text-foreground/45">
                    {selectedEssay.date}
                  </p>
                </header>
                <div
                  className={`leading-relaxed text-foreground/80 ${ESSAY_FONT_SIZES[essayFontSizeIndex]}`}
                >
                  <p>
                    Essay content would appear here. This is a placeholder for
                    the full text of &ldquo;{selectedEssay.title}&rdquo; — you
                    can replace this with real content or fetch it by essay id
                    when you have a backend or markdown source.
                  </p>
                  <p className="mt-4">
                    Tap another title to switch, or tap the back button to
                    return to the list.
                  </p>
                </div>
              </article>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{
                type: "spring",
                bounce: 0.08,
                stiffness: 320,
                damping: 32,
              }}
              className="flex min-h-dvh flex-col"
            >
              {/* Mobile list header */}
              <div className="sticky top-0 z-20 flex items-center border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors active:text-foreground/90"
                >
                  <ChevronLeft className="size-4 shrink-0" aria-hidden />
                  <span>Back</span>
                </button>
              </div>
              {/* Mobile essay list */}
              <div className="flex-1 overflow-y-auto px-4 py-4">
                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-foreground/50">
                  Essays
                </p>
                <ul className="flex flex-col gap-1">
                  {FAKE_ESSAYS.map((essay) => {
                    return (
                      <li key={essay.id}>
                        <button
                          type="button"
                          className="flex w-full items-baseline justify-between gap-3 py-3 text-left text-foreground/95 transition-colors active:text-[#ffaa00]"
                          onClick={() => setSelectedEssay(essay)}
                        >
                          <span className="font-normal">{essay.title}</span>
                          <span className="shrink-0 text-sm text-foreground/45">
                            {essay.date}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop: sidebar + content layout
  return (
    <div className="flex min-h-dvh w-full bg-transparent">
      <div
        style={{
          maxHeight: "100dvh",
          width: sidebarCollapsed ? 4 : 352,
          minWidth: sidebarCollapsed ? 4 : 352,
          transition:
            "width 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94), min-width 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        className="relative flex shrink-0 flex-col border-r border-foreground/15"
      >
        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setSidebarCollapsed((c) => !c)}
          className="absolute right-0 top-1/2 z-20 flex size-7 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/15 bg-background text-foreground/40 shadow-sm transition-colors hover:text-foreground"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="size-3.5" aria-hidden />
          ) : (
            <ChevronLeft className="size-3.5" aria-hidden />
          )}
        </button>
        {/* Inner wrapper clips content during animation */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <div
            ref={listRef}
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-3 pl-2.5 pr-2"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="mb-3 flex items-center gap-1.5">
              <button
                type="button"
                onClick={onBack}
                className="flex min-w-0 flex-1 items-center gap-1.5 text-left text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground/90"
              >
                <ChevronLeft className="size-3.5 shrink-0" aria-hidden />
                {!sidebarCollapsed && <span>Back</span>}
              </button>
            </div>
            {!sidebarCollapsed && (
              <>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/50">
                  Essays
                </p>
                <ul className="flex flex-col gap-2 pb-6">
                  {FAKE_ESSAYS.map((essay) => {
                    const isSelected = selectedEssay?.id === essay.id;
                    const isHovered = hoveredEssay?.id === essay.id;
                    const isHighlighted = isSelected || isHovered;
                    return (
                      <li key={essay.id} className="min-w-0">
                        <a
                          href="#"
                          role="button"
                          className={`block no-underline transition-colors ${
                            isHighlighted
                              ? "font-medium text-[#ffaa00]"
                              : "text-foreground/95 hover:text-[#ffaa00]"
                          }`}
                          onMouseEnter={() => setHoveredEssay(essay)}
                          onMouseLeave={() => setHoveredEssay(null)}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedEssay((prev) =>
                              prev?.id === essay.id ? null : essay
                            );
                          }}
                        >
                          <span className="font-normal">{essay.title}</span>
                          <span className="ml-2 text-foreground/45">
                            {essay.date}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="relative min-w-0 flex-1">
        {/* Control bar: visible only when an essay is open */}
        <AnimatePresence>
          {displayEssay && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-md border border-foreground/15 bg-background/95 px-3 py-2 shadow-sm backdrop-blur-sm"
              aria-label="Essay text controls"
            >
              <Type
                className="size-4 shrink-0 text-foreground/50"
                aria-hidden
              />
              <span className="text-xs font-medium uppercase tracking-wider text-foreground/60">
                Text
              </span>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() =>
                    setEssayFontSizeIndex((i) => (i > 0 ? i - 1 : i))
                  }
                  disabled={essayFontSizeIndex === 0}
                  className="flex size-8 items-center justify-center rounded text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Decrease text size"
                >
                  <Minus className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEssayFontSizeIndex((i) =>
                      i < ESSAY_FONT_SIZES.length - 1 ? i + 1 : i
                    )
                  }
                  disabled={essayFontSizeIndex === ESSAY_FONT_SIZES.length - 1}
                  className="flex size-8 items-center justify-center rounded text-foreground/70 transition-colors hover:bg-foreground/10 hover:text-foreground disabled:opacity-40 disabled:pointer-events-none"
                  aria-label="Increase text size"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {displayEssay ? (
            <motion.article
              key={displayEssay.id}
              initial={{
                opacity: 0,
                x: -16,
                clipPath: "inset(0 100% 0 0)",
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                clipPath: "inset(0 0 0 0)",
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: 12,
                clipPath: "inset(0 0 0 100%)",
                filter: "blur(4px)",
              }}
              transition={{
                type: "spring",
                bounce: 0.08,
                stiffness: 320,
                damping: 32,
              }}
              className="absolute inset-0 overflow-y-auto py-8 pl-6 pr-10"
              style={{ willChange: "transform, opacity, filter, clip-path" }}
            >
              <header className="mb-8 pr-48">
                <h2 className="text-xl font-normal tracking-tight text-foreground/95">
                  {displayEssay.title}
                </h2>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-foreground/45">
                  {displayEssay.date}
                </p>
              </header>
              <div
                className={`prose prose-neutral max-w-none leading-relaxed text-foreground/80 ${ESSAY_FONT_SIZES[essayFontSizeIndex]}`}
              >
                <p>
                  Essay content would appear here. This is a placeholder for the
                  full text of &ldquo;{displayEssay.title}&rdquo; — you can
                  replace this with real content or fetch it by essay id when
                  you have a backend or markdown source.
                </p>
                <p className="mt-4">
                  {selectedEssay
                    ? "Click another title to switch, or click the same title again to close."
                    : "Click a title to open it, or hover to preview."}
                </p>
              </div>
            </motion.article>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center py-8"
            >
              <p className="text-xs font-medium uppercase tracking-widest text-foreground/30">
                Click or hover an essay to read
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
