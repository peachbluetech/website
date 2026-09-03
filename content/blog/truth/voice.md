# Voice and claim rules

How Peachblue writes. These rules are hard constraints on every generated
draft.

## Style

- No em-dashes. Use commas, periods, or parentheses instead.
- No emojis anywhere.
- Sentence case headlines. H1s may use the site pattern: a short declarative
  with the final word or two italicized.
- Concrete over hypey. Numbers over adjectives. Short sentences.
- American English.
- Bylines: opinion and strategy posts are by Nick (founder). Reference,
  glossary, and guide posts are by Peachblue.
- Write for a practitioner who runs ads for a living. No fluff intros that
  restate the title. Get to the answer in the first two sentences of every
  section.

## Structure (AEO rules)

- Answer-first: the first paragraph under every question-phrased H2 answers
  it directly, self-contained enough to survive being quoted alone.
- Real HTML/markdown tables for any comparison (never pseudo-tables).
- Every post has an FAQ section defined in the manifest (rendered by the
  layout with FAQPage schema). 3-6 questions, each answer 2-4 sentences.
- Include the current year in titles where natural.
- Named statistics must carry their source inline.
- Every post links: its pillar hub, at least two sibling posts, and /pricing
  at least once in context. Comparison pages link /pricing twice.

## Claim rules (hard)

- Amazon DSP claim: "the only creative analytics platform for agencies at
  self-serve pricing that covers Amazon DSP." NEVER "nobody does creative
  analytics on Amazon DSP" (Skai, VidMob, CreativeX exist at enterprise).
- MCP claim: the server is LIVE (Pro and up). Frame as "your own
  performance data in Claude," never "the only MCP in the category"
  (Foreplay, rule1, uplifted, DataDoe, and now Motion and Atria all ship MCP, verified 2026-09-02). The
  defensible claim: the only creative analytics MCP that serves your own
  cross-platform performance data, including Amazon DSP.
- Never use the bare term "Amazon DSP" as a target keyword or title on its
  own; always an advertising-intent long-tail (pacing, reporting, agency,
  creative, report template). The bare SERP is polluted by Amazon's
  delivery-driver program.
- Competitor facts only from truth/competitors.md, with concessions included.
  Every comparison page says who the competitor is genuinely right for.
- Positioning rule for comparisons (added 2026-08-13): show Peachblue's FULL
  range, $79 Starter through $1,499 Agency. Never position Peachblue as
  only the budget option and never concede high-spend or agency buyers to a
  competitor by default. Concessions go to genuine capability gaps
  (Motion's education ecosystem, Foreplay's swipe file), not to
  spend level: Power and Agency exist precisely for bigger operations, and
  agency mode (multi-client workspaces, DSP/CTV pacing, margin-aware client
  reports) has no equivalent at Motion, Atria, or Foreplay at any price.
  Phrase concessions as what the competitor is known for, never as what
  Peachblue lacks ("we do not have X" is banned framing). Where a conceded
  asset is freely available regardless of buying (Motion's newsletter,
  streams, events), say so, factually.
- The Peachblue entry in any comparison must cover the FULL capability
  stack, not just creative scoring (added 2026-08-13): (1) 31-dimension AI
  analysis with written analysis + copy suggestions, (2) Intelligence
  patterns and archetypes ("what to make next from your own data"),
  (3) Agent Peach + MCP into Claude (own performance data incl.
  DSP; contrast with Foreplay's inspiration-library MCP), (4) Brand Intel
  Reddit monitoring (brand, competitors, topics; category-of-one),
  (5) agency infrastructure (multi-client workspaces, margin-aware client
  reports, DSP/CTV pacing). Write like the superior product it is;
  superiority is delivered through specifics, never adjectives.
- Spend-level routing is banned in BOTH directions (added 2026-08-13):
  never say or imply "over $X/mo, choose [competitor]" in prose, tables,
  FAQs, or decision lists. High-spend teams ($50k+/mo) are core Peachblue
  target customers via Power and Agency. Competitors' own spend gates may
  be stated as facts about their pricing, never as guidance about who
  belongs where.
- Product claims only from truth/product.md. Features on the roadmap are
  labeled as roadmap.
- Pricing tables cite their verification date ("prices verified <date>").
- Never disclose internal implementation details (model providers, exact tag
  counts beyond the public "31 dimensions", API internals beyond what a
  practitioner needs).

## CTAs

- All CTA hrefs/labels come from lib/site.ts (TRIAL_HREF, TRIAL_LABEL,
  DEMO_HREF, SALES_HREF, RISK_REVERSAL). Never hardcode CTA copy in a post.
- Default CTA: trial. DSP/agency posts also carry a secondary "talk to us
  about agency plans" link (SALES_HREF).
