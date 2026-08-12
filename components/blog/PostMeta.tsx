import type { Article } from "@/content/blog/manifest";

export function bylineName(byline: Article["byline"]): string {
  return byline === "nick" ? "Nick, founder of Peachblue" : "Peachblue";
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Author + dates row shown under the post lede. */
export function PostMeta({ article }: { article: Article }) {
  const updated =
    article.dateUpdated && article.dateUpdated !== article.datePublished
      ? article.dateUpdated
      : null;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-pb-fg-muted">
      <span className="inline-flex items-center gap-2">
        <span
          className="size-6 rounded-full pb-gradient-peach inline-flex items-center justify-center text-white text-[11px] font-semibold"
          aria-hidden="true"
        >
          {article.byline === "nick" ? "N" : "P"}
        </span>
        <span className="font-medium text-pb-fg">{bylineName(article.byline)}</span>
      </span>
      {article.datePublished && (
        <>
          <span aria-hidden="true">·</span>
          <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
        </>
      )}
      {updated && (
        <>
          <span aria-hidden="true">·</span>
          <span>
            Updated <time dateTime={updated}>{formatDate(updated)}</time>
          </span>
        </>
      )}
    </div>
  );
}
