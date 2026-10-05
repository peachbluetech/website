import { PageHeader } from "@/components/product/frame";
import {
  Fig,
  KpiStrip,
  RangeToggle,
  TrendLine,
  VoiceBar,
  VoiceDelta,
  cx,
  formatCurrencyCompact,
} from "@/components/product/ui";
import { DAILY, PULSE_EVENTS, RANGE_DAYS, TODAY_KPIS, TODAY_SUBTITLE, TODAY_TITLE, VOICE } from "./data";
import { PulseHeader, PulseRows } from "./PulseList";
import { Rail } from "./RailCards";

/* The bar's sub line: tinted delta, the prior week's spend, and the sync
   stamp when there is room for it (the stamp is absent in the app until
   sync status has loaded, so both are real states). */
function VoiceSub({ stamp }: { stamp: boolean }) {
  return (
    <>
      <VoiceDelta pct={VOICE.deltaPct} /> · {VOICE.prior}
      {stamp ? ` · ${VOICE.stamp}` : ""}
    </>
  );
}

function VoiceSentence() {
  return (
    <>
      <Fig>{VOICE.sentenceFigure}</Fig>
      {VOICE.sentenceRest}
    </>
  );
}

/* TodayVoiceBar: the page's one navy block. The week's spend on the left,
   the top pulse row as a sentence, one peach link.
   Design width: fluid. With the stamp the figure cell is 325px and the
   sentence needs a 952px bar to stay on two lines; without it the cell is
   173px and two lines hold from 800px. 98px tall on two lines, 108px on
   three, 128px on four. stamp false is the bar before sync status has
   loaded, a real state of the app. */
export function TodayVoiceBar({ stamp = true, className }: { stamp?: boolean; className?: string }) {
  return (
    <VoiceBar
      label={VOICE.label}
      className={className}
      figure={{ label: VOICE.figureLabel, value: VOICE.figure, sub: <VoiceSub stamp={stamp} /> }}
      action={VOICE.action}
    >
      <VoiceSentence />
    </VoiceBar>
  );
}

/* TodayStrip: the navy bar over the four figures and nothing else, both
   exactly as the page has them (the bar is the VoiceBar primitive, the
   strip the KpiStrip primitive with a 130px minimum cell so the four
   figures stay on one row).
   Design width: 600 (no padding of its own; sits on the stone ground).
   There the bar has no sync stamp, its sentence is on four lines and the
   four cells are 149px. Natural height: 268px at 600.
   It is fluid: the sentence is on four lines from 562 to 638 (268px
   tall), three from 640 to 798 (247px), two from 800 (238px); from 952
   pass stamp. Below 566 the last cell's source line is truncated and
   below 524 the strip wraps to two rows, so 566 is the floor. */
export function TodayStrip({ stamp = false, className }: { stamp?: boolean; className?: string }) {
  return (
    <div className={className}>
      <TodayVoiceBar stamp={stamp} className="mb-5" />
      <KpiStrip items={TODAY_KPIS} minCell={130} />
    </div>
  );
}

/* The daily spend chart with its caption and range control: the last 14
   days in navy against the 14 before in grey, at rest on the last day. */
export function TodayTrend({ className }: { className?: string }) {
  return (
    <div className={cx("mt-8", className)}>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="text-[12.5px] text-pb-fg-muted">
          Daily spend, last {RANGE_DAYS} days<span className="text-pb-fg-faint"> · grey is the prior {RANGE_DAYS}</span>
        </div>
        <RangeToggle value={`${RANGE_DAYS}d`} />
      </div>
      <TrendLine
        data={DAILY}
        format={formatCurrencyCompact}
        height={128}
        mutedBefore={DAILY.length - RANGE_DAYS}
        compareLabel={`${RANGE_DAYS}d earlier`}
      />
    </div>
  );
}

/* TodayContent: the body of the Today page for a brand on the conversion
   path. Title and subtitle, the navy bar, four figures, the daily spend
   line, then the week's worklist beside the standing-health rail.

   Design width: 994, the content column of a 1280 window with the full
   rail (fluid from about 900 to the app's 1152 cap). Natural height at
   994: 1,164px.

   layout "columns" is the app at desktop width: worklist on the left, a
   300px rail on the right. layout "stacked" is the app below its 1024px
   breakpoint: one column, the rail under the worklist with its own top
   rule. Use it for content columns under about 880px.

   stamp is the sync stamp in the navy bar's sub line. With it the
   sentence needs a 952px column to stay on two lines, so pass false in a
   narrower column (the bar before sync status has loaded, a real state).
   Nothing else changes with the width: in a worklist column under 601px
   (a 914px content column and below) the first row's title is truncated,
   as the app truncates it. */
export function TodayContent({
  layout = "columns",
  stamp = true,
  rail = true,
  className,
}: {
  layout?: "columns" | "stacked";
  /** The sync stamp in the navy bar. Pass false when the column is under 952px. */
  stamp?: boolean;
  /** Stacked layout only: include the rail under the worklist. */
  rail?: boolean;
  className?: string;
}) {
  const columns = layout === "columns";
  return (
    <div className={className}>
      <PageHeader title={TODAY_TITLE} subtitle={TODAY_SUBTITLE} />
      <TodayVoiceBar stamp={stamp} className="mb-5" />
      <KpiStrip items={TODAY_KPIS} />
      <TodayTrend />

      <div className={cx("mt-10 grid gap-x-10 items-start", columns && "grid-cols-[1fr_300px]")}>
        {/* Row 1: the section header and a matching hairline over the rail,
            so both rules sit on one line. Row 2: the feed and the rail. */}
        <PulseHeader className="min-w-0" events={PULSE_EVENTS} />
        {columns && <div className="block self-stretch border-b border-pb-border" />}
        <PulseRows events={PULSE_EVENTS} />
        {(columns || rail) && <Rail className={columns ? "border-b" : "border-b border-t mt-8"} />}
      </div>
    </div>
  );
}
