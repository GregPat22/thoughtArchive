"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Dashboard } from "@/components/Dashboard";
import { WhoSection } from "@/components/WhoSection";
import { LocationMapSection } from "@/components/LocationMapSection";
import {
  IDENTITY_MODES,
  INITIAL_COPY,
  LIVE_DIARY_BY_DATE,
  LIVE_DIARY_LINES,
  SECRET_COMMAND,
  SECRET_FRAGMENT,
} from "@/content/artDirection";

const borderFillTransition = {
  duration: 0.26,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

type View = "hero" | "dashboard" | "who";

function getLocalDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function Home() {
  const [view, setView] = useState<View>("hero");
  const [dayKey, setDayKey] = useState(() => Math.floor(Date.now() / 86400000));
  const [mode, setMode] = useState<keyof typeof IDENTITY_MODES>("engineer");
  const [secretInput, setSecretInput] = useState("");
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [secretError, setSecretError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setDayKey(Math.floor(Date.now() / 86400000));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const goToDashboard = () => setView("dashboard");
  const goToWho = () => setView("who");
  const goToHero = () => setView("hero");
  const today = new Date();
  const todayKey = getLocalDateKey(today);
  const liveDiaryLine =
    LIVE_DIARY_BY_DATE[todayKey] ??
    LIVE_DIARY_LINES[
      ((dayKey % LIVE_DIARY_LINES.length) + LIVE_DIARY_LINES.length) %
        LIVE_DIARY_LINES.length
    ];
  const liveDiaryDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const handleSecretSubmit = () => {
    if (secretInput.trim().toLowerCase() === SECRET_COMMAND) {
      setSecretUnlocked(true);
      setSecretError(false);
      return;
    }
    setSecretUnlocked(false);
    setSecretError(true);
  };

  return (
    <main className="relative min-h-dvh w-full overflow-x-hidden overflow-y-auto">
      <AnimatePresence mode="wait">
        {view === "hero" ? (
          <motion.div
            key="hero"
            className="relative flex min-h-dvh flex-col items-center justify-start overflow-x-hidden px-4 pb-[max(6.5rem,env(safe-area-inset-bottom))] pt-[max(3.75rem,env(safe-area-inset-top))] sm:px-6 sm:pt-20 sm:pb-24 lg:justify-center"
            initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: -10,
              filter: "blur(3px)",
              transition: {
                duration: 0.28,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(95%_120%_at_8%_8%,rgba(0,203,255,0.18),transparent_58%),radial-gradient(70%_95%_at_92%_92%,rgba(82,94,255,0.14),transparent_58%)]"
              animate={{ opacity: [0.75, 0.95, 0.75] }}
              transition={{
                duration: 6.8,
                ease: "easeInOut",
                repeat: Infinity,
              }}
              style={{ willChange: "opacity" }}
            />
            <motion.span
              className="relative z-20 mb-2 text-center text-sm font-normal tracking-wide text-cyan-100/85 sm:absolute sm:inset-x-0 sm:top-6 sm:mb-0 sm:text-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Greg Patini
            </motion.span>

            <p className="relative z-10 max-w-xl text-center text-base font-normal tracking-normal text-cyan-50/90 sm:text-lg">
              {INITIAL_COPY.hero.statement}
            </p>

            <motion.div
              key={dayKey}
              className="relative z-10 mt-4 w-full max-w-xl border border-cyan-300/15 bg-[#050b14]/45 px-4 py-3 backdrop-blur-sm sm:mt-6 sm:px-5"
              initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <div className="mb-1.5 flex items-center justify-between gap-2 text-[9px] uppercase tracking-[0.18em] text-cyan-300/50 sm:text-[10px] sm:tracking-[0.2em]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-flex size-1.5 rounded-full bg-cyan-300/80" />
                  Live diary
                </span>
                <span className="shrink-0">{liveDiaryDate}</span>
              </div>
              <p className="text-sm leading-relaxed text-cyan-50/82">
                {liveDiaryLine}
              </p>
            </motion.div>

            <motion.div
              className="relative z-10 mt-3 w-full max-w-xl space-y-3 sm:mt-4 sm:space-y-4"
              initial={{ opacity: 0, y: 6, filter: "blur(2px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.06, duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              <LocationMapSection />

              <div className="border border-cyan-300/15 bg-[#050b14]/45 px-4 py-3 backdrop-blur-sm sm:px-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300/50">
                  Modes
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(IDENTITY_MODES).map(([key, entry]) => {
                    const isActive = mode === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setMode(key as keyof typeof IDENTITY_MODES)}
                        className={`border px-3 py-1.5 text-xs tracking-wide transition-colors ${
                          isActive
                            ? "border-cyan-300/45 bg-cyan-300/15 text-cyan-100"
                            : "border-cyan-300/20 bg-transparent text-cyan-200/70 hover:border-cyan-300/35 hover:text-cyan-100"
                        }`}
                      >
                        {entry.label}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cyan-50/82">
                  {IDENTITY_MODES[mode].statement}
                </p>
              </div>

              <div className="border border-cyan-300/15 bg-[#050b14]/45 px-4 py-3 backdrop-blur-sm sm:px-5">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-cyan-300/50">
                  Open fragment
                </p>
                <div className="flex items-center gap-2 border border-cyan-300/20 bg-[#050b14]/70 px-3 py-2">
                  <span className="text-cyan-300/65">$</span>
                  <input
                    value={secretInput}
                    onChange={(e) => setSecretInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleSecretSubmit();
                      }
                    }}
                    className="w-full bg-transparent text-sm text-cyan-50/90 outline-none placeholder:text-cyan-300/35"
                    placeholder={SECRET_COMMAND}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                {secretError && (
                  <p className="mt-2 text-xs text-cyan-300/60">
                    Unknown command. Try the exact signal.
                  </p>
                )}
                <AnimatePresence>
                  {secretUnlocked && (
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -2 }}
                      transition={{ duration: 0.24 }}
                      className="mt-2 text-sm leading-relaxed text-cyan-100/90"
                    >
                      {SECRET_FRAGMENT}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              className="relative z-10 mb-3 mt-6 sm:mb-14 sm:mt-10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <motion.div
                className="relative inline-block"
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: {
                    transition: { staggerChildren: 0, staggerDirection: -1 },
                  },
                  hover: {
                    transition: { staggerChildren: 0.04, delayChildren: 0 },
                  },
                }}
              >
                <motion.span
                  className="pointer-events-none absolute left-0 top-0 right-0 h-[2px] bg-cyan-300/80"
                  style={{ transformOrigin: "left", willChange: "transform" }}
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={borderFillTransition}
                />
                <motion.span
                  className="pointer-events-none absolute top-0 right-0 bottom-0 w-[2px] bg-cyan-300/80"
                  style={{ transformOrigin: "top", willChange: "transform" }}
                  variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                  transition={borderFillTransition}
                />
                <motion.span
                  className="pointer-events-none absolute left-0 right-0 bottom-0 h-[2px] bg-cyan-300/80"
                  style={{ transformOrigin: "right", willChange: "transform" }}
                  variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                  transition={borderFillTransition}
                />
                <motion.span
                  className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-300/80"
                  style={{ transformOrigin: "bottom", willChange: "transform" }}
                  variants={{ rest: { scaleY: 0 }, hover: { scaleY: 1 } }}
                  transition={borderFillTransition}
                />

                <motion.button
                  type="button"
                  onClick={goToDashboard}
                  className="relative z-10 inline-block border-0 bg-cyan-300/10 px-7 py-3 text-sm font-medium text-cyan-50/95 outline-none transition-colors hover:bg-cyan-300/15 focus-visible:ring-2 focus-visible:ring-cyan-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050b14] sm:px-8 sm:py-3.5 sm:text-base"
                  style={{ willChange: "transform, box-shadow" }}
                  initial={false}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 12px 42px rgba(103,232,249,0.22)",
                    transition: { duration: 0.22 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {INITIAL_COPY.hero.cta}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : view === "dashboard" ? (
          <motion.div
            key="dashboard"
            className="min-h-dvh w-full"
            initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <Dashboard onBack={goToHero} onWho={goToWho} />
          </motion.div>
        ) : (
          <motion.div
            key="who"
            className="min-h-dvh w-full"
            initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ willChange: "transform, opacity, filter" }}
          >
            <WhoSection onBack={goToDashboard} />
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
