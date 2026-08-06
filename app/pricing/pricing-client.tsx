"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ── Config ─────────────────────────────────────────────────────── */
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.peachblue.io";

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
  cta: "trial" | "sales";
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
      "AI creative analysis (400 credits/mo)",
      "Agent Peach chat (500 messages/mo)",
      "Daily performance digest",
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
      "Google Ads + Amazon Sponsored sync",
      "Creative intelligence patterns",
      "Brand Intel (Reddit monitoring)",
      "Full history",
      "MCP/API access (Claude Desktop, Cursor)",
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
      "Amazon DSP sync",
      "4,000 credits/mo",
      "Unlimited agent messages",
    ],
    cta: "trial",
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
      "Attribution",
      "Priority processing",
      "6,000 credits/mo",
    ],
    cta: "trial",
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
      "Agency margin/markup on reports",
      "15,000 credits/mo",
    ],
    cta: "sales",
  },
];

const SALES_HREF = "mailto:nick@peachblue.io?subject=Peachblue%20Agency%20plan";

const FAQS: { q: string; a: string }[] = [
  {
    q: "What counts as a credit?",
    a: "One credit covers the full AI analysis of a single creative: visual breakdown, copy strategy, and intelligence tags. Credits reset every month.",
  },
  {
    q: "What happens after the trial?",
    a: "Every plan starts with a 7-day trial with full access to your plan's features. Add a payment method to continue, and cancel anytime before then if it's not for you.",
  },
  {
    q: "Can I change plans later?",
    a: "Yes. Upgrade or downgrade at any time from Settings. Changes take effect right away and billing is adjusted on your next invoice.",
  },
  {
    q: "Which platforms can I connect?",
    a: "Meta and TikTok on Starter. Pro adds Google Ads and Amazon Sponsored. Scale and up add Amazon DSP, including Connected TV.",
  },
];

/* ── Brand mark ─────────────────────────────────────────────────── */
function PeachblueMark({ size = 24, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx={18} cy={11} r={5} fill={color} />
      <rect x={10.5} y={17} width={3} height={11} rx={1.5} fill={color} />
    </svg>
  );
}

/* ── Animation ──────────────────────────────────────────────────── */
const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

/* ── Helpers ────────────────────────────────────────────────────── */
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function signupHref(planId: string, billing: Billing) {
  return `${APP_URL}/auth/signup?plan=${planId}&billing=${billing}`;
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
      <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
        <div className="w-full max-w-[900px]">
          <div className="flex items-center justify-between h-14 px-5 rounded-full border border-pb-border/50 bg-pb-bg/80 backdrop-blur-xl shadow-pb-soft">
            <a
              href="/"
              aria-label="Peachblue home"
              className="flex items-center gap-2.5"
            >
              <div className="size-8 rounded-lg pb-gradient-peach flex items-center justify-center shadow-[0_4px_12px_rgba(255,182,155,0.4)]">
                <PeachblueMark size={18} color="#ffffff" />
              </div>
              <span className="font-display text-[17px] font-semibold tracking-tight text-pb-fg">
                peachblue
              </span>
            </a>
            <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-pb-fg-muted">
              <a href="/#product" className="hover:text-pb-fg transition-colors">Product</a>
              <a href="/#platforms" className="hover:text-pb-fg transition-colors">Platforms</a>
              <a href="/pricing" aria-current="page" className="text-pb-fg">Pricing</a>
            </div>
            <a
              href={signupHref("pro", billing)}
              className="inline-flex items-center h-9 px-5 rounded-full pb-gradient-peach text-white text-[13px] font-semibold shadow-[0_4px_16px_rgba(242,119,73,0.35)] hover:brightness-105 transition"
            >
              Start free trial
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-32 md:pt-40 px-6">
        <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-2xl mx-auto text-center">
          <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">
            Pricing
          </motion.div>
          <motion.h2
            variants={fade}
            className="font-display text-[clamp(30px,4.5vw,48px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4"
          >
            Plans that scale with your ad <span className="italic">spend</span>.
          </motion.h2>
          <motion.p variants={fade} className="text-[15px] text-pb-fg-muted leading-relaxed max-w-[520px] mx-auto mb-9">
            Connect your platforms, analyze every creative, and know what&apos;s working.
            Every plan starts with a 7-day trial. Upgrade, downgrade, or cancel anytime.
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
      <section className="pt-14 pb-6 px-6">
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
          All plans start with a 7-day trial. Cancel anytime.
        </p>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-24 md:py-28 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12 max-w-2xl mx-auto">
            <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">Questions</motion.div>
            <motion.h2 variants={fade} className="font-display text-[clamp(24px,3.5vw,34px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg">
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
      <footer className="border-t border-pb-border py-8 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md pb-gradient-peach flex items-center justify-center">
              <PeachblueMark size={14} color="#ffffff" />
            </div>
            <span className="font-display text-[14px] font-semibold tracking-tight">peachblue</span>
          </div>
          <div className="text-[12px] text-pb-fg-muted">&copy; {new Date().getFullYear()} Peachblue Technologies Inc.</div>
          <div className="flex gap-4 text-[12px] text-pb-fg-muted">
            <a href="/privacy" className="hover:text-pb-fg transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-pb-fg transition-colors">Terms of Service</a>
            <a href="mailto:nick@peachblue.io" className="hover:text-pb-fg transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Plan card ──────────────────────────────────────────────────── */
function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const annualTotal = plan.monthly * 10; // exactly 10x monthly — 2 months free
  const perMonth = billing === "monthly" ? plan.monthly : Math.round(annualTotal / 12);

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
          <div className="flex items-baseline gap-1">
            <span className="font-display text-[32px] font-medium tracking-tight text-pb-fg tnum">{usd(perMonth)}</span>
            <span className="text-[12.5px] text-pb-fg-muted">/mo</span>
          </div>
          <div className="text-[11.5px] text-pb-fg-muted mt-0.5 min-h-[17px]">
            {billing === "annual" ? `Billed ${usd(annualTotal)}/yr` : "Billed monthly"}
          </div>
        </div>

        {plan.cta === "trial" ? (
          <a
            href={signupHref(plan.id, billing)}
            className={`inline-flex items-center justify-center w-full h-10 rounded-full text-[13px] font-semibold transition-all mb-5 ${
              plan.popular
                ? "pb-gradient-peach text-white shadow-[0_6px_18px_rgba(242,119,73,0.35)] hover:brightness-105"
                : "border border-pb-border bg-pb-card text-pb-fg shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5"
            }`}
          >
            Start 7-day trial
          </a>
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
