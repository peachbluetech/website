import type { CSSProperties, ReactNode } from "react";
import { DISPLAY_WEIGHT, bodyItalic, display } from "./font";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

/* The wrapper of every page: the token scope (.el-page in system.css:
   the canvas, the ink, Inter), the two font variables and the display
   weight (font.ts), then the nav, main and the footer. Everything in
   parts.tsx and kit.tsx expects to stand inside it.

     <SitePage current="pricing">
       ...the page's header...
       <Frame>
         <Rule />
         ...sections, a Rule between every two...
         <Rule />
       </Frame>
     </SitePage>

   `current` is passed to the nav, which marks that page's link.
   `chrome={false}` leaves the nav and the footer out and renders the
   scope and main alone. */
export function SitePage({ current, chrome = true, children }: { current?: "pricing" | "demo" | "blog" | "docs"; chrome?: boolean; children: ReactNode }) {
  return (
    <div className={`el-page ${display.variable} ${bodyItalic.variable}`} style={{ "--el-display-weight": DISPLAY_WEIGHT } as CSSProperties}>
      {chrome && <SiteNav current={current} />}
      <main>{children}</main>
      {chrome && <SiteFooter />}
    </div>
  );
}
