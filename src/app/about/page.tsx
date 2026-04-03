import type { Metadata } from "next";
import Link from "next/link";
import { INITIAL_COPY } from "@/content/artDirection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Greg Patini (Gregorio Patini) — engineer, developer, and founder based between Bologna and San Francisco.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden bg-[#050b14] px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_120%_at_8%_8%,rgba(0,203,255,0.16),transparent_58%),radial-gradient(70%_95%_at_92%_92%,rgba(82,94,255,0.12),transparent_58%)]" />
      <p className="relative z-10 max-w-2xl text-center text-cyan-50/90">
        {INITIAL_COPY.about.short}
      </p>
      <Link
        href="/"
        className="relative z-10 text-sm text-cyan-300/70 underline underline-offset-2 hover:text-cyan-200"
      >
        Back
      </Link>
    </main>
  );
}
