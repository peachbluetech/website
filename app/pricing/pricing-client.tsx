"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SELF_SERVE, signupHref as sharedSignupHref, SALES_HREF as SHARED_SALES_HREF, DEMO_HREF } from "@/lib/site";

type Billing = "monthly" | "annual";

type Plan = {
  id: string;
  name: string;
  monthly: number; // USD per month; annual = exactly 10x monthly
  seats: string;
  tagline: string;
  inherits?: string; // "Everything in X, plus:"
  features: string[];
  popular?: boolean;
  cta: "trial" | "buy" | "sales";
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 79,
    seats: "1 seat",
    tagline: "For solo advertisers getting started.",
    features: [
      "Meta + TikTok auto-sync",
      "29-dimension AI creative analysis (400 credits/mo)",
      "Creative Library + objective-aware scoring",
      "Agent Peach chat (500 messages/mo)",
      "Weekly digest email + Slack delivery",
    ],
    cta: "trial",
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 199,
    seats: "3 seats",
    tagline: "For growing teams running multiple channels.",
    inherits: "Starter",
    features: [
      "Google Ads auto-sync",
      "Creative intelligence patterns",
      "Next Creative Brief (shareable, generation-ready)",
      "Brand Intel (Reddit monitoring)",
      "Full history",
      "MCP/API access (your data in Claude)",
      "1,500 credits/mo",
      "3,000 agent messages/mo",
    ],
    popular: true,
    cta: "trial",
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 499,
    seats: "10 seats",
    tagline: "For teams scaling spend across platforms.",
    inherits: "Pro",
    features: [
      "Amazon DSP sync (incl. Connected TV)",
      "10 seats for the whole team",
      "4,000 credits/mo",
      "Unlimited agent messages",
    ],
    cta: "buy",
  },
  {
    id: "power",
    name: "Power",
    monthly: 799,
    seats: "8 seats",
    tagline: "For in-house teams reporting to stakeholders.",
    inherits: "Scale",
    features: [
      "Client-ready reports + pacing",
      "Priority support + onboarding",
      "6,000 credits/mo",
    ],
    cta: "buy",
  },
  {
    id: "agency",
    name: "Agency",
    monthly: 1499,
    seats: "25 seats",
    tagline: "For agencies managing many clients.",
    inherits: "Power",
    features: [
      "Multi-client workspaces (client switcher, per-client scoping)",
      "Per-client reports, Intelligence + Brand Intel",
      "Agency margin/markup on reports",
      "25 seats across your roster",
      "15,000 credits/mo",
    ],
    cta: "sales",
  },
];

const SALES_HREF = SHARED_SALES_HREF;

/* ── Full comparison table ──────────────────────────────────────── */
type CompareValue = boolean | string;
type CompareGroup = {
  title: string;
  rows: { label: string; values: [CompareValue, CompareValue, CompareValue, CompareValue, CompareValue] }[];
};

// Column order matches PLANS: Starter / Pro / Scale / Power / Agency.
const COMPARE: CompareGroup[] = [
  {
    title: "Platforms",
    rows: [
      { label: "Meta auto-sync", values: [true, true, true, true, true] },
      { label: "TikTok auto-sync", values: [true, true, true, true, true] },
      { label: "Google Ads sync", values: [false, true, true, true, true] },
      { label: "Amazon DSP sync (incl. Connected TV)", values: [false, false, true, true, true] },
    ],
  },
  {
    title: "Creative analysis",
    rows: [
      { label: "AI creative analysis (29 dimensions)", values: [true, true, true, true, true] },
      { label: "Objective-aware scoring + performance tiers", values: [true, true, true, true, true] },
      { label: "Creative economics (hit rate, waste in dollars, fatigue)", values: [true, true, true, true, true] },
      { label: "Creative Library (By Ad / By Creative)", values: [true, true, true, true, true] },
      { label: "Performance history", values: ["30 days", "Full", "Full", "Full", "Full"] },
      { label: "Creative intelligence patterns", values: [false, true, true, true, true] },
      { label: "Next Creative Brief (shareable, generation-ready)", values: [false, true, true, true, true] },
      { label: "Brand Intel (Reddit monitoring)", values: [false, true, true, true, true] },
    ],
  },
  {
    title: "Agent + integrations",
    rows: [
      { label: "Agent Peach messages", values: ["500/mo", "3,000/mo", "Unlimited", "Unlimited", "Unlimited"] },
      { label: "MCP/API access (your data in Claude)", values: [false, true, true, true, true] },
      { label: "Daily performance digest", values: [true, true, true, true, true] },
      { label: "Weekly digest email + Slack delivery", values: [true, true, true, true, true] },
    ],
  },
  {
    title: "Reporting",
    rows: [
      { label: "Client-ready reports + pacing", values: [false, false, false, true, true] },
      { label: "Agency margin/markup on reports", values: [false, false, false, false, true] },
      { label: "Multi-client workspaces", values: [false, false, false, false, true] },
    ],
  },
  {
    title: "Limits + support",
    rows: [
      { label: "Seats", values: ["1", "3", "10", "8", "25"] },
      { label: "Credits per month", values: ["400", "1,500", "4,000", "6,000", "15,000"] },
      { label: "Priority support + onboarding", values: [false, false, false, true, true] },
    ],
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What counts as a credit?",
    a: "One credit covers the full AI analysis of a single creative: visual breakdown, copy strategy, and intelligence tags. Credits reset every month.",
  },
  {
    q: "What happens after the trial?",
    a: "Starter and Pro start with a 7-day trial: add your card, try everything in your plan, and cancel before day 7 if it's not for you. Scale, Power, and Agency start right away with a walkthrough available whenever you want one.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade at any time from Settings. Changes take effect right away and billing is adjusted on your next invoice.",
  },
  {
    q: "Which platforms can I connect?",
    a: "Meta and TikTok on Starter. Pro adds Google Ads. Scale and up add Amazon DSP, including Connected TV.",
  },
];

/* ── Brand mark ─────────────────────────────────────────────────── */

/* ── Animation ──────────────────────────────────────────────────── */
const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

/* ── Helpers ────────────────────────────────────────────────────── */
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function signupHref(planId: string, billing: Billing) {
  return sharedSignupHref(planId, billing);
}

function Check() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#3AA976" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[2px]" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function PricingClient() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <div className="flex flex-col min-h-full bg-pb-bg">

      {/* ── NAV ──────────────────────────────────────────── */}
      <SiteNav current="pricing" />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-28 md:pt-32 px-6">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl mx-auto text-center">
          <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">
            Pricing
          </motion.div>
          <motion.h2
            variants={fade}
            className="font-display text-[clamp(34px,5vw,56px)] leading-[1.06] font-medium tracking-[-0.015em] text-pb-fg mb-3"
          >
            Plans that scale with your ad <span className="italic">spend</span>.
          </motion.h2>
          <motion.p variants={fade} className="text-[15px] text-pb-fg-muted leading-relaxed max-w-[560px] mx-auto mb-6">
            Starter and Pro start with a 7-day trial. Upgrade, downgrade, or cancel anytime.
          </motion.p>

          {/* Billing toggle */}
          <motion.div variants={fade} className="flex items-center justify-center gap-3">
            <div
              role="group"
              aria-label="Billing period"
              className="inline-flex items-center h-11 p-1 rounded-full border border-pb-border bg-pb-card shadow-pb-soft"
            >
              {(["monthly", "annual"] as const).map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBilling(b)}
                  aria-pressed={billing === b}
                  className={`inline-flex items-center gap-2 h-9 px-5 rounded-full text-[13px] font-semibold transition-all ${
                    billing === b
                      ? "pb-gradient-peach text-white shadow-[0_4px_12px_rgba(242,119,73,0.3)]"
                      : "text-pb-fg-muted hover:text-pb-fg"
                  }`}
                >
                  {b === "monthly" ? "Monthly" : "Annual"}
                  {b === "annual" && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-[0.06em] ${
                      billing === "annual" ? "bg-white/20 text-white" : "bg-pb-peach-50 text-pb-peach-700"
                    }`}>
                      2 months free
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── PLAN CARDS ───────────────────────────────────── */}
      <section className="pt-8 pb-6 px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          className="max-w-[1280px] mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch"
        >
          {PLANS.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </motion.div>

        {/* Enterprise row */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fade}
          className="max-w-[1280px] mx-auto mt-5"
        >
          <div className="rounded-2xl border border-pb-border bg-pb-card px-7 py-6 shadow-pb-soft flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex-1">
              <h3 className="font-display text-[20px] font-medium tracking-tight text-pb-fg mb-1">Enterprise</h3>
              <p className="text-[13px] leading-relaxed text-pb-fg-muted">
                Custom pricing with custom seats and limits, dedicated support, and onboarding built around your team.
              </p>
            </div>
            <a
              href={SALES_HREF}
              className="inline-flex items-center justify-center h-11 px-7 rounded-full border border-pb-border bg-pb-card text-[14px] font-medium shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5 transition-all shrink-0 self-start md:self-center"
            >
              Talk to sales
            </a>
          </div>
        </motion.div>

        <p className="text-center text-[12.5px] text-pb-fg-muted mt-8">
          Starter and Pro include a 7-day trial. Cancel anytime.
        </p>
      </section>

      {/* ── COMPARE PLANS ────────────────────────────────── */}
      <section className="pt-16 md:pt-20 px-6" id="compare">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="text-center mb-10 max-w-2xl mx-auto"
          >
            <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">
              Compare
            </motion.div>
            <motion.h2 variants={fade} className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg">
              Every plan, side by <span className="italic">side</span>.
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={fade}
            className="overflow-x-auto rounded-2xl border border-pb-border bg-pb-card shadow-pb-soft"
          >
            <table className="w-full min-w-[840px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="sticky left-0 bg-pb-card px-5 py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-pb-fg-muted border-b border-pb-border w-[280px]">
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.id} className="px-4 py-4 text-center border-b border-pb-border">
                      <div className="text-[13.5px] font-semibold text-pb-fg">{p.name}</div>
                      <div className="text-[11.5px] font-medium text-pb-fg-muted tnum">
                        {p.cta === "sales" ? "Custom" : `${usd(p.monthly)}/mo`}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((group) => (
                  <Fragment key={group.title}>
                    <tr>
                      <td
                        colSpan={PLANS.length + 1}
                        className="sticky left-0 px-5 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-pb-peach-600 bg-pb-muted/40"
                      >
                        {group.title}
                      </td>
                    </tr>
                    {group.rows.map((row) => (
                      <tr key={row.label} className="border-t border-pb-border/60">
                        <td className="sticky left-0 bg-pb-card px-5 py-3 text-[13px] text-pb-fg">{row.label}</td>
                        {row.values.map((v, i) => (
                          <td key={PLANS[i].id} className="px-4 py-3 text-center">
                            {v === true ? (
                              <span className="inline-flex justify-center"><Check /></span>
                            ) : v === false ? (
                              <span className="text-pb-fg-muted/50" aria-label="Not included">–</span>
                            ) : (
                              <span className="text-[12.5px] font-medium text-pb-fg tnum">{v}</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </motion.div>

          <p className="text-center text-[12.5px] text-pb-fg-muted mt-6">
            Enterprise adds custom seats and limits, SSO, and a dedicated CSM.{" "}
            <a href={SALES_HREF} className="underline underline-offset-2 hover:text-pb-fg">Talk to sales</a>
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-24 md:py-28 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12 max-w-2xl mx-auto">
            <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">Questions</motion.div>
            <motion.h2 variants={fade} className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg">
              Good to <span className="italic">know</span>.
            </motion.h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 max-w-[900px] mx-auto">
            {FAQS.map((f) => (
              <motion.div
                key={f.q}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fade}
                className="rounded-2xl border border-pb-border bg-pb-card p-6 shadow-pb-soft"
              >
                <h3 className="text-[14.5px] font-semibold mb-2 text-pb-fg">{f.q}</h3>
                <p className="text-[13px] leading-relaxed text-pb-fg-muted">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}

/* ── Plan card ──────────────────────────────────────────────────── */
function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const annualTotal = plan.monthly * 10; // exactly 10x monthly — 2 months free
  const perMonth = billing === "monthly" ? plan.monthly : Math.floor(annualTotal / 12);

  return (
    <motion.div variants={fade} className="h-full">
      <div
        className={`relative h-full flex flex-col rounded-2xl border bg-pb-card p-6 ${
          plan.popular
            ? "border-pb-peach-300 ring-1 ring-pb-peach-200/70 shadow-pb-lift"
            : "border-pb-border shadow-pb-soft"
        }`}
      >
        {plan.popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center h-6 px-3 rounded-full pb-gradient-peach text-white text-[10px] font-semibold uppercase tracking-[0.1em] shadow-[0_4px_12px_rgba(242,119,73,0.35)]">
            Most popular
          </span>
        )}

        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className="text-[15px] font-semibold text-pb-fg">{plan.name}</h3>
          <span className="text-[11px] font-medium text-pb-fg-muted">{plan.seats}</span>
        </div>
        <p className="text-[12px] leading-relaxed text-pb-fg-muted mb-5 min-h-[34px]">{plan.tagline}</p>

        <div className="mb-5">
          {plan.cta === "sales" ? (
            <>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[32px] font-medium tracking-tight text-pb-fg">Custom</span>
              </div>
              <div className="text-[11.5px] text-pb-fg-muted mt-0.5 min-h-[17px]">
                Tailored to your client roster
              </div>
            </>
          ) : (
            <>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-[32px] font-medium tracking-tight text-pb-fg tnum">{usd(perMonth)}</span>
                <span className="text-[12.5px] text-pb-fg-muted">/mo</span>
              </div>
              <div className="text-[11.5px] text-pb-fg-muted mt-0.5 min-h-[17px]">
                {billing === "annual" ? `Billed ${usd(annualTotal)}/yr` : "Billed monthly"}
              </div>
            </>
          )}
        </div>

        {plan.cta === "trial" || plan.cta === "buy" ? (
          <>
            <a
              href={signupHref(plan.id, billing)}
              className={`inline-flex items-center justify-center w-full h-10 rounded-full text-[13px] font-semibold transition-all ${plan.cta === "buy" ? "mb-2" : "mb-5"} ${
                plan.popular
                  ? "pb-gradient-peach text-white shadow-[0_6px_18px_rgba(242,119,73,0.35)] hover:brightness-105"
                  : "border border-pb-border bg-pb-card text-pb-fg shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5"
              }`}
            >
              {!SELF_SERVE ? "Get early access" : plan.cta === "trial" ? "Start 7-day trial" : "Get started"}
            </a>
            {plan.cta === "buy" && (
              <div className="text-center mb-3">
                <a href={DEMO_HREF} className="text-[11.5px] text-pb-fg-muted underline underline-offset-2 hover:text-pb-fg">
                  or book a demo
                </a>
              </div>
            )}
          </>
        ) : (
          <a
            href={SALES_HREF}
            className="inline-flex items-center justify-center w-full h-10 rounded-full border border-pb-border bg-pb-card text-[13px] font-semibold text-pb-fg shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5 transition-all mb-5"
          >
            Talk to sales
          </a>
        )}

        <div className="pt-4 border-t border-pb-border/70">
          {plan.inherits && (
            <div className="text-[11px] font-semibold text-pb-fg mb-2.5">
              Everything in {plan.inherits}, plus:
            </div>
          )}
          <ul className="space-y-2.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[12.5px] leading-snug text-pb-fg">
                <Check />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
