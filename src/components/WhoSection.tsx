"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GeistMono } from "geist/font/mono";
import { ChevronLeft } from "lucide-react";

const BIO_TEXT = `I build things that sit at the intersection of design and engineering — tools, interfaces, small systems that try to respect the people who use them.

I care about clarity. About removing what doesn't need to be there. About the weight a default carries when most people never change it.

I grew up reading more than talking. I learned to code because I wanted to make the things I imagined actually exist. Not for scale, not for growth metrics — for the feeling of something working exactly the way it should.

I think a lot about constraints. How limitation breeds intention. How a blank page is harder than a narrow prompt. How the best tools disappear into the act of using them.

I write sometimes. Not to publish, mostly to think. The essays here are the ones that survived the drafts folder. The rest are still becoming something.

I believe in local-first software, in slow computation, in the ethics of not demanding attention. I believe the best interfaces are quiet ones.

This site is a small room. You're welcome to stay.`;

// ASCII rocket art — monospaced
const ASCII_ROCKET = [
  "      /\\      ",
  "     /  \\     ",
  "    / WHO\\    ",
  "   |      |   ",
  "   |      |   ",
  "   | .__. |   ",
  "   |  ||  |   ",
  "  /|  ||  |\\  ",
  " / |______| \\ ",
  "|   ______   |",
  " \\_/      \\_/ ",
];

const ASCII_FLAME_FRAMES = [
  [
    "    \\  ||  /  ",
    "     \\ || /   ",
    "      )  (    ",
    "      \\  /    ",
    "       \\/     ",
  ],
  [
    "    ) \\||/ (  ",
    "     \\)  (/   ",
    "      \\  /    ",
    "       ||     ",
    "       \\/     ",
    "       .      ",
  ],
  [
    "   )\\ \\||/ /( ",
    "    \\ \\)(/ /  ",
    "     ) || (   ",
    "      \\  /    ",
    "       \\/     ",
    "       :      ",
    "       .      ",
  ],
];

type Phase = "terminal" | "rocket" | "bio";

// Particle burst on launch
function LaunchParticles() {
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.3;
    const dist = 30 + Math.random() * 100;
    return {
      id: i,
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist * 0.6 + Math.random() * 30,
      size: 1.5 + Math.random() * 2.5,
      delay: Math.random() * 0.15,
    };
  });

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute left-1/2 top-1/2 rounded-full bg-[#64b5f6]"
          style={{ width: p.size, height: p.size }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{ opacity: 0, x: p.x, y: p.y, scale: 0 }}
          transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </>
  );
}

export function WhoSection({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>("terminal");
  const [inputValue, setInputValue] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [displayedBio, setDisplayedBio] = useState("");
  const [bioComplete, setBioComplete] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [flameFrame, setFlameFrame] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const bioIndexRef = useRef(0);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (phase === "terminal") inputRef.current?.focus();
  }, [phase]);

  // Flame animation during rocket phase
  useEffect(() => {
    if (phase !== "rocket") return;
    const interval = setInterval(() => {
      setFlameFrame((f) => (f + 1) % ASCII_FLAME_FRAMES.length);
    }, 100);
    return () => clearInterval(interval);
  }, [phase]);

  // Show bio after rocket has visually left the viewport
  useEffect(() => {
    if (phase !== "rocket") return;
    const timeout = setTimeout(() => setShowBio(true), 2000);
    return () => clearTimeout(timeout);
  }, [phase]);

  // Bio typewriter effect
  useEffect(() => {
    if (!showBio) return;
    bioIndexRef.current = 0;
    setDisplayedBio("");
    setBioComplete(false);

    const tick = () => {
      const idx = bioIndexRef.current;
      if (idx >= BIO_TEXT.length) {
        setBioComplete(true);
        return;
      }
      const ch = BIO_TEXT.charAt(idx);
      const chunk = ch === "\n" ? 1 : Math.min(1 + Math.floor(Math.random() * 2), BIO_TEXT.length - idx);
      bioIndexRef.current = idx + chunk;
      setDisplayedBio(BIO_TEXT.slice(0, bioIndexRef.current));
      const delay = ch === "\n" ? 120 : ch === "." ? 80 : 18 + Math.random() * 14;
      setTimeout(tick, delay);
    };
    const start = setTimeout(tick, 400);
    return () => clearTimeout(start);
  }, [showBio]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim().toLowerCase() === "/who") {
      setPhase("rocket");
    }
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleContainerClick = () => {
    if (phase === "terminal") inputRef.current?.focus();
  };

  return (
    <div
      className={`${GeistMono.className} relative flex min-h-screen w-full flex-col overflow-hidden`}
      style={{ background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 40%, #0a1628 100%)" }}
      onClick={handleContainerClick}
    >
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(100,181,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(100,181,246,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Scanline effect */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(100,181,246,0.1) 2px, rgba(100,181,246,0.1) 4px)",
        }}
      />

      {/* Top bar */}
      <div className="relative z-20 flex items-center border-b border-[#64b5f6]/10 px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-[#64b5f6]/50 transition-colors hover:text-[#64b5f6]/90"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span>Back</span>
        </button>
        <div className="ml-auto flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#64b5f6]/40" />
          <span className="text-[10px] uppercase tracking-widest text-[#64b5f6]/30">
            terminal v1.0
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-20 flex flex-1 items-center justify-center px-4 sm:px-6">
        {/* ── Terminal input ── */}
        <AnimatePresence>
          {phase === "terminal" && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="flex w-full max-w-2xl flex-col items-center gap-8"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xs tracking-wider text-[#64b5f6]/30"
              >
                type a command to begin
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex w-full items-center gap-2 border border-[#64b5f6]/15 bg-[#0a1628]/80 px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-4"
              >
                <span className="select-none text-sm text-[#64b5f6]/50 sm:text-base">
                  $
                </span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-sm text-[#e0e0e0] caret-transparent outline-none placeholder:text-[#64b5f6]/20 sm:text-base"
                    placeholder="/who"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <span
                    className="pointer-events-none absolute top-0 text-sm text-[#64b5f6] sm:text-base"
                    style={{
                      left: `${inputValue.length}ch`,
                      opacity: cursorVisible ? 1 : 0,
                    }}
                  >
                    ▌
                  </span>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="text-[10px] tracking-widest text-[#64b5f6]/20"
              >
                hint: /who
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── ASCII Rocket (absolute overlay, flies up while bio appears beneath) ── */}
        <AnimatePresence>
          {phase === "rocket" && (
            <motion.div
              key="rocket"
              className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative flex flex-col items-center"
                initial={{ y: 0 }}
                animate={{ y: "-130vh" }}
                transition={{
                  duration: 10,
                  ease: [0.15, 0, 0.1, 1],
                }}
              >
                <pre
                  className="select-none text-center text-xs leading-[1.15] text-[#64b5f6] sm:text-sm sm:leading-[1.2]"
                  style={{ textShadow: "0 0 12px rgba(100,181,246,0.4)" }}
                >
                  {ASCII_ROCKET.join("\n")}
                </pre>
                <pre
                  className="select-none text-center text-xs leading-[1.15] text-[#ffaa00] sm:text-sm sm:leading-[1.2]"
                  style={{ textShadow: "0 0 16px rgba(255,170,0,0.5)" }}
                >
                  {ASCII_FLAME_FRAMES[flameFrame].join("\n")}
                </pre>
              </motion.div>

              <div className="pointer-events-none absolute inset-0">
                <LaunchParticles />
              </div>

              <motion.div
                className="pointer-events-none fixed inset-0 z-50"
                animate={{
                  x: [0, -2, 3, -1, 2, -1, 0],
                  y: [0, 1, -3, 2, -1, 1, 0],
                }}
                transition={{ duration: 0.5, delay: 0.05 }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bio typewriter (appears while rocket is still flying) ── */}
        <AnimatePresence>
          {showBio && (
            <motion.div
              key="bio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex w-full max-w-2xl flex-col gap-6 py-12 sm:py-16"
            >
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="flex items-center gap-3"
              >
                <div className="h-px flex-1 bg-[#64b5f6]/15" />
                <span className="text-xs uppercase tracking-[0.3em] text-[#64b5f6]/40">
                  who am i
                </span>
                <div className="h-px flex-1 bg-[#64b5f6]/15" />
              </motion.div>

              <div className="text-sm leading-[1.9] text-[#c8d6e5]/85 sm:text-base sm:leading-[2]">
                {displayedBio.split("\n").map((line, i) => (
                  <p key={i} className={line === "" ? "h-4" : "mb-3"}>
                    {line}
                  </p>
                ))}
                {!bioComplete && (
                  <span
                    className="inline-block text-[#64b5f6]"
                    style={{ opacity: cursorVisible ? 1 : 0 }}
                  >
                    ▌
                  </span>
                )}
              </div>

              <AnimatePresence>
                {bioComplete && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mt-4 flex items-center gap-2 text-xs text-[#64b5f6]/30"
                  >
                    <span>$</span>
                    <span
                      className="inline-block"
                      style={{ opacity: cursorVisible ? 1 : 0 }}
                    >
                      ▌
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom status bar */}
      <div className="relative z-20 flex items-center justify-between border-t border-[#64b5f6]/10 px-4 py-2 sm:px-6">
        <span className="text-[10px] text-[#64b5f6]/20">session::active</span>
        <span className="text-[10px] text-[#64b5f6]/20">
          {phase === "terminal"
            ? "awaiting input"
            : showBio
              ? "streaming"
              : "launching..."}
        </span>
      </div>
    </div>
  );
}
