import type { CSSProperties } from "react";

/* The homepage's one theme switch. Every themed surface of the page
   reads one of these CSS custom properties; HomePage (Page.tsx) sets
   them on its wrapper. The page has ten colours and three line
   strengths, and this file is where they are written down. The site nav
   is outside this theme: it draws with the site tokens in
   app/globals.css, which carry the light tone's values (pb-bg, pb-ink,
   pb-rule, pb-line, pb-paper-2, pb-peach-500), so a change to a value
   here that the nav shares has to be made there too.

   Three groups:
   - the FIELD (nav, hero, footer) follows the tone: paper with navy ink
     in the light tone, navy with paper line in the dark one;
   - PAPER (the reading sections between) is the same in both tones;
   - NAVY (the peek bands and the essay panel) is the same in both tones.

   Light is the tone that ships and the only one checked. The dark set is
   kept so the switch still works; it has not been tuned. */

export type Tone = "dark" | "light";

/* The ten values. */
const PAPER = "#FBFAF7";
const PAPER_2 = "#F4F0E8";
const WHITE = "#FFFFFF";
const NAVY = "#13214B";
const BODY = "#4A4A45";
const MUTED = "#66665F";
const PEACH = "#E8724A";
const PEACH_TEXT_LG = "#C65A35";
const PEACH_TEXT_SM = "#A84826";
const PEACH_ON_NAVY = "#F9B295";
const INK = "#0C1430";

/* The three line strengths, in navy on the light grounds and in paper
   colour on navy: rules and borders, marks and leaders, a figure's main
   path (the last is the solid colour). */
const navy = (a: number) => `rgba(19,33,75,${a})`;
const paper = (a: number) => `rgba(251,250,247,${a})`;

const SHARED = {
  /* Paper: the reading sections. */
  "--mn-paper": PAPER,
  "--mn-paper-2": PAPER_2,
  "--mn-white": WHITE,
  "--mn-paper-ink": NAVY,
  "--mn-paper-body": BODY,
  "--mn-paper-muted": MUTED,
  "--mn-paper-rule": navy(0.15),
  "--mn-paper-line-dim": navy(0.46),
  "--mn-paper-accent": PEACH_TEXT_SM,
  "--mn-paper-accent-lg": PEACH_TEXT_LG,
  /* Peach as a fill or a line, never as a ground. */
  "--mn-peach": PEACH,
  /* Navy: the peek bands and the essay panel, and what is set on them. */
  "--mn-navy": NAVY,
  "--mn-on-navy": PAPER,
  "--mn-on-navy-body": paper(0.82),
  "--mn-on-navy-label": paper(0.7),
  "--mn-on-navy-rule": paper(0.14),
  "--mn-on-navy-line-dim": paper(0.46),
  "--mn-on-navy-accent": PEACH_ON_NAVY,
} as const;

const DARK = {
  ...SHARED,
  /* The field: nav, hero, footer. */
  "--mn-field": NAVY,
  "--mn-ink": PAPER,
  "--mn-body": paper(0.82),
  "--mn-muted": paper(0.7),
  "--mn-accent": PEACH_ON_NAVY,
  "--mn-accent-lg": PEACH_ON_NAVY,
  "--mn-rule": paper(0.14),
  "--mn-line-dim": paper(0.46),
  "--mn-line": PAPER,
  /* The major grid lines in the hero rail: the page's one texture. */
  "--mn-grid": paper(0.05),
  "--mn-focus": PEACH_ON_NAVY,
  /* The glow behind the lit card: an RGB triplet and a strength from 0
     to 1, and its width and strength on a phone. The page's one gradient. */
  "--mn-glow": "232 114 74",
  "--mn-glow-strength": "1",
  "--mn-glow-phone-w": "760px",
  "--mn-glow-phone-strength": "1",
  /* Hero rail cards, and the cell a tag or an outlined button is set in. */
  "--mn-card-dim": "#172655",
  "--mn-card-lit": WHITE,
  "--mn-card-lit-ring": PEACH,
  "--mn-cell": INK,
  /* The label on the one peach action. Never light type on peach. */
  "--mn-action-fg": INK,
} as const;

export type ThemeVars = Record<keyof typeof DARK, string>;

const LIGHT: ThemeVars = {
  ...DARK,
  "--mn-field": PAPER,
  "--mn-ink": NAVY,
  "--mn-body": BODY,
  "--mn-muted": MUTED,
  "--mn-accent": PEACH_TEXT_SM,
  "--mn-accent-lg": PEACH_TEXT_LG,
  "--mn-rule": navy(0.15),
  "--mn-line-dim": navy(0.46),
  "--mn-line": NAVY,
  "--mn-grid": navy(0.07),
  "--mn-focus": PEACH_TEXT_SM,
  /* Half strength at desktop widths; narrower than the screen and fainter
     on a phone, so paper shows at both sides of the lit card. */
  "--mn-glow": "240 132 90",
  "--mn-glow-strength": "0.5",
  "--mn-glow-phone-w": "520px",
  "--mn-glow-phone-strength": "0.35",
  "--mn-card-dim": PAPER_2,
  "--mn-cell": WHITE,
};

export const THEMES: Record<Tone, ThemeVars> = {
  dark: DARK,
  light: LIGHT,
};

export function themeStyle(tone: Tone): CSSProperties {
  return THEMES[tone] as unknown as CSSProperties;
}
