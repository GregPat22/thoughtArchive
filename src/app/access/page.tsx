"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "motion/react";

function sanitizeNextPath(value: string | null) {
  if (!value || !value.startsWith("/")) return "/";
  if (value.startsWith("/access")) return "/";
  return value;
}

function AccessForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = useMemo(
    () => sanitizeNextPath(searchParams.get("next")),
    [searchParams]
  );

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password.trim()) return;

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        setError(data.error ?? "Access denied.");
        return;
      }

      router.replace(nextPath);
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-md border border-cyan-300/20 bg-[#050b14]/70 p-5 backdrop-blur-md sm:p-6"
      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300/55">
        Private access
      </p>
      <h1 className="mb-4 text-xl text-cyan-50/95">Enter password</h1>

      <div className="flex items-center gap-2 border border-cyan-300/20 bg-[#050b14]/80 px-3 py-2.5">
        <span className="text-cyan-300/65">$</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full bg-transparent text-sm text-cyan-50/90 outline-none placeholder:text-cyan-300/35"
          autoComplete="current-password"
          spellCheck={false}
        />
      </div>

      {error && <p className="mt-2 text-xs text-cyan-300/70">{error}</p>}

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 w-full border border-cyan-300/30 bg-cyan-300/12 py-2.5 text-sm text-cyan-100 transition-colors hover:bg-cyan-300/18 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Checking..." : "Unlock"}
      </button>
    </motion.form>
  );
}

export default function AccessPage() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[#050b14] px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_120%_at_8%_8%,rgba(0,203,255,0.16),transparent_58%),radial-gradient(70%_95%_at_92%_92%,rgba(82,94,255,0.12),transparent_58%)]" />
      <Suspense>
        <AccessForm />
      </Suspense>
    </main>
  );
}
