"use client";

import { LinesBackground } from "@/components/LinesBackground";
import { PageHoverProvider } from "@/context/PageHoverContext";

export function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageHoverProvider>
      <LinesBackground />
      <div className="relative z-10 min-h-dvh bg-background text-foreground">
        {children}
      </div>
    </PageHoverProvider>
  );
}
