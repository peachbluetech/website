"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, animate, useInView } from "framer-motion";
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
  return (
    <div className="flex flex-col min-h-full bg-pb-bg">

      {/* SEO: semantic, visually-hidden H1 anchored to the brand name.
          The visible hero uses H2 so the brand owns the single H1. */}
      <h1 className="sr-only">Peachblue: Creative Intelligence for Ads</h1>

      <SiteNav />

      {/* ── 1 · HERO ─────────────────────────────────────── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[48fr_52fr] gap-12 md:gap-14 items-center">

          {/* Left: editorial copy */}
          <div>
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div
                variants={fade}
                className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pb-peach-600 mb-4"
              >
                Marketing intelligence
              </motion.div>
              <motion.h2
                variants={fade}
                className="font-display text-[clamp(36px,5.5vw,58px)] leading-[1.06] font-medium tracking-[-0.02em] text-pb-fg mb-5"
              >
                Know what ads work <span className="italic">and why.</span>
              </motion.h2>
              <motion.p
                variants={fade}
                className="text-[clamp(15px,1.8vw,18px)] leading-[1.7] text-pb-fg-muted max-w-[460px] mb-8"
              >
                Peachblue syncs every ad platform you run: Meta, TikTok, Google, and Amazon DSP. It
                analyzes every creative with AI, and tells you what to make next.
              </motion.p>
              <motion.div variants={fade} className="flex gap-3 flex-wrap items-center">
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
          </div>

          {/* Right: Agent Peach product frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
          >
            <AgentPeachHeroFrame />
          </motion.div>
        </div>
      </section>

      {/* ── 2 · PROOF STRIP ──────────────────────────────── */}
      <section className="pb-4 px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          variants={fade}
          className="max-w-[1100px] mx-auto"
        >
          <div className="rounded-2xl border border-pb-border bg-pb-card shadow-pb-soft px-6 py-5 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-pb-fg-muted mr-1">Syncs</span>
              {PLATFORMS.map((p) => (
                <span key={p.name} className="inline-flex items-center gap-2 h-8 pl-1.5 pr-3 rounded-full border border-pb-border bg-pb-bg text-[12.5px] font-medium text-pb-fg">
                  <span
                    className="size-5 rounded-md flex items-center justify-center text-white text-[10px] font-semibold"
                    style={{ background: p.bg }}
                    aria-hidden="true"
                  >
                    {p.letter}
                  </span>
                  {p.name}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-8 shrink-0">
              <div className="text-center lg:text-left">
                <div className="font-display text-[24px] font-medium tracking-tight text-pb-fg leading-none">
                  <CountUp to={2.1} decimals={1} suffix="x" />
                </div>
                <div className="text-[11.5px] text-pb-fg-muted mt-1">hook-test lift found</div>
              </div>
              <div className="w-px h-9 bg-pb-border" aria-hidden="true" />
              <div className="text-center lg:text-left">
                <div className="font-display text-[24px] font-medium tracking-tight text-pb-fg leading-none">
                  <CountUp to={44} decimals={0} suffix="%" />
                </div>
                <div className="text-[11.5px] text-pb-fg-muted mt-1">lower CPA, UGC vs studio</div>
              </div>
            </div>
            {/* Kingstar testimonial goes here when approved */}
          </div>
        </motion.div>
      </section>

      {/* ── 3 · HOW IT WORKS ─────────────────────────────── */}
      <section id="product" className="py-24 md:py-32 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="How it works"
            title={<>From raw ad data to creative <span className="italic">intelligence</span></>}
            subtitle="Peachblue automates the entire workflow. From syncing your ad accounts to delivering AI-powered analysis on every creative."
          />
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { num: "1", title: "Connect", desc: "Securely connect your ad accounts via OAuth. Peachblue syncs all your creative assets and performance data automatically, every day.", visual: <StepConnectVisual /> },
              { num: "2", title: "Analyze", desc: "AI vision models process every image and video, generating structured intelligence tags. Hook style, emotional tone, CTA type, pacing, and more.", visual: <StepAnalyzeVisual /> },
              { num: "3", title: "Act", desc: "Explore your Creative Library, ask Agent Peach questions, and use AI-powered insights to understand what's working and brief your next campaign.", visual: <StepActVisual /> },
            ].map((s) => (
              <motion.div key={s.num} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fade} className="rounded-2xl border border-pb-border bg-pb-card p-7 shadow-pb-soft flex flex-col">
                <div className="size-9 rounded-full pb-gradient-peach text-white text-[13px] font-semibold flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(242,119,73,0.3)]">
                  {s.num}
                </div>
                <h3 className="font-display text-[20px] font-medium tracking-tight mb-2 text-pb-fg">{s.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-pb-fg-muted mb-5">{s.desc}</p>
                <div className="mt-auto">{s.visual}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 · FEATURE SECTIONS ─────────────────────────── */}

      <FeatureSection
        eyebrow="Agent Peach"
        title={<>Ask your ad accounts <span className="italic">anything</span>.</>}
        bullets={[
          "One conversation across every account you run: Meta, TikTok, Google, Amazon DSP",
          "Answers grounded in your real performance data, not generic advice",
          "Ranked creative lists, head-to-head comparisons, and deep dives",
          "Spots the patterns behind your winners and says why",
          "Every answer cites the metrics it's built on",
        ]}
        ctaLabel={TRIAL_LABEL}
        ctaHref={TRIAL_HREF}
        frame={<AgentPeachSpotlightFrame />}
      />

      <FeatureSection
        reverse
        tinted
        eyebrow="Creative Intelligence"
        title={<>31 creative dimensions, <span className="italic">decoded</span>.</>}
        bullets={[
          "Every creative tagged across hook style, tone, format, CTA, and more",
          "Patterns and archetypes show which combinations actually drive ROAS",
          "Filter your entire library by any tag or metric in seconds",
          "Composite scoring surfaces top performers and underperformers instantly",
        ]}
        ctaLabel={TRIAL_LABEL}
        ctaHref={TRIAL_HREF}
        frame={<CreativeIntelligenceFrame />}
      />

      <FeatureSection
        id="platforms"
        eyebrow="Every platform, one brain"
        title={<>Meta, TikTok, Google, Amazon DSP. <span className="italic">Unified</span>.</>}
        bullets={[
          "Meta, TikTok, Google Ads, and Amazon DSP. All live, all synced daily",
          "Amazon DSP includes Connected TV, coverage nobody else offers",
          "One creative library and one scoring system across every channel",
          "Secure OAuth connections you can disconnect at any time",
        ]}
        ctaLabel="See plans"
        ctaHref="/pricing"
        frame={<DataHubFrame />}
        afterCta={
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] text-pb-fg-muted">
            <span>Platform details:</span>
            <a href="/integrations/meta" className="underline underline-offset-2 hover:text-pb-fg transition-colors">Meta</a>
            <a href="/integrations/tiktok" className="underline underline-offset-2 hover:text-pb-fg transition-colors">TikTok</a>
            <a href="/integrations/google-ads" className="underline underline-offset-2 hover:text-pb-fg transition-colors">Google Ads</a>
            <a href="/integrations/amazon-dsp" className="underline underline-offset-2 hover:text-pb-fg transition-colors">Amazon DSP</a>
          </div>
        }
      />

      <FeatureSection
        reverse
        tinted
        eyebrow="Brand Intel"
        title={<>Hear what consumers <span className="italic">actually</span> say.</>}
        bullets={[
          "Track your brand, competitors, and category topics across Reddit",
          "Sentiment analysis on every mention, updated with each scan",
          "AI-written editorial briefs turn raw chatter into creative direction",
          "Feed real consumer language straight into your next brief",
        ]}
        ctaLabel={TRIAL_LABEL}
        ctaHref={TRIAL_HREF}
        frame={<BrandIntelFrame />}
      />

      <FeatureSection
        eyebrow="Reports & pacing"
        title={<>Client-ready reports in <span className="italic">minutes</span>.</>}
        bullets={[
          "Multi-client workspaces with per-client scoping for agencies",
          "Margin-aware reporting, so you bill the numbers you actually invoice",
          "DSP flight pacing with budget, delivery, and CPM goals at a glance",
          "Export to PDF or CSV, ready to send",
        ]}
        ctaLabel="See plans"
        ctaHref="/pricing"
        frame={<ReportsFrame />}
      />

      <FeatureSection
        reverse
        tinted
        eyebrow="MCP integration"
        title={<>Works inside Claude. Your data, <span className="italic">wherever</span> you think.</>}
        bullets={[
          "Connect Peachblue to Claude in one step",
          "Query your creative performance from the tools you already live in",
          "The same intelligence engine, available wherever you work",
        ]}
        ctaLabel={TRIAL_LABEL}
        ctaHref={TRIAL_HREF}
        frame={<McpFrame />}
      />

      {/* ── 5 · PRICING TEASER ───────────────────────────── */}
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

      {/* ── 6 · FAQ ──────────────────────────────────────── */}
      <section id="faq" className="py-24 md:py-32 px-6 relative">
        <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" aria-hidden="true" />
        <div className="max-w-[1100px] mx-auto relative">
          <SectionHeader
            eyebrow="Questions"
            title={<>Good to <span className="italic">know</span>.</>}
            subtitle="Everything you might want to check before starting a trial."
          />
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

      {/* ── 7 · FINAL CTA + DEMO ─────────────────────────── */}
      <section id="demo" className="py-24 md:py-32 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(60% 50% at 25% 20%, rgba(255,214,200,0.55) 0%, transparent 55%), radial-gradient(60% 50% at 85% 80%, rgba(168,210,255,0.45) 0%, transparent 60%)" }} aria-hidden="true" />
        <div className="max-w-[560px] mx-auto relative text-center">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-3">Get started</div>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4">
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

          {/* The lead form now lives on its own /demo page (better mobile
              experience than a deep anchor on this very long page). */}
          <a
            href={DEMO_HREF}
            className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-pb-border bg-pb-card text-[15px] font-medium shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5 transition-all"
          >
            Book a demo &rarr;
          </a>
        </div>
      </section>

      {/* ── 8 · FOOTER ───────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}

/* ── Data ───────────────────────────────────────────────────────── */

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
    a: "Yes, and we lead with it. Peachblue syncs Amazon DSP campaigns including Connected TV, with flight pacing and DSP-aware reporting built in. Very few tools in this category cover DSP at all.",
  },
];

/* ── Shared section components ──────────────────────────────────── */

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14 max-w-2xl mx-auto">
      <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">{eyebrow}</motion.div>
      <motion.h2 variants={fade} className="font-display text-[clamp(26px,4vw,40px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-3">{title}</motion.h2>
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
            <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-peach-600 mb-3">{eyebrow}</motion.div>
            <motion.h2 variants={fade} className="font-display text-[clamp(24px,3.4vw,36px)] leading-[1.1] font-medium tracking-[-0.015em] text-pb-fg mb-5">{title}</motion.h2>
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

/* Counts a number up from 0 when scrolled into view */
function CountUp({ to, decimals = 0, prefix = "", suffix = "", duration = 1.2, className = "" }: { to: number; decimals?: number; prefix?: string; suffix?: string; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, decimals, prefix, suffix, duration]);
  return <span ref={ref} className={`tnum ${className}`}>{`${prefix}${(0).toFixed(decimals)}${suffix}`}</span>;
}

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

/* Small gradient square standing in for a creative thumbnail */
const THUMB_GRADIENTS = [
  "linear-gradient(135deg, #FFD2BB 0%, #FF9466 100%)",
  "linear-gradient(135deg, #E0EFFF 0%, #4C8DFF 100%)",
  "linear-gradient(135deg, #F1E7FF 0%, #c084fc 100%)",
  "linear-gradient(135deg, #E6F4EC 0%, #6ee7b7 100%)",
  "linear-gradient(135deg, #FFE8DC 0%, #F27749 100%)",
  "linear-gradient(135deg, #FFF4EE 0%, #FFB48C 100%)",
];

function Thumb({ i = 0, className = "size-10" }: { i?: number; className?: string }) {
  return <div className={`rounded-lg shrink-0 ${className}`} style={{ background: THUMB_GRADIENTS[i % THUMB_GRADIENTS.length] }} aria-hidden="true" />;
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
      className={`relative overflow-hidden rounded-lg shrink-0 ${format === "story" ? "aspect-[9/16]" : "aspect-square"} ${className}`}
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

/* A ranked-creative row shape: rank, demo ad thumb, skeleton copy, metric pills */
function RankedRow({ rank, brand, delay, inView }: { rank: number; brand: DemoBrand; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: EASE }}
      className="flex items-center gap-3.5 rounded-xl border border-pb-border bg-pb-card p-3"
    >
      <span className="font-display text-[18px] font-medium text-pb-fg-muted w-4 text-center shrink-0">{rank}</span>
      <DemoAd brand={brand} format="story" className="w-9" />
      <div className="flex-1 min-w-0 space-y-2">
        <Sk w="w-3/4" h="h-2.5" />
        <div className="flex gap-1.5">
          <Sk w="w-10" />
          <Sk w="w-10" />
          <Sk w="w-10" />
        </div>
      </div>
      <ScoreDot tone={rank === 3 ? "warn" : "good"} />
    </motion.div>
  );
}

/* ── Hero frame: Agent Peach answering with ranked cards ────────── */
/* TODO: replace with real app screenshot */
function AgentPeachHeroFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <BrowserFrame url="app.peachblue.io/agent">
        <div className="space-y-4">
          {/* User question bubble */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md pb-gradient-peach text-white px-4 py-2.5 text-[13px] font-medium shadow-[0_4px_14px_rgba(242,119,73,0.25)]">
              <Typewriter start={inView} delay={300} text="What's my best performing creative this month?" speed={22} />
            </div>
          </div>

          {/* Agent identity row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.6 }}
            className="flex items-center gap-2"
          >
            <div className="size-6 rounded-full pb-gradient-peach flex items-center justify-center shrink-0">
              <PeachblueMark size={13} color="#ffffff" />
            </div>
            <span className="text-[11px] font-semibold text-pb-fg-muted uppercase tracking-[0.1em]">Agent Peach</span>
          </motion.div>

          {/* Agent answer: skeleton line + ranked creative cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 1.9 }}
            className="space-y-2"
          >
            <Sk w="w-5/6" />
            <Sk w="w-2/3" />
          </motion.div>
          <div className="space-y-2.5">
            <RankedRow rank={1} brand="fizzli" delay={2.2} inView={inView} />
            <RankedRow rank={2} brand="trailform" delay={2.45} inView={inView} />
            <RankedRow rank={3} brand="sagelle" delay={2.7} inView={inView} />
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
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

/* ── Feature frame: Creative Intelligence tag grid ──────────────── */
/* TODO: replace with real app screenshot */
function CreativeIntelligenceFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const tags = [
    { dot: "#4C8DFF", label: "Hook style", value: "Problem-first" },
    { dot: "#ffb89a", label: "Emotional tone", value: "Urgency" },
    { dot: "#c084fc", label: "CTA type", value: "Shop now" },
    { dot: "#6ee7b7", label: "Visual complexity", value: "Minimal" },
  ];
  /* Rows pair matching formats so grid row heights stay even.
     First tile (Fizzli) keeps the selected ring — the tag values
     shown to the right describe it. */
  const libraryAds: { brand: DemoBrand; format: DemoAdFormat; layout?: DemoAdLayout }[] = [
    { brand: "fizzli", format: "story" },
    { brand: "trailform", format: "story" },
    { brand: "sagelle", format: "square", layout: "split" },
    { brand: "fizzli", format: "square", layout: "split" },
    { brand: "sagelle", format: "story", layout: "productCenter" },
    { brand: "trailform", format: "story", layout: "productCenter" },
  ];
  return (
    <div ref={ref}>
      <BrowserFrame url="app.peachblue.io/intelligence">
        <div className="grid grid-cols-[minmax(0,11fr)_minmax(0,13fr)] gap-4 items-start">
          {/* Creative library mini-grid */}
          <div className="grid grid-cols-2 gap-2">
            {libraryAds.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease: EASE }}
              >
                <DemoAd
                  brand={a.brand}
                  format={a.format}
                  layout={a.layout}
                  className={`w-full ${i === 0 ? "ring-2 ring-pb-peach-400 ring-offset-2 ring-offset-pb-bg" : ""}`}
                />
              </motion.div>
            ))}
          </div>
          {/* Extracted tag rows */}
          <div className="min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pb-fg-muted mb-2">Intelligence tags</div>
            <div className="divide-y divide-pb-border/60">
              {tags.map((t, i) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.15, ease: EASE }}
                  className="flex items-center justify-between py-2.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-2.5 rounded-full shrink-0" style={{ background: t.dot }} />
                    <span className="text-[12px] font-medium text-pb-fg">{t.label}</span>
                  </div>
                  <span className="text-[12px] text-pb-fg-muted">{t.value}</span>
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="mt-3 rounded-lg bg-pb-muted/50 border border-pb-border/60 p-2.5 space-y-1.5"
            >
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pb-fg-muted mb-1">Pattern detected</div>
              <Sk w="w-full" h="h-1.5" />
              <Sk w="w-3/4" h="h-1.5" />
            </motion.div>
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Feature frame: Data Hub platform rows ──────────────────────── */
/* TODO: replace with real app screenshot */
function DataHubFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <BrowserFrame url="app.peachblue.io">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between mb-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pb-fg-muted">Connected platforms</div>
            <span className="inline-flex items-center h-6 px-3 rounded-full border border-pb-border bg-pb-card text-[10.5px] font-semibold text-pb-fg-muted">Sync all</span>
          </div>
          {PLATFORMS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: EASE }}
              className="flex items-center gap-3.5 rounded-xl border border-pb-border bg-pb-card p-3.5"
            >
              <span
                className="size-9 rounded-lg flex items-center justify-center text-white text-[13px] font-semibold shrink-0"
                style={{ background: p.bg }}
                aria-hidden="true"
              >
                {p.letter}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-pb-fg mb-1.5">{p.name}</div>
                <Sk w="w-2/3" h="h-1.5" />
              </div>
              <span className="inline-flex items-center gap-1.5 h-6 rounded-full px-2.5 bg-[#E6F4EC] text-[#3AA976] text-[10px] font-semibold uppercase tracking-[0.08em] shrink-0">
                <span className="size-1.5 rounded-full bg-[#3AA976] animate-pulse" />
                Live
              </span>
            </motion.div>
          ))}
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Feature frame: Brand Intel editorial brief ─────────────────── */
/* TODO: replace with real app screenshot */
function BrandIntelFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const sentiments = [
    { label: "Positive", dot: "#3AA976" },
    { label: "Neutral", dot: "#5A6678" },
    { label: "Negative", dot: "#D64545" },
  ];
  return (
    <div ref={ref}>
      <BrowserFrame url="app.peachblue.io/brand-intel">
        <div className="space-y-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pb-fg-muted">Intelligence brief</div>
          {/* Headline skeleton in editorial style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.2, ease: EASE }}
            className="space-y-2.5"
          >
            <Sk w="w-full" h="h-4" />
            <Sk w="w-3/5" h="h-4" />
          </motion.div>
          {/* Sentiment chips */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.55 }}
            className="flex gap-2"
          >
            {sentiments.map((s) => (
              <span key={s.label} className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full border border-pb-border bg-pb-card text-[11px] font-medium text-pb-fg-muted">
                <span className="size-2 rounded-full" style={{ background: s.dot }} />
                {s.label}
              </span>
            ))}
          </motion.div>
          {/* Key takeaways */}
          <div className="space-y-2.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.75 + i * 0.15, ease: EASE }}
                className="flex items-start gap-3 rounded-xl border border-pb-border bg-pb-card p-3.5"
              >
                <span className="size-2 rounded-full bg-pb-peach-400 mt-1.5 shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Sk w="w-full" h="h-1.5" />
                  <Sk w={i === 1 ? "w-2/3" : "w-4/5"} h="h-1.5" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Feature frame: Reports pacing table ────────────────────────── */
/* TODO: replace with real app screenshot */
function ReportsFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const rows = [
    { pace: 72, tone: "good" as const, chip: "On pace", chipCls: "bg-[#E6F4EC] text-[#3AA976]" },
    { pace: 92, tone: "good" as const, chip: "Ahead", chipCls: "bg-pb-blue-50 text-pb-blue-700" },
    { pace: 38, tone: "warn" as const, chip: "Behind", chipCls: "bg-pb-peach-50 text-pb-peach-700" },
  ];
  return (
    <div ref={ref}>
      <BrowserFrame url="app.peachblue.io/reports">
        <div className="space-y-2.5">
          <div className="grid grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] gap-3 px-3">
            {["Order", "Pacing", "Status"].map((h) => (
              <div key={h} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-pb-fg-muted">{h}</div>
            ))}
          </div>
          {rows.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.14, ease: EASE }}
              className="grid grid-cols-[minmax(0,5fr)_minmax(0,4fr)_minmax(0,3fr)] gap-3 items-center rounded-xl border border-pb-border bg-pb-card p-3"
            >
              <div className="space-y-1.5">
                <Sk w="w-4/5" h="h-2" />
                <Sk w="w-1/2" h="h-1.5" />
              </div>
              <div className="h-[5px] bg-pb-border/70 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${r.tone === "good" ? "bg-[#3AA976]" : "pb-gradient-peach"}`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${r.pace}%` } : {}}
                  transition={{ duration: 1, delay: 0.4 + i * 0.14, ease: EASE }}
                />
              </div>
              <span className={`inline-flex self-start items-center h-6 rounded-full px-2.5 text-[10px] font-semibold uppercase tracking-[0.06em] justify-self-start ${r.chipCls}`}>
                {r.chip}
              </span>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.9 }}
            className="flex justify-end gap-2 pt-1"
          >
            {["Print / PDF", "CSV"].map((b) => (
              <span key={b} className="inline-flex items-center h-7 px-3 rounded-full border border-pb-border bg-pb-card text-[10.5px] font-semibold text-pb-fg-muted">{b}</span>
            ))}
          </motion.div>
        </div>
      </BrowserFrame>
    </div>
  );
}

/* ── Feature frame: MCP in an editor/chat client ────────────────── */
/* TODO: replace with real app screenshot */
function McpFrame() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref}>
      <BrowserFrame url="Your AI workspace">
        <div className="space-y-4">
          {/* Connection pill */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex"
          >
            <span className="inline-flex items-center gap-2 h-8 px-3.5 rounded-full border border-pb-border bg-pb-card text-[11.5px] font-semibold text-pb-fg">
              <span className="size-5 rounded-md pb-gradient-peach flex items-center justify-center">
                <PeachblueMark size={11} color="#ffffff" />
              </span>
              Peachblue connected
              <span className="size-1.5 rounded-full bg-[#3AA976] animate-pulse" />
            </span>
          </motion.div>
          {/* Prompt bubble */}
          <div className="flex justify-end">
            <div className="max-w-[85%] rounded-2xl rounded-br-md bg-pb-fg text-white px-4 py-2.5 text-[13px] font-medium">
              <Typewriter start={inView} delay={500} text="Which hooks drove the most ROAS last quarter?" speed={20} />
            </div>
          </div>
          {/* Tool-call chip */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 1.7, ease: EASE }}
            className="flex"
          >
            <span className="inline-flex items-center gap-2 h-7 px-3 rounded-lg bg-pb-muted/70 border border-pb-border/70 text-[11px] font-medium text-pb-fg-muted" style={{ fontFamily: "var(--font-mono)" }}>
              <span className="size-1.5 rounded-full bg-pb-blue-500 animate-pulse" />
              peachblue · creative intelligence
            </span>
          </motion.div>
          {/* Response skeleton */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 2.1, ease: EASE }}
            className="rounded-xl border border-pb-border bg-pb-card p-4 space-y-2.5"
          >
            <Sk w="w-full" h="h-1.5" />
            <Sk w="w-5/6" h="h-1.5" />
            <div className="flex items-center gap-3 pt-1.5">
              <Thumb i={1} className="size-8" />
              <div className="flex-1 space-y-1.5">
                <Sk w="w-1/2" h="h-1.5" />
                <Sk w="w-1/3" h="h-1.5" />
              </div>
              <ScoreDot />
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
