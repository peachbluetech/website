import type { MDXComponents } from "mdx/types";

/**
 * Global MDX component map (required by @next/mdx with App Router).
 *
 * Typography comes from the .prose-pb-lg block in globals.css, so most
 * elements pass through untouched. Tables get an overflow wrapper so wide
 * comparison tables scroll inside the article column instead of breaking
 * the page on mobile.
 *
 * A few elements carry a class that brings them in line with the site's
 * register: section headings in ink like every other display heading, table
 * headers in sentence case with no tracking, upright quotes, and the 10px
 * radius on framed blocks. The prose rules are unlayered and outrank plain
 * utilities, so these are important utilities; if the same values move into
 * the prose rules, the classes here can go.
 */

function join(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

const components: MDXComponents = {
  h2: ({ className, ...props }) => (
    <h2 {...props} className={join(className, "text-pb-ink!")} />
  ),
  th: ({ className, ...props }) => (
    <th {...props} className={join(className, "normal-case! tracking-normal!")} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote {...props} className={join(className, "not-italic!")} />
  ),
  pre: ({ className, ...props }) => (
    <pre {...props} className={join(className, "rounded-[10px]!")} />
  ),
  table: (props) => (
    <div className="pb-table-scroll rounded-[10px]!">
      <table {...props} />
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
