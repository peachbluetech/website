import { ArrowRight } from "lucide-react";
import { HERO_CREATIVE } from "@/components/product/sample";
import { BRIEF } from "@/components/product/brief";
import { BLEEDING } from "@/components/product/economics/data";
import { PULSE_EVENTS } from "@/components/product/today/data";
import { AdThumb, PlatformBadge, SCORE_TIERS, formatCurrency, metaForScore } from "@/components/product/ui";
import { HERO } from "./content";
import { tagValue } from "./Figures";
import { Accent, FIGURE, FRAME, GUTTER, OutlineLink, PeachLink, Pic, Plus, T, Tag } from "./parts";

/* The first screen. Paper, the frame's two vertical rules, the copy, one
   rule with its two marks, and under it the rail: one lit card between
   two pale ones (the cut list on its left, the next brief on its right),
   all three set on the page's one drafting grid (major lines only), over
   its one gradient (the glow). The lit card is whole at every size:
   nothing cuts it but the reader's own fold. The lit ad is the page's
   one annotated picture: three tags on hairline leaders.

   The visible hero starts with the headline: the page's one h1, the
   keyword line, is in the HTML first in the hero and visually hidden.
   The hero ends as every section does: its foot rule is the rule section
   01 opens on, the page's own air (SECTION_END's sizes) under the
   cards. */

const WINNER = PULSE_EVENTS.find((ev) => ev.type === "new_winner");

const LIT_LABEL = `One ad from a sample account as Peachblue shows it: "${HERO_CREATIVE.name}" with its score of ${HERO_CREATIVE.score}, the reason it is winning, and the action that goes with it, scale it, with the dollars it spent this week.`;

/* ── The pale neighbours ────────────────────────────────────────── */

/* A pale card is 232 by 257: its top edge and its foot are on the grid's
   horizontal lines, and the foot is level with the lit card's. */
const DIM = "absolute top-[127px] h-[257px] w-[232px] flex-col rounded-[4px] border border-[color:var(--mn-rule)] bg-[var(--mn-card-dim)]";

function DimHead({ label, flip = false }: { label: string; flip?: boolean }) {
  return (
    <div className={`flex h-10 shrink-0 items-center border-b border-[color:var(--mn-rule)] px-4 ${flip ? "justify-end" : ""}`}>
      <span className={`${T.label} text-[color:var(--mn-muted)]`}>{label}</span>
    </div>
  );
}

/* The cut list's neighbour: the four creatives at the top of the sample
   account's cut list, each its greyed thumbnail and its real score. A
   thumbnail keeps a hairline outline, so a pale ad still reads as a tile.
   The frame cuts this card on its left, so the label, the thumbnails and
   the scores all sit at its right and no lettering is cut. */
const CUTS = BLEEDING.slice(0, 4);

function DimCut({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`${DIM} ${className}`}>
      <DimHead label="Cut list" flip />
      <div className="flex min-h-0 flex-1 flex-col px-4">
        {CUTS.map((b) => (
          <div key={b.key} className="flex flex-1 items-center justify-end gap-3 border-b border-[color:var(--mn-rule)] last:border-b-0">
            {b.image && <AdThumb imageUrl={b.image} size="sm" className="size-8 shrink-0 rounded-[4px]! border border-[color:var(--mn-rule)] opacity-70 grayscale" />}
            <span className="w-5 text-right font-mono text-[13px] font-medium leading-none text-[color:var(--mn-muted)] [font-variant-numeric:tabular-nums]">{b.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* The next brief's neighbour: the first four lines of the winning recipe
   at the head of the sample account's creative brief (the data the close's
   ledger prints), each a tag value and the lift it carries. Set at the cut
   list's weight and rhythm: four ruled rows, muted, no keys. The product
   prints a value in Title Case; here it is in sentence case, like every
   other line on the page, and the lift is a whole percent, as the ledger
   prints it. Under xl the frame cuts this card on its right, so the lifts are
   left out there and the values, at its left, are whole. */
const RECIPE = BRIEF.leanInto.slice(0, 4).map((item) => {
  const v = item.value.toLowerCase();
  return { value: v.charAt(0).toUpperCase() + v.slice(1), lift: `${item.liftPct > 0 ? "+" : ""}${Math.round(item.liftPct)}%` };
});

function DimPlan({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`${DIM} ${className}`}>
      <DimHead label="Next brief" />
      <div className="flex min-h-0 flex-1 flex-col px-4">
        {RECIPE.map((r) => (
          <div key={r.value} className="flex flex-1 items-center justify-between gap-3 border-b border-[color:var(--mn-rule)] last:border-b-0">
            <span className="whitespace-nowrap text-[13px] leading-none text-[color:var(--mn-muted)]">{r.value}</span>
            <span className="font-mono text-[13px] font-medium leading-none text-[color:var(--mn-muted)] [font-variant-numeric:tabular-nums] max-xl:hidden">{r.lift}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── The lit card ───────────────────────────────────────────────── */

/* A white card among pale ones, with a thin peach ring. It is put
   together from the product's primitives and the week's "new winner"
   worklist row (its sentence, dollars and verb come from that row's data):
   the ad, the score as the page's one large figure on the product's own
   scale, one sentence of reason, then the dollars and the action.

   The ad is on screen when the page opens and at tablet widths it is the
   largest thing there, so it is the page's one image loaded eagerly at
   high priority (`priority`). The wide card and the phone card request
   the same file, so it is fetched once. */
const CARD_INK = "text-[color:var(--mn-paper-ink)]";
const CARD_MUTED = "text-[color:var(--mn-paper-muted)]";
const CARD_RULE = "border-[color:var(--mn-paper-rule)]";

function LitLabels() {
  return (
    <div className={`flex items-center justify-between border-b pb-3 ${CARD_RULE}`}>
      <span className={`${T.label} inline-flex items-center gap-2 text-[color:var(--mn-paper-accent)]`}>
        <span className="size-1.5 bg-[var(--mn-peach)]" />
        New winner
      </span>
      <span className={`${T.label} ${CARD_MUTED}`}>This week</span>
    </div>
  );
}

/* The score: the figure, its tier, then the product's own 0 to 100 scale
   with its tier thresholds marked and the top tier filled. A true
   measured line: the 12px dot sits at the score. Its small type is 10px
   in the wide card and 11px in the phone card, where nothing is set
   smaller. */
function Verdict({ phone = false }: { phone?: boolean }) {
  const small = phone ? "text-[11px]" : "text-[10px]";
  const score = HERO_CREATIVE.score;
  const meta = metaForScore(score);
  const marks = [0, SCORE_TIERS.average, SCORE_TIERS.above, SCORE_TIERS.top, 100];
  return (
    <div>
      <div className="flex items-end gap-3">
        <span className={`${FIGURE} text-[72px] leading-none ${CARD_INK}`}>{score}</span>
        <span className="pb-[11px]">
          <span className={`block font-mono font-medium uppercase leading-none tracking-[0.12em] ${small} ${CARD_MUTED}`}>Score</span>
          <span className={`mt-2 flex items-center gap-1.5 text-[16px] font-semibold leading-none ${CARD_INK}`}>
            <span className={`size-2 rounded-full ${meta.fill}`} />
            {meta.label}
          </span>
        </span>
      </div>
      <div className="relative mt-4 h-[26px]">
        <span className="absolute inset-x-0 top-[5px] h-px bg-[var(--mn-paper-line-dim)]" />
        <span className={`absolute top-[4px] h-[3px] ${meta.fill}`} style={{ left: `${SCORE_TIERS.top}%`, right: 0 }} />
        {marks.map((m) => {
          /* The end ticks stand on the ends of the line and their numbers
             are set inward from them, so nothing pokes past the card's
             column; the thresholds between are centred on their ticks. */
          const [align, place] = m === 0 ? ["items-start", { left: 0 }] : m === 100 ? ["items-end", { right: 0 }] : ["-translate-x-1/2 items-center", { left: `${m}%` }];
          return (
            <span key={m} className={`absolute top-0 flex flex-col ${align}`} style={place}>
              <span className="h-[11px] w-px bg-[var(--mn-paper-line-dim)]" />
              <span className={`mt-1.5 font-mono leading-none ${small} ${CARD_MUTED}`}>{m}</span>
            </span>
          );
        })}
        <span className="absolute top-[-0.5px] size-3 -translate-x-1/2 rounded-full border-[1.5px] border-[color:var(--mn-white)] bg-[var(--mn-paper-ink)]" style={{ left: `${score}%` }} />
      </div>
    </div>
  );
}

function Reason() {
  return (
    <>
      <div className={`text-[16px] font-semibold leading-snug ${CARD_INK}`}>{HERO_CREATIVE.name}</div>
      <p className="mt-1.5 text-[14px] leading-[1.5] text-[color:var(--mn-paper-body)]">{WINNER?.detail}</p>
    </>
  );
}

function Action() {
  return (
    <div className={`flex items-center justify-between border-t pt-4 ${CARD_RULE}`}>
      <span className={`font-mono text-[20px] font-semibold leading-none [font-variant-numeric:tabular-nums] ${CARD_INK}`}>{formatCurrency(WINNER?.dollarImpact)}</span>
      <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold leading-none text-[color:var(--mn-paper-accent)]">
        {WINNER?.action}
        <ArrowRight className="size-4" strokeWidth={1.5} />
      </span>
    </div>
  );
}

const LIT = "rounded-[4px] bg-[var(--mn-card-lit)] ring-1 ring-[color:var(--mn-card-lit-ring)]";

/* The wide card is 641 by 360 with its ring, so its two sides and its
   foot are on grid lines. Inside: 24px all round under the label strip.
   The ad is 216 by 270 at 25, 65; the verdict column is the ad's height,
   with the dollars and the action on the ad's bottom edge. Markup below
   draws on the ad at those numbers. */
function LitWide() {
  return (
    <div className={`${LIT} px-6 pb-6 pt-4`}>
      <LitLabels />
      <div className="mt-6 flex items-stretch gap-8">
        <div className="relative h-[270px] w-[216px] shrink-0 overflow-hidden rounded-[4px]">
          <AdThumb imageUrl={HERO_CREATIVE.image} ratio="four-five" size="md" priority className="rounded-none!" />
          <PlatformBadge platform={HERO_CREATIVE.platform} className="absolute right-2.5 top-2.5 bg-pb-card text-pb-fg" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <Verdict />
          <div className="mt-6">
            <Reason />
          </div>
          <div className="mt-auto">
            <Action />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Phone: the wide card's own arrangement, smaller: the ad as
   its 4:5 tile (120 by 150, the same crop the wide card shows, so the
   can is whole) beside the score and its scale, then the sentence and
   the action across the card. */
function LitPhone() {
  return (
    <div className={`${LIT} px-4 pb-5 pt-4`}>
      <LitLabels />
      <div className="mt-4 flex items-center gap-4">
        <AdThumb imageUrl={HERO_CREATIVE.image} ratio="four-five" size="md" priority className="w-[120px] shrink-0 rounded-[4px]!" />
        <div className="min-w-0 flex-1">
          <Verdict phone />
        </div>
      </div>
      <div className="mt-4">
        <Reason />
      </div>
      <div className="mt-4">
        <Action />
      </div>
    </div>
  );
}

/* The mark-up on the lit ad: three tags standing in the clear lane to the
   card's left, one width, both edges in line, each on a hairline leader
   to the thing on the creative it names: the headline, the can, the blue
   ground. Keys and values are the product's own tags for this ad
   (headline_style, product_position, dominant_color_tone), read from the
   sample data. Drawn in the lit card's box: the ad is 25 to 241 by 65 to
   335. A leader is a dim navy hairline up to the photo and white on a
   navy halo over it, and ends on a 6px navy disc with a white ring.
   Where each one ends (`to`) is set by eye for this ad's art: if the
   art or its focus changes, set them again. The tags
   stand clear of the grid's horizontal lines (103 and 231 in this box).
   From xl up, where the rail has the lane. */
const LEADERS: { y: number; to: number; k: string; v: string }[] = [
  { y: 128, to: 62, k: "Hook", v: tagValue("headline_style") },
  { y: 199, to: 118, k: "Product", v: tagValue("product_position") },
  { y: 270, to: 44, k: "Color", v: tagValue("dominant_color_tone") },
];
/* The gap between a tag and the card, and the one width the three tags
   share (it fits the longest value, "Brand slogan", with the tag's own
   8px either side), so the stack lines up on both edges. */
const LANE = 48;
const TAG_W = 164;

function Markup() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 hidden xl:block">
      <svg width={641} height={360} viewBox="0 0 641 360" fill="none" className="absolute inset-0 overflow-visible">
        {LEADERS.map((l) => (
          <g key={l.k}>
            <path d={`M${-LANE} ${l.y + 0.5}H25`} stroke="var(--mn-line-dim)" strokeWidth={1} />
            <path d={`M25 ${l.y + 0.5}H${l.to}`} stroke="var(--mn-paper-ink)" strokeOpacity={0.3} strokeWidth={3} />
            <path d={`M25 ${l.y + 0.5}H${l.to}`} stroke="var(--mn-white)" strokeWidth={1} />
            <circle cx={l.to} cy={l.y + 0.5} r={5} fill="var(--mn-white)" />
            <circle cx={l.to} cy={l.y + 0.5} r={3} fill="var(--mn-paper-ink)" />
          </g>
        ))}
      </svg>
      {LEADERS.map((l) => (
        <Tag key={l.k} k={l.k} v={l.v} className="absolute" style={{ top: l.y - 10, right: `calc(100% + ${LANE}px)`, width: TAG_W }} />
      ))}
    </div>
  );
}

/* The rail. Everything in it is placed from the centre line, in whole
   pixels, so it sits on the grid: the lit card from 320 left to 320
   right, the pale cards a 24px gap away, the right one ending on the
   line 576 out. From xl the tags take the two cells left of the lit
   card, and the cut list stands 24px beyond them from 1440, where the
   frame leaves it room for its label. Under 1080 the frame would cut the
   pale cards' lettering, so the lit card stands alone.

   The rail has a height of its own, not the screen's: the 384px the grid
   and the cards take, then the air every section ends on (SECTION_END in
   parts.tsx: 128px from lg, 96px from md, 64px on a phone) down to the
   hero's foot rule, which is the rule section 01's strip opens on. */
function Rail() {
  return (
    <div className="relative z-10 overflow-hidden md:h-[480px] lg:h-[512px]">
      {/* The page's one drafting grid: major lines only, under the rule. It
          ends on the line the three cards stand on (383px under the rule):
          under that line the rail is open field down to the hero's foot
          rule, 96px of it from md and 128px from lg. */}
      <div aria-hidden="true" className="bp-rail-grid absolute inset-x-0 top-0 h-[384px] max-md:hidden" />

      <div className="absolute inset-y-0 left-1/2 w-0 max-md:hidden">
        <DimCut className="left-[-576px] hidden min-[67.5rem]:flex xl:hidden min-[90rem]:left-[-788px] min-[90rem]:flex" />
        <div className="absolute left-[-320px] top-6 w-[641px]">
          <Pic label={LIT_LABEL} width={641} height={360}>
            <div className="p-px">
              <LitWide />
            </div>
          </Pic>
          <Markup />
        </div>
        <DimPlan className="left-[345px] hidden min-[67.5rem]:flex" />
      </div>

      {/* Phone: the lit card alone, whole, on the glow, with the page's
          64px under it. */}
      <div className="mx-auto w-[min(322px,calc(100%-32px))] pb-16 pt-6 md:hidden">
        <Pic label={LIT_LABEL} width={322} height={367}>
          <div className="p-px">
            <LitPhone />
          </div>
        </Pic>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className={`relative overflow-hidden bg-[var(--mn-field)] ${GUTTER}`}>
      <div className={`${FRAME} relative border-x border-b border-[color:var(--mn-rule)]`}>
        {/* The headline's line box starts 48px under the nav on a phone.
            From md it is 64px on a screen 900px tall or taller and less on
            a shorter one (down to 32px), which keeps more of the lit card
            above the fold. */}
        <div className="relative z-10 px-4 pb-8 pt-12 text-center sm:px-8 md:pb-[clamp(24px,3.6svh,32px)] md:pt-[clamp(32px,7.12svh,64px)]">
          {/* The page's one h1, first in the hero, word for word. Visually
              hidden with the standard screen-reader-only utility: the
              visible hero starts with the headline, which stays an h2. */}
          <h1 className="sr-only">{HERO.keywordHeading}</h1>
          <h2 className={`mx-auto max-w-[860px] text-balance ${T.display} text-[color:var(--mn-ink)]`}>
            <Accent text={HERO.headline} phrase="ad creative." className="text-[color:var(--mn-accent-lg)]" />
          </h2>
          <p className={`mx-auto mt-4 max-w-[640px] text-pretty ${T.bodyLg} text-[color:var(--mn-body)]`}>{HERO.subhead}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <PeachLink href={HERO.primaryCta.href} arrow={HERO.primaryCta.arrow} className="max-sm:px-4">
              {HERO.primaryCta.label}
            </PeachLink>
            <OutlineLink href={HERO.secondaryCta.href} className="max-sm:px-4">
              {HERO.secondaryCta.label}
            </OutlineLink>
          </div>
          <p className="mt-4 font-mono text-[12px] leading-[16px] text-[color:var(--mn-muted)]">{HERO.riskReversal}</p>
        </div>

        {/* The glow: one peach light behind the lit card. The page's one gradient. */}
        <div aria-hidden="true" className="relative h-0">
          <div
            className="pointer-events-none absolute left-1/2 top-[-230px] h-[760px] w-[1240px] max-w-none -translate-x-1/2 opacity-[var(--mn-glow-strength)] max-md:top-[-200px] max-md:h-[640px] max-md:w-[var(--mn-glow-phone-w)] max-md:opacity-[var(--mn-glow-phone-strength)]"
            style={{
              background:
                "radial-gradient(closest-side, rgb(var(--mn-glow) / 0.86) 0%, rgb(var(--mn-glow) / 0.60) 26%, rgb(var(--mn-glow) / 0.26) 52%, rgb(var(--mn-glow) / 0.07) 76%, rgb(var(--mn-glow) / 0) 100%)",
            }}
          />
        </div>

        {/* The rule under the copy, with a plus mark where it meets each vertical rule. */}
        <div className="relative z-20 h-px bg-[var(--mn-rule)]">
          <Plus on="field" className="-left-px top-0" />
          <Plus on="field" className="left-full top-0" />
        </div>

        <Rail />
      </div>
    </section>
  );
}
