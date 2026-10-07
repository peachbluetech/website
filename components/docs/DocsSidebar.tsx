import { SideNav, Sticky } from "@/components/site/kit";
import { Rule } from "@/components/site/parts";
import { docsBySection } from "@/lib/docs";
import "./DocsSidebar.css";

/* The docs navigation: every section of the manifest and its pages, as
   the kit's side nav. It stands in the side column of a doc's Article.
   A server component with no script; one list of links in the HTML.

   From 1024 it is the side nav as the kit draws it, resting under the
   site nav while the doc scrolls: a small title per section, the pages
   under it in smoke, and the page the reader is on in ink on the plate
   (aria-current), as the site nav marks the section they are in. It
   brings its own resting box (the kit's Sticky), so the Article that
   holds it is given `sticky={false}`.

   Under 1024 the same list is one line that scrolls sideways, standing
   as a slim band under the page's first rule with a rule of its own
   under it: each section's title as a small taupe label, its pages
   after it. The section the reader is in comes first, and in it the
   page the reader is on, so that page is always in view; the HTML keeps
   the manifest's order. */
export function DocsSidebar({ currentSlug }: { currentSlug?: string }) {
  const sections = docsBySection();
  return (
    <Sticky className="el-docs-side">
      <SideNav
        label="Documentation"
        className="el-docs-nav"
        groups={sections.map(({ title, pages }) => ({
          title,
          items: pages.map((p) => ({ label: p.navLabel, href: `/docs/${p.slug}`, current: p.slug === currentSlug })),
        }))}
      />
      <Rule className="el-docs-side-rule" />
    </Sticky>
  );
}
