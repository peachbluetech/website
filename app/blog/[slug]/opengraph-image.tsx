import { renderOgCard, OG_SIZE } from "@/lib/og-card";
import { ARTICLES, PILLARS } from "@/content/blog/manifest";

export const runtime = "edge";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function PostOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return renderOgCard();
  /* The title as one headline: the card sets it in one colour and wraps
     it evenly, so the accent half is not a line of its own. */
  return renderOgCard({
    line1: article.h1Accent ? `${article.h1} ${article.h1Accent}` : article.h1,
    line2: "",
    kicker: `Peachblue blog · ${PILLARS[article.pillar].title}`,
  });
}
