# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/essay site built with **Next.js 16** (App Router), **React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **Framer Motion**. Dark-themed, animation-heavy, mobile-responsive.

## Commands

```bash
npm run dev          # Dev server with Turbopack
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
npm run format       # Prettier (src/**/*.{ts,tsx,js,jsx,json,css,md})
```

## Architecture

- **App Router**: Pages in `src/app/` (home, about, know-more). Root layout applies dark class and Playfair Display font.
- **Client Components**: Most components use `"use client"` for interactivity (animations, state).
- **LayoutClient.tsx**: Wraps pages with Header, Footer, animated background (LinesBackground), and PageHoverContext.
- **PageHoverContext**: Global context tracking button hover state — used to coordinate visual effects across layout.
- **EssaysSection**: Dual-mode component — mobile shows stacked list/detail views with AnimatePresence transitions; desktop shows collapsible sidebar + content pane with hover-to-preview and proximity-based auto-scroll.
- **HeroSection**: Landing view with magnetic cursor CTA button (useMagneticPull hook).

## Key Patterns

- **Styling**: Tailwind v4 with `@theme inline` CSS variables for theming. CVA (Class Variance Authority) for component variants (button.tsx). `cn()` utility (clsx + tailwind-merge) in `src/lib/utils.ts`.
- **Animations**: Framer Motion variants pattern for staggered reveals. Motion+ AnimateView for viewport-triggered animations. Spring physics for page transitions.
- **Path alias**: `@/*` maps to `src/*`.
- **Component library**: shadcn-style setup (components.json, base-nova style). UI primitives in `src/components/ui/`.
- **Global cursor rule**: `globals.css` sets `cursor: pointer` on all `button`, `a`, and `[role="button"]` elements globally.
