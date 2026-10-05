import { RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/product/frame";
import { Button } from "@/components/product/ui";
import { BrandIntelBrief } from "./BrandIntelBrief";
import { SentimentOverview } from "./SentimentOverview";
import { Takeaways } from "./Takeaways";
import { SUBTITLE } from "./data";

/* BrandIntelPage: the body of the Brand Intel page. The page header
   (title, the mentions subtitle, the peach "Scan now" button), then three
   columns: what is tracked and how it lands on the left, the written brief
   in the middle, the short list on the right. The one page in the product
   that reads like a document rather than a dashboard. No navy block.

   Design width: 1152 (the content width of the 1,200px page container):
   280 | 24 | 544 | 24 | 280. Put it in an AppWindow with the icon rail at
   1280, or in a 1,200px Shot with the container's own padding (24px sides,
   40px top and bottom). The brief is by far the tallest column; a crop
   under about 700px cuts it inside "Trending themes".

   The header counts every tracked mention (376) and the "All mentions"
   button under the brief counts the list the app shows (the newest 50).
   Both are true in the app, but in one still frame they read as two
   totals. A crop that ends above the buttons never shows both; when the
   whole page is shown on a marketing page, pass nav={false}. */

export function BrandIntelPage({
  header = true,
  sections = 4,
  nav = true,
  sources = true,
  className,
}: {
  /** Show the page header above the three columns. On by default. */
  header?: boolean;
  /** Stop the brief after this many sections (see BrandIntelBrief). All four by default. */
  sections?: 0 | 1 | 2 | 3 | 4;
  /** Show the two buttons under the brief ("Keyword analysis", "All mentions"), as the app does. On by default; false ends the middle column at the brief card. */
  nav?: boolean;
  /** Show the "Sources" card at the foot of the right rail, as the app does. On by default; false ends the rail at "Since last scan". */
  sources?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      {header && (
        <PageHeader
          title="Brand Intel"
          description={SUBTITLE}
          actions={
            <Button variant="peach" size="default">
              <RefreshCw className="size-3.5" />
              Scan now
            </Button>
          }
        />
      )}
      <div className="grid gap-6 grid-cols-[280px_1fr_280px]">
        <SentimentOverview />
        <BrandIntelBrief sections={sections} nav={nav} />
        <Takeaways sources={sources} />
      </div>
    </div>
  );
}
