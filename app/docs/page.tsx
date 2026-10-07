import { Fragment } from "react";
import type { Metadata } from "next";
import { EntryRow, PageHeader } from "@/components/site/kit";
import { Block, Dotted, Frame, Rule, Side, T, TONE, cx } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { docsBySection } from "@/lib/docs";
import "./docs.css";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Peachblue documentation: connect Meta, TikTok, Google Ads, and Amazon DSP, understand creative analysis and scoring, and set up reports, pacing, and Brand Intel.",
  alternates: { canonical: "/docs" },
};

/* The docs index, built in the design system from the inner-page kit.

   The page header (the eyebrow, the h1, the lead on the right half),
   then one slim ruled band per section of the manifest, on the side
   layout's two columns (354 and 724 at 1440): the section's h2 at Inter
   24/32 on the left, its pages as rows on dotted separators on the
   right. A row is one link: the page's short name at 16/24 in a 220px
   column, its description at 15/22 in smoke beside it, and the arrow at
   the row's end. Under 1024 the heading stands over its rows; under 768
   a row is the name over the description.

   The anchor text of a row is the name, then the description, as it
   always was. The h2 ids (`section-<name>`) name each section for
   assistive tech. A server component; every word is in the HTML the
   server sends. */
export default function DocsIndexPage() {
  const sections = docsBySection();
  return (
    <SitePage current="docs">
      <PageHeader
        eyebrow="Documentation"
        title="Everything, documented."
        lead="Connect your platforms, understand the analysis, and get the most out of Peachblue. Every page is also available as raw markdown by appending .md to its URL."
      />
      <Frame>
        <Rule />
        {sections.map(({ section, title, pages }) => (
          <Fragment key={section}>
            <section aria-labelledby={`section-${section}`}>
              <Block top="band" bottom="band">
                <Side>
                  <h2 id={`section-${section}`} className={T.titleLg}>
                    {title}
                  </h2>
                  <Dotted as="div" className="el-docs-index-list">
                    {pages.map((p) => (
                      <EntryRow key={p.slug} as="div" href={`/docs/${p.slug}`} lead={<div className={T.body}>{p.navLabel}</div>} tight>
                        <p className={cx(T.bodySm, TONE.smoke, "el-pretty")}>{p.description}</p>
                      </EntryRow>
                    ))}
                  </Dotted>
                </Side>
              </Block>
            </section>
            <Rule />
          </Fragment>
        ))}
      </Frame>
    </SitePage>
  );
}
