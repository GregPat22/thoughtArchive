# Art Direction Blueprint

This document turns the site's identity into a system that can be implemented feature by feature.

## 1) Voice (content)

Use the manifesto in `src/content/artDirection.ts` as the canonical voice.

Editorial rules:
- Write in first person, present tense.
- Avoid generic motivational language.
- Prefer concrete images over abstract labels.
- Keep each paragraph short (1-3 sentences).

## 2) Visual grammar (language)

### Artistic tokens
- **Light**: cyan glow, used for insight and active intent.
- **Noise**: subtle scanline/grain to represent human complexity.
- **Rhythm**: short, breathable motion with clear pauses.

### Color palette
- Base: `#050b14`
- Surface: `#0a1628`
- Accents: `#67e8f9`, `#818cf8`
- Text: high/mid/low contrast variants from `src/content/artDirection.ts`.

### Type system
- Headings/body: Playfair Display (already in layout).
- Uppercase only for metadata labels.
- Keep line-height generous on long text blocks.

## 3) Interaction as narrative

### Act I - Identity
- Route: `/who`
- Function: self-definition through terminal language and symbolic motion.

### Act II - Mental process
- Route: `/`
- Function: concise interactive essays and cognitive fragments.

### Act III - Real traces
- Route: `/know-more`
- Function: projects, experiments, voice notes, documented iterations.

## Motion rules

- Entry: `opacity + y + subtle blur` only.
- Hover: `lift + glow` (no aggressive zoom).
- Durations: 220-340ms.
- Keep transitions "felt, not noticed."

## Quick wins (implementation queue)

1. **Live diary**: one sentence/day with date and tiny reveal.
2. **Influence map**: clickable nodes (books, people, places) with connection lines.
3. **Mode switch**: Engineer / Founder / Human filters on same content.
4. **Secret command**: hidden terminal command that unlocks private fragment.

## Content migration checklist

- [ ] Replace all placeholder copy with canonical copy from `src/content/artDirection.ts`.
- [ ] Ensure each page has one unique sentence that can only belong to Greg.
- [ ] Align CTA language to same tone (intimate, precise, non-generic).
- [ ] Keep fan page stylistically coherent with base system.

