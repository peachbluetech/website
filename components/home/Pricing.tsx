import { PRICING_TEASER, type PlanTeaser } from "./content";
import { Accent, ArrowLink, Eyebrow, FIGURE, INSET, Keep, MONO_FIG, OutlineLink, PAPER, PeachLink, SECTION_END, SectionMarker, Sheet, T } from "./parts";

/* Pricing (#pricing): the three plans, section 07. Type only: a serif
   heading, three sibling tiles and one link. No picture.

   The header is one row from lg: the heading on eight of twelve columns,
   the subhead on the other four, its last line on the heading's last
   baseline. The header's grid has the tiles' own 24px gap, so the
   subhead starts on the third tile's left edge.

   The three tiles share one ground (white, a hairline, 4px) and one set
   of rows: from md each tile is a subgrid of the row of tiles, so the
   names, the blurbs, the rules, the prices and the buttons of all three
   stand on the same lines whatever the blurbs wrap to. Where subgrid is
   missing a tile lays its own rows out and only the alignment is lost.

   Pro is the chosen object: the system's one emphasis outline (1.5px
   peach) in place of the hairline, the label, and the screen's one peach
   button. Peach on this screen, counted: the heading's accent phrase,
   that label, that outline, that button. Nothing else. */

const ACCENT = "your ad spend.";

/* One plan. Four rows: the name (and on the popular plan the label, a
   bare label on the name's baseline, not a pill), the blurb, the price
   under a hairline (the figure at 40px in the page's numerals, "Custom"
   in the same face and size, the cadence in mono on the same baseline),
   the plan's link as a button across the tile's foot.

   The outline is drawn over the tile's own 1px border, so the popular
   tile's content stands exactly where its siblings' does.

   From md to lg a tile is under 210px wide: its padding is 16px there
   and the button's side padding 8px, so the name and the label share a
   line and the button's label fits. */
function Plan({ plan }: { plan: PlanTeaser }) {
  const Button = plan.popular ? PeachLink : OutlineLink;
  return (
    <div
      className={`relative rounded-[4px] border bg-[var(--mn-white)] p-6 md:row-span-4 md:grid md:grid-rows-subgrid md:max-lg:p-4 xl:p-8 ${plan.popular ? "border-[color:var(--mn-peach)]" : PAPER.rule}`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h3 className={`${T.h3} ${PAPER.ink}`}>{plan.name}</h3>
        {plan.popular && <Eyebrow className="shrink-0">{PRICING_TEASER.popularBadge}</Eyebrow>}
      </div>
      <p className={`mt-2 text-pretty ${T.small} ${PAPER.body}`}>{plan.blurb}</p>
      <p className={`mt-6 flex items-baseline gap-1.5 border-t pt-6 ${PAPER.rule}`}>
        <span className={`${FIGURE} text-[40px] leading-none ${PAPER.ink}`}>{plan.price}</span>
        {plan.cadence && <span className={`${MONO_FIG} ${PAPER.muted}`}>{plan.cadence}</span>}
      </p>
      <Button href={plan.cta.href} arrow={plan.cta.arrow} className="mt-8 w-full md:max-lg:px-2">
        {plan.cta.label}
      </Button>
      {plan.popular && <span aria-hidden="true" className="pointer-events-none absolute -inset-px rounded-[4px] border-[1.5px] border-[color:var(--mn-peach)]" />}
    </div>
  );
}

export function PricingTeaser() {
  return (
    <Sheet id={PRICING_TEASER.id} className={SECTION_END}>
      <SectionMarker n={7}>
        <p>{PRICING_TEASER.eyebrow}</p>
      </SectionMarker>
      <div className={`pt-12 ${INSET}`}>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-x-6 gap-y-4 lg:grid-cols-12 lg:items-baseline-last">
          <h2 className={`text-balance lg:col-span-8 ${T.h2} ${PAPER.ink}`}>
            <Accent text={PRICING_TEASER.headline} phrase={ACCENT} className={PAPER.accentLg} />
          </h2>
          <p className={`max-w-[30em] text-balance lg:col-span-4 ${T.body} ${PAPER.body}`}>
            <Keep text={PRICING_TEASER.subhead} />
          </p>
        </div>
        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-y-4 md:grid-cols-3 md:gap-x-4 md:gap-y-0 lg:gap-x-6">
          {PRICING_TEASER.plans.map((plan) => (
            <Plan key={plan.name} plan={plan} />
          ))}
        </div>
        <ArrowLink href={PRICING_TEASER.allPlans.href} arrow={PRICING_TEASER.allPlans.arrow} className="mt-8">
          {PRICING_TEASER.allPlans.label}
        </ArrowLink>
      </div>
    </Sheet>
  );
}
