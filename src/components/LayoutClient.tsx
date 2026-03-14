"use client";

import { LinesBackground } from "@/components/LinesBackground";
import { PageHoverProvider, usePageHover } from "@/context/PageHoverContext";

function BodyContent({ children }: { children: React.ReactNode }) {
  const { isHoveringButton } = usePageHover();
  return (
    <>
      <LinesBackground />
      <div
        className={`relative z-10 min-h-dvh transition-colors duration-300 ${
          isHoveringButton ? "bg-white text-[#0a0a0a]" : "bg-background text-foreground"
        }`}
      >
        {children}
      </div>
    </>
  );
}

export function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageHoverProvider>
      <BodyContent>{children}</BodyContent>
    </PageHoverProvider>
  );
}
