import { Inter, Zalando_Sans } from "next/font/google";

/* The system's fonts. This is the only file that names a face.
   Everything else reads the CSS variables these calls set
   (--el-font-display, --el-font-italic) and --el-display-weight, which
   SitePage puts on the page wrapper from DISPLAY_WEIGHT.

   The display face: a light grotesque for headings, at three sizes and
   one weight. Zalando Sans at 370 (its stem is about 9.3% of the em,
   where Inter 300 is 6.9%). Usable range 360 to 385; never lighter,
   never above 385.

   To change the face, replace the `display` block (keep the same
   `variable`), set DISPLAY_WEIGHT, and work out the trim values of the
   three display roles in system.css again from the new face's metrics
   (the formula is written beside them). Nothing else changes. */
export const display = Zalando_Sans({
  subsets: ["latin"],
  variable: "--el-font-display",
  display: "swap",
});

export const DISPLAY_WEIGHT = 370;

/* One line of a page is italic (the risk line under the homepage's
   hero pills and closing pills). The root layout loads Inter upright
   only, so the italic is loaded here and nowhere else. Inter upright is
   the root layout's --font-inter. */
export const bodyItalic = Inter({
  subsets: ["latin"],
  style: "italic",
  weight: "400",
  variable: "--el-font-italic",
  display: "swap",
});
