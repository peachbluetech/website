import type { TocEntry } from "@/lib/blog";

/**
 * Sticky table of contents for the post sidebar. Pure anchor links (ids are
 * assigned by rehype-slug and mirrored by lib/blog.extractToc), no client JS.
 */
export function StickyToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <nav aria-label="Table of contents" className="sticky top-28">
      <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-3">
        On this page
      </div>
      <ul className="space-y-2 border-l border-pb-border">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={`block text-[13px] leading-snug text-pb-fg-muted hover:text-pb-fg transition-colors -ml-px border-l border-transparent hover:border-pb-peach-500 ${
                e.depth === 2 ? "pl-4" : "pl-7"
              }`}
            >
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
