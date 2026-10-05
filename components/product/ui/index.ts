/* Ported product primitives. Static server components: no state, no
   handlers, no headings, no links or buttons. Render them inside the Shot
   wrapper from components/product/frame, which supplies the product scope. */

export { cx } from "./cx";
export type { ClassValue } from "./cx";

export {
  formatCurrency,
  formatCurrencyCompact,
  formatInteger,
  formatPercent,
  formatRoas,
  formatSignedPct,
} from "./format";

export { SCORE_TIERS, TIER_META, metaForScore, tierForScore } from "./tier";
export type { ScoreTier, TierMeta } from "./tier";

export { VoiceBar, Fig, VoiceDelta } from "./VoiceBar";
export { KpiStrip } from "./KpiStrip";
export type { KpiItem } from "./KpiStrip";
export { SectionHeader } from "./SectionHeader";
export { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card";
export { Badge } from "./Badge";
export type { BadgeVariant } from "./Badge";
export { ScoreBadge, ScoreMeter } from "./ScoreBadge";
export { ScoreDot } from "./ScoreDot";
export { Button, PeachLink } from "./Button";
export type { ButtonSize, ButtonVariant } from "./Button";
export { SegmentedToggle, RangeToggle } from "./SegmentedToggle";
export type { SegmentedOption } from "./SegmentedToggle";
export { Collapsible } from "./Collapsible";
export { MetricGrid } from "./MetricGrid";
export type { MetricItem } from "./MetricGrid";
export { PlatformBadge } from "./PlatformBadge";
export { AdThumb } from "./AdThumb";
export type { ThumbRatio } from "./AdThumb";
export { adFocus, adImage } from "./adImage";
export type { AdImageSize, AdShape } from "./adImage";
export { PeachMark } from "./PeachMark";
export { AskPeachButton } from "./AskPeachButton";
export { TrendLine, TickStrip, DecayLine } from "./charts";
export type { TickTone, TrendAnnotation, TrendPoint } from "./charts";
