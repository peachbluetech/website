import { NextRequest } from "next/server";
import { getArticle, postFilePath } from "@/lib/blog";
import { getDoc, rawDocMarkdown } from "@/lib/docs";
import { SITE_URL } from "@/lib/site";
import fs from "node:fs";

/**
 * Serves the raw markdown body of a published docs page or blog post.
 * Reached via middleware rewrites from /docs/<slug>.md, /blog/<slug>.md,
 * and Accept: text/markdown negotiation. Only published content is served.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ type: string; slug: string }> },
): Promise<Response> {
  const { type, slug } = await params;

  let title: string | undefined;
  let description: string | undefined;
  let body: string | null = null;
  let canonical: string | undefined;

  if (type === "docs") {
    const doc = getDoc(slug);
    if (doc) {
      title = doc.title;
      description = doc.description;
      body = rawDocMarkdown(slug);
      canonical = `${SITE_URL}/docs/${slug}`;
    }
  } else if (type === "blog") {
    const article = getArticle(slug);
    if (article) {
      title = article.title;
      description = article.description;
      const file = postFilePath(slug);
      body = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
      canonical = `${SITE_URL}/blog/${slug}`;
    }
  }

  if (!body) {
    return new Response("Not found", { status: 404 });
  }

  const markdown = `# ${title}\n\n> ${description}\n\nCanonical: ${canonical}\n\n${body}`;
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
      Link: `<${canonical}>; rel="canonical"`,
    },
  });
}
