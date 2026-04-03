"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const navContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.25 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-300/15 bg-[#050b14]/75 backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="/"
            className={cn(
              "text-sm font-medium text-cyan-100/90 transition-colors hover:text-cyan-200"
            )}
          >
            Portfolio
          </Link>
        </motion.div>
        <motion.nav
          className="hidden items-center gap-8 md:flex"
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => (
            <motion.div key={item.href} variants={navItemVariants}>
              <Link
                href={item.href}
                className="text-sm text-cyan-300/70 transition-colors hover:text-cyan-200"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        <button
          type="button"
          aria-label="Menu"
          className="p-2 text-cyan-300/70 hover:bg-cyan-300/10 hover:text-cyan-200 md:hidden"
        >
          <Menu className="size-5" />
        </button>
      </div>
    </motion.header>
  );
}
