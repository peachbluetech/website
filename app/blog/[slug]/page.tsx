import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { StickyToc } from "@/components/blog/StickyToc";
import { FaqBlock } from "@/components/blog/FaqBlock";
import { TrialCta } from "@/components/blog/TrialCta";
import { PostMeta, bylineName } from "@/components/blog/PostMeta";
import { PILLARS } from "@/content/blog/manifest";
import {
  assertManifestIntegrity,
  extractToc,
  getArticle,
  publishedArticles,
  relatedArticles,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  assertManifestIntegrity();
  return publishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.datePublished,
      modifiedTime: article.dateUpdated ?? article.datePublished,
      authors: [bylineName(article.byline)],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { default: Body } = await import(`@/content/blog/posts/${slug}.mdx`);
  const toc = extractToc(slug);
  const related = relatedArticles(article);
  const isAgencyPost = article.pillar === "dsp";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/${article.slug}#article`,
        headline: article.title,
        description: article.description,
        url: `${SITE_URL}/blog/${article.slug}`,
        datePublished: article.datePublished,
        dateModified: article.dateUpdated ?? article.datePublished,
        author:
          article.byline === "nick"
            ? { "@type": "Person", name: "Nick", jobTitle: "Founder, Peachblue" }
            : { "@id": `${SITE_URL}/#organization` },
        publisher: { "@id": `${SITE_URL}/#organization` },
        mainEntityOfPage: `${SITE_URL}/blog/${article.slug}`,
        keywords: article.keywords.join(", "),
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Peachblue", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${SITE_URL}/blog/${article.slug}`,
          },
        ],
      },
      ...(article.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/blog/${article.slug}#faq`,
              mainEntity: article.faq.map((f) => ({
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
      <SiteNav current="blog" />

      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-[1060px] mx-auto">
          <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-14">
            <article>
              <header className="mb-10">
                <nav aria-label="Breadcrumb" className="text-[12.5px] text-pb-fg-muted mb-5">
                  <Link href="/blog" className="hover:text-pb-fg transition-colors">
                    Blog
                  </Link>
                  <span aria-hidden="true" className="mx-2">
                    /
                  </span>
                  <span className="text-pb-peach-600 font-medium">
                    {PILLARS[article.pillar].title}
                  </span>
                </nav>
                <h1 className="font-display text-[clamp(30px,4.6vw,42px)] leading-[1.1] font-medium tracking-[-0.015em] text-pb-fg mb-4">
                  {article.h1}
                  {article.h1Accent ? <span className="italic"> {article.h1Accent}</span> : null}
                </h1>
                <p className="text-[16.5px] text-pb-fg-muted leading-relaxed mb-5 max-w-[640px]">
                  {article.description}
                </p>
                <PostMeta article={article} />
              </header>

              <div className="prose-pb-lg max-w-[680px]">
                <Body />
              </div>

              <div className="max-w-[680px]">
                <FaqBlock faq={article.faq} />
                <TrialCta agency={isAgencyPost} />

                {related.length > 0 && (
                  <section className="mt-14" aria-labelledby="related-heading">
                    <h2
                      id="related-heading"
                      className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-4"
                    >
                      Keep reading
                    </h2>
                    <ul className="space-y-3">
                      {related.map((r) => (
                        <li key={r.slug}>
                          <Link
                            href={`/blog/${r.slug}`}
                            className="text-[15px] font-medium text-pb-fg underline underline-offset-4 decoration-pb-border hover:decoration-pb-peach-500 transition"
                          >
                            {r.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            </article>

            <aside className="hidden lg:block">
              <StickyToc entries={toc} />
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
