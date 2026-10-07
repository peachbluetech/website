import type { Metadata } from "next";
import { bylineName, formatPostDate } from "@/components/blog/PostMeta";
import { EntryRow, PageHeader } from "@/components/site/kit";
import { Block, Card, Dotted, Frame, MEDIUM, Rule, T, TONE, cx } from "@/components/site/parts";
import { SitePage } from "@/components/site/SitePage";
import { PILLARS, type Article } from "@/content/blog/manifest";
import { publishedArticles } from "@/lib/blog";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practitioner guides on creative analytics, Amazon DSP reporting and pacing, and AI for media buying. Written by the team building Peachblue.",
  alternates: { canonical: "/blog" },
};

/* One post as a row that is one link: the pillar and the date in the
   narrow column, then the title (an h2), the description and the
   byline. `first` is the newest post, which stands on a taupe card
   with its title in the display face; on taupe the quiet lines are
   earth, not smoke. The dot between the pillar and the date is
   decoration: it shows on a phone, where the two share a line, and
   not beside the columns of a wider screen (blog.css). */
function PostRow({ article: a, first = false }: { article: Article; first?: boolean }) {
  const quiet = first ? TONE.earth : TONE.smoke;
  return (
    <EntryRow
      as="div"
      href={`/blog/${a.slug}`}
      lead={
        <div className="el-blog-meta">
          <div className={cx(T.bodySm, MEDIUM)}>{PILLARS[a.pillar].title}</div>
          {a.datePublished && (
            <div className={cx(T.bodySm, quiet, "el-tnum el-blog-when")}>
              <span aria-hidden="true" className="el-blog-dot">
                ·
              </span>
              <time dateTime={a.datePublished}>{formatPostDate(a.datePublished, "short")}</time>
            </div>
          )}
        </div>
      }
    >
      <h2 className={cx(first ? T.heading : T.titleLg, "el-balance")}>
        {a.h1}
        {a.h1Accent ? <span> {a.h1Accent}</span> : null}
      </h2>
      <p className={cx(first ? T.body : T.bodySm, quiet, "el-pretty el-blog-line")}>{a.description}</p>
      <div className={cx(T.caption, quiet)}>{bylineName(a.byline)}</div>
    </EntryRow>
  );
}

/* The blog index, built in the design system from the inner-page kit:
   the page header, then every published post inside the frame, newest
   first. The newest stands on a taupe card; the rest are the rows of a
   dotted list, on the same columns. A server component; the words, the
   heading levels and the links are the published ones. */
export default function BlogIndexPage() {
  const [first, ...rest] = publishedArticles();

  return (
    <SitePage current="blog">
      <PageHeader
        eyebrow="Peachblue blog"
        title="Notes from the creative trenches."
        lead="Practitioner guides on creative analytics, Amazon DSP reporting, and AI for media buying. No filler, verified numbers, honest comparisons."
        bottom="gap"
      />
      <Frame>
        <Rule />
        {first && (
          <Block inset="card" top="shelf">
            <Card variant="bare" className="el-blog-first">
              <PostRow article={first} first />
            </Card>
          </Block>
        )}
        <Block top="s" bottom="row">
          <Dotted as="div" className="el-blog-list">
            {rest.map((a) => (
              <PostRow key={a.slug} article={a} />
            ))}
          </Dotted>
        </Block>
        <Rule />
      </Frame>
    </SitePage>
  );
}
