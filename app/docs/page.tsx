import type { Metadata } from "next";
import Link from "next/link";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { docsBySection } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Peachblue documentation: connect Meta, TikTok, Google Ads, and Amazon DSP, understand creative analysis and scoring, and set up reports, pacing, and Brand Intel.",
  alternates: { canonical: "/docs" },
};

export default function DocsIndexPage() {
  const sections = docsBySection();
  return (
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <SiteNav current="docs" />
      <main className="flex-1 pt-12 md:pt-[72px] pb-24 px-6">
        <div className="max-w-[860px] mx-auto">
          <header className="mb-12">
            <div className="text-[13px] font-semibold text-pb-peach-700 mb-3">
              Documentation
            </div>
            <h1 className="font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-ink text-balance mb-4">
              Everything, documented.
            </h1>
            <p className="text-[16px] text-pb-fg-secondary leading-relaxed max-w-[560px]">
              Connect your platforms, understand the analysis, and get the most
              out of Peachblue. Every page is also available as raw markdown by
              appending .md to its URL.
            </p>
          </header>

          <div className="space-y-10">
            {sections.map(({ section, title, pages }) => (
              <section key={section} aria-labelledby={`section-${section}`}>
                <h2
                  id={`section-${section}`}
                  className="text-[13px] font-semibold text-pb-peach-700 mb-4"
                >
                  {title}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/docs/${p.slug}`}
                      className="block rounded-[10px] border border-pb-border bg-pb-card p-5 hover:border-pb-border-control transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-peach-500 focus-visible:ring-offset-2"
                    >
                      <div className="text-[15px] font-semibold text-pb-fg mb-1.5">{p.navLabel}</div>
                      <p className="text-[13.5px] text-pb-fg-secondary leading-relaxed">{p.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
