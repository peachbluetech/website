import Link from "next/link";
import { docsBySection } from "@/lib/docs";

/**
 * Docs left sidebar: sections and pages from the manifest. Pure server
 * component, no client JS. Current page highlighted.
 */
export function DocsSidebar({ currentSlug }: { currentSlug?: string }) {
  const sections = docsBySection();
  return (
    <nav aria-label="Documentation" className="lg:sticky lg:top-28">
      <div className="space-y-7">
        {sections.map(({ section, title, pages }) => (
          <div key={section}>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-2.5">
              {title}
            </div>
            <ul className="space-y-1.5 border-l border-pb-border">
              {pages.map((p) => {
                const active = p.slug === currentSlug;
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/docs/${p.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`block pl-4 -ml-px border-l text-[13.5px] leading-snug transition-colors ${
                        active
                          ? "border-pb-peach-500 text-pb-fg font-medium"
                          : "border-transparent text-pb-fg-muted hover:text-pb-fg hover:border-pb-peach-300"
                      }`}
                    >
                      {p.navLabel}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
