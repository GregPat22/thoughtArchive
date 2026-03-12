"use client";

import { motion, AnimatePresence } from "framer-motion";

const RAY_COUNT = 8;

function ray(angle: number): { char: string; dx: number; dy: number } {
  const rad = (angle * Math.PI) / 180;
  const dist = 16;
  return {
    char:
      angle % 90 === 0
        ? angle === 0 || angle === 180
          ? "—"
          : "|"
        : angle === 45 || angle === 225
          ? "/"
          : "\\",
    dx: Math.cos(rad) * dist,
    dy: Math.sin(rad) * dist,
  };
}

const rays = Array.from({ length: RAY_COUNT }, (_, i) => {
  const angle = (360 / RAY_COUNT) * i;
  return { angle, ...ray(angle) };
});

export function AsciiSun({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute right-6 top-14 z-30 sm:right-10 sm:top-16"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="relative flex items-center justify-center" style={{ width: 44, height: 44 }}>
            {/* Core — bigger, bolder */}
            <motion.span
              className="absolute font-mono text-2xl font-black text-amber-300 select-none"
              style={{ textShadow: "0 0 8px rgba(255, 200, 0, 0.6)" }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ✺
            </motion.span>

            {/* Rays — tight around core */}
            {rays.map(({ angle, char, dx, dy }, i) => (
              <motion.span
                key={angle}
                className="absolute font-mono text-sm font-bold text-amber-300 select-none"
                style={{
                  left: `calc(50% + ${dx}px)`,
                  top: `calc(50% + ${dy}px)`,
                  transform: "translate(-50%, -50%)",
                  textShadow: "0 0 4px rgba(255, 200, 0, 0.4)",
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.3, 1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              >
                {char}
              </motion.span>
            ))}

            {/* Glow */}
            <motion.div
              className="absolute rounded-full bg-amber-300/15"
              style={{ width: 32, height: 32 }}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.25, 0.1, 0.25],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
