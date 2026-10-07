import { Block, Card, Cell, Cells, Keep, Pill, Rule, SplitHead, T, TONE, Tag, cx } from "@/components/site/parts";
import { PRICING_TEASER, type PlanTeaser } from "./content";
import "./Pricing.css";

/* Pricing (#pricing).

   The three plans: a split header, then three columns divided by inner
   rails between two rules that carry a mark over every rail. In a
   column, top to bottom: a taupe tile with the plan's name at its top
   left and its price at its bottom left, the plan's link as a pill
   across the column, and the blurb.

   The popular plan is marked three ways and no others: its pill is the
   section's one filled pill (the other two are outline), its tile
   carries the label under the name as a small outlined tag, and its
   tile is flat navy (the product's navy, the filled pill's own colour)
   with everything on it in white, where its neighbours are taupe. No
   plan button carries an arrow.

   Under the columns one row: the link to all plans as an outline pill at
   the right (left under 1024, where the columns are stacked).

   Type only: no picture. Page.tsx draws the rule above this section and
   the rule under it; the two round the columns are drawn here.
   HTML order: section#pricing > p, h2, p, three div (h3, tag on the
   popular plan, price p, a, blurb p), a (all plans). */

/* One plan. The tile is a fixed height (200px; 160 on a phone) with the
   name's cap top 20px from its top and the price's baseline 20px from
   its foot. The price is Inter 20/27 in tabular figures; the cadence is
   14px in earth, the secondary tone on taupe, on the same baseline. */
function Plan({ plan }: { plan: PlanTeaser }) {
  return (
    <>
      <Card variant="tile" tone={plan.popular ? "navy" : "taupe"} className="el-pricing-tile">
        <div className="el-pricing-name">
          <h3 className={T.titleLg}>{plan.name}</h3>
          {plan.popular && <Tag className="el-pricing-tag">{PRICING_TEASER.popularBadge}</Tag>}
        </div>
        <p className={cx(T.title, "el-tnum")}>
          <span>{plan.price}</span>
          {plan.cadence && <span className={cx("el-ui", TONE.earth, "el-pricing-cadence")}>{plan.cadence}</span>}
        </p>
      </Card>
      <Pill href={plan.cta.href} variant={plan.popular ? "filled" : "outline"} arrow={!plan.popular && plan.cta.arrow} block className="el-pricing-cta">
        {plan.cta.label}
      </Pill>
      <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-pricing-blurb")}>{plan.blurb}</p>
    </>
  );
}

export function Pricing() {
  return (
    <section id={PRICING_TEASER.id} className="el-pricing">
      <Block top="top" bottom="gap">
        <SplitHead eyebrow={PRICING_TEASER.eyebrow} title={PRICING_TEASER.headline}>
          <p className={cx(T.body, "el-pretty")}>
            <Keep text={PRICING_TEASER.subhead} />
          </p>
        </SplitHead>
      </Block>
      <Rule marks="thirds" />
      <Cells cols={3}>
        {PRICING_TEASER.plans.map((plan) => (
          <Cell key={plan.name} pad="card">
            <Plan plan={plan} />
          </Cell>
        ))}
      </Cells>
      <Rule marks="thirds" />
      <Block className="el-pricing-all">
        <Pill href={PRICING_TEASER.allPlans.href} variant="outline" arrow={PRICING_TEASER.allPlans.arrow}>
          {PRICING_TEASER.allPlans.label}
        </Pill>
      </Block>
    </section>
  );
}
