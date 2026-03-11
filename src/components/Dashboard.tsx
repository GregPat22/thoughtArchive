"use client";

import { motion } from "framer-motion";
import { ChevronLeft, BookOpen, Layers, Terminal } from "lucide-react";
import { GeistMono } from "geist/font/mono";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
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
  onEssays: () => void;
  onWho: () => void;
}

export function Dashboard({ onBack, onEssays, onWho }: DashboardProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 flex items-center border-b border-foreground/10 bg-background/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-foreground/60 transition-colors hover:text-foreground/90"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span>Back</span>
        </button>
      </div>

      {/* Cards grid */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6">
        <motion.div
          className="flex w-full max-w-4xl flex-col gap-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Top row: Essays + Archive */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
            {/* Essays card — spans 7 cols */}
            <motion.button
              type="button"
              onClick={onEssays}
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.03] p-6 text-left transition-colors hover:border-[#ffaa00]/40 hover:bg-foreground/[0.06] md:col-span-7 md:min-h-[280px] md:p-8"
            >
              <div>
                <BookOpen
                  className="mb-4 size-5 text-foreground/40 transition-colors group-hover:text-[#ffaa00]"
                  aria-hidden
                />
                <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                  Essays
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/50">
                  Thoughts on silence, tools, constraints, and everything in
                  between.
                </p>
              </div>
              <span className="mt-6 text-xs font-medium uppercase tracking-widest text-foreground/30 transition-colors group-hover:text-[#ffaa00]/70">
                Read &rarr;
              </span>
            </motion.button>

            {/* Archive card — spans 5 cols */}
            <motion.div
              variants={cardVariants}
              className="relative flex flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.03] p-6 md:col-span-5 md:min-h-[280px] md:p-8"
            >
              <div>
                <Layers
                  className="mb-4 size-5 text-foreground/40"
                  aria-hidden
                />
                <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                  Archive
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-foreground/50">
                  Something new is taking shape here.
                </p>
              </div>
              <span className="mt-6 text-xs font-medium uppercase tracking-widest text-foreground/20">
                Coming soon
              </span>
            </motion.div>
          </div>

          {/* Bottom row: Who I am — full width, wide/short */}
          <motion.button
            type="button"
            onClick={onWho}
            variants={cardVariants}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.99 }}
            className={`${GeistMono.className} group relative flex items-center justify-between overflow-hidden border border-foreground/10 bg-[#0a1628]/60 p-6 text-left transition-colors hover:border-[#64b5f6]/30 hover:bg-[#0a1628]/80 md:p-8`}
          >
            <div className="flex items-center gap-5">
              <Terminal
                className="size-5 shrink-0 text-[#64b5f6]/40 transition-colors group-hover:text-[#64b5f6]"
                aria-hidden
              />
              <div>
                <h2 className="text-lg font-normal tracking-tight text-foreground/90 sm:text-xl">
                  Who I am
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-foreground/50">
                  A terminal experience. Type <code className="font-mono text-[#64b5f6]/60">/who</code> to find out.
                </p>
              </div>
            </div>
            <span className="hidden text-xs font-medium uppercase tracking-widest text-foreground/30 transition-colors group-hover:text-[#64b5f6]/70 sm:block">
              Enter &rarr;
            </span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
