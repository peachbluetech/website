import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MonoMark, type PlatformMark } from "@/components/home/Marks";
import { FaqBand, LinkBand, PageHeader, Stack, Steps, TrialBand } from "@/components/site/kit";
import { Block, Cell, Cells, Eyebrow, Frame, Pill, Rule, Side, T, TONE, TextLink, cx } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { INTEGRATION_PAGES, type IntegrationPage as Integration } from "@/content/integrations/manifest";
import { RISK_REVERSAL, SITE_URL, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";
import { PlatformPicture } from "./picture";
import "./integration.css";

/* One page for each connected platform (/integrations/<slug>), built in
   the design system from the inner-page kit. Every word comes from
   content/integrations/manifest.ts; the words, the heading levels, the
   links and the ids are the published ones: restyle freely, do not
   reword.

   Top to bottom:
   1. The header, split as the homepage's hero is: the platform's mark
      and the eyebrow, the h1, the two pills and the risk line on the
      left, the lead on the right. Under it one picture of the product
      for that platform in a taupe panel (picture.tsx).
   2. What it does (a section named "Capabilities" for assistive tech,
      with no heading of its own): each capability a ruled cell, its
      title an h2 as it always was, three across where there are six
      and two across where there are four. Under the cells one line:
      the plan the platform is on.
   3. How it works: the h2 in the narrow column, the three steps on
      dotted separators in the wide one, and the line that points at the
      setup guide.
   4. The questions (their schema is in the JSON-LD), the links to the
      blog, the trial band.

   A server component: every word is in the HTML the server sends. */

export const dynamicParams = false;

export function generateStaticParams() {
  return INTEGRATION_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = INTEGRATION_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: `/integrations/${page.slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/integrations/${page.slug}`,
      title: page.title,
      description: page.description,
    },
    twitter: { card: "summary_large_image", title: page.title, description: page.description },
  };
}

/* The one-colour marks of each platform, as the homepage's platform
   links show them: Meta keeps both of its marks. Decoration: the eyebrow
   beside them names the platform. */
const MARKS: Record<string, PlatformMark[]> = {
  meta: ["facebook", "instagram"],
  tiktok: ["tiktok"],
  "google-ads": ["google"],
  "amazon-dsp": ["amazon"],
};

/* The capabilities in rows of ruled cells: three across where the page
   has a multiple of three, two across otherwise, so no row is ever
   short. */
function rowsOf(features: Integration["features"]) {
  const cols = features.length % 3 === 0 ? 3 : 2;
  const rows: Integration["features"][] = [];
  for (let i = 0; i < features.length; i += cols) rows.push(features.slice(i, i + cols));
  return { cols, marks: cols === 3 ? "thirds" : "halves", rows } as const;
}

export default async function IntegrationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = INTEGRATION_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/integrations/${page.slug}#page`,
        name: page.title,
        description: page.description,
        url: `${SITE_URL}/integrations/${page.slug}`,
        dateModified: page.updated,
        about: { "@id": `${SITE_URL}/#software` },
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
            name: page.title,
            item: `${SITE_URL}/integrations/${page.slug}`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/integrations/${page.slug}#faq`,
        mainEntity: page.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const marks = MARKS[page.slug] ?? [];
  const features = rowsOf(page.features);

  return (
    <SitePage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHeader
        crumb={
          <div className="el-integration-kicker">
            {marks.length > 0 && (
              <span aria-hidden="true" className="el-integration-marks">
                {marks.map((mark) => (
                  <span key={mark} className="el-integration-mark">
                    <MonoMark mark={mark} size={16} />
                  </span>
                ))}
              </span>
            )}
            <Eyebrow>{page.eyebrow}</Eyebrow>
          </div>
        }
        title={
          <>
            {page.h1} {page.h1Accent}
          </>
        }
        lead={page.description}
        actions={
          <>
            <Pill href={TRIAL_HREF}>{TRIAL_LABEL}</Pill>
            <Pill href="/pricing" variant="outline">
              See pricing
            </Pill>
          </>
        }
        note={RISK_REVERSAL}
      >
        <PlatformPicture slug={page.slug} />
      </PageHeader>

      <Frame>
        <Rule marks={features.marks} />

        {/* What it does: ruled cells, then the plan it is on. */}
        <section aria-label="Capabilities">
          {features.rows.map((row, i) => (
            <Fragment key={row[0].title}>
              {i > 0 && <Rule marks={features.marks} />}
              <Cells cols={features.cols}>
                {row.map((f) => (
                  <Cell key={f.title}>
                    <Stack gap={16}>
                      <h2 className={cx(T.subhead, "el-balance")}>{f.title}</h2>
                      <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-integration-body")}>{f.body}</p>
                    </Stack>
                  </Cell>
                ))}
              </Cells>
            </Fragment>
          ))}
          <Rule marks={features.marks} />
          <Block top="gap" bottom="gap">
            <p className={cx(T.bodySm, "el-pretty el-integration-plan")}>{page.planNote}</p>
          </Block>
        </section>

        <Rule />

        {/* How it works */}
        <section aria-labelledby="how-heading">
          <Block top="band" bottom="band">
            <Side>
              <h2 id="how-heading" className={T.titleLg}>
                How it works
              </h2>
              <div>
                <Steps items={page.steps} />
                <p className={cx(T.bodySm, TONE.smoke, "el-pretty el-integration-setup")}>
                  Full setup guide:{" "}
                  <TextLink href={`/docs/${page.docsSlug}`} underline>
                    docs
                  </TextLink>
                  . Read-only access; Peachblue never modifies your campaigns.
                </p>
              </div>
            </Side>
          </Block>
        </section>

        <Rule />

        {/* The questions (visible; their schema is in the JSON-LD above).
            A band that has nothing to show draws no rule of its own. */}
        {page.faq.length > 0 && (
          <>
            <FaqBand faq={page.faq} />
            <Rule />
          </>
        )}

        {page.relatedBlog.length > 0 && (
          <>
            <LinkBand id="related-heading" title="From the blog" links={page.relatedBlog} />
            <Rule />
          </>
        )}

        <TrialBand agency={page.agency} />

        <Rule />
      </Frame>
    </SitePage>
  );
}
