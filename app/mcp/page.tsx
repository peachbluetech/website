import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PeachblueMark } from "@/components/site/PeachblueMark";
import { TRIAL_HREF, TRIAL_LABEL, RISK_REVERSAL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your ad data in Claude (MCP)",
  description:
    "Connect Peachblue to Claude, Cursor, or any MCP client. The only creative analytics MCP that serves your own cross-platform performance data, including Amazon DSP.",
  alternates: { canonical: "/mcp" },
};

const EXAMPLE_QUESTIONS = [
  "What were my top 5 creatives by composite score last month?",
  "Compare our two hero videos head to head.",
  "Which hooks drove the most ROAS on Meta this quarter?",
  "Where is spend concentrated right now, and what looks fatigued?",
  "How did last week compare to the week before, and what moved?",
];

const STEPS = [
  {
    num: "1",
    title: "Copy your connection URL",
    desc: "In Peachblue, open Settings and go to the MCP tab. Your workspace's connection URL is right there.",
  },
  {
    num: "2",
    title: "Add it to your client",
    desc: "Claude Desktop, claude.ai, Cursor, Claude Code, or any client that speaks the Model Context Protocol. Paste the URL as a custom connector.",
  },
  {
    num: "3",
    title: "Approve with OAuth",
    desc: "The first connection opens a sign-in where you approve access with your Peachblue account. No API keys to create, rotate, or leak.",
  },
];

const TOOL_GROUPS = [
  {
    title: "Performance and rankings",
    desc: "Account summaries, ranked creatives, deep dives, and head-to-head comparisons decided by composite score.",
  },
  {
    title: "Patterns and dimensions",
    desc: "Creative archetypes, 31-dimension tag analysis, and copy variant performance across every ad.",
  },
  {
    title: "Time and risk",
    desc: "Daily trends, period-over-period change attribution, spend concentration, and fatigue candidates.",
  },
  {
    title: "Audience and brand",
    desc: "Demographics, placements, keyword search across your library, and Reddit brand sentiment.",
  },
];

export default function McpPage() {
  return (
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <SiteNav />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 md:pt-40 pb-16 px-6">
          <div className="max-w-[860px] mx-auto">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-pb-peach-600 mb-4">
              MCP integration
            </div>
            <h1 className="font-display text-[clamp(38px,5.6vw,64px)] leading-[1.06] font-medium tracking-[-0.02em] text-pb-fg mb-5">
              Bring your ad performance <span className="italic">into</span> Claude.
            </h1>
            <p className="text-[clamp(15px,1.8vw,17.5px)] leading-[1.7] text-pb-fg-muted max-w-[620px] mb-4">
              Peachblue's MCP server exposes the same 19 tools that power Agent Peach to any MCP
              client: Claude Desktop, claude.ai, Cursor, and Claude Code. Rankings, comparisons,
              patterns, fatigue, and risk, over your Meta, TikTok, Google Ads, and Amazon DSP data.
            </p>
            <p className="text-[14px] leading-[1.7] text-pb-fg-muted max-w-[620px] mb-8">
              Other ad tools ship MCP servers for inspiration libraries or competitor research.
              Peachblue's is the only creative analytics MCP that serves your own cross-platform
              performance data, including Amazon DSP.
            </p>
            <div className="flex gap-3 flex-wrap items-center">
              <a
                href={TRIAL_HREF}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full pb-gradient-peach text-white text-[15px] font-semibold shadow-[0_8px_24px_rgba(242,119,73,0.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
              >
                {TRIAL_LABEL} &rarr;
              </a>
              <Link
                href="/docs/mcp"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-pb-border bg-pb-card text-[15px] font-medium shadow-pb-soft hover:shadow-pb-lift hover:-translate-y-0.5 transition-all"
              >
                Setup docs
              </Link>
            </div>
            <p className="mt-4 text-[12.5px] text-pb-fg-muted">{RISK_REVERSAL} &middot; MCP included on Pro and up</p>
          </div>
        </section>

        {/* What you can ask */}
        <section className="py-16 px-6 relative">
          <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" aria-hidden="true" />
          <div className="max-w-[860px] mx-auto relative">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-3">
              Ask in plain language.
            </h2>
            <p className="text-[14.5px] text-pb-fg-muted leading-relaxed mb-8 max-w-[560px]">
              Claude calls Peachblue's tools and reasons over the results. Answers match the app,
              because they run on the same engine, and every number states the time window it
              came from.
            </p>
            <div className="space-y-2.5">
              {EXAMPLE_QUESTIONS.map((q) => (
                <div
                  key={q}
                  className="flex items-center gap-3 rounded-xl border border-pb-border bg-pb-card px-4 py-3 shadow-pb-soft"
                >
                  <div className="size-6 rounded-full pb-gradient-peach flex items-center justify-center shrink-0">
                    <PeachblueMark size={12} color="#ffffff" />
                  </div>
                  <span className="text-[13.5px] text-pb-fg">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Setup steps */}
        <section className="py-16 md:py-24 px-6">
          <div className="max-w-[860px] mx-auto">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-8">
              Connected in <span className="italic">three</span> steps.
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {STEPS.map((s) => (
                <div key={s.num} className="rounded-2xl border border-pb-border bg-pb-card p-6 shadow-pb-soft">
                  <div className="size-8 rounded-full pb-gradient-peach text-white text-[12.5px] font-semibold flex items-center justify-center mb-4">
                    {s.num}
                  </div>
                  <h3 className="text-[15px] font-semibold text-pb-fg mb-2">{s.title}</h3>
                  <p className="text-[13px] leading-relaxed text-pb-fg-muted">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-pb-fg-muted">
              Access follows your Peachblue login: workspace scoping, tier gating, and instant
              revocation from the same Settings tab. Full client-by-client instructions are in
              the <Link href="/docs/mcp" className="underline underline-offset-2 hover:text-pb-fg transition-colors">setup docs</Link>.
            </p>
          </div>
        </section>

        {/* Tool groups */}
        <section className="py-16 px-6 relative">
          <div className="pointer-events-none absolute inset-0 bg-pb-muted/40" aria-hidden="true" />
          <div className="max-w-[860px] mx-auto relative">
            <h2 className="font-display text-[clamp(28px,4vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-8">
              19 tools, four jobs.
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {TOOL_GROUPS.map((g) => (
                <div key={g.title} className="rounded-2xl border border-pb-border bg-pb-card p-5 shadow-pb-soft">
                  <div className="text-[14.5px] font-semibold text-pb-fg mb-1.5">{g.title}</div>
                  <p className="text-[13px] text-pb-fg-muted leading-relaxed">{g.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[13px] text-pb-fg-muted">
              Every tool is read-only and scoped to your workspace. See the full list in the{" "}
              <Link href="/docs/mcp-tools" className="underline underline-offset-2 hover:text-pb-fg transition-colors">
                MCP tool reference
              </Link>.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-[560px] mx-auto text-center">
            <h2 className="font-display text-[clamp(30px,4.6vw,52px)] leading-[1.06] font-medium tracking-[-0.015em] text-pb-fg mb-4">
              Your data, wherever you <span className="italic">think</span>.
            </h2>
            <p className="text-[14.5px] text-pb-fg-muted leading-relaxed mb-8">
              MCP access is included on Pro and up. Connect a platform, let the first sync land,
              and ask Claude about your own ads.
            </p>
            <a
              href={TRIAL_HREF}
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full pb-gradient-peach text-white text-[15px] font-semibold shadow-[0_8px_24px_rgba(242,119,73,0.35)] hover:brightness-105 hover:-translate-y-0.5 transition-all"
            >
              {TRIAL_LABEL} &rarr;
            </a>
            <p className="mt-4 text-[12.5px] text-pb-fg-muted">{RISK_REVERSAL}</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
