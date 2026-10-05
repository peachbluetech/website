import type { ReactNode } from "react";
import { ChevronRight, X } from "lucide-react";
import {
  AskPeachButton,
  Badge,
  Collapsible,
  MetricGrid,
  PlatformBadge,
  ScoreDot,
  cx,
  formatCurrency,
  formatPercent,
  formatRoas,
  tierForScore,
  TIER_META,
  type MetricItem,
} from "../ui";
import {
  ANALYSIS_CLOSED,
  ANALYSIS_OPEN,
  HERO_DETAIL,
  SCORE_PARTS,
  STRATEGIC_TAGS,
  VISUAL_TAGS,
  labelForTag,
  labelForValue,
  ordinal,
  shownTags,
  type TagValue,
} from "./data";

/* The Creative Detail Panel for the sample account's top creative,
   "Little can. Big mood.": the 540px drawer that opens from the right of
   the Creative Library. Stone ground, a left hairline and the lift shadow
   of a floating surface. Inside 20px of padding the content column is 500.

   Reading order is the product's argument: the creative, the verdict (its
   score and how the score is built), the evidence (campaign and numbers),
   then the analysis (tags, and the written analysis in named sections).

   Every piece below is static: the disclosure rows take an open flag. */

const D = HERO_DETAIL;

/* ── Header ───────────────────────────────────────────────────────── */

function PanelHeader() {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-pb-border bg-pb-bg px-5 py-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <PlatformBadge platform={D.creative.platform} />
          <span className="text-[12px] text-pb-fg-muted font-medium">Creative Detail</span>
        </div>
        <p className="text-[14px] font-semibold text-pb-fg truncate">{D.creative.name}</p>
        <p className="text-[11px] text-pb-fg-muted truncate font-mono">{D.creativeId}</p>
      </div>
      <AskPeachButton variant="button" className="mt-0.5" />
      <span className="size-8 rounded-lg flex items-center justify-center text-pb-fg-muted">
        <X className="size-4" />
      </span>
    </div>
  );
}

/* ── Preview ──────────────────────────────────────────────────────── */

/* The app shows the whole creative, never a crop: a 9:16 image stands in
   the middle of the full-width muted well, as tall as 60% of the window.
   A fixed picture has no window, so the height is a prop. The image is
   drawn at exactly the size the app's letterboxing gives it. The file
   requested is the 560px copy, which keeps the original's proportions
   (1080 by 1920). */
const SOURCE_W = 1080;
const SOURCE_H = 1920;

function Preview({ height }: { height: number }) {
  const width = Math.round((height * SOURCE_W) / SOURCE_H);
  return (
    <div className="mb-5 overflow-hidden rounded-xl border border-pb-border bg-pb-muted flex items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={D.creative.medium}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="block object-cover"
        style={{ width, height }}
      />
    </div>
  );
}

/* ── Ad copy ──────────────────────────────────────────────────────── */

/* The ad's own headline at 16px and its body text, muted, between the
   preview and the verdict. A heading in the app, a div here. Off by
   default: the sample creative is named for its headline, so the panel
   header already says it, and so does the image. 47px tall plus 20 of
   margin. */
function AdCopy() {
  return (
    <div className="mb-5">
      <div className="text-[16px] font-semibold leading-snug text-pb-fg">{D.headline}</div>
      <p className="mt-1 text-[13px] leading-relaxed text-pb-fg-muted">{D.body}</p>
    </div>
  );
}

/* ── Score banner ─────────────────────────────────────────────────── */

const BANNER_TONE = {
  top: "bg-pb-good-bg border-pb-good/30",
  above: "bg-pb-info-bg border-pb-info/30",
  average: "bg-pb-muted border-pb-border",
  under: "bg-pb-bad-bg border-pb-bad/30",
  none: "bg-pb-muted border-pb-border",
} as const;

const PART_FILL = {
  top: "bg-pb-good",
  above: "bg-pb-info",
  average: "bg-pb-fg-muted",
  under: "bg-pb-bad",
  none: "bg-pb-bad",
} as const;

/* The verdict: the score in a 40px tier-coloured circle, the tier in
   words, one sentence on what it is ranked against, and "How this is
   scored". Open, it lists each metric's percentile as a 6px bar. Closed by
   default in the app.
   105px tall closed, 189px open (500 wide).

   Deviation from the app: the app's row ends with the share of the score
   the metric carries. This picture leaves the shares out. The public docs
   describe the blend in words only, so its numbers stay out of this public
   repository. Do not add them back without a decision to publish them. */
function ScoreBanner({ open, className }: { open: boolean; className?: string }) {
  const score = D.creative.score;
  const tier = tierForScore(score);
  return (
    <div className={cx("mb-4 rounded-xl border px-4 py-3", BANNER_TONE[tier], className)}>
      <div className="flex items-center gap-3">
        <ScoreDot score={score} size="lg" />
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold text-pb-fg">
            {TIER_META[tier].longLabel}
            <span className="font-normal text-pb-fg-muted"> in the conversion pool</span>
          </p>
          <p className="text-[11px] text-pb-fg-muted mt-0.5">
            Ranked on click-through, ROAS, cost per result and spend against every other creative in this account.
          </p>
        </div>
      </div>
      <div className="mt-2">
        <div className="text-[11px] font-medium text-pb-fg-secondary">How this is scored</div>
        {open && (
          <ul className="mt-1.5 space-y-1">
            {SCORE_PARTS.map((part) => (
              <li key={part.key} className="flex items-center gap-2 text-[11px] tnum">
                <span className="w-[112px] shrink-0 text-pb-fg capitalize">{part.word}</span>
                <span className="flex-1 h-1.5 rounded-full bg-pb-muted-2 overflow-hidden">
                  <span
                    className={cx("block h-full rounded-full", PART_FILL[tierForScore(part.percentile)])}
                    style={{ width: `${Math.max(2, Math.min(100, part.percentile))}%` }}
                  />
                </span>
                {/* The column keeps the width it has with the share in it (156px), so the bar track is
                    the length it is in the full row: 182px (181 in the docked panel). */}
                <span className="w-[156px] shrink-0 text-right whitespace-nowrap text-pb-fg-muted">
                  <span className="font-mono tnum">{ordinal(part.percentile)}</span> percentile
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Campaign context ─────────────────────────────────────────────── */

function ContextBox() {
  return (
    <div className="mb-4 rounded-xl border border-pb-border bg-pb-muted/30 px-4 py-3">
      <div className="flex items-baseline gap-2">
        <span className="text-[11.5px] text-pb-fg-muted min-w-[60px]">Campaign</span>
        <span className="text-[12px] font-medium text-pb-fg">{D.campaign}</span>
      </div>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-[11.5px] text-pb-fg-muted min-w-[60px]">Ad Set</span>
        <span className="text-[12px] font-medium text-pb-fg">{D.adSet}</span>
      </div>
    </div>
  );
}

/* ── Performance ──────────────────────────────────────────────────── */

function PanelSection({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={cx("mb-5", className)}>
      <div className="text-[12.5px] font-medium text-pb-fg-muted mb-2">{title}</div>
      {children}
    </div>
  );
}

const PERFORMANCE: MetricItem[] = [
  { label: "Spend", value: formatCurrency(D.spend) },
  { label: "CTR", value: formatPercent(D.ctr, 2) },
  { label: "CPC", value: formatCurrency(D.cpc) },
  { label: "CPM", value: formatCurrency(D.cpm) },
  { label: "ROAS", value: formatRoas(D.roas, 2) },
  { label: "Results", value: String(D.results) },
  { label: "CPA", value: formatCurrency(D.cpa) },
  { label: "Impressions", value: D.impressions.toLocaleString("en-US") },
  { label: "Days Active", value: String(D.daysActive) },
];

function PerformanceSection() {
  return (
    <PanelSection title="Performance">
      <MetricGrid metrics={PERFORMANCE} columns={3} />
      <p className="mt-2 text-[11px] text-pb-fg-muted tnum">
        Active: <span className="font-mono tnum">{D.firstActive}</span> → <span className="font-mono tnum">{D.lastActive}</span>
      </p>
    </PanelSection>
  );
}

/* ── Tags ─────────────────────────────────────────────────────────── */

/* A wrapped row of 18px outlined pills. A tag with a value reads
   "Key: Value" with the key at 60% strength; a flag that is true reads as
   the key alone. Valued pills are links in the app, so each sits in its own
   line box and the rows pitch at 30px. Flags get the same wrapper here so
   both kinds of pill share one baseline. */
function TagPillRow({ tags, variant }: { tags: Array<[string, TagValue]>; variant: "peach" | "outline" }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map(([key, value]) =>
        typeof value === "boolean" ? (
          <span key={key}>
            <Badge variant={variant}>{labelForTag(key)}</Badge>
          </span>
        ) : (
          <span key={key}>
            <Badge variant={variant}>
              <span className="opacity-60 mr-1">{labelForTag(key)}:</span>
              {labelForValue(value)}
            </Badge>
          </span>
        ),
      )}
    </div>
  );
}

/* The disclosure row of a tag group. The shared Collapsible with one
   difference: its title is a string, and this title ends in a count, which
   is set in mono like every other figure. Same classes otherwise. */
function TagGroup({ title, count, open = false, children }: { title: string; count: number; open?: boolean; children: ReactNode }) {
  return (
    <div className="mb-4">
      <div className="w-full flex items-center gap-2 rounded-xl border border-pb-border bg-pb-card px-3 py-2.5 text-[12.5px]">
        <ChevronRight className={cx("size-3.5 shrink-0 text-pb-fg-muted", open && "rotate-90")} strokeWidth={2} />
        <span className="shrink-0 font-medium text-pb-fg">
          {title} · <span className="font-mono tnum">{count}</span>
        </span>
      </div>
      {open && <div className="mt-2">{children}</div>}
    </div>
  );
}

/* Strategic tags (what the creative is doing) open with peach pills;
   visual tags (what it looks like) as a closed row, or open with grey
   pills. The number in each title is the count of tags with a value. */
function TagsBlock({ visual }: { visual: "closed" | "open" | "hidden" }) {
  const strategic = shownTags(STRATEGIC_TAGS);
  const visualTags = shownTags(VISUAL_TAGS);
  return (
    <div className="mb-5 space-y-2">
      <TagGroup title="Strategic tags" count={strategic.length} open>
        <TagPillRow tags={strategic} variant="peach" />
      </TagGroup>
      {visual !== "hidden" && (
        <TagGroup title="Visual tags" count={visualTags.length} open={visual === "open"}>
          <TagPillRow tags={visualTags} variant="outline" />
        </TagGroup>
      )}
    </div>
  );
}

/* ── Expert Analysis ──────────────────────────────────────────────── */

/* One disclosure row per section, the first open. The open body is a
   tinted hairline box of indented lines, each a bold lead-in and a
   sentence. The text carries no size class in the app and reads at the
   16px default, larger than everything around it. */
function ExpertAnalysis({ className }: { className?: string }) {
  return (
    <PanelSection title="Expert Analysis" className={className}>
      <Collapsible title={ANALYSIS_OPEN.title} open>
        <div className="rounded-xl border border-pb-border bg-pb-muted/30 px-4 py-3">
          {ANALYSIS_OPEN.lines.map(([label, body]) => (
            <div key={label} className="text-pb-fg/85 leading-relaxed ml-4 mb-2">
              <strong className="text-pb-fg">{label}:</strong> {body}
            </div>
          ))}
        </div>
      </Collapsible>
      {ANALYSIS_CLOSED.map((title) => (
        <Collapsible key={title} title={title} />
      ))}
    </PanelSection>
  );
}

/* ── The panel ────────────────────────────────────────────────────── */

const SECTIONS = ["preview", "copy", "score", "context", "performance", "tags", "analysis"] as const;
type Section = (typeof SECTIONS)[number];

/* CreativeDetailPanel.
   Design width 540 (fixed). Natural height with the defaults: 1,946.
   stop="top" ends after the performance grid: 1,036 tall. scoreOpen adds
   84, visualTags="open" adds 122, copy adds 67, preview={false} removes
   previewHeight plus 22. The header alone is 92.5.

   As an overlay on the application window pass
   className="absolute inset-y-0 right-0" and put a scrim
   (absolute inset-0 bg-pb-fg/20) under it; the window crops it. */
export function CreativeDetailPanel({
  stop = "all",
  scoreOpen = false,
  visualTags = "closed",
  preview = true,
  previewHeight = 400,
  copy = false,
  frame = "docked",
  className,
}: {
  /** The last section rendered. "top" is the header through the performance grid; "all" runs to the end of Expert Analysis. */
  stop?: "top" | "all" | Section;
  /** Show "How this is scored" expanded. Closed in the app until clicked. */
  scoreOpen?: boolean;
  /** The Visual tags row: a closed row (the app's default), open with its pills, or left out. */
  visualTags?: "closed" | "open" | "hidden";
  /** Pass false to drop the image preview and start at the score banner. */
  preview?: boolean;
  /** Height of the preview image in px (the app uses 60% of the window height). The 9:16 creative is shown whole, centred in the well. */
  previewHeight?: number;
  /** Show the ad's headline and body text between the preview and the score banner, as the app does for an ad that has them. Off by default because the sample creative's name is its headline. */
  copy?: boolean;
  /** "docked" is the app's drawer: left hairline and lift shadow. "card" is a free-standing copy: hairline all round, 8px radius, no shadow. */
  frame?: "docked" | "card";
  className?: string;
}) {
  const last = stop === "top" ? "performance" : stop === "all" ? "analysis" : stop;
  const show = (section: Section) => SECTIONS.indexOf(section) <= SECTIONS.indexOf(last);
  return (
    <div
      className={cx(
        "flex w-[540px] flex-col bg-pb-bg",
        frame === "docked" ? "border-l border-pb-border shadow-pb-lift" : "border border-pb-border rounded-xl overflow-hidden",
        className,
      )}
    >
      <PanelHeader />
      <div className="flex-1 px-5 py-5">
        {preview && <Preview height={previewHeight} />}
        {copy && show("copy") && <AdCopy />}
        {show("score") && <ScoreBanner open={scoreOpen} />}
        {show("context") && <ContextBox />}
        {show("performance") && <PerformanceSection />}
        {show("tags") && <TagsBlock visual={visualTags} />}
        {show("analysis") && <ExpertAnalysis />}
      </div>
    </div>
  );
}

/* ScoreBreakdown: the score banner on its own with "How this is scored"
   open: four percentile bars.
   Design width 540 (the banner is 500 inside the panel's 20px gutters),
   229 tall. Pass header to keep the panel header above it, so the picture
   says which creative is being scored: 321.5 tall. */
export function ScoreBreakdown({ header = false, className }: { header?: boolean; className?: string }) {
  return (
    <div className={cx("w-[540px] bg-pb-bg", className)}>
      {header && <PanelHeader />}
      <div className="px-5 py-5">
        <ScoreBanner open className="mb-0" />
      </div>
    </div>
  );
}

/* TagsAndAnalysis: the creative analysis block of the panel. Strategic
   tags open with their peach pills, the Visual tags row, then Expert
   Analysis with its first section open and the rest as closed rows.
   Design width 540, 946 tall with the defaults (1,068 with the visual
   tags open). Pass header to keep the panel header above it: 92.5 more.
   It is long: let it run off the bottom of its tile. */
export function TagsAndAnalysis({
  header = false,
  visualTags = "closed",
  className,
}: {
  header?: boolean;
  /** The Visual tags row: closed (the app's default), open with its grey pills, or left out. */
  visualTags?: "closed" | "open" | "hidden";
  className?: string;
}) {
  return (
    <div className={cx("w-[540px] bg-pb-bg", className)}>
      {header && <PanelHeader />}
      <div className="px-5 py-5">
        <TagsBlock visual={visualTags} />
        <ExpertAnalysis className="mb-0" />
      </div>
    </div>
  );
}
