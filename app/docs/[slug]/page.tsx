import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { FaqBlock } from "@/components/blog/FaqBlock";
import { TrialCta } from "@/components/blog/TrialCta";
import { DOC_SECTIONS } from "@/content/docs/manifest";
import { assertDocsIntegrity, getDoc, publishedDocs } from "@/lib/docs";
import { SITE_URL } from "@/lib/site";

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
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav current="docs" />
      <main className="flex-1 pt-32 md:pt-36 pb-24 px-6">
        <div className="max-w-[1060px] mx-auto lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
          <aside className="hidden lg:block">
            <DocsSidebar currentSlug={doc.slug} />
          </aside>

          <article>
            <header className="mb-8">
              <nav aria-label="Breadcrumb" className="text-[12.5px] text-pb-fg-muted mb-4">
                <Link href="/docs" className="hover:text-pb-fg transition-colors">
                  Docs
                </Link>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                <span className="text-pb-peach-600 font-medium">
                  {DOC_SECTIONS[doc.section].title}
                </span>
              </nav>
              <h1 className="font-display text-[clamp(26px,4vw,36px)] leading-[1.12] font-medium tracking-[-0.015em] text-pb-fg mb-3">
                {doc.title}
              </h1>
              <p className="text-[12.5px] text-pb-fg-muted">
                Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
                {" · "}
                <a
                  href={`/docs/${doc.slug}.md`}
                  className="underline underline-offset-2 hover:text-pb-fg"
                >
                  View as markdown
                </a>
              </p>
            </header>

            <div className="prose-pb-lg max-w-[680px]">
              <Body />
            </div>

            <div className="max-w-[680px]">
              <FaqBlock faq={faq} />
              <TrialCta agency={doc.slug === "connect-amazon-dsp" || doc.slug === "reports-and-pacing"} />
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
