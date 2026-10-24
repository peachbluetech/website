/* A post's byline and dates as they are printed. Plain helpers with no
   component in them, so the feed route can use them too; the row that
   shows them under a post's title is PostByline. */

/* Every post is credited to Peachblue, whoever wrote it (Nick,
   2026-10-24). The manifest's byline field still records the writer. */
export const BYLINE = "Peachblue";

/* "August 20, 2026" under a post's title, "Aug 20, 2026" in the index. */
export function formatPostDate(iso: string, month: "long" | "short" = "long"): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "UTC",
  });
}
