import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component map (required by @next/mdx with App Router).
 *
 * An article's or a doc's body is running text: the page wraps it in
 * Prose (components/site/kit.tsx), whose one class (.el-prose in
 * components/site/kit.css) sets every element MDX produces: headings,
 * paragraphs, lists, links, quotations, code, pictures and tables. So
 * every element passes through untouched and carries no class.
 *
 * The one exception is a table, which gets a wrapper so a wide
 * comparison scrolls sideways inside the article column instead of
 * widening the page on a phone.
 */

const components: MDXComponents = {
  table: (props) => (
    <div className="el-table-scroll">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
