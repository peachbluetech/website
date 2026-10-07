/* What the hero picture (ShowcaseA.tsx) says, read once from the sample
   account: the week's winning ad, the worklist's "new winner" row for
   the sentence, the dollars and the verb, three of the ad's own tags,
   the top of the cut list and the head of the next brief's recipe.
   Nothing here is typed by hand that the sample account can compute, so
   a figure changed in components/product/sample.ts changes here too.

   The handful of fixed words (WORDS) are the picture's own labels. No
   other word belongs in the picture.

   No directive and no JSX. */

import { BRIEF } from "@/components/product/brief";
import { BLEEDING } from "@/components/product/economics/data";
import { HERO_CREATIVE } from "@/components/product/sample";
import { PULSE_EVENTS } from "@/components/product/today/data";
import { SCORE_TIERS, formatCurrency, metaForScore } from "@/components/product/ui";
import { tagValue } from "../tags";

/* ── The winner ─────────────────────────────────────────────────── */

/** The ad: its name, image, platform and score. */
export const AD = HERO_CREATIVE;

/* The week's "new winner" row of the product's worklist. Its sentence,
   its dollars and its one verb are that row's own. */
const WINNER = PULSE_EVENTS.find((ev) => ev.type === "new_winner");

/** The row's sentence: when the ad launched, its tier and return, and what that is worth. */
export const SENTENCE = WINNER?.detail ?? "";
/** "$9,400.00": the ad's spend in the week, as the worklist prints it. */
export const DOLLARS = formatCurrency(WINNER?.dollarImpact);
/** "Scale it": the row's one verb. */
export const ACTION = WINNER?.action ?? "";

/* ── The verdict ────────────────────────────────────────────────── */

const META = metaForScore(AD.score);

/** The score on the product's own 0 to 100 scale. `fill` is the product's
    class for the tier's colour (it needs the product scope, which the
    Shot gives): use it for the tier dot and the top tier's part of the
    scale. `marks` are the scale's ends and its tier thresholds, `from`
    is where the ad's own tier begins. */
export const VERDICT = {
  score: AD.score,
  tier: META.label,
  fill: META.fill,
  marks: [0, SCORE_TIERS.average, SCORE_TIERS.above, SCORE_TIERS.top, 100] as const,
  from: SCORE_TIERS.top,
};

/* ── The three things read from the ad ──────────────────────────── */

/* The frame the page's picture draws the ad in (bits.tsx, Ad
   frame="hero"). The hero is the one place on the page where the whole
   idea of the ad has to read, so the box is taller than the library's
   4:5 tile, which keeps the headline and loses the can's foot: 2 by 3,
   placed on the 9:16 creative so that it runs from just over the
   headline to just under the can. Both are whole, with the same 11px
   or so of fruit over the one and under the other on an ad 192px wide,
   and the button at the creative's foot is out of the frame altogether,
   not cut through. `focus` is the object-position that places it (22%
   down the part of the creative that a 2:3 box cannot show).

   This is a framing of this one picture, set by eye on this ad's art.
   The creative's own crops (components/product/ui/adFocus.json) are
   not touched by it and no other picture reads it. If the art changes,
   set it again, and the three points below with it. */
export const FRAME = { ratio: "2 / 3", focus: "50% 22%" } as const;

/* Keys and values are the product's own tags for this ad
   (headline_style, product_position, dominant_color_tone), in sentence
   case.

   Each tag has a point: where on the ad the mark for it belongs, in
   percent of the box the ad is drawn in (the hero's frame, FRAME above),
   with the line coming in from the ad's right edge:
   - Hook: on the fruit just past the full stop of "All fizz.", the
     headline's second line, at the middle of its letters' height. The
     mark stands beside the headline and covers none of it, on an ad
     136px wide as on one 224px wide.
   - Product: the can's right side, between its wordmark and its edge,
     at the middle of the frame.
   - Color: the flesh of the cut orange at the lower right, over its
     white centre.
   The three are 36 points apart (14, 50, 86), so their tags stand in
   one even column, and each is at a height where the line to the ad's
   right edge crosses fruit only: no lettering and none of the can's
   bubbles.

   All set by eye on this ad's art (the orange can lying among oranges)
   and checked at every size the ad is drawn: if the art, its focus or
   the hero's frame changes, set them again. */
export type AdPoint = { x: number; y: number };
export type AdTag = { key: string; value: string; hero: AdPoint };

export const TAGS: AdTag[] = [
  { key: "Hook", value: tagValue("headline_style"), hero: { x: 74, y: 14 } },
  { key: "Product", value: tagValue("product_position"), hero: { x: 65, y: 50 } },
  { key: "Color", value: tagValue("dominant_color_tone"), hero: { x: 84, y: 86 } },
];

/* ── The two glances ────────────────────────────────────────────── */

/** What to cut: the four creatives at the top of the sample account's cut
    list, each its thumbnail and its real score. The first four all have
    an image. */
export const CUTS = BLEEDING.slice(0, 4).map((row) => ({ key: row.key, image: row.image, score: row.score }));

/** What to brief next: the first four lines of the winning recipe at the
    head of the sample account's creative brief, each a tag value (in
    sentence case, like every other line on the page) and the lift it
    carries as a whole percent. */
export const RECIPE = BRIEF.leanInto.slice(0, 4).map((item) => {
  const v = item.value.toLowerCase();
  return { value: v.charAt(0).toUpperCase() + v.slice(1), lift: `${item.liftPct > 0 ? "+" : ""}${Math.round(item.liftPct)}%` };
});

/* ── The fixed words ────────────────────────────────────────────── */

/** The picture's own labels. Sentence case; never set in caps. */
export const WORDS = {
  winner: "New winner",
  when: "This week",
  score: "Score",
  cut: "Cut list",
  brief: "Next brief",
} as const;

/* ── The text alternative ───────────────────────────────────────── */

/** The picture's Shot label: everything the picture says, in reading
    order, for someone who cannot see it. One sentence, and it says
    "sample account", as every picture's does. It names no position
    ("beside", "under"), because the cards move with the screen. */
export const LABEL = `This week's winning ad from a sample account as Peachblue shows it: "${AD.name}", scored ${AD.score} (${META.label.toLowerCase()} tier); what Peachblue read from it (${TAGS.map((t) => `${t.key.toLowerCase()}: ${t.value.toLowerCase()}`).join("; ")}); why it is winning ("${SENTENCE}"); the ${DOLLARS} it spent this week and the action that goes with it, ${ACTION.toLowerCase()}; and with it the scores of the four ads at the top of the cut list (${CUTS.map((c) => c.score).join(", ")}) and the first four lines of the next brief (${RECIPE.map((r) => `${r.value.toLowerCase()} ${r.lift}`).join(", ")}).`;
