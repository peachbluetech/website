import type { Metadata } from "next";
import { CompareTable, FaqBand, PageHeader, Stack } from "@/components/site/kit";
import { Block, Card, Cell, Cells, Dotted, Frame, Keep, MEDIUM, Pill, Rule, SplitHead, T, TONE, Tag, TextLink, cx } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { DEMO_HREF, SALES_HREF, SELF_SERVE, signupHref } from "@/lib/site";
import { COMPARE, FAQS, PLANS, type Plan } from "./plans";
import { BillingLink, BillingProvider, BillingText, BillingToggle } from "./pricing-client";
import "./pricing.css";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans that scale with your ad spend. Starter and Pro include a 7-day trial with multi-platform sync, AI creative analysis, and Agent Peach included.",
  alternates: {
    canonical: "/pricing",
  },
};

/* The pricing page, built in the design system from the inner-page kit.

   A server component: every plan, price, feature line, table cell and
   answer is in the HTML the server sends. The only client code is the
   billing choice and the three things that follow it (the price, the
   "billed" line and the signup link of each plan); see
   pricing-client.tsx. Plans and copy live in plans.ts.

   Top to bottom:
   - The header: the eyebrow, the h1, the lead on the right half, and
     the billing choice under the title.
   - The plans (.el-plans): two rows of three ruled cells, as the
     homepage's pricing section has one. The five plans in order, then
     Enterprise as the sixth cell. Under them one row of small print.
   - The comparison (#compare): a section header and the table.
   - The questions, as disclosure rows.

   The words, the heading levels, the links and the id are the published
   ones: restyle freely, do not reword. This page's own rules are in
   pricing.css. */

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/* The plans in rows of three. */
const ROWS = [PLANS.slice(0, 3), PLANS.slice(3)];

export default function PricingPage() {
  return (
    <SitePage current="pricing">
      <BillingProvider>
        <PageHeader
          eyebrow="Pricing"
          title="Plans that scale with your ad spend."
          lead="Starter and Pro start with a 7-day trial. Upgrade, downgrade, or cancel anytime."
          bottom="gap"
        >
          <BillingToggle />
        </PageHeader>

        <Frame>
          <Rule marks="thirds" />

          <section className="el-plans">
            <Cells cols={3}>
              {ROWS[0].map((plan) => (
                <Cell key={plan.id} pad="card">
                  <PlanCell plan={plan} />
                </Cell>
              ))}
            </Cells>
            <Rule marks="thirds" />
            <Cells cols={3}>
              {ROWS[1].map((plan) => (
                <Cell key={plan.id} pad="card">
                  <PlanCell plan={plan} />
                </Cell>
              ))}
              <Cell pad="card" className="el-plans-solo">
                <EnterpriseCell />
              </Cell>
            </Cells>
            <Rule marks="thirds" />
            <Block top="gap" bottom="gap">
              <p className={cx(T.bodySm, TONE.smoke, "el-balance")}>
                <Keep text="Starter and Pro include a 7-day trial. Cancel anytime." />
              </p>
            </Block>
          </section>

          <Rule />

          <section id="compare" className="el-plans-compare">
            <Block top="top" bottom="gap">
              <SplitHead eyebrow="Compare" title="Every plan, side by side." />
            </Block>
            <Block bottom="pad">
              <CompareTable
                label="Plan comparison"
                corner="Feature"
                columns={PLANS.map((p) => ({ key: p.id, name: p.name, note: p.cta === "sales" ? "Custom" : `${usd(p.monthly)}/mo` }))}
                groups={COMPARE}
              />
              <p className={cx(T.bodySm, TONE.smoke, "el-plans-more")}>
                Enterprise adds custom seats and limits, SSO, and a dedicated CSM.{" "}
                <TextLink href={SALES_HREF} underline>
                  Talk to sales
                </TextLink>
              </p>
            </Block>
          </section>

          <Rule />

          <FaqBand faq={FAQS} id={null} eyebrow="Questions" title="Good to know." labelAs="h3" />

          <Rule />
        </Frame>
      </BillingProvider>
    </SitePage>
  );
}

/* One plan, in its cell. Top to bottom: the tile (the name at its top
   left with the seats at its top right, the price and the "billed" line
   at its foot), the plan's pill across the column, the plan's one line,
   then what the plan holds as rows on dotted separators.

   The popular plan is marked three ways and no others, as on the
   homepage: its tile is flat navy with everything on it in white, its
   tile carries the small outlined tag, and its pill is the page's one
   filled pill. The tag comes first in the markup and stands under the
   name. */
function PlanCell({ plan }: { plan: Plan }) {
  const annualTotal = plan.monthly * 10;
  const sales = plan.cta === "sales";
  const buy = plan.cta === "buy";

  return (
    <>
      <Card variant="tile" tone={plan.popular ? "navy" : "taupe"} className="el-plans-tile">
        <div className="el-plans-head">
          {plan.popular && <Tag className="el-plans-tag">Most popular</Tag>}
          <h2 className={cx(T.titleLg, "el-plans-name")}>{plan.name}</h2>
          <span className={cx("el-ui", TONE.earth, "el-plans-seats")}>{plan.seats}</span>
        </div>
        <Stack gap={12}>
          <p className={cx(T.title, "el-tnum")}>
            {sales ? (
              <span>Custom</span>
            ) : (
              <>
                <span>
                  <BillingText monthly={usd(plan.monthly)} annual={usd(Math.floor(annualTotal / 12))} />
                </span>
                <span className={cx("el-ui", TONE.earth, "el-plans-cadence")}>/mo</span>
              </>
            )}
          </p>
          <p className={cx(T.caption, TONE.earth, "el-tnum")}>
            {sales ? "Tailored to your client roster" : <BillingText monthly="Billed monthly" annual={`Billed ${usd(annualTotal)}/yr`} />}
          </p>
        </Stack>
      </Card>

      <div className="el-plans-cta">
        {sales ? (
          <Pill href={SALES_HREF} variant="outline" block>
            Talk to sales
          </Pill>
        ) : (
          <BillingLink monthlyHref={signupHref(plan.id, "monthly")} annualHref={signupHref(plan.id, "annual")} filled={plan.popular}>
            {!SELF_SERVE ? "Get early access" : plan.cta === "trial" ? "Start 7-day trial" : "Get started"}
          </BillingLink>
        )}
        {buy && (
          <p className="el-ui el-plans-alt">
            <TextLink href={DEMO_HREF} underline>
              or book a demo
            </TextLink>
          </p>
        )}
      </div>

      <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-plans-blurb")}>
        <Keep text={plan.tagline} words />
      </p>

      <div className="el-plans-list">
        {plan.inherits && <p className={cx("el-row", T.bodySm, MEDIUM)}>Everything in {plan.inherits}, plus:</p>}
        <Dotted lead={Boolean(plan.inherits)}>
          {plan.features.map((feature) => (
            <li key={feature} className={cx("el-row", T.bodySm, "el-pretty")}>
              <Keep text={feature} words />
            </li>
          ))}
        </Dotted>
      </div>
    </>
  );
}

/* Enterprise, the sixth cell: the same tile with the plan's one sentence
   where a price would stand, and the link to sales across the column. */
function EnterpriseCell() {
  return (
    <>
      <Card variant="tile" className="el-plans-tile">
        <h2 className={T.titleLg}>Enterprise</h2>
        <p className={cx(T.bodySm, TONE.earth, "el-pretty")}>
          Custom pricing with custom seats and limits, dedicated support, and onboarding built around your team.
        </p>
      </Card>
      <div className="el-plans-cta">
        <Pill href={SALES_HREF} variant="outline" block>
          Talk to sales
        </Pill>
      </div>
    </>
  );
}
