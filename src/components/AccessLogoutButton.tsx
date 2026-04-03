"use client";

import { useState } from "react";

export function AccessLogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await fetch("/api/access/logout", { method: "POST" });
    } finally {
      window.location.href = "/access";
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoading}
      className="border border-cyan-300/25 bg-cyan-300/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-cyan-200/90 transition-colors hover:bg-cyan-300/16 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoading ? "..." : "Logout"}
    </button>
  );
}

