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
- Agent Peach: conversational agent over your own ad data (17 tools:
  performance summaries, rankings, comparisons, audience insights, copy
  variants, patterns, trends). Session memory: the agent remembers entities
  across a conversation.
- Creative Library: by-ad and by-creative views, filters, one-click preset
  views (All / Top / Under / Low-data). Do NOT claim user-created saved
  views; presets are hardcoded.
- Intelligence: pattern detection across creative dimensions, archetypes
- Brand Intel: Reddit monitoring for brand/competitor/topic keywords with
  sentiment and an AI editorial brief
- Reports: date-range reports with print/PDF and CSV export; supplier
  breakdowns for DSP
- Pacing (DSP): per-order flight pacing — budget, spend to date, pace %,
  blended CPM, CPM goals, status filters; agency margin markup supported
  per client
- Agency mode: client switcher scopes the whole app to one DSP advertiser;
  per-client reports, intelligence, and brand intel
- MCP server (LIVE, Pro plan and up): all 17 agent tools exposed over the
  Model Context Protocol, so your own performance data is queryable from
  Claude Desktop, Claude Code, and any MCP client. Marketing focus (per
  Nick, 2026-08-13): name Claude only; do not name Cursor or other
  clients in copy. Full OAuth
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
