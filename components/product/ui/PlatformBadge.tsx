import { cx } from "./cx";

/* PlatformBadge: platform is a fact about a row, not a highlight. An
   outlined text mark in the muted ink, no brand fills. 18px tall. Every
   Google Ads network reads as one "Google" mark, as in the app. */
const LABELS: Record<string, string> = {
  meta: "Meta",
  facebook: "Meta",
  instagram: "Meta",
  tiktok: "TikTok",
  google: "Google",
  google_ads: "Google",
  "google ads": "Google",
};

export function PlatformBadge({
  platform,
  className,
}: {
  /** "Meta", "TikTok" or "Google Ads" from the sample account (case does not matter). */
  platform: string | null | undefined;
  className?: string;
}) {
  const key = String(platform ?? "meta").toLowerCase();
  const label = LABELS[key] || String(platform ?? "Unknown");
  return (
    <span
      className={cx(
        "inline-flex items-center h-[18px] rounded-[4px] px-1.5 text-[11px] font-medium leading-none whitespace-nowrap",
        "ring-1 ring-inset ring-pb-border-control text-pb-fg-muted",
        className,
      )}
    >
      {label}
    </span>
  );
}
