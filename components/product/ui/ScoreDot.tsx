import { cx } from "./cx";
import { metaForScore } from "./tier";

/* ScoreDot: a filled circle holding the score in white mono, coloured by
   tier. 24, 32 or 40px. An unscored creative shows an en dash on the
   neutral tint. */
export function ScoreDot({
  score,
  size = "md",
  className,
}: {
  score: number | null | undefined;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const meta = metaForScore(score);
  if (score == null) {
    return (
      <div
        className={cx(
          "inline-flex items-center justify-center rounded-full font-mono text-[11px] font-semibold",
          meta.tint,
          meta.text,
          size === "sm" && "size-6",
          size === "md" && "size-8",
          size === "lg" && "size-10",
          className,
        )}
      >
        {"–"}
      </div>
    );
  }
  return (
    <div
      className={cx(
        "inline-flex items-center justify-center rounded-full font-mono font-semibold text-white",
        size === "sm" && "size-6 text-[11px]",
        size === "md" && "size-8 text-[12px]",
        size === "lg" && "size-10 text-[14px]",
        meta.fill,
        className,
      )}
    >
      {Math.round(score)}
    </div>
  );
}
