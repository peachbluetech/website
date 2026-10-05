import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PILLARS } from "@/content/blog/manifest";
import { publishedArticles } from "@/lib/blog";
import { bylineName } from "@/components/blog/PostMeta";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practitioner guides on creative analytics, Amazon DSP reporting and pacing, and AI for media buying. Written by the team building Peachblue.",
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  const articles = publishedArticles();

  return (
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <SiteNav current="blog" />

      <main className="flex-1 pt-12 md:pt-[72px] pb-24 px-6">
        <div className="max-w-[760px] mx-auto">
          <header className="mb-12 md:mb-16">
            <div className="text-[13px] font-semibold text-pb-peach-700 mb-3">
              Peachblue blog
            </div>
            <h1 className="font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-ink text-balance mb-4">
              Notes from the creative trenches.
            </h1>
            <p className="text-[16px] text-pb-fg-secondary leading-relaxed max-w-[560px]">
              Practitioner guides on creative analytics, Amazon DSP reporting,
              and AI for media buying. No filler, verified numbers, honest
              comparisons.
            </p>
          </header>

          <div className="space-y-4">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="block rounded-[10px] border border-pb-border bg-pb-card p-6 md:p-7 hover:border-pb-border-control transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-peach-500 focus-visible:ring-offset-2"
              >
                <div className="flex items-center gap-2.5 text-[13px] font-semibold text-pb-fg-muted mb-2.5">
                  <span className="text-pb-peach-700">{PILLARS[a.pillar].title}</span>
                  {a.datePublished && (
                    <>
                      <span aria-hidden="true">·</span>
                      <time dateTime={a.datePublished} className="font-normal">
                        {formatDate(a.datePublished)}
                      </time>
                    </>
                  )}
                </div>
                <h2 className="font-display text-[22px] md:text-[24px] leading-snug font-medium tracking-[-0.015em] text-pb-ink mb-2">
                  {a.h1}
                  {a.h1Accent ? <span> {a.h1Accent}</span> : null}
                </h2>
                <p className="text-[14.5px] text-pb-fg-secondary leading-relaxed mb-3">
                  {a.description}
                </p>
                <div className="text-[12.5px] text-pb-fg-muted">{bylineName(a.byline)}</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
