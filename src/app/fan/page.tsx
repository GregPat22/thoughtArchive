"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ChevronLeft, Heart } from "lucide-react";
import { AccessLogoutButton } from "@/components/AccessLogoutButton";

const CORGI_BG =
  "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=1920&q=80";

export default function FanPage() {
  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-[#050b14]">
      {/* Corgi background — soft, decorative */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${CORGI_BG})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(95%_120%_at_8%_8%,rgba(0,203,255,0.14),transparent_58%),radial-gradient(70%_95%_at_92%_92%,rgba(82,94,255,0.12),transparent_58%)]" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-20 flex items-center border-b border-cyan-300/15 bg-[#050b14]/70 px-4 py-3 backdrop-blur-sm sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-cyan-300/70 transition-colors hover:text-cyan-200"
          >
            <ChevronLeft className="size-4 shrink-0" aria-hidden />
            <span>Back</span>
          </Link>
          <div className="ml-auto">
            <AccessLogoutButton />
          </div>
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
                className="size-14 fill-cyan-300/75 text-cyan-300/75"
                aria-hidden
              />
            </motion.span>
            <h1 className="text-3xl font-normal tracking-tight text-cyan-50 sm:text-4xl">
              Fan page
            </h1>
            <p className="text-lg leading-relaxed text-cyan-100/80">
              A little corner to enjoy. Corgis, good vibes, and nothing else.
            </p>
            <motion.p
              className="text-sm text-cyan-300/60"
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
