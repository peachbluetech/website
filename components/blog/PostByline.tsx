import { Avatar, Dot, Meta, MetaName } from "@/components/site/kit";
import { LogoTile } from "@/components/site/parts";
import type { Article } from "@/content/blog/manifest";
import { bylineName, formatPostDate } from "./PostMeta";
import "./PostByline.css";

/* The byline row under a post's lead: who wrote it, when it was
   published and, where it differs, when it was updated. The kit's meta
   row: the founder's initial in a disc or the logo tile, the name in
   ink, the dates in smoke. Each date carries the dot before it, so on
   a narrow screen a date goes to the next line whole and its dot does
   not stay behind at the end of the line above (PostByline.css). */
export function PostByline({ article }: { article: Article }) {
  const updated = article.dateUpdated && article.dateUpdated !== article.datePublished ? article.dateUpdated : null;
  return (
    <div className="el-byline">
      <Meta className="el-byline-row">
        <MetaName avatar={article.byline === "nick" ? <Avatar>N</Avatar> : <LogoTile size={20} />}>{bylineName(article.byline)}</MetaName>
        {article.datePublished && (
          <span className="el-byline-item">
            <Dot />
            <time dateTime={article.datePublished}>{formatPostDate(article.datePublished)}</time>
          </span>
        )}
        {updated && (
          <span className="el-byline-item">
            <Dot />
            <span>
              Updated <time dateTime={updated}>{formatPostDate(updated)}</time>
            </span>
          </span>
        )}
      </Meta>
    </div>
  );
}
