"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, Heart } from "lucide-react";

const CORGI_BG =
  "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=1920&q=80";

export default function FanPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-pink-100 via-pink-50 to-rose-200 dark:from-pink-950/95 dark:via-rose-900/90 dark:to-pink-900/95">
      {/* Corgi background — soft, decorative */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-25"
        style={{ backgroundImage: `url(${CORGI_BG})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-linear-to-t from-pink-200/80 via-transparent to-pink-100/60 dark:from-pink-950/90 dark:via-transparent dark:to-pink-900/70" />

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center border-b border-pink-300/30 bg-pink-50/80 px-4 py-3 backdrop-blur-sm dark:border-pink-500/20 dark:bg-pink-950/80 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-pink-700/70 transition-colors hover:text-pink-800 dark:text-pink-300/80 dark:hover:text-pink-200"
          >
            <ChevronLeft className="size-4 shrink-0" aria-hidden />
            <span>Back</span>
          </Link>
        </div>

        {/* Content — enjoy */}
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
          <motion.div
            className="flex max-w-md flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
              delay: 0.1,
            }}
          >
            <motion.span
              className="inline-flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
                delay: 0.25,
              }}
            >
              <Heart
                className="size-14 fill-pink-400 text-pink-400 dark:fill-pink-500 dark:text-pink-500"
                aria-hidden
              />
            </motion.span>
            <h1 className="text-3xl font-normal tracking-tight text-pink-900 dark:text-pink-100 sm:text-4xl">
              Fan page
            </h1>
            <p className="text-lg leading-relaxed text-pink-700/90 dark:text-pink-200/90">
              A little corner to enjoy. Corgis, good vibes, and nothing else.
            </p>
            <motion.p
              className="text-sm text-pink-600/80 dark:text-pink-300/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Stay as long as you like.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
