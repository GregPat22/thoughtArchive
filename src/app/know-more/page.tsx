import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Know More",
  description:
    "Discover more about Greg Patini — essays, projects, and insights from an engineer and founder.",
  alternates: { canonical: "/know-more" },
};

export default function KnowMore() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#050b14]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_120%_at_8%_8%,rgba(0,203,255,0.16),transparent_58%),radial-gradient(70%_95%_at_92%_92%,rgba(82,94,255,0.12),transparent_58%)]" />
    </main>
  );
}
