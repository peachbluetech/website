import { cx } from "./cx";
import { metaForScore, TIER_META, tierForScore } from "./tier";

/* ScoreBadge: a tier dot, the score in mono, the tier word. 20px tall
   (18px at size sm). An unscored creative reads "Low data" with a ghost
   dot. With chip it becomes the white outlined chip the app puts on a
   creative thumbnail. */
export function ScoreBadge({
  score,
  size = "md",
  chip = false,
  className,
}: {
  score: number | null | undefined;
  size?: "sm" | "md";
  /** The white chip used over a thumbnail: card ground, control ring, 4px radius. */
  chip?: boolean;
  className?: string;
}) {
  const tier = tierForScore(score);
  const meta = TIER_META[tier];
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 font-medium whitespace-nowrap text-pb-fg-secondary",
        size === "sm" || chip ? "h-[18px] text-[11px]" : "h-[20px] text-[11.5px]",
        chip && "rounded-[4px] bg-pb-card ring-1 ring-inset ring-pb-border-control px-1.5 text-pb-fg",
        className,
      )}
    >
      <span className={cx("size-1.5 rounded-full shrink-0", tier === "none" ? "bg-pb-fg-ghost" : meta.fill)} />
      {tier === "none" ? (
        meta.label
      ) : (
        <>
          <span className="font-mono tnum text-pb-fg">{Math.round(score as number)}</span>
          <span>{meta.label}</span>
        </>
      )}
    </span>
  );
}

/* ScoreMeter: a 6px bar (width is the score as a percent) and the mono
   number, for table score cells. 100px wide by default. An unscored row
   shows an empty track and an en dash. */
export function ScoreMeter({ score, className }: { score: number | null | undefined; className?: string }) {
  const meta = metaForScore(score);
  const pct = score == null ? 0 : Math.max(0, Math.min(100, score));
  return (
    <div className={cx("flex items-center gap-2 w-[100px]", className)}>
      <div className="flex-1 h-[6px] rounded-full bg-pb-muted-2 overflow-hidden">
        {score != null && <div className={cx("h-full rounded-full", meta.fill)} style={{ width: `${pct}%` }} />}
      </div>
      <span className="font-mono tnum text-[12px] font-medium w-7 text-right text-pb-fg">
        {score == null ? "–" : Math.round(score)}
      </span>
    </div>
  );
}
