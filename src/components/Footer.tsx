"use client";

import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { AnimateView } from "motion-plus/animate-view";

const links = [
  { href: "https://github.com", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50 py-12">
      <AnimateView
        enter={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div
          className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6"
          style={{ opacity: 0, transform: "translateY(16px)", filter: "blur(4px)" }}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — Built with Next.js & Motion
          </p>
          <div className="flex items-center gap-6">
            {links.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground transition-colors hover:text-detail"
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </AnimateView>
    </footer>
  );
}
