"use client";

import { usePageHover } from "@/context/PageHoverContext";

export function LinesBackground() {
  const { isHoveringButton } = usePageHover();
  const frameColor = isHoveringButton ? "#0a0a0a" : "white";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Top-left */}
      <div
        className="absolute transition-colors duration-300 size-8 sm:size-16"
        style={{
          left: "clamp(0.75rem, 3vw, 1.5rem)",
          top: "clamp(0.75rem, 3vw, 1.5rem)",
          borderTop: `0.5px solid ${frameColor}`,
          borderLeft: `0.5px solid ${frameColor}`,
        }}
      />
      {/* Top-right */}
      <div
        className="absolute transition-colors duration-300 size-8 sm:size-16"
        style={{
          right: "clamp(0.75rem, 3vw, 1.5rem)",
          top: "clamp(0.75rem, 3vw, 1.5rem)",
          borderTop: `0.5px solid ${frameColor}`,
          borderRight: `0.5px solid ${frameColor}`,
        }}
      />
      {/* Bottom-left */}
      <div
        className="absolute transition-colors duration-300 size-8 sm:size-16"
        style={{
          left: "clamp(0.75rem, 3vw, 1.5rem)",
          bottom: "clamp(0.75rem, 3vw, 1.5rem)",
          borderBottom: `0.5px solid ${frameColor}`,
          borderLeft: `0.5px solid ${frameColor}`,
        }}
      />
      {/* Bottom-right */}
      <div
        className="absolute transition-colors duration-300 size-8 sm:size-16"
        style={{
          right: "clamp(0.75rem, 3vw, 1.5rem)",
          bottom: "clamp(0.75rem, 3vw, 1.5rem)",
          borderBottom: `0.5px solid ${frameColor}`,
          borderRight: `0.5px solid ${frameColor}`,
        }}
      />
    </div>
  );
}
