/**
 * Blog manifest — the single source of truth for every article, planned or
 * published. Drives the blog index, sitemap, llms.txt, RSS, internal links,
 * and the /write-post generator skill.
 *
 * Publishing flow: set an entry's status to "published", make sure
 * content/blog/posts/<slug>.mdx exists, commit. A build-time check in
 * lib/blog.ts fails the build if a published entry has no MDX file.
 *
 * Content strategy: ~/Documents/peachblue strategy/blog-content-strategy.md
 */

export type ArticleType =
  | "alternatives" // ranked listicle of tools replacing a named competitor
  | "vs" // head-to-head comparison of two tools
  | "guide" // definitive practitioner guide (pillar or spoke)
  | "glossary" // definition + benchmark + how-to-measure page
  | "template" // lead-magnet page around a downloadable template
  | "essay"; // founder opinion / war story (Nick byline, mostly hand-written)

export type Pillar = "dsp" | "comparisons" | "creative" | "ai" | "reddit";

export type Byline = "nick" | "peachblue";

export interface FaqEntry {
  q: string;
  a: string; // plain text, 2-4 sentences; rendered on page + FAQPage schema
}

export interface Article {
  slug: string;
  /** SEO <title>. Keep under ~60 chars where possible. */
  title: string;
  /** On-page H1. The layout italicizes `h1Accent` if provided. */
  h1: string;
  h1Accent?: string;
  /** Meta description, under ~155 chars. */
  description: string;
  type: ArticleType;
  pillar: Pillar;
  /** Primary target query first, then secondaries. */
  keywords: string[];
  /** Competitors the article must cover (facts from truth/competitors.md). */
  competitors?: string[];
  /** 1 = write first. Ordering within status, not a global rank. */
  priority: number;
  byline: Byline;
  status: "planned" | "draft" | "published" | "needs-refresh";
  /** ISO dates. Set datePublished when status flips to published. */
  datePublished?: string;
  dateUpdated?: string;
  faq: FaqEntry[];
  /**
   * Pointers to raw material the generator must ground in: war stories,
   * product data, screenshots, research notes. Human-readable.
   */
  rawMaterial?: string[];
  /** Explicit related slugs (defaults to same-pillar siblings). */
  related?: string[];
}

export const PILLARS: Record<Pillar, { title: string; blurb: string }> = {
  dsp: {
    title: "Amazon DSP reporting",
    blurb:
      "Pacing, reporting, and creative performance for Amazon DSP and CTV, written for the agencies and brands running it.",
  },
  comparisons: {
    title: "Tools and comparisons",
    blurb:
      "Honest comparisons of creative analytics tools, with current verified pricing and who each tool actually fits.",
  },
  creative: {
    title: "Creative intelligence",
    blurb:
      "How to know which ads work and why: testing frameworks, metrics, and the creative strategist craft.",
  },
  ai: {
    title: "AI for media buying",
    blurb:
      "Using Claude, ChatGPT, and MCP on your own ad data, without the hype.",
  },
  reddit: {
    title: "Brand intel",
    blurb:
      "Reddit monitoring for advertisers: what people say about your brand, turned into creative angles.",
  },
};

export const ARTICLES: Article[] = [
  {
    slug: "magicbrief-alternatives",
    title: "MagicBrief alternatives after the shutdown (2026)",
    h1: "MagicBrief is gone. Here is where to go",
    h1Accent: "next.",
    description:
      "MagicBrief shut down July 31, 2026. An honest comparison of the alternatives for solo advertisers through agencies: Canva Grow, Foreplay, Motion, Atria, and Peachblue, with verified pricing.",
    type: "alternatives",
    pillar: "comparisons",
    keywords: [
      "magicbrief alternatives",
      "magicbrief shut down",
      "magicbrief replacement",
      "canva grow vs magicbrief",
    ],
    competitors: ["Canva Grow", "Foreplay", "Motion", "Atria", "Peachblue"],
    priority: 1,
    byline: "nick",
    status: "published",
    datePublished: "2026-08-12",
    dateUpdated: "2026-08-13",
    faq: [
      {
        q: "Why did MagicBrief shut down?",
        a: "Canva acquired MagicBrief in mid-2025 and wound the standalone product down on July 31, 2026. The team and technology became Canva Grow, an ad creation and optimization layer inside Canva rather than a standalone creative analytics tool.",
      },
      {
        q: "Is Canva Grow a direct replacement for MagicBrief?",
        a: "Only partly. Canva Grow covers ad creation and launch for Meta, TikTok, and LinkedIn inside Canva plans, which suits SMB and generalist marketers. It does not replace MagicBrief's creative research and performance analysis workflow for media buyers and agencies.",
      },
      {
        q: "What is the closest MagicBrief alternative for creative research and swipe files?",
        a: "Foreplay. It has the strongest ad discovery library and swipe-file workflow in the category, from $49 per month billed annually, with creative analytics available through its Lens add-on tiers.",
      },
      {
        q: "What should I use if I mainly need creative performance analytics?",
        a: "Motion is the incumbent at $750 per month and up, strongest for Meta-centric teams who want its community and services layer. Peachblue covers Meta, TikTok, Google Ads, and Amazon DSP with AI analysis of your own creatives, from $79 self-serve plans up to a $1,499 Agency tier with multi-client workspaces and per-client DSP reporting.",
      },
    ],
    rawMaterial: [
      "truth/competitors.md MagicBrief + all comparison entries",
      "MagicBrief shutdown notice live on magicbrief.com (confirmed Aug 2026)",
      "Canva Grow 2.0 Cannes announcement June 25 2026",
    ],
  },
  {
    slug: "amazon-dsp-pacing-guide",
    title: "Amazon DSP pacing: the complete guide (2026)",
    h1: "Amazon DSP pacing, explained",
    h1Accent: "properly.",
    description:
      "How DSP pacing actually works: the flight math, why orders underdeliver, how to catch it early, and how to report pacing to clients. With a free template.",
    type: "guide",
    pillar: "dsp",
    keywords: [
      "amazon dsp pacing",
      "amazon dsp pacing report",
      "amazon dsp underdelivery",
      "dsp flight pacing",
    ],
    priority: 2,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-12",
    dateUpdated: "2026-08-12",
    faq: [
      {
        q: "What is pacing in Amazon DSP?",
        a: "Pacing is how an order's actual spend tracks against the spend it should have delivered by this point in its flight. An order pacing at 100% has spent exactly the share of budget that has elapsed of the flight; under 100% is underdelivery, over 100% risks exhausting budget early.",
      },
      {
        q: "How do I calculate the expected spend for a DSP order?",
        a: "Divide the total order budget by the number of days in the flight, then multiply by the days elapsed so far. Pace percent is actual spend to date divided by that expected spend, times 100. Even pacing is the standard assumption unless the order uses a custom delivery curve.",
      },
      {
        q: "Why is my Amazon DSP order underdelivering?",
        a: "The usual causes are audience pools that are too narrow, bids below the winning range for the inventory, frequency caps set too tight, creative approvals or rejections eating flight days, and supply constraints on specific deals or inventory types. Diagnose in that order; bids and audience are the most common.",
      },
      {
        q: "Does Amazon DSP have built-in pacing alerts?",
        a: "Yes. The console shows in-line pacing alerts with one-click fixes for underpacing orders. They are per-advertiser, so an agency running many seats still has no portfolio view across clients, which is why agencies typically maintain their own pacing report.",
      },
      {
        q: "How often should agencies check DSP pacing?",
        a: "Daily for active flights. The common agency staffing pattern of 30 to 50 accounts per strategist makes daily manual checks unrealistic, which is why a portfolio pacing view that surfaces only at-risk orders matters more than any single-account report.",
      },
    ],
    rawMaterial: [
      "truth/proof.md DSP market + agency practice sections",
      "Peachblue pacing product: pace % math, blended CPM, CPM goals, status chips (product truth)",
      "Amazon pacing alerts release note",
      "Practitioner pain: fragmented reporting, spreadsheet workflows (G2, SellerApp)",
    ],
  },
  {
    slug: "amazon-dsp-report-template",
    title: "Amazon DSP report template for client reporting (free)",
    h1: "The Amazon DSP report template agencies actually",
    h1Accent: "need.",
    description:
      "A free client-ready Amazon DSP report template: the metrics that matter, 14-day attribution explained, supplier breakdowns, and pacing. Google Sheets format.",
    type: "template",
    pillar: "dsp",
    keywords: [
      "amazon dsp report template",
      "dsp client report template",
      "amazon dsp reporting template",
    ],
    priority: 3,
    byline: "peachblue",
    status: "planned",
    faq: [],
    rawMaterial: [
      "Build the actual Sheets template first",
      "truth/product.md Reports feature",
      "DSP metric definitions: 14d attribution, NTB, viewability",
    ],
  },
  {
    slug: "motion-alternatives",
    title: "Motion alternatives now that Starter is $750/mo (2026)",
    h1: "Motion moved upmarket. Your alternatives,",
    h1Accent: "honestly.",
    description:
      "Motion's entry price tripled to $750/mo in 2026. Honest alternatives at every spend level, from solo advertisers to agencies, with verified pricing.",
    type: "alternatives",
    pillar: "comparisons",
    keywords: [
      "motion alternatives",
      "motion app alternatives",
      "motion app pricing",
      "creative analytics tools",
    ],
    competitors: ["Motion", "Atria", "Foreplay", "Segwise", "rule1", "Peachblue"],
    priority: 4,
    byline: "nick",
    status: "published",
    datePublished: "2026-08-14",
    dateUpdated: "2026-08-24",
    faq: [
      {
        q: "How much does Motion cost now?",
        a: "As of August 2026, Motion's Starter tier is $750 per month for accounts up to $50k in monthly ad spend, Pro is $1,050 per month, and the Growth tier above that is custom-priced. A limited free plan exists. Most comparison articles still cite the old $250 entry price, which was retired during 2026.",
      },
      {
        q: "What is the best Motion alternative for creative analytics?",
        a: "Peachblue is the strongest like-for-like alternative for analyzing your own ads: AI analysis across 31 creative dimensions, pattern detection, and coverage of Meta, TikTok, Google Ads, and Amazon DSP, from $79 per month. Atria fits Meta-and-TikTok-only teams who also want AI generation, and rule1 is a cheap agent-first newcomer for Meta-centric accounts.",
      },
      {
        q: "Does any Motion alternative match its community and courses?",
        a: "No. Motion's education ecosystem, including the Thumbstop newsletter, summits, and courses, is the best in the category. Most of it is free to everyone regardless of whether you pay for the software, so you can keep the content and choose your analytics tool separately.",
      },
      {
        q: "Which Motion alternatives cover Google Ads or Amazon?",
        a: "Motion covers neither. Peachblue syncs Google Ads (Search, Display, Video) and Amazon DSP alongside Meta and TikTok. Segwise covers Google plus the mobile app networks, and rule1 covers Google for Meta-centric teams. If Google or Amazon is a meaningful share of your spend, that gap decides the comparison.",
      },
    ],
    rawMaterial: ["truth/competitors.md all entries; re-verify Motion pricing before publish"],
  },
  {
    slug: "amazon-dsp-reporting-guide",
    title: "How to read Amazon DSP reports (2026 guide)",
    h1: "Amazon DSP reports, finally",
    h1Accent: "readable.",
    description:
      "Every Amazon DSP report type explained: what the console gives you, what the Reports API adds, 14-day attribution, and how to build client reporting on top.",
    type: "guide",
    pillar: "dsp",
    keywords: [
      "amazon dsp reporting",
      "how to read amazon dsp reports",
      "amazon dsp report types",
      "amazon dsp metrics",
    ],
    priority: 5,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-18",
    dateUpdated: "2026-08-18",
    faq: [
      {
        q: "What reports does Amazon DSP offer?",
        a: "The DSP console offers downloadable delivery reports sliced by order, line item, and creative, plus report families covering audience, inventory, geography, device, and on-Amazon shopping activity. The same data is available programmatically through the Reports API for scheduled, automated pulls. All reporting is scoped to a single advertiser at a time; there is no cross-client view in the console.",
      },
      {
        q: "What attribution window does Amazon DSP use?",
        a: "Amazon DSP uses a 14-day attribution window, and it is the only window available: there is no 1-day, 7-day, or 30-day option. Every conversion metric in every DSP report, including purchases, sales, detail page views, add to carts, and new-to-brand, is a 14-day figure. This makes raw side-by-side comparison with platforms on other windows, like Meta on 7-day click, misleading unless each column is labeled with its window.",
      },
      {
        q: "How long does Amazon keep DSP report data?",
        a: "The Reports API retains roughly 60 days of history, and requests for older date ranges fail. Each request is also capped at a 31-day range, so longer windows are pulled in chunks. Any reporting workflow that needs quarterly reviews or year-over-year comparisons must warehouse the data outside Amazon from the first pull onward.",
      },
      {
        q: "Why do my DSP numbers not match Meta or Google?",
        a: "Mostly because of attribution windows: DSP reports conversions on a fixed 14-day window while Meta and Google default to different windows, so the platforms are counting different things. DSP conversion figures for recent days also keep revising upward until the 14-day window completes. Compare each channel against its own history rather than head-to-head on raw conversion counts.",
      },
      {
        q: "How does Peachblue work with Amazon DSP?",
        a: "Peachblue connects to Amazon DSP and syncs delivery and conversion reporting continuously, storing the history beyond Amazon's roughly 60-day retention. On top of that data it provides date-range client reports with supplier breakdowns, per-order flight pacing with CPM goals, agency margin handling per client, and AI creative analysis of the DSP creatives themselves alongside Meta, TikTok, and Google Ads. It is an analytics layer only: it does not launch, edit, or bid on campaigns.",
      },
      {
        q: "What happens to Amazon DSP reporting at the end of 2026?",
        a: "Amazon is unifying the DSP and the Ads Console into a single Campaign Manager, and legacy reporting tools retire on December 31, 2026. Report surfaces and export paths will move as part of that transition. The underlying data model, including 14-day attribution and the buying hierarchy of orders, line items, and creatives, is expected to carry over.",
      },
    ],
    rawMaterial: [
      "truth/proof.md DSP facts (31-day chunks, 60-day retention, 14d attribution)",
      "Our Reports API integration experience",
    ],
    related: ["amazon-dsp-pacing-guide", "claude-for-media-buyers"],
  },
  {
    slug: "creative-strategist-workflow",
    title: "The creative strategist workflow, mapped (2026)",
    h1: "How creative strategists actually",
    h1Accent: "work.",
    description:
      "The operating system of the creative strategist role: weekly cadence, research to brief to test to readout, and the tools at each step.",
    type: "guide",
    pillar: "creative",
    keywords: [
      "creative strategist workflow",
      "creative strategist tools",
      "creative strategy process",
    ],
    priority: 6,
    byline: "nick",
    status: "planned",
    faq: [],
    rawMaterial: ["Needs Nick's take on the weekly cadence; SERP is job listings, no real guide exists"],
  },
  {
    slug: "motion-vs-atria",
    title: "Motion vs Atria: the honest 2026 comparison",
    h1: "Motion vs Atria, without the",
    h1Accent: "spin.",
    description:
      "Motion ($750+) vs Atria ($129-$1,199): platforms, AI depth, pricing, and who each one actually fits, from someone who competes with both.",
    type: "vs",
    pillar: "comparisons",
    keywords: ["motion vs atria", "atria vs motion", "motion app review", "atria review"],
    competitors: ["Motion", "Atria"],
    priority: 7,
    byline: "nick",
    status: "planned",
    faq: [],
    rawMaterial: ["truth/competitors.md; disclose we compete with both, concessions mandatory"],
  },
  {
    slug: "claude-for-media-buyers",
    title: "Claude for media buyers: MCP for Meta, TikTok, Google, Amazon",
    h1: "Put your ad data in",
    h1Accent: "Claude.",
    description:
      "Every ad platform now ships an official MCP server. What Meta, Google, Amazon, and TikTok's MCPs actually give Claude, what stitching all four costs you, and the one-connection alternative.",
    type: "guide",
    pillar: "ai",
    keywords: [
      "claude for media buying",
      "meta ads mcp",
      "google ads mcp",
      "amazon ads mcp",
      "tiktok ads mcp",
      "ads mcp server",
      "analyze ads with claude",
      "mcp for marketing",
    ],
    priority: 8,
    byline: "nick",
    status: "published",
    datePublished: "2026-08-14",
    dateUpdated: "2026-08-24",
    faq: [
      {
        q: "Can Claude analyze my Facebook ads?",
        a: "Yes, two ways. You can paste exports and screenshots into any Claude conversation for one-off analysis, or connect an MCP server so Claude queries your ad data live. The MCP route is far more reliable: no stale snapshots, no copy-paste errors, and Claude can answer follow-up questions against the actual data.",
      },
      {
        q: "What is MCP in plain terms?",
        a: "The Model Context Protocol is an open standard that lets AI assistants call tools that fetch real data. Instead of pasting numbers into the chat, you connect a data source once, and Claude queries it directly during the conversation.",
      },
      {
        q: "Why use Peachblue's MCP instead of Meta's official ads MCP?",
        a: "Meta's MCP gives Claude raw Ads Manager rows for one platform, and the same is true of any single-platform connector for TikTok, Google Ads, or Amazon. Peachblue's MCP gives Claude analyzed intelligence across all four in one connection: creatives grouped across ads and platforms, composite scores, 31 tagged creative dimensions, precomputed patterns, DSP flight pacing, and Reddit brand monitoring. Raw rows make Claude a query runner; the intelligence layer makes it an analyst. You can also connect both.",
      },
      {
        q: "Can Claude change or pause my campaigns through Peachblue?",
        a: "No. Every tool the Peachblue MCP server exposes is read-only. Claude can query, rank, compare, and summarize your data; it cannot create, edit, pause, or spend anything.",
      },
      {
        q: "Do Meta, Google, Amazon, and TikTok have official MCP servers?",
        a: "Yes, all four as of August 2026. Google shipped its official Google Ads MCP server in April 2026, Amazon's Ads MCP server has been in open beta since February 2026, Meta launched its ads MCP connectors in spring 2026, and TikTok's for Business MCP server went live in August 2026 with roughly 400 tools including campaign management. Each covers only its own platform and hands Claude raw account data or API surface, with no cross-platform creative identity, scoring, or tagging.",
      },
      {
        q: "Does this work with assistants other than Claude?",
        a: "The Peachblue MCP server speaks the open MCP standard, so any client that supports remote MCP connectors can connect the same way. The setup docs cover Claude Desktop and Claude Code, which is where we focus.",
      },
    ],
    rawMaterial: [
      "Frame per voice.md MCP claim rule: own-performance-data angle",
      "Meta official Ads MCP server (April 2026) as context",
    ],
  },
  {
    slug: "amazon-dsp-minimum-spend",
    title: "Amazon DSP minimum spend in 2026: the floor is gone",
    h1: "The DSP minimum spend is",
    h1Accent: "gone.",
    description:
      "Amazon removed the DSP self-service minimum in Nov 2025. What it costs to start now, self-service vs managed, and what smaller advertisers should know.",
    type: "guide",
    pillar: "dsp",
    keywords: [
      "amazon dsp minimum spend",
      "amazon dsp cost",
      "amazon dsp self service",
    ],
    priority: 9,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-31",
    dateUpdated: "2026-08-31",
    faq: [
      {
        q: "What is the minimum spend for Amazon DSP?",
        a: "There is no official minimum for self-service Amazon DSP accounts since November 2025, when Amazon removed the floor at unBoxed. The practical working entry for a meaningful program is $5,000 to $10,000 per month, and Amazon's managed service still expects roughly $35,000 to $50,000 per month. Any page citing a $50,000 minimum is describing the pre-November-2025 rules.",
      },
      {
        q: "What is the difference between self-service and managed Amazon DSP?",
        a: "Self-service means your team or your agency operates the DSP console directly, with no official spend minimum since November 2025. Managed service means Amazon's own team runs the campaigns, which in practice expects roughly $35,000 to $50,000 per month. Self-service trades the spend floor for an operational one: someone has to actually know the console.",
      },
      {
        q: "Why do agencies still quote minimums for Amazon DSP?",
        a: "Because the working costs did not disappear with the official floor. Setup, creative, audience strategy, and weekly flight management cost roughly the same at low spend as at high spend, so agencies set minimums that keep the overhead per delivered dollar sane. An agency seat also means inheriting that agency's fee structure on top of media.",
      },
      {
        q: "Is Amazon DSP worth it for smaller advertisers now?",
        a: "For many, yes, primarily because of the inventory: Prime Video's ad-supported audience of 315 million average monthly viewers, plus Netflix and Spotify inventory available through Amazon DSP since late 2025. That is streaming TV and audio reach that used to require enterprise commitments. The honest costs of entry are operational: a real console learning curve, 14-day-only attribution, and reporting discipline.",
      },
      {
        q: "Do I need to sell on Amazon to use Amazon DSP?",
        a: "No. Non-endemic advertisers, brands that do not sell on Amazon, made up 23.8 percent of Amazon ad spend in 2026, up from 9.1 percent in 2023. The DSP buys audiences and inventory, including CTV and streaming audio, not just placements pointing at Amazon listings.",
      },
    ],
    rawMaterial: ["truth/proof.md Nov 2025 floor removal; most ranked content is stale pre-Nov-2025"],
  },
  {
    slug: "creative-testing-framework",
    title: "A creative testing framework for $10k/mo budgets (2026)",
    h1: "Creative testing that fits your",
    h1Accent: "budget.",
    description:
      "A creative testing framework sized for $5-25k/mo accounts: how many concepts, how to read results with small samples, and when to kill a test.",
    type: "guide",
    pillar: "creative",
    keywords: [
      "creative testing framework",
      "ad creative testing",
      "facebook ad testing budget",
    ],
    priority: 10,
    byline: "nick",
    status: "planned",
    faq: [],
    rawMaterial: ["Nick's testing approach; scoring tiers from product truth as the readout layer"],
  },
  // Wave two (weeks 8-16). Keep priorities sequential.
  {
    slug: "atria-alternatives",
    title: "Atria alternatives after the price hike (2026)",
    h1: "Atria alternatives, priced",
    h1Accent: "honestly.",
    description:
      "Atria's Plus tier jumped to $479-599/mo and the platform still covers only Meta and TikTok. The alternatives, with verified pricing.",
    type: "alternatives",
    pillar: "comparisons",
    keywords: ["atria alternatives", "tryatria alternatives", "atria pricing"],
    competitors: ["Atria", "Motion", "Foreplay", "Segwise", "rule1", "Peachblue"],
    priority: 11,
    byline: "nick",
    status: "planned",
    faq: [],
  },
  {
    slug: "best-creative-analytics-tools",
    title: "Best creative analytics tools in 2026, compared",
    h1: "Creative analytics tools, actually",
    h1Accent: "compared.",
    description:
      "Every serious creative analytics tool in 2026 with verified pricing: Motion, Atria, Foreplay, Segwise, rule1, GetCrux, Peachblue, and who each fits.",
    type: "alternatives",
    pillar: "comparisons",
    keywords: [
      "creative analytics tools",
      "best creative analytics software",
      "ad creative analysis tools",
    ],
    competitors: ["Motion", "Atria", "Foreplay", "Segwise", "rule1", "GetCrux", "Peachblue"],
    priority: 12,
    byline: "nick",
    status: "planned",
    faq: [],
  },
  {
    slug: "amazon-dsp-creative-performance",
    title: "Amazon DSP creative performance: which creatives work",
    h1: "Your DSP creatives are not all",
    h1Accent: "equal.",
    description:
      "How to measure creative-level performance in Amazon DSP: the metrics that exist, the ones that do not, and how to compare creatives across orders.",
    type: "guide",
    pillar: "dsp",
    keywords: [
      "amazon dsp creative performance",
      "amazon dsp creative reporting",
      "dsp creative testing",
    ],
    priority: 13,
    byline: "peachblue",
    status: "planned",
    faq: [],
  },
  {
    slug: "hook-rate-hold-rate-thumbstop",
    title: "Hook rate, hold rate, thumbstop: definitions and benchmarks",
    h1: "Hook rate, hold rate, thumbstop,",
    h1Accent: "defined.",
    description:
      "What hook rate, hold rate, and thumbstop ratio actually measure, how to calculate them, and why published benchmarks disagree with each other.",
    type: "glossary",
    pillar: "creative",
    keywords: ["hook rate", "hold rate", "thumb stop ratio", "thumbstop rate"],
    priority: 14,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-20",
    dateUpdated: "2026-08-20",
    faq: [
      {
        q: "What is hook rate?",
        a: "Hook rate is the share of impressions where the viewer watched at least the opening of your video ad. On Meta it is calculated as 3-second video plays divided by impressions; on TikTok the analogous calculation uses 2-second video views. It measures whether the first moments of the creative stop the scroll, which gates every downstream metric.",
      },
      {
        q: "Are thumbstop ratio and hook rate the same thing?",
        a: "In most working usage, yes: both mean 3-second video plays divided by impressions, with thumbstop being the agency-coined name for the same behavior. Some teams reserve one term for a stricter cutoff such as 25 percent video completion, but that is a house convention rather than a standard. If your team uses both words, write down which formula each one refers to.",
      },
      {
        q: "How is hold rate calculated?",
        a: "The most common calculation is ThruPlays divided by 3-second video plays, which measures how many hooked viewers kept watching to 15 seconds or completion. A large share of published articles instead divide ThruPlays by impressions, which blends hook and hold into one smaller number. Both appear in the wild, so pick one definition and apply it identically in every report.",
      },
      {
        q: "What is a good hook rate?",
        a: "There is no trustworthy published benchmark: ranked articles claim anywhere from 20 to 25 percent up to 60 percent and beyond, contradictions too large to explain by audience or vertical. Placement mix, video length, and definition drift all move the number. The reliable practice is to measure your own account's trailing average per placement and format, and judge new creatives against that baseline.",
      },
      {
        q: "Do hook rate and hold rate apply to image ads?",
        a: "No. Both metrics are built on video play counts, which do not exist for static images. For image creatives, CTR remains the primary attention metric, and the same own-baseline discipline applies: compare each image against your account's history rather than a published benchmark.",
      },
    ],
  },
  {
    slug: "amazon-dsp-reports-api",
    title: "The Amazon DSP Reports API, from the trenches",
    h1: "Shipping against the DSP Reports API: what the docs",
    h1Accent: "don't say.",
    description:
      "31-day chunks, 60-day retention, 14-day-only attribution, versioned Accept headers, and the other things you learn by actually building on the DSP Reports API.",
    type: "essay",
    pillar: "dsp",
    keywords: ["amazon dsp reporting api", "amazon dsp api"],
    priority: 15,
    byline: "nick",
    status: "planned",
    faq: [],
    rawMaterial: ["Nick/engineering war story; keep to practitioner-useful detail, no internals beyond API behavior"],
  },
  {
    slug: "creative-fatigue",
    title: "Creative fatigue: diagnose it from your own data",
    h1: "Creative fatigue is measurable. Here is",
    h1Accent: "how.",
    description:
      "How to spot creative fatigue in frequency, CTR decay, and CPA drift, and a simple refresh cadence that does not burn your winners early.",
    type: "guide",
    pillar: "creative",
    keywords: ["creative fatigue", "ad fatigue", "meta creative fatigue"],
    priority: 16,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-20",
    dateUpdated: "2026-08-20",
    faq: [
      {
        q: "What is creative fatigue?",
        a: "Creative fatigue is the performance decay that sets in when an audience has seen an ad too many times: the people most likely to respond already have, and the rest have learned to scroll past it. It shows up as rising frequency, declining CTR against the creative's own history, and drifting CPA. It is an audience phenomenon rather than a creative defect, which is why the same asset can win, fatigue, rest, and win again.",
      },
      {
        q: "How do I know if an ad is fatigued?",
        a: "Read three signals together per creative: frequency rising over rolling 7-day windows, CTR sustained well below that creative's own best rolling week for two consecutive weeks, and CPA drifting up while delivery stays stable. One signal alone is a hint; all three moving together is close to proof. Only evaluate creatives above a minimum spend floor, since low-spend flags are noise.",
      },
      {
        q: "What frequency is too high for Facebook ads?",
        a: "Published thresholds contradict each other because the tolerable frequency depends on audience size, placement mix, and product. The diagnostic signal is the trend, not a universal cutoff: a creative whose weekly frequency climbs while its response rates fall is re-serving a saturated audience. Track frequency on rolling windows against each creative's own history rather than enforcing a borrowed number.",
      },
      {
        q: "How often should I refresh ad creative?",
        a: "Refresh on signal, not on calendar. A fixed cadence retires producing winners early and forces production volume for its own sake. Define a written fatigue tripwire, trim budget before killing the ad outright, iterate from proven winners before replacing them with cold concepts, and keep proven challengers ready so spend has somewhere to go when a hero fades.",
      },
      {
        q: "Can a fatigued ad recover?",
        a: "Often, yes. A fatigued winner is usually saturated at its current spend level rather than dead, so cutting its budget share can restore efficiency at lower volume. After a rest period long enough for the audience to churn, proven concepts can frequently be relaunched or re-cut. Keep a record of what won and why; it is the cheapest creative brief you will ever produce.",
      },
    ],
  },
  {
    slug: "reddit-brand-monitoring-for-dtc",
    title: "Reddit brand monitoring for DTC brands (2026 guide)",
    h1: "Reddit is talking about your brand. Start",
    h1Accent: "listening.",
    description:
      "How DTC brands monitor Reddit for brand and competitor mentions, read sentiment honestly, and turn threads into creative angles.",
    type: "guide",
    pillar: "reddit",
    keywords: [
      "reddit brand monitoring",
      "reddit social listening",
      "reddit marketing for brands",
    ],
    priority: 17,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-27",
    dateUpdated: "2026-08-27",
    faq: [
      {
        q: "What is Reddit brand monitoring?",
        a: "Reddit brand monitoring is systematically tracking what Reddit says about your brand, your competitors, and your category's problem language. For DTC brands it matters because buyers deliberately search Reddit for unfiltered opinions before purchasing, and AI assistants draw on Reddit threads when recommending products. The practice covers finding mentions, reading sentiment in context, and turning recurring themes into marketing decisions.",
      },
      {
        q: "Is Reddit monitoring worth it for a small DTC brand?",
        a: "Yes, and arguably more than for large brands, because the manual version is free and the signal is purchase-adjacent. Threads asking whether your product or a competitor's is worth buying are live purchase-research moments, and category complaint threads are a standing list of objections your creative can answer. Fifteen minutes a day with saved searches covers a small brand's footprint.",
      },
      {
        q: "How do I monitor Reddit mentions for free?",
        a: "Combine Reddit's native search sorted by new for brand and competitor names, Google site:reddit.com queries for problem-language phrases, and subscriptions to the handful of subreddits where your category lives. Log what matters in a simple sheet with date, link, sentiment, and a note. The manual method finds mentions fine; its weakness is consistency over months, not capability.",
      },
      {
        q: "Can brands participate on Reddit without getting banned?",
        a: "Yes, with strict discipline: keep at least a 90/10 ratio of genuinely helpful contributions to anything brand-related, disclose your affiliation every single time, mention your product only when directly relevant or asked, never link-drop, and read each subreddit's self-promotion rules before commenting. Communities tolerate disclosed builders who add value and are unforgiving of stealth marketing.",
      },
      {
        q: "How is Reddit different from other social listening channels?",
        a: "Reddit threads are longform, pseudonymous, and searchable for years, so they carry more candid detail than other social platforms and keep influencing buyers long after posting. The same properties raise the stakes: threads about your brand rank in Google and get cited by AI assistants, so a persistent complaint thread works against you continuously. Monitoring is less about fast replies and more about reading patterns and answering them in your product and creative.",
      },
    ],
  },
  {
    slug: "ctv-pacing-reporting",
    title: "CTV pacing and reporting for agencies (2026)",
    h1: "CTV flights need pacing",
    h1Accent: "discipline.",
    description:
      "How to pace and report CTV campaigns run through Amazon DSP: flight math, frequency, supplier breakdowns, and client-ready reporting.",
    type: "guide",
    pillar: "dsp",
    keywords: ["ctv pacing", "ctv campaign reporting", "ctv reporting for agencies"],
    priority: 18,
    byline: "peachblue",
    status: "planned",
    faq: [],
  },
  {
    slug: "peachblue-vs-motion",
    title: "Peachblue vs Motion (2026): an honest comparison",
    h1: "Peachblue vs Motion, from the founder of",
    h1Accent: "one of them.",
    description:
      "A transparent comparison of Peachblue and Motion: pricing, platforms, AI depth, and exactly who should pick which. Yes, we make one of them.",
    type: "vs",
    pillar: "comparisons",
    keywords: ["peachblue vs motion", "motion alternative"],
    competitors: ["Motion", "Peachblue"],
    priority: 19,
    byline: "nick",
    status: "planned",
    faq: [],
  },
  {
    slug: "peachblue-vs-atria",
    title: "Peachblue vs Atria (2026): an honest comparison",
    h1: "Peachblue vs Atria, from the founder of",
    h1Accent: "one of them.",
    description:
      "A transparent comparison of Peachblue and Atria: pricing, platform coverage, AI agents, and exactly who should pick which.",
    type: "vs",
    pillar: "comparisons",
    keywords: ["peachblue vs atria", "atria alternative"],
    competitors: ["Atria", "Peachblue"],
    priority: 20,
    byline: "nick",
    status: "planned",
    faq: [],
  },
  // Creative economics pillar (Pillar C2 in the strategy doc).
  {
    slug: "creative-economics",
    title: "Creative economics: the scaling math of paid social (2026)",
    h1: "The scaling math nobody puts in the",
    h1Accent: "media plan.",
    description:
      "Platform automation took targeting away from buyers, so creative supply is the last scaling lever. The four metrics that gate growth: hit rate, kill speed, winner longevity, and bench depth.",
    type: "essay",
    pillar: "creative",
    keywords: [
      "creative economics",
      "creative testing budget",
      "scaling facebook ads creative",
      "creative supply",
    ],
    priority: 21,
    byline: "nick",
    status: "published",
    datePublished: "2026-08-17",
    dateUpdated: "2026-08-17",
    faq: [
      {
        q: "What is creative economics?",
        a: "Creative economics is running your ad creative pipeline on operating metrics instead of instinct: how many creatives you launch, what share become winners, what losers cost before they are cut, how long winners last, and how many proven challengers stand behind them. It treats creative as the supply chain that gates paid social growth, because with targeting and bidding automated, creative is the input buyers still control.",
      },
      {
        q: "Why is creative called the last scaling lever?",
        a: "Platform automation has absorbed audience selection, bidding, and placement on Meta, TikTok, and Google, so every advertiser in the auction runs roughly the same delivery machinery. The remaining inputs a buyer controls are budget and creative, and creative now also does the targeting job, since platforms find audiences based on who engages with each ad. When an account stalls, the binding constraint is usually the supply of creative that can absorb more spend efficiently.",
      },
      {
        q: "What are the four creative supply metrics?",
        a: "Creative hit rate (winners divided by creatives launched) measures production efficiency. Kill speed measures the spend a losing creative absorbs before the verdict. Winner longevity measures how many productive days or dollars a winner delivers before fatigue. Bench depth counts proven challengers ready to absorb spend when a hero fades. Together they describe whether winner supply keeps up with spend growth.",
      },
      {
        q: "Do these metrics apply to Amazon DSP and CTV?",
        a: "Mostly not. Hit rate and kill speed assume paid social testing volume: many creatives launched, fast verdicts, continuous replacement. DSP and CTV buying runs on delivery economics, meaning flights, budgets, pacing, and CPM goals, with few produced creatives and long flight commitments. That world needs pacing discipline rather than hit rate math.",
      },
      {
        q: "How do I start measuring creative economics?",
        a: "Run a monthly cohort review with five numbers: creatives launched, hit rate, average spend per killed creative, the age of your top spend-carrying winners, and the bench count. All of it is computable from ad-level platform exports in a spreadsheet. Write down your winner criteria first so the numbers stay comparable month to month, and baseline against your own trailing 90 days rather than published benchmarks.",
      },
    ],
    rawMaterial: [
      "Pillar C2 spec + five-beat structure in ~/Documents/peachblue strategy/blog-content-strategy.md",
      "The creative waste diagnostic at /tools/creative-waste (link it; hit-rate piece embeds it)",
      "Scarcity insight: value of a hit-rate point is largest when hit rate is low",
      "Hub for spokes: creative-hit-rate, kill speed (future), bench depth (future), creative-fatigue, creative-testing-framework",
    ],
    related: ["creative-hit-rate", "amazon-dsp-pacing-guide"],
  },
  {
    slug: "creative-hit-rate",
    title: "Creative hit rate: what it is, how to measure it, how to raise it",
    h1: "Your hit rate is the ceiling on your",
    h1Accent: "growth.",
    description:
      "Creative hit rate is the share of new creatives that become scalable winners. How to measure yours in a spreadsheet today, why it breaks at scale, and the two levers that raise it.",
    type: "guide",
    pillar: "creative",
    keywords: [
      "creative hit rate",
      "ad creative win rate",
      "creative testing success rate",
      "how many ad creatives to test",
    ],
    priority: 22,
    byline: "nick",
    status: "published",
    datePublished: "2026-08-17",
    dateUpdated: "2026-08-17",
    faq: [
      {
        q: "What is a good creative hit rate?",
        a: "There is no trustworthy published benchmark; the numbers in ranked articles contradict each other, which suggests nobody is working from representative data. Most high-volume teams sit somewhere between 10 and 30 percent, depending on how strict their winner definition is and how many iterations they count. The practical move is to measure your own trailing 90 days and improve against that baseline instead of chasing an industry number.",
      },
      {
        q: "What counts as a winning creative?",
        a: "A winner is a creative that graduated out of testing and then absorbed meaningful spend at or above your target efficiency. A workable concrete rule: it went on to absorb at least five times its test spend while holding your target CPA or ROAS. The exact thresholds matter less than writing the rule down and applying it identically to every creative in the cohort.",
      },
      {
        q: "Do iterations count as new creatives?",
        a: "Either convention works, but pick one and keep it. Counting iterations gives you a blended production number; excluding them isolates your ability to find new concepts. Iterations win more often than new concepts, so a cohort heavy on them posts a flattering hit rate while the concept portfolio quietly narrows. Note the convention next to the metric so the trend stays comparable.",
      },
      {
        q: "How many creatives should I test per month?",
        a: "Derive it from your own numbers rather than an industry figure: decide the test budget each creative gets, decide what share of monthly spend goes to testing, and the launch count falls out. Working backward also works: the winners you need per month divided by your measured hit rate gives the required launch volume. Both calculations need your own hit rate baseline first.",
      },
      {
        q: "Why is a low hit rate worth more per point of improvement?",
        a: "Because winners are scarcest exactly when each one matters most. Moving from 10 to 20 percent doubles your winner supply; moving from 40 to 50 percent adds a quarter. The lower your starting point, the larger the share of your future winner supply each point represents, and the more fatigued spend those fresh winners can take over.",
      },
    ],
    rawMaterial: [
      "Five-beat structure per Pillar C2: define w/ formula, teach manual measurement, why it breaks at scale, tool-agnostic levers, Peachblue as instrumented version",
      "EMBED the CreativeWasteDiagnostic component (components/tools/CreativeWasteDiagnostic.tsx) mid-post",
      "Benchmark honesty per truth/proof.md: published hit-rate numbers contradict each other; teach measuring your own baseline",
      "Scarcity math from the diagnostic: refreshShare = 0.1/(h+0.1); lower hit rate = each point worth more",
      "Link hub (creative-economics), /tools/creative-waste, /docs/scoring",
    ],
    related: ["creative-economics", "claude-for-media-buyers"],
  },
  {
    slug: "what-is-roas",
    title: "ROAS: what it is, how to calculate it, and ROAS vs ACoS",
    h1: "ROAS, calculated",
    h1Accent: "honestly.",
    description:
      "How to calculate return on ad spend, how ROAS relates to ACoS and CPA, and why chasing a published 'good ROAS' number leads teams astray.",
    type: "glossary",
    pillar: "creative",
    keywords: [
      "what is roas",
      "how to calculate roas",
      "roas vs acos",
      "good roas",
    ],
    priority: 12,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-21",
    dateUpdated: "2026-08-21",
    faq: [
      {
        q: "What is ROAS?",
        a: "ROAS (return on ad spend) is revenue attributed to advertising divided by the ad spend that produced it, expressed as a ratio or multiple. A 4:1 ROAS means four dollars of attributed revenue for every dollar spent. It measures advertising efficiency at whatever level you calculate it: account, campaign, or individual creative.",
      },
      {
        q: "How do you calculate ROAS?",
        a: "Divide attributed revenue by ad spend over the same window and the same scope. The two mistakes that break the calculation are mismatched windows (revenue counted over a longer period than the spend that drove it) and mismatched scope (platform-attributed revenue divided by total marketing spend). Keep both sides of the division describing the same thing.",
      },
      {
        q: "What is a good ROAS?",
        a: "There is no universal answer, because the ROAS you need is set by your margin, not by an industry table. A business with 70 percent gross margin breaks even on ads at roughly 1.4:1, while one at 25 percent margin needs about 4:1 for the same result. Calculate your own breakeven first, then treat any published benchmark as trivia.",
      },
      {
        q: "What is the difference between ROAS and ACoS?",
        a: "They are mathematical inverses. ACoS (advertising cost of sale, the standard Amazon term) is ad spend divided by attributed revenue, expressed as a percentage, while ROAS is revenue divided by spend. A 25 percent ACoS is the same efficiency as a 4:1 ROAS. Lower is better for ACoS; higher is better for ROAS.",
      },
      {
        q: "Should I optimize for ROAS or CPA?",
        a: "ROAS is the better target when order values vary meaningfully, since it accounts for the size of each purchase rather than just the count. CPA is more practical when order values are consistent or when you are optimizing for a non-revenue event such as a lead or install. Many teams track both and let ROAS govern budget allocation while CPA governs creative-level pass or fail decisions.",
      },
    ],
    related: ["creative-roas", "creative-economics"],
  },
  {
    slug: "creative-roas",
    title: "Creative-level ROAS: why your account average lies",
    h1: "Your account ROAS is hiding",
    h1Accent: "the truth.",
    description:
      "Blended account ROAS averages your heroes and your losers into one number. How to measure ROAS per creative, and what the spread tells you.",
    type: "guide",
    pillar: "creative",
    keywords: [
      "creative level roas",
      "roas by creative",
      "which creatives drive roas",
      "blended roas",
    ],
    priority: 13,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-21",
    dateUpdated: "2026-08-21",
    faq: [
      {
        q: "What is creative-level ROAS?",
        a: "Creative-level ROAS is return on ad spend calculated per creative asset rather than per account, campaign, or ad. It requires grouping every ad that runs the same underlying asset into one unit, then dividing that asset's attributed revenue by its spend. It answers which creatives actually earn the account's efficiency, rather than what the account averages to.",
      },
      {
        q: "Why does blended account ROAS mislead?",
        a: "An average weights by spend, so a small number of heroes carrying most of the budget can hold the account number up while the majority of creatives underperform. A healthy-looking 4:1 account ROAS is frequently one creative at 7:1 subsidizing a long tail below breakeven. The account number tells you the portfolio outcome; it cannot tell you which inputs produced it.",
      },
      {
        q: "How do I calculate ROAS per creative?",
        a: "Export ad-level performance with spend and attributed revenue, group ads by the underlying creative asset rather than by ad ID, sum spend and revenue within each group, then divide. The grouping step is the real work, because the same video typically runs across several ads, ad sets, and sometimes platforms. Set a minimum spend floor before reading any individual creative's ratio.",
      },
      {
        q: "What does the spread between creatives tell you?",
        a: "A wide spread means your account outcome depends on a few assets, which is concentration risk: when a hero fatigues, the account average falls with it. A narrow spread at acceptable efficiency means the portfolio is genuinely healthy and scaling is a budget decision rather than a creative one. Tracking the spread over time is more informative than tracking the average.",
      },
      {
        q: "How much spend does a creative need before its ROAS is readable?",
        a: "Enough conversions for the ratio to stabilize, which is a function of conversion count rather than spend alone. A creative with two purchases has a ROAS number that will move dramatically with the third. Set a floor in conversions rather than dollars where you can, and treat everything below it as undecided rather than as a loser.",
      },
    ],
    related: ["what-is-roas", "creative-hit-rate", "creative-economics"],
  },
  {
    slug: "ai-generated-ads",
    title: "AI generated ads: the cost that did not fall",
    h1: "AI made creative cheap. Testing it",
    h1Accent: "did not.",
    description:
      "AI generation collapsed the cost of making ads and left the cost of finding out which ones work untouched. The arithmetic, and what it means for testing.",
    type: "guide",
    pillar: "creative",
    keywords: [
      "ai generated ads",
      "do ai generated ads work",
      "ai ugc ads",
      "testing ai creative",
      "ai ad creative tools",
    ],
    priority: 11,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-22",
    dateUpdated: "2026-08-22",
    faq: [
      {
        q: "Do AI generated ads actually work?",
        a: "Some do, at roughly the rate any other creative does. AI generation changes how quickly and cheaply a creative gets made; it does not change whether an audience responds to it. The practical consequence is that the share of your launches that become winners matters more than where the asset came from, so measure AI creative in the same cohort and against the same winner rule as everything else.",
      },
      {
        q: "How much does it cost to generate an AI ad?",
        a: "Low single-digit to low double-digit dollars per asset at 2026 pricing. Arcads runs roughly $11 per generated video with no free trial, Creatify sells tiers from free through $99 per month, and Higgsfield starts at $9 per month (pricing verified August 2026). Against traditional production costs, that is a collapse of one to three orders of magnitude.",
      },
      {
        q: "If generation is cheap, why is creative still expensive?",
        a: "Because generation was never the expensive half. The media spend required to reach a verdict on a creative is set by how many conversions you need for a readable signal, and AI did not change that number. At any realistic volume, test spend dominates the generation bill by a wide margin, so the total cost of creative barely moved even as the cost of making it collapsed.",
      },
      {
        q: "Should I test every AI generated creative?",
        a: "No, and this is the main discipline the cheap-generation era demands. Test spend is now the scarce input, so every asset that enters testing consumes budget that a different asset cannot use. Raising the bar for what earns a test slot matters more when supply is unlimited than it did when production volume capped it for you.",
      },
      {
        q: "Which AI ad generation tool is best?",
        a: "They differ by job rather than by rank. Avatar and UGC-style volume tools such as Creatify and Arcads suit high-variation direct response, while Runway Gen-4 targets cinematic hero creative, and Higgsfield covers URL-to-ad and commercial formats. The choice matters far less to your results than your selection discipline does, because every one of them can produce more creatives than your test budget can judge.",
      },
    ],
    rawMaterial: [
      "truth/proof.md: AI ad generation tools section (verified Aug 2026); test spend is a plug-your-own-number assumption, never a benchmark",
      "NEVER write the tool listicle: that SERP is saturated. The economics argument is the unclaimed angle.",
      "COMPETITIVE: Higgsfield is building create+launch+optimize. Never position Peachblue as an add-on to a generation tool.",
      "Product bridge is the Next Creative Brief's generation-ready prompt block (winners become the prompt), not an integration. No integration exists.",
      "BYLINE UPGRADEABLE: written brand-byline because the authority is arithmetic. Nick uses Higgsfield for plubo motion work and can flip this to his byline by adding the hands-on section flagged in the draft.",
    ],
    related: ["creative-hit-rate", "creative-economics", "creative-roas"],
  },
  {
    slug: "amazon-dsp-chatgpt",
    title: "Connect Amazon DSP to ChatGPT (2026): every real route",
    h1: "Amazon DSP to ChatGPT: what you",
    h1Accent: "actually get.",
    description:
      "The real routes to Amazon DSP data in ChatGPT in 2026, what each costs, what raw report rows cannot tell you, and the analysis-layer alternative.",
    type: "guide",
    pillar: "ai",
    keywords: [
      "connect amazon dsp to chatgpt",
      "amazon dsp chatgpt",
      "analyze amazon dsp with ai",
      "amazon dsp mcp",
      "amazon ads mcp chatgpt",
    ],
    competitors: ["Supermetrics", "Windsor.ai", "Improvado"],
    priority: 10,
    byline: "peachblue",
    status: "published",
    datePublished: "2026-08-24",
    dateUpdated: "2026-08-24",
    faq: [
      {
        q: "Can I connect Amazon DSP to ChatGPT?",
        a: "Yes, through ChatGPT's Developer Mode, which accepts custom remote MCP servers on paid plans. The free, official route is Amazon's own Ads MCP server, in open beta since February 2026. Third-party connector pipes also market this integration, but check the fine print: at least one major connector's own documentation restricts Amazon DSP data to Excel, warehouse, and API destinations.",
      },
      {
        q: "Does Amazon have an official MCP server?",
        a: "Yes. The Amazon Ads MCP server has been in open beta since February 2, 2026, and connects Amazon Ads data to AI assistants including ChatGPT and Claude. It is free and official, covers only Amazon's platform, and returns raw account and report data; practitioner writeups note real visibility gaps in what it exposes.",
      },
      {
        q: "What do I need on the ChatGPT side?",
        a: "A paid ChatGPT plan (Plus, Pro, Business, or Enterprise) with Developer Mode enabled, which is where custom MCP connectors are added. The server must be remote: a public HTTPS endpoint speaking Streamable HTTP or SSE, with OAuth or open auth. On Business and Enterprise plans a workspace admin can disable Developer Mode or allowlist specific connectors.",
      },
      {
        q: "What can raw DSP rows in a chat not tell you?",
        a: "Anything that requires computation or identity the rows do not carry. Raw report rows have no creative identity (the same asset in six line items looks like six creatives), no flight pacing math, and no cross-platform view, and Amazon DSP reporting is 14-day attribution only with roughly 60 days of retention. An AI reading raw rows must do arithmetic in the chat, which is where wrong numbers come from.",
      },
      {
        q: "Does Peachblue work with ChatGPT?",
        a: "Peachblue's MCP server speaks the open MCP standard over Streamable HTTP and SSE with OAuth sign-in, the same transports ChatGPT's Developer Mode accepts, so any client that supports remote MCP connectors can connect. Our setup documentation covers Claude Desktop and Claude Code, which is where we focus and what we test against.",
      },
    ],
    rawMaterial: [
      "truth/competitors.md: AI data connectors section (verified 2026-08-24) incl. the Supermetrics DSP-destination restriction, publishable as facts side by side",
      "truth/proof.md: Amazon Ads MCP open beta Feb 2026, visibility gaps; DSP 14d attribution, ~60d retention",
      "Naming rule amended 2026-08-24: ChatGPT may be named; Peachblue-in-ChatGPT UNVERIFIED, no setup steps or works-with claims until Nick's Developer Mode test; open-standard phrasing only",
      "UPGRADE PATH: when Nick verifies the ChatGPT connection, add a Connect Peachblue to ChatGPT section with real steps and flip the FAQ answer to verified",
    ],
    related: ["claude-for-media-buyers", "amazon-dsp-reporting-guide", "amazon-dsp-pacing-guide"],
  },
];
