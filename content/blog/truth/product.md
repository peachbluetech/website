# Product truth

What Peachblue actually is and does. The generator may only make product claims
that appear here. Update this file when features ship; never let a post claim
ahead of it.

## One-liner

Peachblue is a creative intelligence platform: it connects to your ad platforms,
syncs creative assets and performance data, and uses AI to analyze what's
working and why.

## Platforms (live)

- Meta (Facebook/Instagram) — auto-sync, creative mirroring, full analysis
- TikTok — auto-sync, full analysis
- Google Ads — Search, Display, Video (RSA text analysis included; Performance Max not yet)
- Amazon DSP — performance sync, creative asset mirroring, pacing + reports

Not supported today: YouTube as a standalone channel, LinkedIn, Pinterest,
Snapchat, AppLovin, Performance Max. Do not imply otherwise.

## Core features

- AI creative analysis: every creative tagged across 31 dimensions (format,
  hook style, emotional tone, CTA type, and more) with a written expert
  analysis and copy suggestions per creative. (Audited 2026-08-13: the code
  writes 31 tag dimensions; older copy said 29, incl. inside the app UI.)
- Composite scoring: CTR/ROAS/CPA/spend percentile blend, tiers Top Performer /
  Above Average / Average / Underperformer
- Creative grouping: perceptual fingerprinting (DCT hashing, triple-frame
  video sampling) that recognizes the same creative across ads and
  platforms, even after re-crops and re-compression. Cross-platform fuzzy
  matching; byte-identical SHA-256 collapse for Amazon DSP assets. This is
  stronger than "byte hash" — claim it.
- Agent Peach: conversational agent over your own ad data (19 tools:
  performance summaries, rankings, comparisons, audience insights, copy
  variants, patterns, trends). Session memory: the agent remembers entities
  across a conversation.
- Creative Library: by-ad and by-creative views, filters, one-click preset
  views (All / Top / Under / Low-data). Do NOT claim user-created saved
  views; presets are hardcoded.
- Intelligence: pattern detection across creative dimensions, archetypes
- Next Creative Brief (shipped Aug 2026): generates a brief from your own
  winning creatives. Contains the winning recipe (what your winners share),
  concepts to make next, proven hooks pulled from your own headline
  performance, do/don't rules with cohort counts, labeled reference ads,
  and a GENERATION-READY PROMPT BLOCK intended to be pasted into an AI
  image or video generator. Shareable via public token link, copy-as-
  markdown. Generated from the Intelligence page. Correlational language
  is enforced (patterns observed, never "this will work").
- Today + Creative Economics dashboards (shipped 2026-08-18): a portfolio
  insight layer over your daily data: week-over-week deltas, hit rate,
  wasted spend, bench depth, and a fatigue board that flags CTR decay
  measured against each creative's own best rolling week. Zero-spend
  creatives are never flagged; every flag carries a dollar consequence.
  Awareness/DSP delivery spend is bucketed separately and never counted
  as waste.
- Brand Intel: Reddit monitoring for brand/competitor/topic keywords with
  sentiment and an AI editorial brief. Brief sections include sentiment
  snapshot, trending topics, opportunities, competitive signals, action
  items, and a comparison to the previous scan. Keyword expansion suggests
  related phrases and discovers relevant subreddits. Queryable via Agent
  Peach and the MCP server (get_brand_mentions). Agency mode: keywords,
  mentions, and briefs scope per client. (Detail added 2026-08-27,
  verified against the app's brand-intel routes.)
- Reports: date-range reports with print/PDF and CSV export; supplier
  breakdowns for DSP
- Pacing (DSP): per-order flight pacing — budget, spend to date, pace %,
  blended CPM, CPM goals, status filters; agency margin markup supported
  per client
- Agency mode: client switcher scopes the whole app to one DSP advertiser;
  per-client reports, intelligence, and brand intel
- MCP server (LIVE, Pro plan and up): all 19 agent tools exposed over the
  Model Context Protocol, so your own performance data is queryable from
  Claude Desktop, Claude Code, and any MCP client. Marketing focus (per
  Nick, 2026-08-13; amended 2026-08-24): Claude is the primary named
  client. ChatGPT may be named where the content targets ChatGPT demand
  (Nick's call, 2026-08-24). Never name Cursor or other dev-tool clients
  in copy. IMPORTANT: Peachblue-in-ChatGPT is UNVERIFIED as of 2026-08-24.
  The server speaks the open standard (Streamable HTTP, SSE, OAuth), the
  same transports ChatGPT Developer Mode accepts, but nobody has completed
  a live connection test. Until verified: no setup steps for ChatGPT, no
  claim that it works; the honest phrasing is the open-standard one
  ("any client that supports remote MCP connectors"). The earlier
  "inline creative cards render inside Claude/ChatGPT responses" claim
  below is under the same caveat for the ChatGPT half. Full OAuth
  sign-in flow; Streamable HTTP and SSE transports; inline creative cards
  render inside Claude/ChatGPT responses (MCP Apps). Settings > MCP tab is
  visible for brand orgs (fixed 2026-08-13); agency orgs see a Coming soon
  card, so phrase agency MCP as "coming soon". Setup docs live at
  /docs/mcp.

## Pricing (verified 2026-08-12)

- Starter $79/mo — 1 seat, Meta + TikTok, 400 credits
- Pro $199/mo — 3 seats, adds Google Ads, Intelligence, Brand Intel, MCP/API access, 1,500 credits
- Scale $499/mo — 10 seats, adds Amazon DSP, 4,000 credits
- Power $799/mo — 8 seats, adds Reports + Pacing, priority support + onboarding, 6,000 credits. Do NOT claim "priority processing" — the queue has no plan-aware ordering yet (audited 2026-08-13).
- Agency $1,499/mo — 25 seats, agency mode (multi-client), 15,000 credits
- Annual = 2 months free. 7-day trial on Starter and Pro.
- Credits reset monthly. When credits run out, analysis pauses until the
  next period or an upgrade. Do NOT claim overage packs — none exist in the
  product today (audited 2026-08-13). Video analysis = 10 credits, image or
  text = 5.

## Named proof points (safe to cite)

- 31 tagged creative dimensions per creative
- 4 ad platforms synced including Amazon DSP
- Pacing math per DSP order: expected vs actual delivery, pace %, blended CPM
- Reddit brand monitoring with editorial briefs is part of the product
- Built and run by a bootstrapped founder (Nick); no VC-scale sales motion

## What we do NOT do (never claim)

- No Amazon Sponsored Ads sync — Amazon coverage is DSP only (audited
  2026-08-13: the sponsored flag exists in billing config but no ingestion
  code exists). Say "Amazon DSP", never "Amazon Sponsored".
- No external ad-inspiration library or swipe file today. Competitor ads
  comparison is on the near-term roadmap (per Nick, 2026-08-13) — it may be
  described as "shipping soon", always clearly marked as coming, never as
  live. Until it ships we analyze YOUR ads.
- No ad buying/activation — we do not launch or edit campaigns
- No attribution modeling (no Northbeam/Triple Whale integration yet)
- No white-label reports yet
- No free-forever plan
