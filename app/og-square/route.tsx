import { renderSquareCard } from "@/lib/og-card";

/**
 * 1:1 brand card for Google Search result thumbnails.
 *
 * Google crops its result thumbnail to roughly a square and renders it at
 * 50-90px, where a headline is illegible whatever the aspect ratio. So this
 * card is mark-led rather than text-led: the peach mark carries recognition
 * at thumbnail size, and the wordmark and strapline only earn their keep on
 * the larger surfaces that also accept 1:1.
 *
 * Referenced from the JSON-LD image array in app/layout.tsx alongside the
 * 1200x630 Open Graph card, which stays the social-share asset.
 */

export const runtime = "edge";

export async function GET() {
  return renderSquareCard();
}
