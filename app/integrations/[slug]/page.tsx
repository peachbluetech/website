import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FaqBlock } from "@/components/blog/FaqBlock";
import { TrialCta } from "@/components/blog/TrialCta";
import { INTEGRATION_PAGES } from "@/content/integrations/manifest";
import { SITE_URL, TRIAL_HREF, TRIAL_LABEL, RISK_REVERSAL } from "@/lib/site";

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

  return (
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-[860px] mx-auto">
          {/* Hero */}
          <header className="mb-14 text-center">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-peach-600 mb-3">
              {page.eyebrow}
            </div>
            <h1 className="font-display text-[clamp(30px,5vw,46px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4">
              {page.h1} <span className="italic">{page.h1Accent}</span>
            </h1>
            <p className="text-[15.5px] text-pb-fg-muted leading-relaxed max-w-[600px] mx-auto mb-7">
              {page.description}
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href={TRIAL_HREF}
                className="inline-flex items-center h-11 px-7 rounded-full pb-gradient-peach text-white text-[14px] font-semibold shadow-[0_4px_16px_rgba(242,119,73,0.35)] hover:brightness-105 transition"
              >
                {TRIAL_LABEL}
              </a>
              <Link
                href="/pricing"
                className="text-[14px] font-medium text-pb-fg underline underline-offset-4 decoration-pb-border hover:decoration-pb-fg transition"
              >
                See pricing
              </Link>
            </div>
            <p className="mt-3 text-[12px] text-pb-fg-muted">{RISK_REVERSAL}</p>
          </header>

          {/* Features */}
          <section aria-label="Capabilities" className="mb-14">
            <div className="grid sm:grid-cols-2 gap-4">
              {page.features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-pb-border bg-pb-card shadow-pb-soft p-6"
                >
                  <h2 className="text-[15px] font-semibold text-pb-fg mb-2">{f.title}</h2>
                  <p className="text-[13.5px] text-pb-fg-muted leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] text-pb-fg-muted">{page.planNote}</p>
          </section>

          {/* How it works */}
          <section aria-labelledby="how-heading" className="mb-14">
            <h2
              id="how-heading"
              className="font-display text-[24px] font-medium tracking-[-0.015em] text-pb-fg mb-5"
            >
              How it works
            </h2>
            <ol className="space-y-3">
              {page.steps.map((s, i) => (
                <li key={s} className="flex gap-3 text-[15px] text-pb-fg leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="shrink-0 size-6 rounded-full pb-gradient-peach text-white text-[12px] font-semibold inline-flex items-center justify-center mt-0.5"
                  >
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[13.5px] text-pb-fg-muted">
              Full setup guide:{" "}
              <Link
                href={`/docs/${page.docsSlug}`}
                className="underline underline-offset-2 hover:text-pb-fg"
              >
                docs
              </Link>
              . Read-only access; Peachblue never modifies your campaigns.
            </p>
          </section>

          {/* FAQ (visible; schema in JSON-LD above) */}
          <FaqBlock faq={page.faq} />

          {/* Related */}
          {page.relatedBlog.length > 0 && (
            <section className="mt-12" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-4"
              >
                From the blog
              </h2>
              <ul className="space-y-2.5">
                {page.relatedBlog.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      className="text-[15px] font-medium text-pb-fg underline underline-offset-4 decoration-pb-border hover:decoration-pb-peach-500 transition"
                    >
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <TrialCta agency={page.agency} />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
