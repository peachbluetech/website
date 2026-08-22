# Proof and citable data

Statistics and facts posts may cite, with sources. Add to this file as new
research lands; the generator must not invent numbers that are not here or in
the other truth files.

## Amazon DSP market (verified August 2026)

- Amazon FY2025 ad revenue $68.6B, up 22% YoY (Marketing Dive). Q2 2026
  $19.8B, up 26% (ppc.land).
- Amazon DSP grew from under 10% to roughly 20% of global programmatic spend
  in about 15 months (ppc.land).
- Nov 2025 (unBoxed): Amazon removed the DSP self-service minimum spend
  floor. Practical self-serve entry is now $5-10k/mo; managed service still
  requires roughly $35-50k/mo (Marketplace Ad Pros).
- Non-endemic advertisers are 23.8% of Amazon ad spend in 2026, up from 9.1%
  in 2023 (Amra & Elma).
- Prime Video: 315M average monthly ad-supported viewers across 16 countries
  (ppc.land). Netflix ad inventory available through Amazon DSP since Q4
  2025; Spotify since Oct 2025.
- Amazon DSP attribution is 14-day only (no 1/7/30-day windows). Reports API:
  max 31-day range per request, roughly 60 days of report retention. (Our own
  integration experience; safe to state as practitioner fact.)
- Amazon is unifying DSP + Ads Console into Campaign Manager; legacy
  reporting tools retire Dec 31, 2026 (Amazon Ads announcements).
- Amazon shipped in-console pacing alerts with one-click fixes for
  underpacing orders (Amazon Ads release notes). Console alerts are
  per-advertiser; there is no cross-client portfolio view.

## Agency practice (sourced)

- A common agency staffing pattern is 30-50 DSP accounts per strategist,
  roughly 30 minutes of senior attention per account per week (SellerApp).
- G2 reviews of the DSP console cite slowness, steep learning curve, and
  painful bulk operations (G2).

## Creative performance (industry, use with care)

- Published "good hook rate" benchmarks contradict each other (20-25% vs
  30-45% vs 60%+ across ranked articles). Cite the disagreement itself, not
  any single number, until we publish our own benchmark data.

## Official ad-platform MCP servers (verified August 2026)

- Google: official Google Ads MCP server shipped April 2026
  (developers.google.com developer toolkit).
- Amazon: Amazon Ads MCP server in open beta since February 2, 2026
  (advertising.amazon.com library announcement). Practitioner writeups note
  visibility gaps in exposed data.
- Meta: official ads MCP connectors launched spring 2026, open beta.
- TikTok: TikTok for Business MCP server LIVE as of August 2026 (verified
  2026-08-14 against ads.tiktok.com help article). Zero-code hosted
  endpoints, ~400 tools full-disclosure / ~40 progressive, explicitly
  recommended for Claude, includes WRITE operations (campaign creation,
  bidding, budgets). Contrast honestly: it is a management surface handing
  Claude raw API tools, not an analysis layer.
- All are single-platform and return raw account/API data: no cross-platform
  creative identity, scoring, or tagging.

## AI ad generation tools (verified August 2026)

Cite for the cost-asymmetry argument. Generation pricing moves fast;
re-verify before any post that quotes it.

- Arcads: roughly $11 per generated video, no free trial; "testing at volume
  gets expensive" (Wireflow, Arcads vs Creatify comparison).
- Creatify: Free (10 credits/mo), Starter $39/mo, Pro $99/mo, Enterprise
  custom (Wireflow / hyperfx comparisons).
- Higgsfield: Basic tier $9/mo entry point incl. URL-to-ad and generated
  video; Marketing Studio + "Supercomputer 2.0" autonomous marketing
  system; revenue nearly quadrupled in the first five months of 2026
  (Inc., contentgrip). Their own blog markets "100+ creative ads without a
  team" (higgsfield.ai/blog/make-100-creative-ads).
- Runway Gen-4: positioned for cinematic/hero brand ads rather than volume.
- SERP note (not for publication, planning only): "best AI UGC/ad tools
  2026" is saturated with tool listicles (gethookd, rework, heygen, alici,
  hyperfx, wireflow, adlibrary). The economics argument is unclaimed; the
  listicle format is not. Never write the listicle.
- COMPETITIVE NOTE: Higgsfield is building create + launch + optimize
  (Inc.: "create, launch, and optimize your ads without you"). Treat as a
  category entrant, not a partner platform. Never position Peachblue as an
  add-on to a generation tool.

## Test spend (framing rule, not a statistic)

The media spend required to reach a verdict on a creative is set by the
conversion count needed for a readable signal, not by production cost, and
AI generation did not change it. Posts must present per-creative test spend
as a plug-your-own-number assumption, never as a benchmark.

## Our own data

- Nothing cleared for publication yet. When aggregate platform data is
  cleared, add it here with methodology notes. Until then posts must not
  cite Peachblue-internal numbers.
