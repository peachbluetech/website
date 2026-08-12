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

      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-[760px] mx-auto">
          <header className="mb-12 md:mb-16">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-3">
              Peachblue blog
            </div>
            <h1 className="font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4">
              Notes from the creative <span className="italic">trenches.</span>
            </h1>
            <p className="text-[15px] text-pb-fg-muted leading-relaxed max-w-[560px]">
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
                className="block rounded-3xl border border-pb-border bg-pb-card shadow-pb-soft p-6 md:p-7 hover:shadow-pb-lift transition-shadow"
              >
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-pb-fg-muted mb-2.5">
                  <span className="text-pb-peach-600">{PILLARS[a.pillar].title}</span>
                  {a.datePublished && (
                    <>
                      <span aria-hidden="true">·</span>
                      <time dateTime={a.datePublished} className="normal-case tracking-normal font-medium">
                        {formatDate(a.datePublished)}
                      </time>
                    </>
                  )}
                </div>
                <h2 className="font-display text-[22px] md:text-[24px] leading-snug font-medium tracking-[-0.015em] text-pb-fg mb-2">
                  {a.h1}
                  {a.h1Accent ? <span className="italic"> {a.h1Accent}</span> : null}
                </h2>
                <p className="text-[14.5px] text-pb-fg-muted leading-relaxed mb-3">
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
