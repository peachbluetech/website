import { NextRequest, NextResponse } from "next/server";

/**
 * Markdown for agents, two ways:
 *
 * 1. .md sibling URLs (the Stripe/Anthropic convention): /docs/scoring.md
 *    and /blog/<slug>.md serve the raw markdown of the same page.
 * 2. Content negotiation (the Cloudflare proposal): a request to the HTML
 *    URL with an Accept header that asks for text/markdown (and not html)
 *    gets the markdown too.
 *
 * Both rewrite to /raw/{docs|blog}/{slug}, a route handler that reads the
 * MDX from disk.
 */

const MD_SIBLING = /^\/(docs|blog)\/([\w-]+)\.md$/;
const HTML_PAGE = /^\/(docs|blog)\/([\w-]+)$/;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sibling = MD_SIBLING.exec(pathname);
  if (sibling) {
    return NextResponse.rewrite(new URL(`/raw/${sibling[1]}/${sibling[2]}`, req.url));
  }

  const page = HTML_PAGE.exec(pathname);
  if (page) {
    const accept = req.headers.get("accept") ?? "";
    if (accept.includes("text/markdown") && !accept.includes("text/html")) {
      return NextResponse.rewrite(new URL(`/raw/${page[1]}/${page[2]}`, req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/docs/:slug*", "/blog/:slug*"],
};
