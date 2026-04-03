"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";

const links = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/gregpatini", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-cyan-300/15 bg-[#050b14]/55 py-12 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
          <p className="text-sm text-cyan-300/50">
            © {new Date().getFullYear()} — Built with Next.js & Motion
          </p>
          <div className="flex items-center gap-6">
            {links.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-cyan-300/60 transition-colors hover:text-cyan-200"
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
