import type { Article } from "@/content/blog/manifest";

/* A post's byline and dates as they are printed. Plain helpers with no
   component in them, so the feed route can use them too; the row that
   shows them under a post's title is PostByline. */

export function bylineName(byline: Article["byline"]): string {
  return byline === "nick" ? "Nick, founder of Peachblue" : "Peachblue";
}

/* "August 20, 2026" under a post's title, "Aug 20, 2026" in the index. */
export function formatPostDate(iso: string, month: "long" | "short" = "long"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "UTC",
  });
}
