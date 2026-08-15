/**
 * Integration landing pages — commercial-intent SEO pages (/integrations/*).
 * Docs answer "how do I set this up"; these answer "should I buy this".
 * Target queries live in `keywords`. Facts must match the blog truth layer
 * (content/blog/truth/product.md) and the docs.
 */

export interface IntegrationFaq {
  q: string;
  a: string;
}

export interface IntegrationPage {
  slug: string;
  /** SEO title targeting the commercial query. */
  title: string;
  eyebrow: string;
  h1: string;
  h1Accent: string;
  description: string;
  keywords: string[];
  /** Plan requirement, stated honestly. */
  planNote: string;
  features: { title: string; body: string }[];
  steps: string[];
  docsSlug: string;
  relatedBlog: { label: string; href: string }[];
  faq: IntegrationFaq[];
  /** Adds the agency demo link to the CTA. */
  agency?: boolean;
  updated: string;
}

export const INTEGRATION_PAGES: IntegrationPage[] = [
  {
    slug: "amazon-dsp",
    title: "Amazon DSP reporting and creative analytics tool",
    eyebrow: "Integration · Amazon DSP",
    h1: "The Amazon DSP reporting tool built for",
    h1Accent: "agencies.",
    description:
      "Creative-level Amazon DSP reporting, flight pacing, and client-ready reports with agency margin. AI analysis of your DSP creatives alongside Meta, TikTok, and Google.",
    keywords: [
      "amazon dsp reporting tool",
      "amazon dsp reporting software",
      "amazon dsp pacing tool",
      "amazon dsp creative analytics",
      "dsp client reporting",
    ],
    planNote:
      "Amazon DSP sync is included on Scale plans and up; Reports and Pacing on Power and up. Agency workspaces add per-client scoping and margin.",
    features: [
      {
        title: "Creative-level DSP performance",
        body: "Spend, impressions, viewability, video metrics, purchases, and new-to-brand per creative per day, not just order totals. The console shows delivery; Peachblue shows which creatives earn it.",
      },
      {
        title: "Flight pacing across every order",
        body: "One table for every active flight: budget, spend to date, expected spend, pace percent, and blended CPM against an editable CPM goal. Underdelivery surfaces on day 3, not day 28.",
      },
      {
        title: "Client reports with agency margin",
        body: "Date-range reports with PDF and CSV export, supplier breakdowns, and per-client margin applied server-side to spend and every spend-derived metric. Budgets stay raw so pacing math stays honest.",
      },
      {
        title: "AI analysis of DSP creatives",
        body: "Your DSP display and video creatives get the same 31-dimension AI analysis as your social ads, with a written read on what is working and creative grouping across platforms.",
      },
      {
        title: "Multi-client agency mode",
        body: "A client switcher scopes the entire app to one DSP advertiser at a time: performance, library, reports, and the AI agent. Built for rosters, not single seats.",
      },
      {
        title: "Ask your DSP data anything",
        body: "Agent Peach answers plain-language questions over your DSP data, and the MCP server puts the same tools inside Claude.",
      },
    ],
    steps: [
      "Connect with your Amazon Ads sign-in and pick the advertising profile to sync.",
      "Peachblue backfills the report history Amazon retains (about 60 days) and syncs daily from then on.",
      "Pacing, reports, and creative analysis populate automatically. Set CPM goals and margin per client.",
    ],
    docsSlug: "connect-amazon-dsp",
    relatedBlog: [
      { label: "Amazon DSP pacing: the complete guide", href: "/blog/amazon-dsp-pacing-guide" },
      { label: "Put your ad data in Claude", href: "/blog/claude-for-media-buyers" },
    ],
    faq: [
      {
        q: "What does Peachblue report from Amazon DSP?",
        a: "Daily creative-level performance including spend, impressions, clicks, viewability, video metrics, purchases, detail page views, add-to-carts, and new-to-brand metrics, plus orders and line items with budgets and flight dates. Amazon DSP reports on a 14-day attribution window, and Peachblue labels metrics accordingly.",
      },
      {
        q: "Does Peachblue handle DSP pacing?",
        a: "Yes. Every order gets flight math computed automatically: expected spend versus actual, pace percent with under and over delivery flags, blended CPM, and per-order CPM goals. Agencies get a portfolio view across every client's active flights.",
      },
      {
        q: "Can I apply my agency margin to client reports?",
        a: "Yes. Set a margin percentage per client and every client-facing report marks up spend and spend-derived metrics server-side. Budgets stay unmarked so delivery math remains honest, and the all-clients view never applies margin.",
      },
      {
        q: "Which Peachblue plan includes Amazon DSP?",
        a: "DSP sync starts on the Scale plan at $499 per month. Reports and pacing are on Power at $799, and multi-client agency workspaces with per-client margin are on the Agency plan at $1,499.",
      },
      {
        q: "Does this replace the Amazon DSP console?",
        a: "No, and it does not try to. Peachblue is read-only: it reports, paces, and analyzes, while campaign management stays in the console. What it replaces is the export-and-spreadsheet reporting workflow around the console.",
      },
    ],
    agency: true,
    updated: "2026-08-14",
  },
  {
    slug: "google-ads",
    title: "Google Ads creative analytics and RSA reporting tool",
    eyebrow: "Integration · Google Ads",
    h1: "See which Google Ads creatives actually",
    h1Accent: "work.",
    description:
      "Creative analytics for Google Ads Search, Display, and Video, with per-asset RSA analysis: which headlines win, which lose, and AI-suggested replacements.",
    keywords: [
      "google ads creative analytics",
      "rsa headline analysis",
      "google ads reporting tool",
      "responsive search ad analysis",
    ],
    planNote: "Google Ads sync is included on Pro plans and up.",
    features: [
      {
        title: "Per-asset RSA analysis",
        body: "Every headline and description variant with its own performance, so you know which specific lines win inside each responsive search ad, not just which ad won.",
      },
      {
        title: "Search, Display, and Video",
        body: "The campaign types with analyzable creative, in one model alongside your Meta, TikTok, and Amazon DSP data.",
      },
      {
        title: "AI copy analysis and suggestions",
        body: "Text ads get strategic tagging, a written analysis grounded in which of your variants actually performed, and suggested new headlines built from your winning patterns.",
      },
      {
        title: "Cross-platform truth",
        body: "Composite scoring ranks Google creatives against your whole account, and within Google, so a strong Search ad is visible even when social dominates spend.",
      },
    ],
    steps: [
      "Connect with the Google account that has access to your customer accounts.",
      "Pick the accounts to sync; Peachblue backfills recent history and syncs daily.",
      "RSA variants, scores, and AI analysis populate automatically.",
    ],
    docsSlug: "connect-google-ads",
    relatedBlog: [
      { label: "Put your ad data in Claude", href: "/blog/claude-for-media-buyers" },
      { label: "Motion alternatives (no Google coverage there)", href: "/blog/motion-alternatives" },
    ],
    faq: [
      {
        q: "Does Peachblue support Performance Max?",
        a: "Not yet. Performance Max uses a different asset structure in Google's API and is on the roadmap. Search, Display, and Video campaigns are fully supported; Shopping and App campaigns are excluded because they carry no analyzable creative.",
      },
      {
        q: "What does per-asset RSA analysis mean?",
        a: "Google serves responsive search ads by mixing your headlines and descriptions. Peachblue syncs performance per individual asset, so you see which specific headlines and descriptions earn impressions and clicks, and the AI writes suggestions based on your actual winners.",
      },
      {
        q: "Which plan includes Google Ads?",
        a: "Pro at $199 per month and every plan above it. Meta and TikTok are included from the Starter plan at $79.",
      },
    ],
    updated: "2026-08-14",
  },
  {
    slug: "meta",
    title: "Meta ads creative analysis tool (Facebook and Instagram)",
    eyebrow: "Integration · Meta",
    h1: "Know why your Meta creatives win or",
    h1Accent: "lose.",
    description:
      "AI creative analysis for Facebook and Instagram ads: 31 tagged dimensions, composite scoring, demographics, copy variants, and pattern detection across your account.",
    keywords: [
      "facebook ad creative analysis",
      "meta ads creative analytics",
      "facebook ad analysis tool",
      "instagram ad analytics",
    ],
    planNote: "Meta sync is included on every plan, from Starter at $79.",
    features: [
      {
        title: "31-dimension creative analysis",
        body: "Every creative tagged for hook style, emotional tone, format, CTA type, and more, with a written expert analysis and copy suggestions per creative.",
      },
      {
        title: "Composite scoring and tiers",
        body: "Every ad ranked from Top Performer to Underperformer on a blend of CTR, ROAS, CPA, and spend percentiles, with guardrails against low-data flukes.",
      },
      {
        title: "The same creative, recognized everywhere",
        body: "Perceptual fingerprinting groups a creative across every ad and campaign that ran it, even after crops and re-exports, so performance aggregates to the creative level where decisions live.",
      },
      {
        title: "Demographics and placements",
        body: "Age and gender heatmaps and placement breakdowns per ad, plus headline and body variant performance.",
      },
      {
        title: "Patterns, not just scores",
        body: "Intelligence clusters your creatives into archetypes and finds the dimensions that correlate with performance in your account, so the next brief writes itself from your own data.",
      },
      {
        title: "Reddit brand context",
        body: "Brand Intel tracks what Reddit says about your brand and competitors, turning real customer language into creative angles.",
      },
    ],
    steps: [
      "Connect with Facebook sign-in and approve read-only ads access.",
      "Pick your ad accounts; Peachblue backfills history and mirrors your creatives.",
      "Analysis, scores, and patterns populate automatically, refreshed by daily syncs.",
    ],
    docsSlug: "connect-meta",
    relatedBlog: [
      { label: "MagicBrief alternatives", href: "/blog/magicbrief-alternatives" },
      { label: "Motion alternatives", href: "/blog/motion-alternatives" },
    ],
    faq: [
      {
        q: "Does Peachblue manage or edit my Meta campaigns?",
        a: "No. Access is read-only by design: Peachblue reads performance data and creative content, and never creates, edits, or pauses anything. It is an intelligence layer, not an ads manager.",
      },
      {
        q: "How is this different from Ads Manager reporting?",
        a: "Ads Manager tells you what happened per ad. Peachblue groups performance to the creative level across every ad that ran it, explains why creatives perform through 31 tagged dimensions and written analysis, and detects the patterns behind your winners.",
      },
      {
        q: "Which plan do I need for Meta?",
        a: "Every plan includes Meta and TikTok, starting with Starter at $79 per month with a 7-day trial.",
      },
    ],
    updated: "2026-08-14",
  },
  {
    slug: "tiktok",
    title: "TikTok ads creative analytics tool",
    eyebrow: "Integration · TikTok",
    h1: "TikTok creative performance,",
    h1Accent: "decoded.",
    description:
      "AI creative analysis for TikTok ads: hook and format tagging, frame-aware video analysis, composite scoring, and cross-platform comparison with your Meta ads.",
    keywords: [
      "tiktok ads analytics",
      "tiktok creative analysis",
      "tiktok ad performance tool",
    ],
    planNote: "TikTok sync is included on every plan, from Starter at $79.",
    features: [
      {
        title: "Video-first analysis",
        body: "TikTok creatives are analyzed frame-wise across the timeline, so hooks, pacing, and scene content are part of the read, not just the cover frame.",
      },
      {
        title: "31 tagged dimensions",
        body: "Hook style, emotional tone, format, CTA and more per creative, with written analysis and copy suggestions.",
      },
      {
        title: "Cross-platform creative truth",
        body: "The same creative running on TikTok and Meta is recognized as one creative, with performance compared side by side and scored within each platform.",
      },
      {
        title: "Patterns across your account",
        body: "Archetype clustering and dimension-level lift detection tell you what your winning TikTok creatives share, so testing gets a direction.",
      },
    ],
    steps: [
      "Connect with TikTok for Business sign-in.",
      "Select your advertiser accounts; history backfills and creatives mirror automatically.",
      "Scores, tags, and patterns populate, refreshed daily.",
    ],
    docsSlug: "connect-tiktok",
    relatedBlog: [
      { label: "MagicBrief alternatives", href: "/blog/magicbrief-alternatives" },
      { label: "Put your ad data in Claude", href: "/blog/claude-for-media-buyers" },
    ],
    faq: [
      {
        q: "Does Peachblue analyze TikTok videos or just their metrics?",
        a: "Both. Videos are analyzed frame-wise across the timeline for hooks, pacing, and content, tagged across 31 dimensions, and combined with performance data so the analysis explains results rather than describing footage.",
      },
      {
        q: "Can I compare TikTok and Meta creative performance?",
        a: "Yes. TikTok data lands in the same model as Meta, Google Ads, and Amazon DSP, creatives are grouped across platforms, and scoring works both account-wide and within each platform.",
      },
      {
        q: "Which plan do I need for TikTok?",
        a: "Every plan includes TikTok and Meta, starting with Starter at $79 per month with a 7-day trial.",
      },
    ],
    updated: "2026-08-14",
  },
];
