import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FaqBlock } from "@/components/blog/FaqBlock";
import { TrialCta } from "@/components/blog/TrialCta";
import { CreativeWasteDiagnostic } from "@/components/tools/CreativeWasteDiagnostic";
import { SITE_URL } from "@/lib/site";

const FAQ = [
  {
    q: "What is creative waste?",
    a: "The share of your testing budget spent on creatives that never become winners. It is not avoidable in full, since testing is how winners are found, but it shrinks when your verdicts come faster and your new creatives are built from patterns that already win in your account.",
  },
  {
    q: "What is a good creative hit rate?",
    a: "Published benchmarks disagree wildly, which is a sign nobody has representative data. Most high-volume teams sit somewhere between 10 and 30 percent. The practical move is to measure your own baseline over the last 90 days and improve against it rather than chasing an industry number.",
  },
  {
    q: "Is spend on losing creatives really waste?",
    a: "Not entirely. Testing spend is the cost of finding winners, and a team that never funds losers is not testing enough. The waste is the inefficiency above the minimum: verdicts that take longer than the data requires, and new creatives that ignore what your winners already prove.",
  },
  {
    q: "How do I raise my hit rate?",
    a: "Two levers move it most: build new creatives from the patterns your own winners share (hook style, format, tone) instead of guessing, and call verdicts consistently so losers stop absorbing budget past the point of information. Both require creative-level measurement across every ad a creative runs in.",
  },
  {
    q: "How is the value of a higher hit rate calculated?",
    a: "Two parts. Revenue: extra winners from the same launches, each assumed to scale to roughly ten times its test spend, earning your winner ROAS with a 30 percent advantage over the fatigued spend it replaces. Savings: the testing budget no longer burned on losers. Both assumptions are stated openly so you can judge them against your account.",
  },
];

export const metadata: Metadata = {
  title: "Creative waste diagnostic: what losing ads cost you",
  description:
    "Free diagnostic for high-volume creative testers: how much budget goes to losing creatives, your cost per winning creative, and what raising your hit rate is worth.",
  alternates: { canonical: "/tools/creative-waste" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/tools/creative-waste`,
    title: "Creative waste diagnostic: what losing ads cost you",
    description:
      "How much of your budget goes to losing creatives, your cost per winning creative, and what raising your hit rate is worth.",
  },
};

export default function CreativeWastePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/tools/creative-waste#page`,
        name: "Creative waste diagnostic",
        description:
          "Interactive diagnostic: budget going to losing creatives, cost per winning creative, and the value of a higher hit rate.",
        url: `${SITE_URL}/tools/creative-waste`,
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Peachblue", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Creative waste diagnostic",
            item: `${SITE_URL}/tools/creative-waste`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/tools/creative-waste#faq`,
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-[860px] mx-auto">
          <header className="mb-10 text-center">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-peach-600 mb-3">
              Free tool · For high-volume testers
            </div>
            <h1 className="font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4">
              What are losing creatives <span className="italic">costing you?</span>
            </h1>
            <p className="text-[15.5px] text-pb-fg-muted leading-relaxed max-w-[620px] mx-auto">
              If you launch new creative every day, most of it will lose. That is
              how testing works. This diagnostic shows what the losers cost, what
              each winner really costs to find, and what a better hit rate is
              worth in your numbers.
            </p>
          </header>

          <CreativeWasteDiagnostic />

          <section className="mt-12 max-w-[680px] mx-auto" aria-labelledby="method-heading">
            <h2
              id="method-heading"
              className="font-display text-[24px] font-medium tracking-[-0.015em] text-pb-fg mb-4"
            >
              The math, in the open
            </h2>
            <div className="prose-pb-lg">
              <p>
                Every input is an independent lever; nothing moves unless you
                move it. Waste is launches times one minus your hit rate times
                the test spend each creative gets: launch more creatives and
                waste rises linearly, test bigger per creative and it rises
                too. Your testing budget is launches times test spend, shown
                live under the sliders as a share of total spend, so the
                accounting is always visible. Cost per winning creative is
                test spend divided by hit rate, because every winner carries
                the test spend of the losers it took to find it.
              </p>
              <p>
                The hit-rate value is revenue-framed, with the assumptions in
                the open: ten more points of hit rate means more winners from
                the same launches, each winner goes on to absorb scaled spend
                of roughly ten times its test budget, and that spend earns
                your winner ROAS against the fatigued spend it replaces, which
                we credit at a 30 percent ROAS advantage. Add the testing
                budget you no longer burn on losers and you get the headline
                figure. The assumptions are deliberately simple: even test
                budgets, a binary verdict, and a flat fatigue delta. Your
                account is messier than that, which is the point of measuring
                it properly.
              </p>
            </div>
          </section>

          <section className="mt-12 max-w-[680px] mx-auto" aria-labelledby="levers-heading">
            <h2
              id="levers-heading"
              className="font-display text-[24px] font-medium tracking-[-0.015em] text-pb-fg mb-4"
            >
              How you move these numbers
            </h2>
            <div className="prose-pb-lg">
              <ul>
                <li>
                  <strong>Raise hit rate</strong>: build new creatives from the
                  patterns your winners already share. Peachblue tags every
                  creative across 31 dimensions and clusters your account into
                  archetypes, so the next batch inherits what your data proves
                  works.
                </li>
                <li>
                  <strong>Call verdicts faster</strong>: Peachblue&apos;s composite
                  score tiers every creative from Top Performer to
                  Underperformer daily, with guardrails against low-data flukes,
                  so losers stop absorbing budget past the point of information.
                </li>
                <li>
                  <strong>Count winners honestly</strong>: perceptual
                  fingerprinting groups the same creative across every ad and
                  platform it runs in, so hit rate is measured per creative, not
                  per ad placement.
                </li>
              </ul>
              <p>
                The deeper version of this thinking is in{" "}
                <Link href="/blog">the Peachblue blog</Link>, and the product
                behind it starts at $79 on <Link href="/pricing">pricing</Link>.
              </p>
            </div>
          </section>

          <div className="max-w-[680px] mx-auto">
            <FaqBlock faq={FAQ} />
            <TrialCta />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
