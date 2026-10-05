/* Sample content for the MCP recreations: Peachblue's creative card as an
   MCP Apps host renders it inside a reply (the card the MCP server's
   creative tools return), and the neutral turn drawn around it.

   Every figure is read from the canonical account (../sample.ts), and the
   creatives, their order and their scores are the agent's own
   (../agent/data.ts), so the MCP card and Agent Peach's ranked answer
   agree to the digit. Results are not stored in the sample: the card
   prints them, so they are derived once here as round(spend / CPA), which
   is how the app's own CPA is computed (spend / results).

   No JSX in this file. */

import type { CSSProperties } from "react";
import { CREATIVES, type Platform, type SampleCreative, type Tier } from "../sample";
import { COMPARE, RANKED, SPOTLIGHT } from "../agent/data";

/* ── The card's own register ──────────────────────────────────────── */

/* The card renders in a sandboxed frame and declares its own tokens there
   (its light scheme), so they are restated here, not read from the site's
   product scope. CardFrame sets them on its root as custom properties. */
export const CARD_TOKENS = {
  /** The frame's body ground. */
  "--mcp-bg": "#FBF7F4",
  "--mcp-fg": "#1A130E",
  "--mcp-fg-muted": "#786258",
  "--mcp-border": "#E9DFD5",
  /** Image wells, metric tiles, tag chips, the compare summary. */
  "--mcp-muted": "#F2EAE2",
  /** The compare layout's winner dot. */
  "--mcp-good": "#2E9E5B",
  /** The score pill: the foot stop of the card's two-stop peach (see CreativeCard.tsx). */
  "--mcp-peach": "#EC6F45",
} as const;

export const CARD_STYLE = CARD_TOKENS as unknown as CSSProperties;

/* The card's own font stacks: the system sans for everything, a system
   serif for creative names. Neither is a site face. */
export const CARD_FONT = {
  sans: 'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  serif: 'ui-serif, "Iowan Old Style", "Apple Garamond", serif',
} as const;

/* Figures as the card formats them: money at or over 1,000 as whole
   grouped dollars, under it with cents; counts grouped; CTR to two
   decimals with a percent; ROAS to two decimals with a lower-case x. */
export const cardFmt = {
  money: (n: number) => (n >= 1000 ? `$${Math.round(n).toLocaleString("en-US")}` : `$${n.toFixed(2)}`),
  num: (n: number) => n.toLocaleString("en-US"),
  pct: (n: number) => `${n.toFixed(2)}%`,
  x: (n: number) => `${n.toFixed(2)}x`,
};

/* ── Creatives as the tools return them ───────────────────────────── */

/* The label a tool result carries for a creative's tier. The single
   layout prints it in caps beside the score. */
const SCORE_LABEL: Record<Tier, string> = {
  top: "Top Performer",
  above: "Above Average",
  avg: "Average",
  under: "Underperformer",
};

/* Platforms as the app stores them; the single layout prints them raw. */
const PLATFORM_KEY: Record<Platform, string> = {
  Meta: "meta",
  TikTok: "tiktok",
  "Google Ads": "google",
};

/* Creative-intelligence tags as get_creatives returns them with
   include_full_details: the values as returned, in the order returned. */
export type CardTags = Partial<
  Record<"format" | "content_style" | "aspect_ratio" | "setting" | "emotional_tone" | "hook_style" | "offer_type" | "primary_message", string>
>;

export type CardCreative = {
  key: string;
  name: string;
  /** The original under /public; AdThumb picks the resized copy. */
  image: string;
  aspect: SampleCreative["aspect"];
  score: number;
  scoreLabel: string;
  spend: number;
  results: number;
  ctr: number;
  cpa: number;
  roas: number;
  platforms: string[];
  adCount?: number;
  campaignCount?: number;
  tags?: CardTags;
};

/** A sample creative as the card receives it. */
export function toCard(c: SampleCreative, extra: Partial<CardCreative> = {}): CardCreative {
  return {
    key: c.key,
    name: c.name,
    image: c.image,
    aspect: c.aspect,
    score: c.score,
    scoreLabel: SCORE_LABEL[c.tier],
    spend: c.spend,
    results: Math.round(c.spend / c.cpa),
    ctr: c.ctr,
    cpa: c.cpa,
    roas: c.roas,
    platforms: [PLATFORM_KEY[c.platform]],
    ...extra,
  };
}

/* The tag chips the single layout prints (the card's own rule): every
   value that is set and not "none" or "neutral", underscores read as
   spaces, at most eight. */
export function tagChips(tags: CardTags | undefined): string[] {
  if (!tags) return [];
  return Object.values(tags)
    .filter((v): v is string => !!v && v !== "none" && v !== "neutral")
    .map((v) => v.replace(/_/g, " "))
    .slice(0, 8);
}

/* The archetype line (the card's own rule): emotional tone, hook style,
   then the offer or the primary message, each when set, joined with a
   middle dot. */
export function archetypeOf(tags: CardTags | undefined): string | null {
  if (!tags) return null;
  const parts: string[] = [];
  if (tags.emotional_tone && tags.emotional_tone !== "neutral") parts.push(tags.emotional_tone.replace(/_/g, " "));
  if (tags.hook_style && tags.hook_style !== "none") parts.push(tags.hook_style.replace(/_/g, " "));
  if (tags.offer_type && tags.offer_type !== "none") parts.push(`${tags.offer_type.replace(/_/g, " ")} offer`);
  else if (tags.primary_message && tags.primary_message !== "none") parts.push(`${tags.primary_message.replace(/_/g, " ")}-led`);
  return parts.length ? parts.join(" · ") : null;
}

/* ── Tool calls ───────────────────────────────────────────────────── */

/* A call as the client sends it: the real tool name and real argument
   values (time_window takes the tool's rolling presets). */
export type ToolCallSpec = {
  tool: "get_creatives" | "compare_ads" | "rank_ads";
  args: { limit?: number; time_window?: "1d" | "7d" | "14d" | "30d" | "90d"; include_full_details?: boolean };
};

/* How the app words a rolling preset, without the leading "the": "7d" is
   "last 7 days". */
const WINDOW_LABEL: Record<NonNullable<ToolCallSpec["args"]["time_window"]>, string> = {
  "1d": "last day",
  "7d": "last 7 days",
  "14d": "last 14 days",
  "30d": "last 30 days",
  "90d": "last 90 days",
};

/* What the tool row prints after the tool's name: the count and the
   window, the two arguments a reader can check against the card. The
   other arguments are sent but not printed (see MCP_RANKED). */
export function callParams(call: ToolCallSpec): string[] {
  const out: string[] = [];
  if (call.args.limit != null) out.push(`limit ${call.args.limit}`);
  if (call.args.time_window) out.push(WINDOW_LABEL[call.args.time_window]);
  return out;
}

/* ── The three answers ────────────────────────────────────────────── */

/* Top five: the question and the five creatives of the agent's ranked
   answer, as get_creatives returns them. The tool's own description asks
   for include_full_details on every "top X" question; that is what
   carries each creative's tags, and the card reads the image's aspect
   (9:16 here) from them. Without it every ad would be letterboxed in a
   square well. */
export const MCP_RANKED = {
  question: RANKED.question,
  call: {
    tool: "get_creatives",
    args: { limit: RANKED.cards.length, time_window: "7d", include_full_details: true },
  } satisfies ToolCallSpec,
  creatives: RANKED.cards.map((card) => toCard(card.creative)),
};

/* Head to head: the agent's compare question as compare_ads answers it.
   Side A is the first creative named. The winner is the one with the
   higher score, by name, as the tool returns it. */
const COMPARE_A = toCard(COMPARE.a);
const COMPARE_B = toCard(COMPARE.b);

export const MCP_COMPARE = {
  question: COMPARE.question,
  call: { tool: "compare_ads", args: { time_window: "7d" } } satisfies ToolCallSpec,
  a: COMPARE_A,
  b: COMPARE_B,
  winner: COMPARE_A.score > COMPARE_B.score ? COMPARE_A.name : COMPARE_B.score > COMPARE_A.score ? COMPARE_B.name : null,
};

/* One creative: the week's winner as get_creatives returns it with limit
   1. Its tags are the sample's own analysis (../brief/data.ts): it is one
   of the "Static Image · Playful Product Closeup" strategy's creatives,
   and its setting is a studio backdrop (SPOTLIGHT's insight); its aspect
   is the file's own. No hook style or offer is recorded for it, so the
   archetype is its tone alone. It runs as 3 ads in one campaign
   (SPOTLIGHT.card). */
export const MCP_SINGLE = {
  call: {
    tool: "get_creatives",
    args: { limit: 1, time_window: "7d", include_full_details: true },
  } satisfies ToolCallSpec,
  creative: toCard(SPOTLIGHT.card.creative, {
    adCount: SPOTLIGHT.card.adCount,
    campaignCount: 1,
    tags: {
      format: "static_image",
      content_style: "product_closeup",
      aspect_ratio: SPOTLIGHT.card.creative.aspect,
      setting: "studio_backdrop",
      emotional_tone: "playful",
    },
  }),
};

/* ── Text alternatives ────────────────────────────────────────────── */

const scores = (list: CardCreative[]) => list.map((c) => c.score).join(", ");
const BIG = toCard(CREATIVES.bigMood);

/** One sentence per picture, for Shot's label. */
export const MCP_LABEL = {
  ranked: `The question "${MCP_RANKED.question}", a Peachblue tool call, get_creatives with limit ${MCP_RANKED.call.args.limit} over the last 7 days, and Peachblue's creative card: ${MCP_RANKED.creatives.length} creatives in score order (${scores(MCP_RANKED.creatives)}), each with its ad, rank, score, spend, results, CTR, CPA and ROAS.`,
  rankedBare: `A Peachblue tool call, get_creatives with limit ${MCP_RANKED.call.args.limit} over the last 7 days, and Peachblue's creative card: ${MCP_RANKED.creatives.length} creatives in score order (${scores(MCP_RANKED.creatives)}), each with its ad, rank, score, spend, results, CTR, CPA and ROAS.`,
  grid: `Peachblue's creative card for the top ${MCP_RANKED.creatives.length} creatives: each ad with its rank, score (${scores(MCP_RANKED.creatives)}), spend, results, CTR, CPA and ROAS.`,
  compare: `The question "${MCP_COMPARE.question}", a Peachblue tool call, compare_ads over the last 7 days, and Peachblue's compare card: ${MCP_COMPARE.a.name} at score ${MCP_COMPARE.a.score} against ${MCP_COMPARE.b.name} at ${MCP_COMPARE.b.score}, row by row on score, spend, results, CTR, CPA and ROAS, with ${MCP_COMPARE.winner} as the winner.`,
  compareCard: `Peachblue's compare card: ${MCP_COMPARE.a.name} at score ${MCP_COMPARE.a.score} against ${MCP_COMPARE.b.name} at ${MCP_COMPARE.b.score}, row by row on score, spend, results, CTR, CPA and ROAS, with ${MCP_COMPARE.winner} as the winner.`,
  single: `Peachblue's creative card for ${BIG.name}: score ${BIG.score}, ${BIG.scoreLabel.toLowerCase()}, ${cardFmt.money(BIG.spend)} spend, ${cardFmt.num(BIG.results)} results, ${cardFmt.pct(BIG.ctr)} CTR, ${cardFmt.money(BIG.cpa)} CPA and ${cardFmt.x(BIG.roas)} ROAS, with its archetype and tags.`,
  call: `A Peachblue tool call: get_creatives with limit ${MCP_RANKED.call.args.limit} over the last 7 days.`,
  compareCall: "A Peachblue tool call: compare_ads over the last 7 days.",
  asked: `The question "${MCP_RANKED.question}".`,
};
