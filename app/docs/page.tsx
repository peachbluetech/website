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
      <main className="flex-1 pt-32 md:pt-40 pb-24 px-6">
        <div className="max-w-[860px] mx-auto">
          <header className="mb-12">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-3">
              Documentation
            </div>
            <h1 className="font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4">
              Everything, <span className="italic">documented.</span>
            </h1>
            <p className="text-[15px] text-pb-fg-muted leading-relaxed max-w-[560px]">
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
                  className="text-[11px] font-semibold uppercase tracking-[0.16em] text-pb-peach-600 mb-4"
                >
                  {title}
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pages.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/docs/${p.slug}`}
                      className="block rounded-2xl border border-pb-border bg-pb-card shadow-pb-soft p-5 hover:shadow-pb-lift transition-shadow"
                    >
                      <div className="text-[15px] font-semibold text-pb-fg mb-1.5">{p.navLabel}</div>
                      <p className="text-[13px] text-pb-fg-muted leading-relaxed">{p.description}</p>
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
