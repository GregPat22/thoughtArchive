"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePageHover } from "@/context/PageHoverContext";
import { EssaysSection } from "@/components/EssaysSection";

const borderFillTransition = {
  duration: 0.26,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

const WORDS = ["truth", "optimism", "humanity", "curiosity", "clarity"];
const SIZES_DESKTOP = [
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
  "text-2xl",
  "text-3xl",
] as const;
const SIZES_MOBILE = [
  "text-xs",
  "text-sm",
  "text-base",
  "text-lg",
  "text-xl",
] as const;

type WordLayout = {
  word: string;
  size: string;
  left: string;
  top: string;
  rotate: number;
};

/** 5 non-overlapping zones for desktop */
const SAFE_ZONES_DESKTOP: {
  leftMin: number;
  leftMax: number;
  topMin: number;
  topMax: number;
}[] = [
  { leftMin: 5, leftMax: 22, topMin: 8, topMax: 24 },
  { leftMin: 78, leftMax: 92, topMin: 8, topMax: 24 },
  { leftMin: 5, leftMax: 22, topMin: 62, topMax: 88 },
  { leftMin: 78, leftMax: 92, topMin: 62, topMax: 88 },
  { leftMin: 30, leftMax: 45, topMin: 8, topMax: 26 },
];

/** Mobile-friendly zones — avoid center where text/button sit */
const SAFE_ZONES_MOBILE: {
  leftMin: number;
  leftMax: number;
  topMin: number;
  topMax: number;
}[] = [
  { leftMin: 5, leftMax: 35, topMin: 8, topMax: 22 },
  { leftMin: 60, leftMax: 90, topMin: 8, topMax: 22 },
  { leftMin: 5, leftMax: 35, topMin: 72, topMax: 90 },
  { leftMin: 60, leftMax: 90, topMin: 72, topMax: 90 },
  { leftMin: 20, leftMax: 50, topMin: 10, topMax: 20 },
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function generateRandomLayouts(mobile: boolean): WordLayout[] {
  const shuffledWords = shuffle(WORDS);
  const zones = mobile ? SAFE_ZONES_MOBILE : SAFE_ZONES_DESKTOP;
  const sizes = mobile ? SIZES_MOBILE : SIZES_DESKTOP;
  return shuffledWords.map((word, i) => {
    const zone = zones[i % zones.length];
    const leftPct =
      zone.leftMin + Math.random() * (zone.leftMax - zone.leftMin);
    const topPct =
      zone.topMin + Math.random() * (zone.topMax - zone.topMin);
    return {
      word,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      left: `${leftPct}%`,
      top: `${topPct}%`,
      rotate: -14 + Math.random() * 28,
    };
  });
}

type View = "hero" | "essays";

export default function Home() {
  const { setHoveringButton, isHoveringButton } = usePageHover();
  const [view, setView] = useState<View>("hero");
  const [wordLayouts, setWordLayouts] = useState<WordLayout[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile) return;
    setWordLayouts(generateRandomLayouts(false));
    setHoveringButton(true);
  }, [setHoveringButton, isMobile]);

  const handleTap = useCallback(() => {
    if (!isMobile) return;
    // On mobile, toggle the word reveal on tap, then navigate
    if (!isHoveringButton) {
      setWordLayouts(generateRandomLayouts(true));
      setHoveringButton(true);
      // Auto-navigate after a brief reveal
      setTimeout(() => {
        setHoveringButton(false);
        setView("essays");
      }, 600);
    }
  }, [isMobile, isHoveringButton, setHoveringButton]);

  const goToEssays = () => {
    setHoveringButton(false);
    setView("essays");
  };
  const goToHero = () => setView("hero");

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {view === "hero" ? (
          <motion.div
            key="hero"
            className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6"
            initial={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: 0,
              transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <p
              className={`relative z-10 max-w-sm text-center text-base font-normal tracking-normal transition-colors duration-300 sm:max-w-none sm:text-lg ${
                isHoveringButton ? "text-[#0a0a0a]" : "text-foreground/90"
              }`}
            >
              This is the digital testimony of my existence.
            </p>

            {/* Floating words on hover/tap */}
            <AnimatePresence>
              {isHoveringButton && (
                <motion.div
                  className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {wordLayouts.map(({ word, size, left, top, rotate }) => (
                    <span
                      key={word}
                      className={`absolute font-medium text-[#0a0a0a] ${size}`}
                      style={{
                        left,
                        top,
                        transform: `rotate(${rotate}deg)`,
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className="relative z-10 mt-10 sm:mt-12"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {/* Desktop: animated border on hover */}
              {!isMobile ? (
                <motion.div
                  className="relative inline-block"
                  initial="rest"
                  whileHover="hover"
                  variants={{
                    rest: {
                      transition: {
                        staggerChildren: 0,
                        staggerDirection: -1,
                      },
                    },
                    hover: {
                      transition: { staggerChildren: 0.04, delayChildren: 0 },
                    },
                  }}
                >
                  <motion.span
                    className="absolute left-0 top-0 right-0 h-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{ transformOrigin: "left", willChange: "transform" }}
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    transition={borderFillTransition}
                  />
                  <motion.span
                    className="absolute top-0 right-0 bottom-0 w-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{ transformOrigin: "top", willChange: "transform" }}
                    variants={{
                      rest: { scaleY: 0 },
                      hover: { scaleY: 1 },
                    }}
                    transition={borderFillTransition}
                  />
                  <motion.span
                    className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{
                      transformOrigin: "right",
                      willChange: "transform",
                    }}
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                    }}
                    transition={borderFillTransition}
                  />
                  <motion.span
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#ffaa00] pointer-events-none"
                    style={{
                      transformOrigin: "bottom",
                      willChange: "transform",
                    }}
                    variants={{
                      rest: { scaleY: 0 },
                      hover: { scaleY: 1 },
                    }}
                    transition={borderFillTransition}
                  />

                  <motion.button
                    type="button"
                    onClick={goToEssays}
                    className={`relative z-10 inline-block cursor-pointer border-0 bg-foreground/5 px-6 py-3 text-sm font-medium no-underline outline-none transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-[#ffaa00] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                      isHoveringButton
                        ? "text-[#0a0a0a]"
                        : "text-foreground/90"
                    }`}
                    style={{ willChange: "transform" }}
                    initial={false}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={() => setHoveringButton(false)}
                  >
                    Know more
                  </motion.button>
                </motion.div>
              ) : (
                /* Mobile: simple button with border, tap navigates */
                <motion.button
                  type="button"
                  onClick={handleTap}
                  className={`relative inline-block cursor-pointer border border-[#ffaa00]/40 bg-foreground/5 px-8 py-4 text-base font-medium no-underline outline-none transition-colors active:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-[#ffaa00] focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isHoveringButton
                      ? "text-[#0a0a0a]"
                      : "text-foreground/90"
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  Know more
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="essays"
            className="min-h-screen w-full"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <EssaysSection onBack={goToHero} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
