import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostByline } from "@/components/blog/PostByline";
import { bylineName } from "@/components/blog/PostMeta";
import { StickyToc } from "@/components/blog/StickyToc";
import { Article, Crumb, FaqBand, LinkBand, PageHeader, Prose, TrialBand } from "@/components/site/kit";
import { Block, Frame, Rule } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { PILLARS } from "@/content/blog/manifest";
import {
  assertManifestIntegrity,
  extractToc,
  getArticle,
  publishedArticles,
  relatedArticles,
} from "@/lib/blog";
import { SITE_URL } from "@/lib/site";
import "./post.css";

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

/* A post, built in the design system from the inner-page kit: the
   stacked page header (the crumb, the h1, the description as the lead,
   the byline row), then inside the frame the text as running text with
   its table of contents in the side column, the questions, the trial
   band and "Keep reading". One article element holds all of it, as it
   always did, so the body column of the kit's Article is a div here.
   A server component; the words, the heading levels, the links, the
   ids and the JSON-LD are the published ones. */
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
    <SitePage current="blog">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <PageHeader
          layout="stack"
          crumb={<Crumb items={[{ label: "Blog", href: "/blog" }, { label: PILLARS[article.pillar].title }]} />}
          title={
            <>
              {article.h1}
              {article.h1Accent ? <span> {article.h1Accent}</span> : null}
            </>
          }
          lead={article.description}
          meta={<PostByline article={article} />}
        />
        <Frame>
          <Rule />
          <Block top="band" bottom="pad">
            <Article as="div" sideAt="end" side={<StickyToc entries={toc} />}>
              <Prose className="el-post-prose">
                <Body />
              </Prose>
            </Article>
          </Block>
          <Rule />
          {article.faq.length > 0 && (
            <>
              <FaqBand faq={article.faq} />
              <Rule />
            </>
          )}
          <TrialBand agency={isAgencyPost} />
          <Rule />
          {related.length > 0 && (
            <>
              <LinkBand id="related-heading" title="Keep reading" links={related.map((r) => ({ href: `/blog/${r.slug}`, label: r.title }))} />
              <Rule />
            </>
          )}
        </Frame>
      </article>
    </SitePage>
  );
}
