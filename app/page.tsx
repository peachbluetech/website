"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PeachblueMark } from "@/components/site/PeachblueMark";
import { TRIAL_HREF, STARTER_HREF, PRO_HREF, SALES_HREF, DEMO_HREF, TRIAL_LABEL, RISK_REVERSAL } from "@/lib/site";

/* ── Animation ──────────────────────────────────────────────────── */
const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } };
const stagger = { show: { transition: { staggerChildren: 0.1 } } };

/* ── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const MOVES = [
    {
      num: "01",
      title: "Connect",
      desc: "Secure OAuth to Meta, TikTok, Google Ads, and Amazon DSP. Peachblue syncs your creatives and daily performance automatically, every day.",
      visual: <StepConnectVisual />,
    },
    {
      num: "02",
      title: "Analyze",
      desc: "AI reads every image and video: hook, tone, format, CTA, 29 dimensions in all. Every creative is scored against the objective its campaign was bought for.",
      visual: <StepAnalyzeVisual />,
    },
    {
      num: "03",
      title: "Act",
      desc: "A Today worklist, a Monday digest in email and Slack, and a generation-ready brief built from your own winners.",
      visual: <StepActVisual />,
    },
  ];

  const TOOLKIT = [
    { title: "Brand Intel", desc: "Reddit brand monitoring: sentiment on every mention, plus an AI editorial brief.", href: "/docs/brand-intel" },
    { title: "Reports and pacing", desc: "Client-ready reports, DSP flight pacing, and agency margin baked in.", href: "/docs/reports-and-pacing" },
    { title: "Your data in Claude", desc: "The 19-tool MCP server, included on Pro and up.", href: "/mcp" },
    { title: "Objective-aware scoring", desc: "Reach ranks for awareness creatives, with components you can audit.", href: "/docs/scoring" },
    { title: "Creative Library", desc: "Every ad and creative, tagged, filterable, and deep-linkable.", href: "/docs/creative-analysis" },
  ];

  return (
    <div className="min-h-screen bg-pb-bg text-pb-fg overflow-x-clip">
      <SiteNav />

      {/* SEO: semantic, visually-hidden H1 anchored to the brand name. */}
      <h1 className="sr-only">Peachblue: AI creative intelligence for Meta, TikTok, Google Ads, and Amazon DSP</h1>

      {/* ── 1 · MASTHEAD HERO ────────────────────────────── */}
      <section className="pt-28 md:pt-36 pb-14 px-6">
        <div className="max-w-[1100px] mx-auto">
          <motion.div initial="hidden" animate="show" variants={stagger} className="text-center max-w-[860px] mx-auto">
            <motion.div
              variants={fade}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-pb-peach-600 mb-5"
            >
              Meta &middot; TikTok &middot; Google Ads &middot; Amazon DSP
            </motion.div>
            <motion.h2
              variants={fade}
              className="font-display text-[clamp(44px,7.2vw,92px)] leading-[1.02] font-medium tracking-[-0.025em] text-pb-fg mb-6"
            >
              The intelligence layer for <span className="italic">ad creative.</span>
            </motion.h2>
            <motion.p
              variants={fade}
              className="text-[clamp(15px,1.8vw,18px)] leading-[1.7] text-pb-fg-muted max-w-[640px] mx-auto mb-8"
            >
              Peachblue turns your ad data and creative into the blueprint for your next
              winning ad. Create what works. Cut what doesn&rsquo;t. Get smarter every time.
            </motion.p>
            <motion.div variants={fade} className="flex gap-3 flex-wrap items-center justify-center">
              <a
                href={TRIAL_HREF}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full pb-gradient-peach text-white text-[15px] font-semibold shadow-[0_8px_24px_rgba(242,119,73,0.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
              >
                {TRIAL_LABEL} &rarr;
              </a>
              <a
                href={DEMO_HREF}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-pb-border bg-pb-card text-[15px] font-medium shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5 transition-all"
              >
                Book a demo
              </a>
            </motion.div>
            <motion.p variants={fade} className="mt-4 text-[12.5px] text-pb-fg-muted">
              {RISK_REVERSAL}
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="mt-12 md:mt-14"
          >
            <CommandPanelFrame />
          </motion.div>
        </div>
      </section>

      {/* ── 2 · TICKER ───────────────────────────────────── */}
      <TickerStrip />

      {/* ── 3 · ESSAY: THE JUDGMENT GAP ──────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-10 md:gap-16 items-start">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fade}
          >
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-pb-peach-600 mb-4">
              Why Peachblue exists
            </div>
            <h2 className="font-display text-[clamp(28px,4vw,48px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg">
              The creative feedback loop is <span className="italic">broken</span>.
            </h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fade}
            className="space-y-6"
          >
            <p className="font-display text-[clamp(17px,1.9vw,20px)] leading-[1.75] text-pb-fg">
              <span className="text-[1.4em] font-medium text-pb-peach-600">Ad</span> creation has
              never been faster. AI writes the scripts, cuts the variants, and fills the queue,
              and 82% of teams now use it to generate ideas. But only 7% trust it with the
              decision that actually moves budget: which ad to make next.
            </p>
            <p className="font-display text-[clamp(19px,2.2vw,24px)] leading-[1.5] font-medium text-pb-fg">
              The making got automated. The judgment <span className="italic">didn&rsquo;t</span>.
            </p>
            <p className="font-display text-[clamp(17px,1.9vw,20px)] leading-[1.75] text-pb-fg">
              Peachblue closes that gap. It connects your creative to your performance data
              across every platform, finds the patterns behind what works, and turns those
              insights into a blueprint for your next winning creative.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4 · THREE MOVES ──────────────────────────────── */}
      <section id="product" className="py-16 md:py-24 px-6 relative">
        <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" aria-hidden="true" />
        <div className="max-w-[1100px] mx-auto relative">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-pb-fg-muted mb-8">
            How it works
          </div>
          {MOVES.map((m, i) => (
            <motion.div
              key={m.num}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fade}
              className={`grid grid-cols-[56px_1fr] md:grid-cols-[110px_1fr_280px] gap-x-6 gap-y-5 items-center py-9 border-t border-dashed border-pb-border ${i === MOVES.length - 1 ? "border-b" : ""}`}
            >
              <div className="font-display text-[clamp(34px,4.5vw,56px)] font-medium text-pb-peach-500 leading-none">
                {m.num}
              </div>
              <div>
                <h3 className="font-display text-[clamp(20px,2.6vw,28px)] font-medium tracking-[-0.01em] text-pb-fg mb-2">
                  {m.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-pb-fg-muted max-w-[520px]">{m.desc}</p>
              </div>
              <div className="col-span-2 md:col-span-1">{m.visual}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 5 · FEATURE SPREADS ──────────────────────────── */}

      <FeatureSection
        eyebrow="Agent Peach"
        title={<>Ask your ad accounts <span className="italic">anything</span>.</>}
        bullets={[
          "One conversation across every account you run: Meta, TikTok, Google, Amazon DSP",
          "Answers grounded in your real performance data, not generic advice",
          "Every number states the time window it came from, so you can audit any answer",
          "Follow-up questions reuse the data behind earlier answers instead of guessing",
          "Ranked creative lists, head-to-head comparisons, and deep dives",
        ]}
        ctaLabel={TRIAL_LABEL}
        ctaHref={TRIAL_HREF}
        frame={<AgentPeachSpotlightFrame />}
      />

      <EconomicsBand />

      <DigestShowcase />

      <FeatureSection
        reverse
        eyebrow="Next Creative Brief"
        title={<>Stop guessing what to make <span className="italic">next</span>.</>}
        bullets={[
          "One click turns your account&rsquo;s winning patterns into a brief a freelancer can execute",
          "Proven hooks with their real CTRs, and reference ads labeled as top performers",
          "Do and don&rsquo;t rules in plain language, with the evidence behind each one",
          "A generation-ready prompt block for whichever creative tool you use",
          "Share it with a public link, no login needed on the other end",
        ]}
        ctaLabel={TRIAL_LABEL}
        ctaHref={TRIAL_HREF}
        frame={<BriefFrame />}
      />

      {/* ── 6 · MANIFESTO INTERLUDE ──────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-[1200px] mx-auto text-center"
        >
          <motion.p
            variants={fade}
            className="font-display text-[clamp(28px,4.4vw,56px)] leading-[1.15] font-medium tracking-[-0.02em] text-pb-fg"
          >
            Automation took targeting and bidding.
            <br className="hidden md:block" />
            <span className="md:hidden"> </span>
            Creative is the lever you <span className="italic">still own</span>.
          </motion.p>
          <motion.p variants={fade} className="mt-6 text-[13px] text-pb-fg-muted">
            Creative quality drives roughly 56% of auction outcomes, more than bid, targeting, and
            placement combined, per Meta data science.
          </motion.p>
        </motion.div>
      </section>

      {/* ── 7 · DSP CALLOUT ──────────────────────────────── */}
      <section id="platforms" className="px-6 pb-4">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fade}
          className="max-w-[1100px] mx-auto rounded-2xl border border-pb-peach-200 bg-pb-peach-50 px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <p className="text-[14.5px] leading-relaxed text-pb-fg">
            <strong className="font-semibold">Amazon DSP, included.</strong>{" "}
            No creative analytics tool at self-serve pricing touches DSP.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-pb-fg-muted shrink-0">
            <a href="/integrations/meta" className="underline underline-offset-2 hover:text-pb-fg transition-colors">Meta</a>
            <a href="/integrations/tiktok" className="underline underline-offset-2 hover:text-pb-fg transition-colors">TikTok</a>
            <a href="/integrations/google-ads" className="underline underline-offset-2 hover:text-pb-fg transition-colors">Google Ads</a>
            <a href="/integrations/amazon-dsp" className="font-semibold text-pb-peach-700 underline underline-offset-2 hover:text-pb-fg transition-colors">Amazon DSP &rarr;</a>
          </div>
        </motion.div>
      </section>

      {/* ── 8 · TOOLKIT INDEX ────────────────────────────── */}
      <section className="py-20 md:py-24 px-6">
        <div className="max-w-[860px] mx-auto">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-pb-fg-muted mb-8">
            Also in Peachblue
          </div>
          <div>
            {TOOLKIT.map((t, i) => (
              <Link
                key={t.title}
                href={t.href}
                className={`group grid md:grid-cols-[250px_1fr_24px] gap-x-6 gap-y-1 items-baseline py-5 border-t border-dashed border-pb-border ${i === TOOLKIT.length - 1 ? "border-b" : ""}`}
              >
                <span className="font-display text-[20px] font-medium text-pb-fg group-hover:text-pb-peach-600 transition-colors">
                  {t.title}
                </span>
                <span className="text-[13.5px] text-pb-fg-muted leading-relaxed">{t.desc}</span>
                <span className="hidden md:block text-pb-fg-muted group-hover:text-pb-peach-600 group-hover:translate-x-1 transition-all" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE (enable when the Kingstar testimonial is approved;
             oversized editorial style per the journal direction) ──
      <section className="py-20 md:py-28 px-6">
        <figure className="max-w-[900px] mx-auto text-center">
          <blockquote className="font-display text-[clamp(26px,4vw,44px)] leading-[1.2] font-medium tracking-[-0.01em] text-pb-fg">
            &ldquo;Quote goes here.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-[13px] text-pb-fg-muted">Name, Title, Kingstar</figcaption>
        </figure>
      </section>
      */}

      {/* ── 9 · PRICING TEASER ───────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="Pricing"
            title={<>Plans that scale with your ad <span className="italic">spend</span>.</>}
            subtitle="Starter and Pro start with a 7-day trial. Upgrade, downgrade, or cancel anytime."
          />
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-5 max-w-[900px] mx-auto"
          >
            <MiniPlanCard
              name="Starter"
              price={79}
              tagline="For solo advertisers getting started."
              ctaLabel={TRIAL_LABEL}
              ctaHref={STARTER_HREF}
            />
            <MiniPlanCard
              name="Pro"
              price={199}
              tagline="For growing teams running multiple channels."
              ctaLabel={TRIAL_LABEL}
              ctaHref={PRO_HREF}
              popular
            />
            <MiniPlanCard
              name="Agency"
              price="custom"
              tagline="For agencies managing many clients."
              ctaLabel="Talk to sales"
              ctaHref={SALES_HREF}
              outlineCta
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fade}
            className="text-center mt-8"
          >
            <Link href="/pricing" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-pb-fg hover:text-pb-peach-600 transition-colors">
              See all plans &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 10 · FAQ ─────────────────────────────────────── */}
      <section id="faq" className="py-24 md:py-32 px-6 relative">
        <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" aria-hidden="true" />
        <div className="max-w-[1100px] mx-auto relative">
          <SectionHeader
            eyebrow="Questions"
            title={<>Good to <span className="italic">know</span>.</>}
            subtitle="Everything you might want to check before starting a trial."
          />
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-2 max-w-[900px] mx-auto">
            {FAQS.map((f) => (
              <motion.div
                key={f.q}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fade}
                className="border-t border-dashed border-pb-border pt-5 pb-4"
              >
                <h3 className="text-[14.5px] font-semibold mb-2 text-pb-fg">{f.q}</h3>
                <p className="text-[13px] leading-relaxed text-pb-fg-muted">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 · FINAL CTA + DEMO ────────────────────────── */}
      <section id="demo" className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(60% 50% at 25% 20%, rgba(255,214,200,0.55) 0%, transparent 55%), radial-gradient(60% 50% at 85% 80%, rgba(168,210,255,0.45) 0%, transparent 60%)" }} aria-hidden="true" />
        <div className="max-w-[560px] mx-auto relative text-center">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-pb-fg-muted mb-3">Get started</div>
          <h2 className="font-display text-[clamp(32px,4.8vw,56px)] leading-[1.06] font-medium tracking-[-0.015em] text-pb-fg mb-4">
            See what&apos;s <span className="italic">working</span>.<br />Make more of it.
          </h2>
          <p className="text-[15px] text-pb-fg-muted leading-relaxed mb-8">
            Connect your first platform and see your own creatives analyzed today.
          </p>
          <div className="flex gap-3 flex-wrap justify-center mb-3">
            <a
              href={TRIAL_HREF}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full pb-gradient-peach text-white text-[15px] font-semibold shadow-[0_8px_24px_rgba(242,119,73,0.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
            >
              {TRIAL_LABEL} &rarr;
            </a>
          </div>
          <p className="text-[12.5px] text-pb-fg-muted mb-12">{RISK_REVERSAL}</p>
          <a
            href={DEMO_HREF}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-pb-border bg-pb-card text-[15px] font-medium shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5 transition-all"
          >
            Book a demo &rarr;
          </a>
        </div>
      </section>

      {/* ── 12 · FOOTER ──────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────────────── */

const TICKER_ITEMS = [
  "Syncs Meta",
  "TikTok",
  "Google Ads",
  "Amazon DSP",
  "29 creative dimensions",
  "2.1x hook-test lift found",
  "44% lower CPA, UGC vs studio",
  "Monday digest, email + Slack",
  "Every score cites its window",
];

const PLATFORMS = [
  { name: "Meta", bg: "#1877F2", letter: "f" },
  { name: "TikTok", bg: "#111111", letter: "t" },
  { name: "Google Ads", bg: "#EA4335", letter: "G" },
  { name: "Amazon DSP", bg: "#FF9900", letter: "a" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Which platforms does Peachblue support?",
    a: "Meta, TikTok, Google Ads, and Amazon DSP are all live today. Connect any of them via secure OAuth and Peachblue syncs your creatives and performance data automatically, every day.",
  },
  {
    q: "How does the 7-day trial work?",
    a: "Starter and Pro start with a 7-day trial: add your card, try everything in your plan, and cancel before day 7 if it's not for you. Scale, Power, and Agency start right away, and you can book a walkthrough anytime.",
  },
  {
    q: "Is my ad data secure?",
    a: "Yes. OAuth tokens are encrypted at rest, every workspace is isolated at the organization level, and you can disconnect a platform and delete your synced data at any time.",
  },
  {
    q: "Does Peachblue work for agencies?",
    a: "Yes. The Agency plan adds multi-client workspaces with a client switcher, per-client scoping across the whole app, and margin-aware reports so what you show clients matches what you invoice.",
  },
  {
    q: "Can I cancel or change plans?",
    a: "Anytime. Upgrade or downgrade from Settings and changes take effect right away and billing is adjusted on your next invoice. Cancel whenever you like.",
  },
  {
    q: "Do you support Amazon DSP?",
    a: "Yes, and we lead with it. Peachblue syncs Amazon DSP campaigns with flight pacing and DSP-aware reporting built in. Very few tools in this category cover DSP at all.",
  },
];

/* ── Shared section components ──────────────────────────────────── */

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14 max-w-2xl mx-auto">
      <motion.div variants={fade} className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-pb-fg-muted mb-2">{eyebrow}</motion.div>
      <motion.h2 variants={fade} className="font-display text-[clamp(30px,4.6vw,52px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-3">{title}</motion.h2>
      <motion.p variants={fade} className="text-[15px] text-pb-fg-muted leading-relaxed">{subtitle}</motion.p>
    </motion.div>
  );
}

function Check() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#3AA976" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[3px]" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FeatureSection({
  id,
  eyebrow,
  title,
  bullets,
  ctaLabel,
  ctaHref,
  frame,
  reverse = false,
  tinted = false,
  afterCta,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  frame: React.ReactNode;
  reverse?: boolean;
  tinted?: boolean;
  afterCta?: React.ReactNode;
}) {
  return (
    <section id={id} className="py-16 md:py-24 px-6 relative">
      {tinted && <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" aria-hidden="true" />}
      <div className="max-w-[1100px] mx-auto relative">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center ${reverse ? "" : ""}`}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className={reverse ? "md:order-2" : ""}
          >
            <motion.div variants={fade} className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-pb-peach-600 mb-3">{eyebrow}</motion.div>
            <motion.h2 variants={fade} className="font-display text-[clamp(26px,3.8vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-5">{title}</motion.h2>
            <motion.ul variants={fade} className="space-y-3 mb-7">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[14px] leading-relaxed text-pb-fg-muted">
                  <Check />
                  <span>{b}</span>
                </li>
              ))}
            </motion.ul>
            <motion.div variants={fade}>
              <a href={ctaHref} className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-pb-fg hover:text-pb-peach-600 transition-colors">
                {ctaLabel} &rarr;
              </a>
            </motion.div>
            {afterCta && (
              <motion.div variants={fade} className="mt-4">
                {afterCta}
              </motion.div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
            className={reverse ? "md:order-1" : ""}
          >
            {frame}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MiniPlanCard({
  name,
  price,
  tagline,
  ctaLabel,
  ctaHref,
  popular = false,
  outlineCta = false,
}: {
  name: string;
  price: number | "custom";
  tagline: string;
  ctaLabel: string;
  ctaHref: string;
  popular?: boolean;
  outlineCta?: boolean;
}) {
  return (
    <motion.div variants={fade} className="h-full">
      <div
        className={`relative h-full flex flex-col rounded-2xl border bg-pb-card p-6 ${
          popular
            ? "border-pb-peach-300 ring-1 ring-pb-peach-200/70 shadow-pb-lift"
            : "border-pb-border shadow-pb-soft"
        }`}
      >
        {popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center h-6 px-3 rounded-full pb-gradient-peach text-white text-[10px] font-semibold uppercase tracking-[0.1em] shadow-[0_4px_12px_rgba(242,119,73,0.35)]">
            Most popular
          </span>
        )}
        <h3 className="text-[15px] font-semibold text-pb-fg mb-1">{name}</h3>
        <p className="text-[12.5px] leading-relaxed text-pb-fg-muted mb-5 min-h-[36px]">{tagline}</p>
        <div className="flex items-baseline gap-1 mb-6">
          {price === "custom" ? (
            <span className="font-display text-[32px] font-medium tracking-tight text-pb-fg">Custom</span>
          ) : (
            <>
              <span className="font-display text-[32px] font-medium tracking-tight text-pb-fg tnum">${price.toLocaleString("en-US")}</span>
              <span className="text-[12.5px] text-pb-fg-muted">/mo</span>
            </>
          )}
        </div>
        <a
          href={ctaHref}
          className={`mt-auto inline-flex items-center justify-center w-full h-10 rounded-full text-[13px] font-semibold transition-all ${
            outlineCta || !popular
              ? "border border-pb-border bg-pb-card text-pb-fg shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5"
              : "pb-gradient-peach text-white shadow-[0_6px_18px_rgba(242,119,73,0.35)] hover:brightness-105"
          }`}
        >
          {ctaLabel}
        </a>
      </div>
    </motion.div>
  );
}

/* ── Animation primitives ───────────────────────────────────────── */

/* Types text in character by character once started */
function Typewriter({ text, start, delay = 0, speed = 16 }: { text: string; start: boolean; delay?: number; speed?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            if (interval) clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [start, text, delay, speed]);
  const doneTyping = count >= text.length;
  return (
    <span>
      {text.slice(0, count)}
      {start && !doneTyping && <span className="inline-block w-[6px] h-[11px] ml-[1px] align-[-1px] bg-pb-peach-500/70 animate-pulse" />}
    </span>
  );
}

/* ── Placeholder-frame primitives ───────────────────────────────── */
/* Abstract UI compositions inside browser-chrome frames. Deliberately
   contain no real numbers and no customer data — skeleton bars only. */

function BrowserFrame({ children, url = "app.peachblue.io", className = "" }: { children: React.ReactNode; url?: string; className?: string }) {
  return (
    <div className={`rounded-2xl border border-pb-border bg-pb-card shadow-pb-lift overflow-hidden ${className}`}>
      <div className="flex items-center gap-3 h-10 px-4 border-b border-pb-border bg-pb-muted/60">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-pb-border" />
          <span className="size-2.5 rounded-full bg-pb-border" />
          <span className="size-2.5 rounded-full bg-pb-border" />
        </div>
        <div className="flex-1 flex justify-center">
          <span className="inline-flex items-center h-6 px-4 rounded-full bg-pb-bg border border-pb-border/70 text-[10.5px] font-medium text-pb-fg-muted">
            {url}
          </span>
        </div>
        <div className="w-10" aria-hidden="true" />
      </div>
      <div className="p-5 bg-pb-bg">{children}</div>
    </div>
  );
}

/* Skeleton bar — the abstract stand-in for text/metrics */
function Sk({ w, h = "h-2", className = "" }: { w: string; h?: string; className?: string }) {
  return <div className={`${h} ${w} rounded-full bg-pb-fg/[0.08] ${className}`} aria-hidden="true" />;
}

/* ── Demo ad creatives (fictional brands) ───────────────────────── */
/* Mock ad creatives for three invented demo brands, built from pure
   CSS/SVG. All type scales with the container via cqw units so the
   same ad reads correctly from a 36px thumb up to a 260px tile.
   No photos, no real brands, no performance claims. */

type DemoBrand = "fizzli" | "sagelle" | "trailform";
type DemoAdFormat = "story" | "square";
type DemoAdLayout = "typeTop" | "productCenter" | "split";

function DemoAd({
  brand,
  format = "story",
  layout = "typeTop",
  className = "",
}: {
  brand: DemoBrand;
  format?: "story" | "square";
  layout?: DemoAdLayout;
  className?: string;
}) {
  /* Real generated demo-brand creatives (fictional brands, sliced from
     assets-raw/Gemini_Generated_Image_qejricqejricqejr.png).
     story typeTop = ad 1, story productCenter/split = ad 2,
     square = the brand's chosen square variant. */
  const src =
    format === "square"
      ? SQUARE_ADS[brand]
      : layout === "productCenter"
        ? `/ads/${brand}-story-2.png`
        : `/ads/${brand}-story-1.png`;
  return (
    <div
      // Aspect ratios match the actual demo-ad slices (story ~1:2, square
      // 203:215) so object-cover never crops the brand captions at the edges.
      className={`relative overflow-hidden rounded-lg shrink-0 ${format === "story" ? "aspect-[1/2]" : "aspect-[203/215]"} ${className}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
}

const SQUARE_ADS: Record<DemoBrand, string> = {
  fizzli: "/ads/fizzli-square-a.png",
  sagelle: "/ads/sagelle-square-a.png",
  trailform: "/ads/trailform-square-b.png",
};

function ScoreDot({ tone = "good" }: { tone?: "good" | "warn" }) {
  return <span className={`size-2.5 rounded-full shrink-0 ${tone === "good" ? "bg-[#3AA976]" : "bg-pb-peach-400"}`} aria-hidden="true" />;
}

/* ── Feature frame: Agent Peach spotlight card ──────────────────── */
/* TODO: replace with real app screenshot */
function AgentPeachSpotlightFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <BrowserFrame url="app.peachblue.io/agent">
        <div className="space-y-4">
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md pb-gradient-peach text-white px-4 py-2.5 text-[13px] font-medium shadow-[0_4px_14px_rgba(242,119,73,0.25)]">
              What&rsquo;s winning across all my accounts?
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.4, ease: EASE }}
            className="rounded-xl border border-pb-border bg-pb-card p-4"
          >
            <div className="flex gap-4">
              <DemoAd brand="fizzli" format="story" className="w-20" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-3">
                  <Sk w="w-1/2" h="h-2.5" />
                  <ScoreDot />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Spend", "CTR", "ROAS", "CPA"].map((m) => (
                    <div key={m} className="rounded-lg bg-pb-muted/60 p-2">
                      <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-pb-fg-muted mb-1.5">{m}</div>
                      <Sk w="w-8" h="h-2.5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
              className="mt-3 rounded-lg bg-pb-muted/50 border border-pb-border/60 p-2.5 space-y-1.5"
            >
              <Sk w="w-full" h="h-1.5" />
              <Sk w="w-4/5" h="h-1.5" />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="flex gap-2 flex-wrap"
          >
            {["Compare to last month", "Show similar creatives"].map((chip) => (
              <span key={chip} className="inline-flex items-center h-7 px-3 rounded-full border border-pb-border bg-pb-card text-[11px] font-medium text-pb-fg-muted">
                {chip}
              </span>
            ))}
          </motion.div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Hero frame: the Today command center as an ink instrument panel ── */
/* TODO: replace with a real Today screenshot once slice-2 captures land */
function CommandPanelFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className="pb-gradient-ink rounded-[28px] shadow-pb-lift p-5 md:p-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#A9B7DD" }}>
          Today &middot; Creative command center
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#A9B7DD" }}>
          <span className="size-1.5 rounded-full bg-[#3AA976] animate-pulse" aria-hidden="true" /> Synced
        </span>
      </div>
      {/* Stat tiles */}
      <div className="grid grid-cols-3 gap-2.5 md:gap-4 mb-5">
        {["Spend this week", "Blended ROAS", "Waste found"].map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.1, ease: EASE }}
            className="rounded-xl border p-3 md:p-4"
            style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.10)" }}
          >
            <div className="font-mono text-[8.5px] md:text-[9.5px] font-semibold uppercase tracking-[0.14em] mb-2.5" style={{ color: "#7080AC" }}>
              {label}
            </div>
            <div className={`h-3 rounded-full max-w-full ${i === 2 ? "bg-pb-peach-400/80 w-16" : "bg-white/30"} ${i === 0 ? "w-24" : "w-16"}`} aria-hidden="true" />
          </motion.div>
        ))}
      </div>
      {/* Spark chart */}
      <div className="rounded-xl border p-4 mb-5" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}>
        <svg viewBox="0 0 600 90" className="w-full h-20 md:h-24" preserveAspectRatio="none" aria-hidden="true">
          {[22, 45, 68].map((y) => (
            <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
          ))}
          <motion.path
            d="M0,64 C50,60 90,42 150,46 C210,50 250,30 310,34 C370,38 420,18 480,24 C520,28 560,14 600,18"
            fill="none"
            stroke="#FF9466"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </div>
      {/* Pulse rows */}
      <div className="space-y-2.5 mb-5">
        {[
          { dot: "#3AA976", chip: "Scale", w: "w-2/5" },
          { dot: "#D64545", chip: "Fix tracking", w: "w-1/3" },
        ].map((r, i) => (
          <motion.div
            key={r.chip}
            initial={{ opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.15, ease: EASE }}
            className="flex items-center gap-3 rounded-xl border px-3.5 py-3"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.10)" }}
          >
            <span className="size-2 rounded-full shrink-0" style={{ background: r.dot }} aria-hidden="true" />
            <div className={`h-2 ${r.w} rounded-full bg-white/20`} aria-hidden="true" />
            <span
              className="ml-auto inline-flex items-center h-6 px-2.5 rounded-full border font-mono text-[9.5px] font-semibold uppercase tracking-[0.1em]"
              style={{ borderColor: "rgba(255,255,255,0.16)", color: "#F6F8FF" }}
            >
              {r.chip}
            </span>
          </motion.div>
        ))}
      </div>
      {/* Agent ask bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="flex items-center gap-3 rounded-full border px-4 py-3"
        style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" }}
      >
        <span className="size-6 rounded-full pb-gradient-peach flex items-center justify-center shrink-0">
          <PeachblueMark size={13} color="#ffffff" />
        </span>
        <span className="text-[13px] font-medium" style={{ color: "#F6F8FF" }}>
          <Typewriter start={inView} delay={1500} text="Why did CPA rise last week?" speed={24} />
        </span>
        <span className="ml-auto font-mono text-[9.5px] font-semibold uppercase tracking-[0.12em] shrink-0" style={{ color: "#7080AC" }}>
          Ask Peach
        </span>
      </motion.div>
    </div>
  );
}

/* ── Ticker: live-strip of platform + proof stats ── */
function TickerStrip() {
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {TICKER_ITEMS.map((t) => (
        <span key={t} className="flex items-center font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-pb-fg-muted">
          <span className="px-8">{t}</span>
          <span className="size-1 rounded-full bg-pb-peach-400" aria-hidden="true" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="border-y border-pb-border bg-pb-card/70 overflow-hidden py-3.5" aria-label="Peachblue at a glance">
      <div className="pb-marquee flex w-max">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

/* ── Section: Creative Economics ink band ───────────────────────── */
/* Full-width ink surface matching the app's V3 Economics hero — the one
   place the site goes dark, so it reads as a deliberate showcase rather
   than another alternating split. TODO: swap card visuals for a real
   /economics screenshot when captured */
function EconomicsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cards = [
    {
      title: "Hit rate",
      desc: "How often a qualified launch becomes a winner, so you know if new creative is earning its spend.",
      visual: (
        <div className="flex gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <motion.span
              key={i}
              className={`h-2 flex-1 rounded-full ${i < 3 ? "bg-pb-peach-400" : "bg-white/[0.14]"}`}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
            />
          ))}
        </div>
      ),
    },
    {
      title: "Waste, in dollars",
      desc: "Exactly how much budget went to creatives that never performed, with a bleeding-now list to catch drains early.",
      visual: (
        <div className="h-2 rounded-full bg-white/[0.14] overflow-hidden" aria-hidden="true">
          <motion.div
            className="h-full rounded-full bg-pb-peach-400"
            initial={{ width: 0 }}
            animate={inView ? { width: "38%" } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          />
        </div>
      ),
    },
    {
      title: "Bench and fatigue",
      desc: "Hero concentration, what's ready behind it, and fatigue flagged against each creative's own best week.",
      visual: (
        <div className="flex items-end gap-1.5 h-8" aria-hidden="true">
          {[85, 55, 38, 24].map((h, i) => (
            <motion.div
              key={i}
              className={`flex-1 rounded-sm ${i === 0 ? "bg-pb-peach-400" : "bg-white/[0.14]"}`}
              initial={{ height: 0 }}
              animate={inView ? { height: `${h}%` } : {}}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.08, ease: EASE }}
            />
          ))}
        </div>
      ),
    },
  ];
  return (
    <section ref={ref} className="py-16 md:py-24 px-6">
      <div className="max-w-[1100px] mx-auto pb-gradient-ink rounded-[28px] px-6 py-14 md:px-14 md:py-16 relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.div variants={fade} className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-pb-peach-300 mb-3">
            Creative Economics
          </motion.div>
          <motion.h2
            variants={fade}
            className="font-display text-[clamp(30px,4.6vw,52px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-ink-fg mb-3"
          >
            How much budget reached creatives that <span className="italic">earned</span> it?
          </motion.h2>
          <motion.p variants={fade} className="text-[15px] leading-relaxed text-pb-ink-fg-muted">
            Hit rate, waste in dollars, bench depth, and fatigue, computed from your daily data.
          </motion.p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              className="rounded-2xl border p-6 flex flex-col gap-4"
              style={{ background: "rgba(255,255,255,0.05)", borderColor: "var(--color-pb-ink-border)" }}
            >
              <div>
                <h3 className="text-[15px] font-semibold text-pb-ink-fg mb-2">{c.title}</h3>
                <p className="text-[13px] leading-relaxed text-pb-ink-fg-muted">{c.desc}</p>
              </div>
              <div className="mt-auto">{c.visual}</div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10"
        >
          {/* Inline color: class-based color on this anchor computed white but
              painted dark in Chromium (stale paint with transition-colors on a
              composited layer). Literal inline style paints reliably. */}
          <a
            href={TRIAL_HREF}
            className="inline-flex items-center gap-1.5 text-[14px] font-semibold hover:opacity-80 transition-opacity"
            style={{ color: "#F6F8FF" }}
          >
            {TRIAL_LABEL} &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section: Monday digest centered showcase ───────────────────── */
function DigestShowcase() {
  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" aria-hidden="true" />
      <div className="max-w-[1100px] mx-auto relative">
        <SectionHeader
          eyebrow="The Monday digest"
          title={<>Peachblue <span className="italic">tells</span> you.</>}
          subtitle="Every Monday: what won, what bled, what fatigued, and the one thing to act on. In your inbox and your Slack."
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
          className="max-w-[540px] mx-auto"
        >
          <DigestFrame />
        </motion.div>
        <div className="grid sm:grid-cols-3 gap-x-8 gap-y-5 max-w-[860px] mx-auto mt-12">
          {[
            { title: "Email and Slack", desc: "The same digest lands in every opted-in inbox and posts to the channel your team already reads." },
            { title: "Versus prior week", desc: "Spend and ROAS against the week before, plus waste and hit rate, in one short read." },
            { title: "First-sync heads-up", desc: "A one-time email the moment a platform's first sync finishes, so you know when the data is ready." },
          ].map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: EASE }}
            >
              <h3 className="text-[14px] font-semibold text-pb-fg mb-1.5">{b.title}</h3>
              <p className="text-[13px] leading-relaxed text-pb-fg-muted">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Feature frame: Monday digest email + Slack ─────────────────── */
/* Sky-blue card mirrors the app's digest card. TODO: replace with a real
   digest email capture */
function DigestFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <BrowserFrame url="Your inbox">
        <div className="space-y-3">
          {/* Email header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15, ease: EASE }}
            className="rounded-xl border border-pb-border bg-pb-card overflow-hidden"
          >
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-pb-border/70">
              <div className="size-7 rounded-full pb-gradient-peach flex items-center justify-center shrink-0">
                <PeachblueMark size={14} color="#ffffff" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-semibold text-pb-fg truncate">Your week in creative</div>
                <div className="text-[10.5px] text-pb-fg-muted">Peachblue &middot; Monday morning</div>
              </div>
            </div>
            {/* Sky-blue digest stat card */}
            <div className="p-4 space-y-3">
              <div className="rounded-lg border border-pb-blue-200 bg-pb-blue-50 p-3">
                <div className="grid grid-cols-3 gap-3">
                  {["Spend", "ROAS", "Hit rate"].map((m) => (
                    <div key={m}>
                      <div className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-pb-blue-700 mb-1.5">{m}</div>
                      <div className="h-2.5 w-9 rounded-full bg-pb-blue-200" aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
              {/* Pulse rows */}
              <div className="space-y-2">
                {[
                  { dot: "#3AA976", w: "w-4/5" },
                  { dot: "#F27749", w: "w-2/3" },
                  { dot: "#D64545", w: "w-3/4" },
                ].map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.15, ease: EASE }}
                    className="flex items-center gap-2.5"
                  >
                    <span className="size-2 rounded-full shrink-0" style={{ background: r.dot }} aria-hidden="true" />
                    <Sk w={r.w} h="h-1.5" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
          {/* Slack delivery chip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="flex"
          >
            <span className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full border border-pb-border bg-pb-card text-[11.5px] font-medium text-pb-fg-muted">
              <span className="size-1.5 rounded-full bg-[#3AA976]" aria-hidden="true" />
              Also posted to #creative-performance
            </span>
          </motion.div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Feature frame: Next Creative Brief share page ──────────────── */
/* TODO: replace with a real shared-brief screenshot */
function BriefFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <BrowserFrame url="peachblue.io/brief/8kf3…">
        <div className="space-y-3">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pb-fg-muted">Next creative brief</div>
          {/* Editorial headline skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
            className="space-y-2"
          >
            <Sk w="w-11/12" h="h-3.5" />
            <Sk w="w-1/2" h="h-3.5" />
          </motion.div>
          {/* Winning recipe rows */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
            className="rounded-xl border border-pb-border bg-pb-card p-3.5 space-y-2.5"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pb-fg-muted">The winning recipe</div>
            {[
              { label: "Proven hook", dot: "#4C8DFF" },
              { label: "Reference ad", dot: "#3AA976" },
              { label: "Do / don't rules", dot: "#F27749" },
            ].map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.14, ease: EASE }}
                className="flex items-center gap-2.5"
              >
                <span className="size-2 rounded-full shrink-0" style={{ background: r.dot }} aria-hidden="true" />
                <span className="text-[11.5px] font-medium text-pb-fg shrink-0">{r.label}</span>
                <Sk w="w-2/5" h="h-1.5" className="ml-auto" />
              </motion.div>
            ))}
          </motion.div>
          {/* Generation-ready prompt block */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 1.1, ease: EASE }}
            className="rounded-xl pb-gradient-ink p-3.5"
          >
            <div className="flex items-center justify-between mb-2.5">
              <span
                className="text-[9.5px] font-semibold uppercase tracking-[0.12em] text-pb-ink-fg-muted"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Generation-ready prompt
              </span>
              <span className="inline-flex items-center h-6 px-2.5 rounded-full border text-[10px] font-semibold text-pb-ink-fg" style={{ borderColor: "var(--color-pb-ink-border)" }}>
                Copy
              </span>
            </div>
            <div className="space-y-1.5" aria-hidden="true">
              <div className="h-1.5 w-full rounded-full bg-white/[0.16]" />
              <div className="h-1.5 w-5/6 rounded-full bg-white/[0.16]" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/[0.16]" />
            </div>
          </motion.div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── How-it-works step visuals (compact abstract panels) ────────── */
/* TODO: replace with real app screenshots */

function StepConnectVisual() {
  return (
    <div className="rounded-xl border border-pb-border bg-pb-bg p-3 flex items-center justify-between gap-2">
      <div className="flex -space-x-1.5">
        {PLATFORMS.map((p) => (
          <span
            key={p.name}
            className="size-7 rounded-lg border-2 border-pb-bg flex items-center justify-center text-white text-[10px] font-semibold"
            style={{ background: p.bg }}
            aria-hidden="true"
          >
            {p.letter}
          </span>
        ))}
      </div>
      <span className="inline-flex items-center gap-1.5 h-6 rounded-full px-2.5 bg-[#E6F4EC] text-[#3AA976] text-[10px] font-semibold uppercase tracking-[0.06em]">
        <span className="size-1.5 rounded-full bg-[#3AA976] animate-pulse" />
        Synced
      </span>
    </div>
  );
}

function StepAnalyzeVisual() {
  return (
    <div className="rounded-xl border border-pb-border bg-pb-bg p-3 flex items-center gap-3">
      <div className="relative overflow-hidden rounded-lg shrink-0">
        <DemoAd brand="fizzli" format="story" className="w-10" />
        <motion.div
          className="absolute left-0 right-0 h-4 pointer-events-none"
          style={{ background: "linear-gradient(180deg, transparent, rgba(76,141,255,0.35), transparent)" }}
          initial={{ top: "-30%" }}
          whileInView={{ top: "120%" }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.3, delay: 0.4, ease: "easeInOut" }}
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {["Hook", "Tone", "CTA", "Format"].map((t) => (
          <span key={t} className="inline-flex items-center h-[22px] px-2 rounded-full border border-pb-border bg-pb-card text-[10px] font-medium text-pb-fg-muted">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function StepActVisual() {
  return (
    <div className="rounded-xl border border-pb-border bg-pb-bg p-3 space-y-2">
      <div className="flex justify-end">
        <div className="rounded-xl rounded-br-sm pb-gradient-peach text-white px-2.5 py-1 text-[10.5px] font-medium">
          What should I make next?
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg border border-pb-border bg-pb-card p-2">
        <div className="size-4 rounded-full pb-gradient-peach flex items-center justify-center shrink-0">
          <PeachblueMark size={9} color="#ffffff" />
        </div>
        <Sk w="w-3/4" h="h-1.5" />
      </div>
    </div>
  );
}
