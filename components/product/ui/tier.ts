/* The one score scale, with the labels and class pairs every badge, bar
   and tick uses. Thresholds: top 75 and up, above 50 to 74, average 30 to
   49, under below 30, none for an unscored creative. */

export type ScoreTier = "top" | "above" | "average" | "under" | "none";

export const SCORE_TIERS = { top: 75, above: 50, average: 30 } as const;

export function tierForScore(score: number | null | undefined): ScoreTier {
  if (score == null || !Number.isFinite(score)) return "none";
  if (score >= SCORE_TIERS.top) return "top";
  if (score >= SCORE_TIERS.above) return "above";
  if (score >= SCORE_TIERS.average) return "average";
  return "under";
}

export type TierMeta = {
  /** Short badge label: Top, Above, Average, Under, Low data. */
  label: string;
  /** Long label: Top Performer, Above Average, Average, Underperformer, Insufficient Data. */
  longLabel: string;
  /** Text colour class. */
  text: string;
  /** Solid fill class (bars, dots, ticks). */
  fill: string;
  /** Subtle tint background class. */
  tint: string;
};

export const TIER_META: Record<ScoreTier, TierMeta> = {
  top: { label: "Top", longLabel: "Top Performer", text: "text-pb-score-top", fill: "bg-pb-score-top", tint: "bg-pb-good-bg" },
  above: { label: "Above", longLabel: "Above Average", text: "text-pb-score-above", fill: "bg-pb-score-above", tint: "bg-pb-info-bg" },
  average: { label: "Average", longLabel: "Average", text: "text-pb-fg-secondary", fill: "bg-pb-score-avg", tint: "bg-pb-muted" },
  under: { label: "Under", longLabel: "Underperformer", text: "text-pb-score-under", fill: "bg-pb-score-under", tint: "bg-pb-bad-bg" },
  none: { label: "Low data", longLabel: "Insufficient Data", text: "text-pb-score-none-fg", fill: "bg-pb-score-none", tint: "bg-pb-score-none" },
};

export function metaForScore(score: number | null | undefined): TierMeta {
  return TIER_META[tierForScore(score)];
}
