import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component map (required by @next/mdx with App Router).
 *
 * Typography comes from the .prose-pb-lg block in globals.css, so most
 * elements pass through untouched. Tables get an overflow wrapper so wide
 * comparison tables scroll inside the article column instead of breaking
 * the page on mobile.
 */

const components: MDXComponents = {
  table: (props) => (
    <div className="pb-table-scroll">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
