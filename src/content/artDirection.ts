export const MANIFESTO = [
  "I do not build pages, I build traces of presence.",
  "Every interface needs a human pulse, not only a function.",
  "Code is my instrument, but narrative tension is the medium.",
  "I look for clarity without sterility, precision without coldness.",
  "I want people to hear a voice here, not recognize a template.",
  "I show doubts, processes, and fragments, not only final outcomes.",
  "Aesthetics is not decoration, it is a system of meaning.",
  "This site is a living archive: it changes with me, not after me.",
] as const;

export const ART_TOKENS = {
  light: {
    name: "Cyan light",
    meaning: "Insight and creative momentum",
    visual: "Soft glow, cyan accents, interactive highlights",
  },
  noise: {
    name: "Subtle noise",
    meaning: "Complexity and human context",
    visual: "Light scanlines, minimal grain, low-opacity overlays",
  },
  rhythm: {
    name: "Breathing rhythm",
    meaning: "Progressive decisions, not impulse",
    visual: "Short transitions, perceptible pauses, micro-delays between elements",
  },
} as const;

export const PALETTE = {
  background: "#050b14",
  surface: "#0a1628",
  primary: "#67e8f9",
  secondary: "#818cf8",
  textHigh: "rgba(240, 249, 255, 0.95)",
  textMid: "rgba(186, 230, 253, 0.72)",
  textLow: "rgba(103, 232, 249, 0.5)",
} as const;

export const TYPOGRAPHY_RULES = {
  heading: "Playfair Display",
  body: "Playfair Display",
  rhythm: "Generous line-height, light tracking, uppercase only for metadata",
} as const;

export const MOTION_RULES = {
  entry: "fade + y 8-12 + blur 2-4px",
  hover: "lift 2-4px + subtle glow (no aggressive zoom)",
  duration: "220ms-340ms",
  easing: "[0.25, 0.46, 0.45, 0.94]",
  principle: "Invisible transitions: felt, never distracting",
} as const;

export const NARRATIVE_ACTS = [
  {
    id: "act-1",
    title: "Act I - Identity",
    route: "/who",
    goal: "Declare who you are through text, terminal language, and symbols",
  },
  {
    id: "act-2",
    title: "Act II - Mental process",
    route: "/",
    goal: "Short interactive essays on doubt, decisions, and method",
  },
  {
    id: "act-3",
    title: "Act III - Real traces",
    route: "/know-more",
    goal: "Projects, fragments, voice/text notes, and traces of the journey",
  },
] as const;

export const QUICK_WINS = [
  "Live diary: one line per day with timestamp and micro-transition",
  "Influence map: clickable nodes (books, people, places)",
  "Engineer / Founder / Human mode with content filters",
  "Secret terminal command unlocking a private fragment",
] as const;

export const LIVE_DIARY_LINES = [
  "Today I chose clarity over cleverness.",
  "I rewrote less code and listened to the structure more.",
  "Progress looked like deleting what pretended to be necessary.",
  "A good interface is often a well-placed silence.",
  "I kept one rough edge on purpose: it feels human.",
  "Most decisions improved after I slowed them down.",
  "The idea got better when I removed the explanation.",
  "I worked on the transition, not just the destination.",
  "Constraint was not a limit today, it was direction.",
  "I followed the smallest signal that still felt true.",
  "I trusted the draft long enough to find its shape.",
  "The cleanest solution was the one with less ego.",
  "I made room for ambiguity before forcing precision.",
  "A tiny detail changed the entire emotional tone.",
  "I built with intention, not with momentum alone.",
] as const;

export const LIVE_DIARY_BY_DATE: Record<string, string> = {
  "2026-04-03":
    "I am learning to treat slowness as a design decision, not as a delay.",
};

export const IDENTITY_MODES = {
  engineer: {
    label: "Engineer",
    statement:
      "I optimize for structure, reliability, and long-term readability.",
  },
  founder: {
    label: "Founder",
    statement:
      "I optimize for leverage, momentum, and decisions under uncertainty.",
  },
  human: {
    label: "Human",
    statement:
      "I optimize for meaning, attention, and emotional truth over optics.",
  },
} as const;

export const INFLUENCE_NODES = [
  {
    id: "books",
    label: "Books",
    top: "22%",
    left: "14%",
    description: "Books taught me to hold contradiction without rushing closure.",
  },
  {
    id: "cities",
    label: "Cities",
    top: "66%",
    left: "20%",
    description: "Moving between cities trained my eye for context shifts.",
  },
  {
    id: "people",
    label: "People",
    top: "18%",
    left: "72%",
    description:
      "People I trust gave me the courage to refine rather than perform.",
  },
  {
    id: "silence",
    label: "Silence",
    top: "68%",
    left: "72%",
    description: "Silence is where weak ideas dissolve and good ones remain.",
  },
] as const;

export const INFLUENCE_CONNECTIONS = [
  ["books", "people"],
  ["books", "silence"],
  ["cities", "people"],
  ["cities", "silence"],
] as const;

export const SECRET_COMMAND = "/open-signal";
export const SECRET_FRAGMENT =
  "Private fragment: the work is never just about building. It is about becoming readable to yourself.";

export const INITIAL_COPY = {
  hero: {
    eyebrow: "Digital testimony",
    statement:
      "This space does not only show what I do. It shows how I think when no one is watching.",
    cta: "Know more",
  },
  who: {
    kicker: "Identity interface",
    lead:
      "I am not chasing a perfect definition. I am leaving a readable trajectory.",
  },
  about: {
    short:
      "I am Greg. I build digital systems and stories that hold technical rigor and human tension together.",
  },
} as const;

