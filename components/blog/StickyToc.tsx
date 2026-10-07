import { SideNav } from "@/components/site/kit";
import type { TocEntry } from "@/lib/blog";

/* A post's table of contents, for the side column of its Article, which
   holds it under the nav while the text scrolls. The kit's side nav:
   plain anchor links (the ids are assigned by rehype-slug and mirrored
   by lib/blog.extractToc), no script. A third-level heading is indented. */
export function StickyToc({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <SideNav
      label="Table of contents"
      groups={[
        {
          title: "On this page",
          items: entries.map((e) => ({ label: e.text, href: `#${e.id}`, sub: e.depth === 3 })),
        },
      ]}
    />
  );
}
