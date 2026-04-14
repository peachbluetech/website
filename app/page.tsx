"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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

/* ── Page ───────────────────────────────────────────────────────── */
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex flex-col min-h-full bg-pb-bg">

      {/* ── NAV ──────────────────────────────────────────── */}
      <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
        <div className="w-full max-w-[900px]">
          <div className="flex items-center justify-between h-14 px-5 rounded-full border border-pb-border/50 bg-pb-bg/80 backdrop-blur-xl shadow-pb-soft">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg pb-gradient-peach flex items-center justify-center shadow-[0_4px_12px_rgba(255,182,155,0.4)]">
                <PeachblueMark size={18} color="#ffffff" />
              </div>
              <span className="font-display text-[17px] font-semibold tracking-tight text-pb-fg">
                peachblue
              </span>
            </div>
            <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-pb-fg-muted">
              <a href="#product" className="hover:text-pb-fg transition-colors">Product</a>
              <a href="#platforms" className="hover:text-pb-fg transition-colors">Platforms</a>
              <a href="#pricing" className="hover:text-pb-fg transition-colors">Pricing</a>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center h-9 px-5 rounded-full pb-gradient-peach text-white text-[13px] font-semibold shadow-[0_4px_16px_rgba(242,119,73,0.35)] hover:brightness-105 transition"
            >
              Get early access
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-32 pb-6 md:pt-40 md:pb-0 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[52fr_48fr] gap-12 md:gap-16 items-start">

          {/* Left: editorial copy */}
          <div className="md:sticky md:top-28">
            <motion.div initial="hidden" animate="show" variants={stagger}>
              <motion.div variants={fade} className="mb-6">
                <span className="inline-flex items-center gap-2 h-7 px-3 rounded-full bg-pb-peach-50 border border-pb-peach-200/70 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-pb-peach-700">
                  <span className="size-1.5 rounded-full bg-pb-peach-500 animate-pulse" />
                  Now in early access
                </span>
              </motion.div>
              <motion.h1
                variants={fade}
                className="font-display text-[clamp(36px,5.5vw,58px)] leading-[1.06] font-medium tracking-[-0.02em] text-pb-fg mb-5"
              >
                Know what&apos;s <span className="italic">working</span> and why.
              </motion.h1>
              <motion.p
                variants={fade}
                className="text-[clamp(15px,1.8vw,18px)] leading-[1.7] text-pb-fg-muted max-w-[460px] mb-8"
              >
                Peachblue connects to your ad platforms, syncs every creative and its performance data,
                and uses AI to surface what&apos;s driving results. Creative intelligence for modern marketing teams.
              </motion.p>
              <motion.div variants={fade} className="flex gap-3 flex-wrap">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full pb-gradient-peach text-white text-[15px] font-semibold shadow-[0_8px_24px_rgba(242,119,73,0.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
                >
                  Get early access &rarr;
                </a>
                <a
                  href="#product"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-pb-border bg-pb-card text-[15px] font-medium shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5 transition-all"
                >
                  See how it works
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Right: product proof cards */}
          <div className="space-y-5 pb-16">
            <HeroCard delay={0.1}>
              <Eyebrow left="A/B hook performance · 7-day window" right="Hook Test" />
              <div className="space-y-2.5 mb-3.5">
                <WinnerRow label="Problem-first hook" value="4.2% CTR" badge="Winner · 2.1x lift" pct={84} />
                <MetricRow label="Benefit-led hook" value="2.0% CTR" pct={40} />
              </div>
              <Insight><strong>Why it works:</strong> Problem-first framing triggers a pattern interrupt in the first 1.5 s. Higher thumb-stop rate on Reels and TikTok.</Insight>
            </HeroCard>

            <HeroCard delay={0.2}>
              <Eyebrow left="CPA comparison · rolling 30 days" right="UGC vs Studio" />
              <div className="grid grid-cols-2 gap-2.5 mb-3.5">
                <CompareCell type="UGC" cpa="$8.20" cpaColor="text-[#16a34a]" ctr="3.8%" roas="4.1x" winner />
                <CompareCell type="Studio" cpa="$14.70" cpaColor="text-pb-fg-muted" ctr="1.9%" roas="2.2x" />
              </div>
              <Insight><strong>Pattern detected:</strong> Natural lighting + hands in frame &rarr; 44% lower CPA across 3 product lines.</Insight>
            </HeroCard>

            <HeroCard delay={0.3}>
              <Eyebrow left="Structured intelligence · per creative" right="AI Tags" />
              <div className="divide-y divide-pb-border/60">
                <TagRow dot="#ffb89a" label="Hook style" value="Problem-first" highlighted />
                <TagRow dot="#93c5fd" label="Emotional tone" value="Urgency" />
                <TagRow dot="#c084fc" label="CTA type" value="Shop now" />
                <TagRow dot="#6ee7b7" label="Visual complexity" value="Minimal" />
              </div>
              <div className="mt-3.5">
                <Insight><strong>Deep tagging:</strong> Hook, tone, palette, pacing, CTA, format, product placement, and more. All mapped to performance.</Insight>
              </div>
            </HeroCard>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section id="product" className="py-28 md:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="How it works"
            title={<>From raw ad data to creative <span className="italic">intelligence</span></>}
            subtitle="Peachblue automates the entire workflow. From syncing your ad accounts to delivering AI-powered analysis on every creative."
          />
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {[
              { num: "1", title: "Connect", desc: "Securely connect your ad accounts via OAuth. Peachblue syncs all your creative assets and performance data automatically, every day." },
              { num: "2", title: "Analyze", desc: "AI vision models process every image and video, generating structured intelligence tags. Hook style, emotional tone, CTA type, pacing, and more." },
              { num: "3", title: "Act", desc: "Explore your Creative Library, ask Agent Peach questions, and use AI-powered insights to understand what's working and brief your next campaign." },
            ].map((s) => (
              <motion.div key={s.num} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fade} className="rounded-2xl border border-pb-border bg-pb-card p-7 shadow-pb-soft">
                <div className="size-9 rounded-full pb-gradient-peach text-white text-[13px] font-semibold flex items-center justify-center mb-5 shadow-[0_4px_12px_rgba(242,119,73,0.3)]">
                  {s.num}
                </div>
                <h3 className="font-display text-[20px] font-medium tracking-tight mb-2 text-pb-fg">{s.title}</h3>
                <p className="text-[13.5px] leading-relaxed text-pb-fg-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Multi-platform sync", desc: "Connect Meta, TikTok, Amazon, and Google Ads. Peachblue syncs every creative asset and performance metric via secure OAuth, every day." },
              { title: "AI creative analysis", desc: "Every creative gets a full AI breakdown: visual design, copy strategy, hook effectiveness, and strategic recommendations. Mapped against real performance data." },
              { title: "Creative Library", desc: "Filter, sort, and explore all your creatives by any tag or metric. Deep-dive panels show the full analysis alongside CTR, CPA, ROAS, and demographic breakdowns." },
              { title: "Agent Peach", desc: "Ask natural-language questions about your ad performance. Get rich visual answers with ranked lists, creative comparisons, and actionable recommendations." },
              { title: "Brand Intel", desc: "Track what people say about your brand, competitors, and market trends. AI-generated editorial briefs surface what matters from social conversations." },
              { title: "Performance scoring", desc: "Every creative gets a composite score (0-100) based on CTR, ROAS, CPA, and spend. Instantly see your top performers, averages, and underperformers." },
            ].map((f) => (
              <motion.div key={f.title} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fade} className="rounded-2xl border border-pb-border bg-pb-card p-6 shadow-pb-soft">
                <h3 className="text-[15px] font-semibold mb-2 text-pb-fg">{f.title}</h3>
                <p className="text-[13px] leading-relaxed text-pb-fg-muted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS ─────────────────────────────────────── */}
      <section id="platforms" className="py-28 md:py-36 px-6 relative">
        <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" />
        <div className="max-w-[1100px] mx-auto relative">
          <SectionHeader
            eyebrow="Supported platforms"
            title={<>Cross-platform creative <span className="italic">intelligence</span></>}
            subtitle="Peachblue connects directly to your ad platforms via secure OAuth. We sync your creative assets and performance data daily, giving you a unified view of what's working across every channel."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { name: "Meta Ads", desc: "Facebook & Instagram ads, Reels, Stories, and carousel formats", status: "Live", bg: "#1877F2", letter: "f" },
              { name: "TikTok Ads", desc: "In-feed video ads, Spark Ads, and TopView creatives", status: "Live", bg: "#111111", letter: "t" },
              { name: "Amazon Ads", desc: "DSP, Sponsored Ads, and Connected TV on Prime Video", status: "Coming soon", bg: "#FF9900", letter: "a" },
              { name: "Google Ads", desc: "Search, Shopping, Display, and YouTube video ad creatives", status: "Coming soon", bg: "#EA4335", letter: "G" },
            ].map((p) => (
              <motion.div key={p.name} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} variants={fade} className="rounded-2xl border border-pb-border bg-pb-card p-6 shadow-pb-soft flex flex-col">
                <div className="size-11 rounded-xl flex items-center justify-center text-white font-semibold text-[15px] mb-4 shadow-pb-soft" style={{ background: p.bg }}>
                  {p.letter}
                </div>
                <h3 className="text-[15px] font-semibold mb-1 text-pb-fg">{p.name}</h3>
                <p className="text-[12.5px] leading-relaxed text-pb-fg-muted mb-4 flex-1">{p.desc}</p>
                <span className={`inline-flex self-start items-center h-6 rounded-full px-2.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] ${p.status === "Live" ? "bg-[#E6F4EC] text-[#3AA976]" : "bg-pb-peach-50 text-pb-peach-600"}`}>
                  {p.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────── */}
      <section id="pricing" className="py-28 md:py-36 px-6">
        <div className="max-w-[1100px] mx-auto">
          <SectionHeader
            eyebrow="Pricing"
            title={<>One plan. Everything <span className="italic">included</span>.</>}
            subtitle="We're in closed early access. Pricing scales with your ad accounts and creative volume. Nothing hidden."
          />
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={fade} className="max-w-md mx-auto rounded-2xl border border-pb-border bg-pb-card p-8 shadow-pb-lift text-center">
            <span className="inline-flex items-center h-6 rounded-full px-3 bg-pb-peach-50 border border-pb-peach-200/70 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-pb-peach-700 mb-5">
              Early access
            </span>
            <h3 className="font-display text-[26px] font-medium tracking-tight mb-2 text-pb-fg">Tailored to your team</h3>
            <p className="text-[13.5px] text-pb-fg-muted leading-relaxed mb-7">
              Pricing is based on your connected ad accounts, creative volume, and platform mix. We&apos;ll build the right plan together.
            </p>
            <ul className="space-y-3 text-left mb-8">
              {["All platform integrations", "Creative and performance intelligence", "Agent Peach AI assistant", "Brand Intel monitoring", "Hands-on onboarding and support"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-[13.5px] text-pb-fg">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#3AA976" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  {item}
                </li>
              ))}
            </ul>
            <a href="#contact" className="inline-flex items-center justify-center w-full h-12 rounded-full pb-gradient-peach text-white text-[15px] font-semibold shadow-[0_8px_24px_rgba(242,119,73,0.35)] hover:brightness-105 transition">
              Get early access &rarr;
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section id="contact" className="py-28 md:py-36 px-6 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-50" style={{ background: "radial-gradient(60% 50% at 25% 20%, rgba(255,214,200,0.55) 0%, transparent 55%), radial-gradient(60% 50% at 85% 80%, rgba(168,210,255,0.45) 0%, transparent 60%)" }} aria-hidden="true" />
        <div className="max-w-[540px] mx-auto relative text-center">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-3">Early access</div>
          <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4">
            See what&apos;s <span className="italic">working</span>.<br />Make more of it.
          </h2>
          <p className="text-[15px] text-pb-fg-muted leading-relaxed mb-8">
            Peachblue is currently in closed early access. Request a guided demo and see how creative intelligence can improve your ad performance.
          </p>
          {submitted ? (
            <div className="rounded-2xl border border-[#3AA976]/30 bg-[#E6F4EC]/40 p-6">
              <div className="text-[15px] font-medium text-[#3AA976]">You&apos;re on the list. We&apos;ll be in touch.</div>
            </div>
          ) : (
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              fetch("https://script.google.com/macros/s/AKfycbwNVcEsbTMRS4Ht68CETfSiz9OytuxumG2z8o4efAFqR-Uy_aDd6Plm0M4jN0A-RA0_/exec", {
                method: "POST",
                mode: "no-cors",
                body: JSON.stringify({ email }),
              });
              setSubmitted(true);
              setEmail("");
            }} className="flex gap-2 max-w-md mx-auto">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 h-12 rounded-full border border-pb-border bg-pb-card px-5 text-[14px] placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-400 focus:ring-2 focus:ring-pb-peach-100 shadow-pb-soft" />
              <button type="submit" className="inline-flex items-center gap-2 h-12 px-6 rounded-full pb-gradient-peach text-white text-[14px] font-semibold shadow-[0_4px_16px_rgba(242,119,73,0.35)] hover:brightness-105 transition shrink-0">
                Request demo &rarr;
              </button>
            </form>
          )}
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

/* ── Subcomponents ──────────────────────────────────────────────── */

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: React.ReactNode; subtitle: string }) {
  return (
    <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14 max-w-2xl mx-auto">
      <motion.div variants={fade} className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2">{eyebrow}</motion.div>
      <motion.h2 variants={fade} className="font-display text-[clamp(26px,4vw,40px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-3">{title}</motion.h2>
      <motion.p variants={fade} className="text-[15px] text-pb-fg-muted leading-relaxed">{subtitle}</motion.p>
    </motion.div>
  );
}

function HeroCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}>
      <div className="rounded-2xl border border-pb-border bg-pb-card p-5 shadow-pb-lift">{children}</div>
    </motion.div>
  );
}

function Eyebrow({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-pb-fg-muted">{left}</div>
      <span className="px-3 py-1 rounded-full border border-pb-border bg-pb-bg text-[11px] font-semibold text-pb-fg shadow-pb-soft">{right}</span>
    </div>
  );
}

function WinnerRow({ label, value, badge, pct }: { label: string; value: string; badge: string; pct: number }) {
  return (
    <div className="rounded-xl border border-pb-peach-200/60 bg-gradient-to-br from-pb-peach-50/40 to-[rgba(168,210,255,0.06)] p-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13px] font-semibold text-pb-fg">{label}</div>
          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full pb-gradient-brand text-[10.5px] font-semibold text-pb-fg-muted">{badge}</span>
        </div>
        <div className="text-[13px] font-bold text-pb-fg">{value}</div>
      </div>
      <div className="mt-2 h-[4px] bg-pb-border/70 rounded-full overflow-hidden">
        <div className="h-full rounded-full pb-gradient-peach" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function MetricRow({ label, value, pct }: { label: string; value: string; pct: number }) {
  return (
    <div className="rounded-xl border border-pb-border bg-pb-muted/40 p-3">
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-semibold text-pb-fg">{label}</div>
        <div className="text-[13px] font-bold text-pb-fg-muted">{value}</div>
      </div>
      <div className="mt-2 h-[4px] bg-pb-border/70 rounded-full overflow-hidden">
        <div className="h-full rounded-full pb-gradient-peach opacity-30" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function CompareCell({ type, cpa, cpaColor, ctr, roas, winner }: { type: string; cpa: string; cpaColor: string; ctr: string; roas: string; winner?: boolean }) {
  return (
    <div className={`rounded-xl border p-3.5 ${winner ? "border-pb-peach-200/60 bg-gradient-to-br from-pb-peach-50/40 to-[rgba(168,210,255,0.04)]" : "border-pb-border bg-pb-muted/30"}`}>
      <div className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-pb-fg-muted mb-1.5">{type}</div>
      <div className="text-[10.5px] text-pb-fg-muted mb-0.5">Avg. CPA</div>
      <div className={`text-[22px] font-bold tracking-tight tnum ${cpaColor}`}>{cpa}</div>
      <div className="mt-2 flex gap-3 text-[10.5px] text-pb-fg-muted">
        <span>CTR <strong className="text-pb-fg">{ctr}</strong></span>
        <span>ROAS <strong className="text-pb-fg">{roas}</strong></span>
      </div>
    </div>
  );
}

function TagRow({ dot, label, value, highlighted }: { dot: string; label: string; value: string; highlighted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-2.5">
        <div className="size-2.5 rounded-full shrink-0" style={{ background: dot }} />
        <span className="text-[13px] font-medium text-pb-fg">{label}</span>
      </div>
      <span className={`text-[13px] ${highlighted ? "font-semibold text-pb-fg" : "text-pb-fg-muted"}`}>{value}</span>
    </div>
  );
}

function Insight({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-pb-muted/50 border border-pb-border/60 p-3 text-[12.5px] text-pb-fg-muted leading-[1.55]">
      {children}
    </div>
  );
}
