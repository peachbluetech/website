import { renderOgCard, OG_SIZE } from "@/lib/og-card";
import { ARTICLES, PILLARS } from "@/content/blog/manifest";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function PostOgImage({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return renderOgCard();
  return renderOgCard({
    line1: article.h1,
    line2: article.h1Accent ?? "",
    kicker: `Peachblue blog · ${PILLARS[article.pillar].title}`,
    compact: article.h1.length > 24,
  });
}
