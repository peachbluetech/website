import type { Metadata } from "next";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { OutlineLink } from "@/components/site/Button";
import { DEMO_HREF, SALES_HREF, SELF_SERVE, signupHref } from "@/lib/site";
import { COMPARE, FAQS, PLANS, type CompareValue, type Plan } from "./plans";
import { BillingLink, BillingProvider, BillingText, BillingToggle } from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans that scale with your ad spend. Starter and Pro include a 7-day trial with multi-platform sync, AI creative analysis, and Agent Peach included.",
  alternates: {
    canonical: "/pricing",
  },
};

/* The pricing page. A server component: every plan, price, feature line,
   table cell and answer is in the HTML the server sends. The only client
   code is the billing toggle and the three things that follow it (the
   price, the "billed" line and the signup link of each plan); see
   pricing-client.tsx. Plans and copy live in plans.ts. */

const LABEL = "text-[13px] font-semibold text-pb-peach-700";
const SECTION_HEADING =
  "font-display font-medium text-pb-ink text-[clamp(28px,3.2vw,38px)] leading-[1.12] tracking-[-0.015em] text-balance";
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-peach-500 focus-visible:ring-offset-2";

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 text-pb-good ${className}`}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-pb-bg text-pb-fg">
      <SiteNav current="pricing" />
      <main>
        <BillingProvider>
          <section className="px-6 pt-12 md:pt-[72px]">
            <div className="mx-auto max-w-[720px] text-center">
              <p className={LABEL}>Pricing</p>
              <h1 className="mt-3 font-display font-medium text-pb-ink text-[clamp(34px,4.4vw,56px)] leading-[1.07] tracking-[-0.02em] text-balance">
                Plans that scale with your ad spend.
              </h1>
              <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[26px] text-pb-fg-secondary text-pretty md:text-[18px] md:leading-[28px]">
                Starter and Pro start with a 7-day trial. Upgrade, downgrade, or cancel anytime.
              </p>
              <div className="mt-7 flex justify-center">
                <BillingToggle />
              </div>
            </div>
          </section>

          <section className="px-6 pt-10 md:pt-12">
            <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {PLANS.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>

            <div className="mx-auto mt-4 flex max-w-[1280px] flex-col gap-4 rounded-[10px] border border-pb-border bg-pb-card p-5 md:flex-row md:items-center md:gap-8">
              <div className="flex-1">
                <h2 className="text-[16px] font-semibold text-pb-fg">Enterprise</h2>
                <p className="mt-1 text-[14px] leading-[1.55] text-pb-fg-secondary">
                  Custom pricing with custom seats and limits, dedicated support, and onboarding built around your team.
                </p>
              </div>
              <OutlineLink href={SALES_HREF} className="shrink-0 self-start md:self-center">
                Talk to sales
              </OutlineLink>
            </div>

            <p className="mt-6 text-center text-[13px] text-pb-fg-muted">
              Starter and Pro include a 7-day trial. Cancel anytime.
            </p>
          </section>
        </BillingProvider>

        <section id="compare" className="px-6 pt-20 md:pt-28">
          <div className="mx-auto max-w-[1152px]">
            <div className="mx-auto max-w-[640px] text-center">
              <p className={LABEL}>Compare</p>
              <h2 className={`mt-3 ${SECTION_HEADING}`}>Every plan, side by side.</h2>
            </div>

            <CompareTable />

            <p className="mt-6 text-center text-[13px] text-pb-fg-muted">
              Enterprise adds custom seats and limits, SSO, and a dedicated CSM.{" "}
              <a
                href={SALES_HREF}
                className={`rounded-sm font-medium text-pb-fg underline underline-offset-2 transition-colors hover:text-pb-peach-600 ${FOCUS_RING}`}
              >
                Talk to sales
              </a>
            </p>
          </div>
        </section>

        <section className="mt-20 border-t border-pb-border bg-pb-stone px-6 py-16 md:mt-28 md:py-24">
          <div className="mx-auto grid max-w-[1152px] gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <p className={LABEL}>Questions</p>
              <h2 className={`mt-3 ${SECTION_HEADING}`}>Good to know.</h2>
            </div>
            <div className="border-t border-pb-border lg:col-span-8">
              {FAQS.map((f) => (
                <div key={f.q} className="border-b border-pb-border py-6">
                  <h3 className="text-[16px] font-semibold text-pb-fg">{f.q}</h3>
                  <p className="mt-2 max-w-[680px] text-[15px] leading-[1.65] text-pb-fg-secondary">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/* One plan: a flat white card on a hairline. Pro is marked by a peach
   hairline, a small outlined badge and the page's only filled button.
   The badge comes first in the markup and last on the row. */
function PlanCard({ plan }: { plan: Plan }) {
  const annualTotal = plan.monthly * 10;
  const sales = plan.cta === "sales";
  const buy = plan.cta === "buy";

  return (
    <div
      className={`flex flex-col rounded-[10px] border bg-pb-card p-5 ${
        plan.popular ? "border-pb-peach-300" : "border-pb-border"
      }`}
    >
      <div className="flex min-h-[24px] items-center gap-2">
        {plan.popular && (
          <span className="order-3 ml-auto whitespace-nowrap rounded-[6px] border border-pb-peach-300 px-2 py-0.5 text-[11.5px] font-medium text-pb-peach-700">
            Most popular
          </span>
        )}
        <h2 className="order-1 text-[16px] font-semibold text-pb-fg">{plan.name}</h2>
        <span className="order-2 whitespace-nowrap text-[12.5px] text-pb-fg-muted">{plan.seats}</span>
      </div>
      <p className="mt-1.5 text-[13px] leading-[20px] text-pb-fg-secondary sm:min-h-[40px]">{plan.tagline}</p>

      <p className="mt-5 flex h-8 items-baseline gap-1">
        {sales ? (
          <span className="text-[28px] font-semibold leading-[32px] tracking-[-0.01em] text-pb-fg">Custom</span>
        ) : (
          <>
            <span className="font-mono text-[32px] font-medium leading-none tracking-[-0.02em] text-pb-fg tnum">
              <BillingText monthly={usd(plan.monthly)} annual={usd(Math.floor(annualTotal / 12))} />
            </span>
            <span className="text-[13px] text-pb-fg-muted">/mo</span>
          </>
        )}
      </p>
      <p className="mt-1.5 text-[12.5px] leading-[18px] text-pb-fg-muted">
        {sales ? (
          "Tailored to your client roster"
        ) : (
          <BillingText monthly="Billed monthly" annual={`Billed ${usd(annualTotal)}/yr`} />
        )}
      </p>

      <div className="mt-5">
        {sales ? (
          <OutlineLink href={SALES_HREF} className="w-full">
            Talk to sales
          </OutlineLink>
        ) : (
          <BillingLink
            monthlyHref={signupHref(plan.id, "monthly")}
            annualHref={signupHref(plan.id, "annual")}
            filled={plan.popular}
            className="w-full"
          >
            {!SELF_SERVE ? "Get early access" : plan.cta === "trial" ? "Start 7-day trial" : "Get started"}
          </BillingLink>
        )}
      </div>
      {/* The same slot on every card once they sit side by side, so the
          feature lists start level. Stacked on a phone, an empty one goes. */}
      <div
        className={`mt-2 min-h-[20px] text-center text-[12.5px] leading-[20px] ${buy ? "" : "max-sm:hidden"}`}
      >
        {buy && (
          <a
            href={DEMO_HREF}
            className={`rounded-sm text-pb-fg-secondary underline underline-offset-2 transition-colors hover:text-pb-fg ${FOCUS_RING}`}
          >
            or book a demo
          </a>
        )}
      </div>

      <div className={`border-t border-pb-border pt-4 sm:mt-3 ${buy ? "mt-3" : "mt-5"}`}>
        {plan.inherits && (
          <p className="mb-2.5 text-[12.5px] font-semibold text-pb-fg">Everything in {plan.inherits}, plus:</p>
        )}
        <ul className="space-y-2.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[13px] leading-[19px] text-pb-fg-body">
              <Check className="mt-[2px]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* The comparison: a real table in a flat card that scrolls sideways on a
   narrow screen, with the feature column pinned. Borders sit on the cells
   (border-separate) so they travel with the pinned column. */
function CompareTable() {
  return (
    <div
      role="region"
      aria-label="Plan comparison"
      tabIndex={0}
      className={`mt-10 overflow-x-auto rounded-[10px] border border-pb-border bg-pb-card ${FOCUS_RING}`}
    >
      <table className="w-full min-w-[700px] border-separate border-spacing-0 text-left md:min-w-[840px]">
        <thead>
          <tr>
            <th
              scope="col"
              className="sticky left-0 z-10 w-[150px] bg-pb-card px-4 py-4 align-bottom text-[12.5px] font-medium text-pb-fg-muted max-md:border-r max-md:border-pb-border md:w-[300px] md:px-5"
            >
              Feature
            </th>
            {PLANS.map((p) => (
              <th key={p.id} scope="col" className="px-3 py-4 text-center align-bottom font-normal">
                <div className="text-[14px] font-semibold text-pb-fg">{p.name}</div>
                <div
                  className={
                    p.cta === "sales"
                      ? "mt-0.5 text-[12.5px] text-pb-fg-muted"
                      : "mt-0.5 font-mono text-[12.5px] text-pb-fg-muted tnum"
                  }
                >
                  {p.cta === "sales" ? "Custom" : `${usd(p.monthly)}/mo`}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        {COMPARE.map((group) => (
          <tbody key={group.title}>
            <tr>
              <th
                scope="rowgroup"
                colSpan={PLANS.length + 1}
                className="border-t border-pb-border bg-pb-stone px-4 py-2.5 text-left text-[12.5px] font-semibold text-pb-peach-700 md:px-5"
              >
                <span className="sticky left-4 inline-block md:left-5">{group.title}</span>
              </th>
            </tr>
            {group.rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 border-t border-pb-border bg-pb-card px-4 py-3 text-left text-[13px] font-normal leading-[1.4] text-pb-fg-body max-md:border-r md:px-5 md:text-[14px]"
                >
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={PLANS[i].id} className="border-t border-pb-border px-3 py-3 text-center">
                    <CompareCell value={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

function CompareCell({ value }: { value: CompareValue }) {
  if (value === true) {
    return (
      <span role="img" aria-label="Included" className="inline-flex justify-center align-middle">
        <Check />
      </span>
    );
  }
  if (value === false) {
    return (
      <span role="img" aria-label="Not included" className="text-pb-fg-ghost">
        –
      </span>
    );
  }
  /* A bare count in mono; a phrase ("30 days", "Unlimited") in the body face. */
  return (
    <span
      className={
        /^[\d,]+$/.test(value) ? "font-mono text-[13px] text-pb-fg tnum" : "text-[13px] font-medium text-pb-fg tnum"
      }
    >
      {value}
    </span>
  );
}
