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
  UPDATED 2026-10-15: the unified platform is now called Amazon Ads Agent
  (unBoxed 2026). See the "Amazon Ads MCP server" section below; use
  "Amazon Ads Agent", not "Campaign Manager", in new copy.
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
  (advertising.amazon.com library announcement). Full detail, re-verified
  2026-10-15, in the "Amazon Ads MCP server" section below; use that
  section, not this line.
- Meta: official ads AI connectors (ads MCP server plus ads CLI) announced
  April 29, 2026, open beta. Full detail, re-verified 2026-10-09, in the
  "Meta ads AI connectors" section below; use that section, not this line.
- TikTok: TikTok for Business MCP server LIVE as of August 2026 (verified
  2026-08-14 against ads.tiktok.com help article). Zero-code hosted
  endpoints, ~400 tools full-disclosure / ~40 progressive, explicitly
  recommended for Claude, includes WRITE operations (campaign creation,
  bidding, budgets). Contrast honestly: it is a management surface handing
  Claude raw API tools, not an analysis layer.
- All are single-platform, with no cross-platform creative identity and no
  creative tagging. "Raw account/API data" holds for Google, Amazon and
  TikTok as verified in August; Meta's server also carries Meta's own
  diagnostics and benchmarks (see below), so do not call it raw rows only.

## Meta ads AI connectors (verified 2026-10-09)

Sources, all read on 2026-10-09: Meta Business Help Center, "Manage ads from
an AI agent with Meta ads AI connectors"
(facebook.com/business/help/1456422242197840); Meta for Business
announcement dated April 29, 2026
(facebook.com/business/news/meta-ads-ai-connectors); Meta developer docs,
Ads MCP server overview, get started, and the reporting and ad creation
tool pages (developers.facebook.com/documentation/ads-commerce/
ads-ai-connectors/ads-mcp-server/); News for Developers post dated July 16,
2026 (developers.facebook.com/blog/post/2026/07/16/meta-ads-mcp-server/).

- Announced April 29, 2026 in open beta. Server URL
  https://mcp.facebook.com/ads. The help center lists ChatGPT, Claude,
  Claude Code and Perplexity as supported AI agents, and says "You may not
  have access to all of these tools and features yet" (staged rollout).
- July 16, 2026: opened to any developer with their own Meta app, and rules
  for what agents may do became manageable in bulk over the Marketing API.
  Meta says it is "continuously adding new tools".
- Meta states no price anywhere. Say "no fee listed (open beta)". Never say
  it is free permanently.
- Meta publishes NO tool count. "29 tools" is a third-party observation
  (Jon Loomer saw 29 on 2026-05-05; a later write-up counts more than 80).
  Do not print a count as current. If one is cited, attribute and date it.
- Tool areas per Meta's docs (seven): comprehensive reporting; ad creation
  and management; catalog creation and management; signals and datasets;
  help and troubleshooting; A/B tests and conversion lift studies; activity
  logs. The help center also lists custom audiences.
- Reporting tools (docs): ads_get_ad_entities (campaigns, ad sets and ads
  with spend, impressions, CTR, CPC, CPM, conversions; filtering,
  breakdowns, sorting, date ranges), ads_insights_performance_trend,
  ads_insights_anomaly_signal, ads_insights_auction_ranking_benchmarks,
  ads_insights_industry_benchmark, ads_get_opportunity_score (0 to 100 with
  recommendations), ads_insights_advertiser_context. Video metrics (3-second
  plays, ThruPlays) are not named in the docs; do not promise them.
- Creative-related tools (docs give one line each and no return fields):
  ads_get_creatives, ads_get_creative_ads (ads that use one creative),
  ads_get_ad_images, ads_get_ad_videos, ads_get_ad_preview (render a preview
  in a placement), ads_library_search (public Ad Library). Help center: it
  can "retrieve details about existing or uploaded ad creative".
- NOT VERIFIED FIRST-HAND: whether the image or video itself reaches the
  model. Meta's docs do not say. Passionfruit (agency write-up, updated
  2026-10-09, getpassionfruit.com/blog/
  meta-ads-claude-mcp-what-it-actually-does) states Claude cannot see ad
  images or videos through it and that it exposes text fields only.
  CLAIM RULE: never write "Meta's MCP cannot see the creative" as fact. Say
  the documentation does not state it, attribute the practitioner report,
  and give the one-prompt test. Safe from the docs: no documented tool tags
  creative attributes (hook, format, angle) or matches the same asset across
  uploads, and the server covers Meta only. Upgrade this entry when Nick
  tests it on a real account.
- Write access: it can create and edit campaigns, ad sets and ads, create
  creatives, upload assets, and manage audiences and catalogs. Help center:
  "All ads are paused by default until you set them live" and "Any actions
  taken on your behalf require your authorization through the AI agent."
  Docs: "Write tools create entities in a paused state; your AI client asks
  for confirmation before activation." ads_update_entity and
  ads_activate_entity exist, so changes to live entities are possible.
- Rules: someone with full control of a business portfolio can allow or
  block actions per ad account or catalog (Meta Business Suite, Settings,
  Integrations, Ads MCP server), for example block campaign creation, or
  block or cap budget changes. If the menu is missing, the feature is not
  enabled for that business yet.
- Jon Loomer (jonloomer.com/meta-ads-ai-connectors-claude/, 2026-05-05):
  Claude setup walkthrough; notes the connector inherits the Facebook user's
  account access, including client ad accounts in a portfolio.

## Claude limits relevant to ad analysis (verified 2026-10-09, Anthropic help center)

- Custom connectors (remote MCP) are available on Free, Pro, Max, Team and
  Enterprise. Free is limited to one custom connector. On Team and
  Enterprise an Owner adds the connector first, then members connect. Path:
  Customize, Connectors, "+", "Add custom connector"
  (support.claude.com/en/articles/11175166).
- Uploads: up to 20 files per chat. Images: JPEG, PNG, GIF, WebP, at most
  8000 by 8000 pixels, at least 1000 by 1000 recommended. Documents include
  CSV. Video and audio are not on the supported list
  (support.claude.com/en/articles/8241126, updated 2026-07-23). Do not quote
  a per-file size limit; sources conflict.
- Re-read 2026-10-15 (same help article): adding a custom connector now
  runs name, URL, Continue, then authentication settings. Under OAuth
  client the choices are "Use Claude's published identity (Recommended)",
  "Register automatically" and "Use your own OAuth client"; Request headers
  can carry fixed credentials for servers without OAuth. Claude asks for
  approval before tool calls ("Allow always" is the user's choice), tools
  can be switched off per conversation in the "Search and tools" menu, and
  during Research Claude can call connector tools without further approval.

## Amazon Ads MCP server (verified 2026-10-15, Amazon Ads developer docs and announcements)

Sources: announcement advertising.amazon.com/library/news/amazon-ads-mcp-server-open-beta;
docs advertising.amazon.com/API/docs/en-us/mcp/ (mcp-overview, get-started,
get-started-lite, oauth, campaign-management, reporting, skills/*); unBoxed
2026 recap advertising.amazon.com/library/news/unboxed-2026-news-announcements
(dated 2026-09-30). The docs render only in a browser (WebFetch sees an
empty shell).

- Status: open beta since 2026-02-02, "available globally in open beta to
  Amazon Ads partners with active API credentials". The docs still file it
  under "MCP Tools (beta)". No GA date and no price published; do not call
  it free-forever, say "no fee listed". Secondary sources that say March 6
  or "closed beta" are wrong or outdated; use Amazon's Feb 2 date.
- Access prerequisites (oauth page): an Amazon Developer account, "an
  approved application with access to the Amazon Ads API", and the Client
  ID from that app's Login with Amazon (LwA) security profile (plus the
  Client Secret for a private client). So it is NOT a plain "sign in with
  your Amazon Ads login": the Amazon Ads sign-in comes after the developer
  app exists. (Corrects the amazon-dsp-chatgpt line "authenticate with your
  Amazon Ads login".)
- Endpoints are region-specific: NA https://advertising-ai.amazon.com/mcp,
  EU https://advertising-ai-eu.amazon.com/mcp, FE
  https://advertising-ai-fe.amazon.com/mcp. Lite adds /lite to each.
- Clients Amazon names: Claude, ChatGPT, Amazon Kiro, Amazon Bedrock,
  Amazon AgentCore "and other MCP-compatible applications" (overview); the
  announcement also names Gemini. The OAuth 2.1 guide has steps for Kiro
  CLI, Claude Code, Claude Desktop and ChatGPT.
- Claude Desktop per Amazon: first add https://claude.ai/api/mcp/auth_callback
  to the LwA security profile's Allowed Return URLs (else "redirect URI
  mismatch"); then Customize, Connectors, plus, Add custom connector, name,
  URL, "Specify your Client ID and Client Secret under Advanced settings",
  Add. Claude's own UI now labels this "Use your own OAuth client" (see the
  Claude section above). NOT tested first-hand.
- Claude Code per Amazon: `claude mcp add --transport http amzn-ads-mcp
  https://advertising-ai.amazon.com/mcp --client-id <id> --callback-port
  <port>` (public client; add `--client-secret` for private), callback
  http://localhost:<PORT>/callback, then /mcp, Authenticate. Public client
  tokens expire after 1 hour and prompt a re-login; private client
  refreshes automatically.
- Account context: Dynamic mode is the default; the model asks for the
  account IDs and the account "may be reused for subsequent requests or
  until new account identifiers are provided". The account query tool
  lists every account the user can reach. Fixed mode pins one account via
  headers (Amazon-Ads-AI-Account-Selection-Mode: FIXED plus a profile,
  account or manager account ID); "all headers should correspond with a
  single account". advertiserAccountId can be a DSP advertiser account, a
  global account ID or an AMC instance ID. "Not all tools work on manager
  account scope."
- Tool groups in the docs: Account Management, Ads Account, Advertiser
  Product Group Eligibility, Amazon Live, AMC, Billing, Campaign
  Management, Eligibility, Manager Accounts, Reports, Terms Token, Test
  Accounts, User Invitations, User Permissions, User Roles, Users. Amazon
  publishes no tool count; do not print one.
- Campaign Management: query, create, update and delete for campaigns, ad
  groups, ads, ad associations and targets, plus portfolios and bid
  updates. query_campaign "Supports Sponsored Products, Sponsored Brands,
  Sponsored Display, Sponsored Television, and Amazon DSP campaigns".
  create_campaign "supports Sponsored Products, Sponsored Brands and ADSP".
  delete_campaign removes "campaigns and all associated ad groups, ads, and
  targets". DSP-specific: create_bid_adjustment_rule (DSP ad group bid
  rules by device, browser, geography and more) and
  dsp_create_conversion_tracking_products. Sponsored Products shortcuts:
  create_singleshot_sp_campaign (campaign, ad group and ads in one call)
  and add_country_campaign (SP manual campaigns only).
- Reports: create_campaign_report, create_report, retrieve_report,
  create_inventory_report, create_product_report, delete_report.
  Asynchronous: create, then poll and retrieve.
- Not documented: any tool for flight pacing, creative tagging, grouping
  the same creative across line items, or creative-level analysis. Pacing
  has to be computed in the chat from budgets and report rows.
- Skills (beta): downloadable skill definitions from
  https://advertising-api.amazon.com/skills (same headers as the server),
  loaded into Claude Code from .claude/skills; "supported in AI
  applications that recognize Anthropic skill definitions". Named
  examples: dsp-campaign-analysis (resolves a campaign name, runs a
  ROAS/sales report and an audience segment report, polls, combines them)
  and ads-reporting.
- Expert tools: AMC SQL Generator, closed beta by application. (A search
  summary of Amazon's What's New says US-only during beta, GA "early
  2027"; not read first-hand, do not print the GA timing.)
- Write safety: the server creates, updates and deletes. Amazon's own Kiro
  example disables campaign_management-delete_campaign and
  campaign_management-delete_ad. The Sponsored Products one-call campaign
  is created for review and approval before launch.
- Lite (unBoxed 2026): three meta-tools, amazon_ads_mcp-search_tools,
  -describe_tools and -invoke_tool, that find and run any operation;
  "functionally equivalent to the Regular version", "useful for
  smaller-context models, cost-sensitive workloads". Amazon gives no
  token-savings number; a 98,000 to 5,000 figure circulates in secondary
  coverage only, do not print it.
- Amazon Ads Agent (unBoxed 2026): "the unified buying experience that
  brings together what was formerly the DSP and Ads Console"; sponsored
  ads, Full-Funnel Campaigns and DVA+ in one platform; its conversational
  AI is "in expanded closed beta"; "nearly 1,000 metrics" through natural
  language, with peer benchmarks; generative creative tools inside the
  conversation. The MCP tool docs still say "Amazon DSP"; keep "Amazon DSP"
  in copy (agencies still use it).
- Community-built Amazon Ads MCP servers exist (MarketplaceAdPros,
  Openbridge); not reviewed, do not recommend.

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

## UGC creator economics (verified 2026-09-23)

Vendor self-published figures are marked. Re-verify marketplace pricing
before reuse (30-day rule).

- Creator rates: "many UGC creators charge between $150 and $250 per video
  on average"; short product videos $100-400 (Influencer Marketing Hub,
  influencermarketinghub.com/ugc-creators, Sept 2026).
- Collabstr 2026 Influencer Marketing Report (VENDOR, own marketplace data,
  472k+ packages): avg UGC asking price $180, avg final negotiated $154.
  The same report cites a different "campaign" average ($197); do not mix.
- Usage rights: paid-ads/extended licensing adds 25-100%+ to base (IMH);
  30-50% of base for a usage extension (PPC.io Jan 2026, inBeat Aug 2026;
  inBeat's underlying data is a 2022 survey, weak). Whitelisting / Spark
  Ads: 30-100% of base per month (PPC.io); 30%/month (inBeat).
- Marketplaces (live pricing pages, VENDOR): Insense Brand $500/mo
  ($400 annual), Agency $800/mo ($640 annual), Trial $650 for one month;
  7-20% marketplace fee; creator payments budgeted separately; brand gets
  full digital copyright. Trend credit packs ~$69-92/video, fully licensed
  for ads, 2-3 weeks for a full order. JoinBrands Free to $499/mo plans,
  8-15% fee, UGC videos "$25+", unlimited usage rights, content within
  3-7 days. Billo pricing page is login-gated; Billo's own blog (Sept 2026)
  says "from $99 per video, bought as packs"; help center: 7-12 days after
  receiving product. PPC.io lists Billo packs at 6/$500, 14/$1,000,
  37/$2,500. Minisocial pricing page 404 (unverified).
- Definitions (official): Meta partnership ads (formerly branded content
  ads) show the partner's account in the ad header (facebook.com/business
  help 759293997849980). TikTok Spark Ads promote organic posts via an
  authorization code with a customizable duration (ads.tiktok.com help).
- No checkable primary-source stat on UGC performance lift or UGC-specific
  fatigue speed was found. Do not cite the "29% higher conversions (Adweek)"
  figure; it only appears second-hand without a link.

## AI generation pricing re-check (2026-09-23)

Supersedes the August figures above where they conflict:
- Higgsfield: no Basic $9 tier any more; entry is Starter $19/mo
  (higgsfield.ai/pricing). Plus $47 annual / $59 monthly.
- Arcads: pricing page 404s; homepage now says "Free trial available".
  ~$11/video is third-party only (Fluxnote: $110 for 10 videos).
- Creatify: unchanged (Free 10 credits, Starter $39, Pro $99).
- JoinBrands sells AI videos at $5/video (VENDOR).
- /blog/ai-generated-ads corrected 2026-09-23 (body + FAQ) to these figures.

## Reddit (verified 2026-09-30)

- Q2 2026 (Reddit Q2'26 shareholder letter, s203.q4cdn.com ... /2026/q2/
  Q2-26-Shareholder-Letter.pdf): DAUq 130.3M (+18%), WAUq 514.6M (+24%);
  logged-in DAUq 52.6M (+7%), logged-out 77.7M (+27%). Revenue $805M,
  ad revenue $762M. "100k+ active communities", "26B+ posts & comments".
  Letter says search referrals were "choppy" in the quarter. Shopify
  integration GA; Shopping Listing Ads in alpha.
- Rules: Reddit Rules (redditinc.com/policies/reddit-rules) rule 2
  "participate authentically... do not spam"; rule 5 no deceptive
  impersonation; community rules enforced by moderators. Spam policy
  (Reddit Help): businesses posting mostly own links should be thoughtful
  about frequency "or consider advertising opportunities using our
  self-serve platform". 9:1 ratio still on Reddiquette page as "a widely
  used rule of thumb"; Reddiquette is described as informal. No official
  Reddit page found requiring brands to disclose affiliation (our practice,
  not their rule; say so).
- Reddit Pro: free organic business suite, beta, eligible businesses,
  English-speaking countries; Trends keyword monitoring; post/comment
  performance metrics; verified profiles (grey checkmark, public beta).
- Ads (business.reddit.com ad types; Reddit Help): image, video, carousel,
  free-form, conversation ads (conversation pages, deeper in threads),
  product ads, AMA ads, takeovers. Dynamic product ads: catalog + Pixel or
  CAPI with ViewContent/AddToCart/Purchase; physical products only.
  Minimum spend NOT on any official page; do not print one.
- Partnerships: Google gained Reddit Data API access (Google blog, Feb 22,
  2024); ~$60M/yr is Reuters-reported only, never state as fact. OpenAI
  partnership May 16, 2024 (openai.com), terms undisclosed.
- AI citation studies CONFLICT (all vendor studies; cite the disagreement):
  Profound (680M citations, Aug 2024-Jun 2025): Reddit #1 in Google AI
  Overviews (2.2%) and Perplexity (6.6%). Ahrefs (Jun 2025): 7.4% of AI
  Overview citations but outside top 10 on ChatGPT and Perplexity. Semrush
  (Nov 2025, 230K prompts): ChatGPT cited Reddit in close to 60% of
  responses early Aug 2025, around 10% by mid-Sept.
- Reddit Answers / search: Q4 2025 letter, core search merged with Answers,
  "over 80 million people searching directly on Reddit every week".
- Reddit-commissioned (FLAG AS SUCH): 84% of shoppers more confident after
  researching on Reddit (n=1,004 US monthly users, Attest, Feb 2026; Q1'26
  letter).

## Test spend (framing rule, not a statistic)

The media spend required to reach a verdict on a creative is set by the
conversion count needed for a readable signal, not by production cost, and
AI generation did not change it. Posts must present per-creative test spend
as a plug-your-own-number assumption, never as a benchmark.

## Our own data

- Nothing cleared for publication yet. When aggregate platform data is
  cleared, add it here with methodology notes. Until then posts must not
  cite Peachblue-internal numbers.
