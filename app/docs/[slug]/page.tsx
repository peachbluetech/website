import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { Article, Crumb, FaqBand, PageHeader, Prose, TrialBand } from "@/components/site/kit";
import { Block, Frame, Rule } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { DOC_SECTIONS } from "@/content/docs/manifest";
import { assertDocsIntegrity, getDoc, publishedDocs } from "@/lib/docs";
import { SITE_URL } from "@/lib/site";
import "../docs.css";

export const dynamicParams = false;

export function generateStaticParams() {
  assertDocsIntegrity();
  return publishedDocs().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/docs/${doc.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/docs/${doc.slug}`,
      title: doc.title,
      description: doc.description,
      modifiedTime: doc.updated,
    },
    twitter: { card: "summary_large_image", title: doc.title, description: doc.description },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* A doc, built in the design system from the inner-page kit.

   There is no header outside the frame: the frame starts a short step
   under the site nav, so the docs navigation stands at the same place
   on every doc. Inside it, on the side layout's two columns (354 and
   724 at 1440): the docs navigation in the side column, resting under
   the site nav while the doc scrolls (DocsSidebar, which brings its own
   resting box, so the Article is told not to add one; under 1024 it is
   a slim band that scrolls sideways under the first rule), and in the
   wide column the doc's own header (the crumb, the h1, the date and the
   link to the markdown) over its MDX as running text. Then the
   questions band, where the doc has questions, on the same two columns,
   and the trial band.

   The words, the heading levels, the links and the JSON-LD are the
   published ones: restyle freely, do not reword. */
export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  const { default: Body } = await import(`@/content/docs/pages/${slug}.mdx`);
  const faq = doc.faq ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TechArticle",
        "@id": `${SITE_URL}/docs/${doc.slug}#article`,
        headline: doc.title,
        description: doc.description,
        url: `${SITE_URL}/docs/${doc.slug}`,
        dateModified: doc.updated,
        author: { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: `${SITE_URL}/docs/${doc.slug}`,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Peachblue", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Docs", item: `${SITE_URL}/docs` },
          {
            "@type": "ListItem",
            position: 3,
            name: doc.title,
            item: `${SITE_URL}/docs/${doc.slug}`,
          },
        ],
      },
      ...(faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/docs/${doc.slug}#faq`,
              mainEntity: faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <SitePage current="docs">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="el-doc-top" />
      <Frame>
        <Rule />
        <Block top="band" bottom="pad">
          <Article sideAt="start" narrow="stack" sticky={false} side={<DocsSidebar currentSlug={doc.slug} />}>
            <PageHeader
              inline
              layout="stack"
              className="el-doc-head"
              crumb={<Crumb items={[{ label: "Docs", href: "/docs" }, { label: DOC_SECTIONS[doc.section].title }]} />}
              title={doc.title}
              sub={
                <>
                  Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
                  <span className="el-doc-dot">{" · "}</span>
                  <a href={`/docs/${doc.slug}.md`}>View as markdown</a>
                </>
              }
            />
            <Prose className="el-doc-prose">
              <Body />
            </Prose>
          </Article>
        </Block>
        <Rule />
        {faq.length > 0 && (
          <>
            <FaqBand faq={faq} />
            <Rule />
          </>
        )}
        <TrialBand agency={doc.slug === "connect-amazon-dsp" || doc.slug === "reports-and-pacing"} />
        <Rule />
      </Frame>
    </SitePage>
  );
}
