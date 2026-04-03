"use client";

import { motion } from "motion/react";
import { ChevronLeft, Terminal } from "lucide-react";
import { GeistMono } from "geist/font/mono";
import { AccessLogoutButton } from "@/components/AccessLogoutButton";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 28,
    },
  },
};

interface DashboardProps {
  onBack: () => void;
  onWho: () => void;
}

export function Dashboard({ onBack, onWho }: DashboardProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col">
      <div className="sticky top-0 z-20 flex items-center bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground/90"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span>Back</span>
        </button>
        <div className="ml-auto">
          <AccessLogoutButton />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <motion.div
          className="w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            type="button"
            onClick={onWho}
            variants={cardVariants}
            whileHover={{
              y: -4,
              scale: 1.008,
              boxShadow: "0px 24px 70px rgba(76, 203, 255, 0.22)",
              transition: { type: "spring", stiffness: 220, damping: 20 },
            }}
            whileTap={{ scale: 0.992 }}
            className={`${GeistMono.className} group relative flex min-h-[250px] w-full items-center justify-between overflow-hidden border border-cyan-400/25 bg-[#050b14] p-6 text-left md:min-h-[310px] md:p-10`}
            style={{ willChange: "transform, box-shadow" }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_120%_at_10%_10%,rgba(0,203,255,0.18),transparent_58%),radial-gradient(70%_90%_at_90%_90%,rgba(82,94,255,0.16),transparent_60%)]"
              animate={{ opacity: [0.72, 0.9, 0.72] }}
              transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
              style={{ willChange: "opacity" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-y-[-20%] left-0 w-[30vw] max-w-[360px] bg-linear-to-r from-transparent via-cyan-300/18 to-transparent blur-2xl"
              animate={{ x: ["-40vw", "140vw"] }}
              transition={{ duration: 4.2, ease: "linear", repeat: Infinity }}
              style={{ willChange: "transform" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,205,255,0.12)_50%,transparent_100%)] opacity-0"
              whileHover={{ opacity: 1, y: [0, 6, 0] }}
              transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity }}
              style={{ willChange: "opacity, transform" }}
            />

            <div className="relative z-10 flex items-center gap-5">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{ willChange: "transform" }}
              >
                <Terminal className="size-5 shrink-0 text-cyan-300/80" aria-hidden />
              </motion.div>

              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.24em] text-cyan-300/65">
                  Identity Interface
                </p>
                <h2 className="text-xl font-normal tracking-tight text-foreground sm:text-2xl">
                  Who I am
                </h2>
                <p className="max-w-lg text-sm leading-relaxed text-foreground/60">
                  A terminal profile in motion. Type{" "}
                  <code className="font-mono text-cyan-200/85">/who</code> to enter.
                </p>
              </div>
            </div>

            <motion.span
              className="relative z-10 hidden border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-200/90 sm:block"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              style={{ willChange: "transform" }}
            >
              Enter &rarr;
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
