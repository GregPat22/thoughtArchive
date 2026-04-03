"use client";

export function LinesBackground() {
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
          borderTop: "0.5px solid rgba(103,232,249,0.5)",
          borderLeft: "0.5px solid rgba(103,232,249,0.5)",
        }}
      />
      {/* Top-right */}
      <div
        className="absolute transition-colors duration-300 size-8 sm:size-16"
        style={{
          right: "clamp(0.75rem, 3vw, 1.5rem)",
          top: "clamp(0.75rem, 3vw, 1.5rem)",
          borderTop: "0.5px solid rgba(103,232,249,0.5)",
          borderRight: "0.5px solid rgba(103,232,249,0.5)",
        }}
      />
      {/* Bottom-left */}
      <div
        className="absolute transition-colors duration-300 size-8 sm:size-16"
        style={{
          left: "clamp(0.75rem, 3vw, 1.5rem)",
          bottom: "clamp(0.75rem, 3vw, 1.5rem)",
          borderBottom: "0.5px solid rgba(103,232,249,0.5)",
          borderLeft: "0.5px solid rgba(103,232,249,0.5)",
        }}
      />
      {/* Bottom-right */}
      <div
        className="absolute transition-colors duration-300 size-8 sm:size-16"
        style={{
          right: "clamp(0.75rem, 3vw, 1.5rem)",
          bottom: "clamp(0.75rem, 3vw, 1.5rem)",
          borderBottom: "0.5px solid rgba(103,232,249,0.5)",
          borderRight: "0.5px solid rgba(103,232,249,0.5)",
        }}
      />
    </div>
  );
}
