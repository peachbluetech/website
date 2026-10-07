/* Resized variants of the creative images in /public/ads, and where each
   crop of a creative sits.

   Every original (/ads/<name>.jpg or .png) has four WebP siblings, so a
   36px thumbnail does not download a full-size file. The sample account's
   originals are 1080 by 1920; its one square cut is 1080 by 1080.

     sm    /ads/sm/<name>.webp   the square thumbnail, 128 by 128, already
                                 cut at the creative's "thumb" focus. For
                                 square slots up to 64px wide: rows, lists,
                                 rails. Nothing else: the top and the bottom
                                 of the creative are not in the file.
     md    /ads/md/<name>.webp   560px wide at the original aspect ratio (a
                                 small original keeps its own size). For
                                 slots up to about 280px wide: tiles,
                                 previews, cards.
     wide  /ads/wide/<name>.webp the 16:9 band of the original at its full
                                 width (1080 by 608), already cut at the
                                 creative's "wide" focus. For 16:9 slots
                                 wider than 280px, which only ever paint
                                 that band.
     hero  /ads/hero/<name>.webp 420px wide at the original aspect ratio:
                                 a lighter whole copy for a page's one large
                                 first-screen image, in a box up to 224px
                                 wide. It is what a phone fetches before the
                                 page counts as loaded, so it is kept small.
     full  the original file, untouched.

   Focus. A 9:16 creative carries its headline in the top or the bottom
   third and its product somewhere between, so a crop about the centre can
   cut the headline in half or lose the can. adFocus.json holds, per file
   name, where each shape of box sits instead: a vertical object-position,
   in percent, on the ORIGINAL image. One rule for every shape: the can and
   the person come first (the can whole or boldly cropped, a face never
   sliced), and the headline is whole or left out, never cut through.

     thumb   a square up to 64px: the can, and the face if there is one,
             with no half-cut type
     tile    a 4:5 box: the same, with any headline it shows clear of the
             chips a library tile lays over its top corners
     square  a large square: the same
     wide    a 16:9 box: the headline with the top of the product where both
             fit, otherwise the product alone

   A file with no entry sits at the centre (50). The table is the one place
   a focus is written down:

   - sm and wide are cut at their focus by the script that writes them
     (make-ad-variants.py reads the same JSON), so a painter shows them
     with the default centred object-position and nothing to restate.
   - md, hero and full hold the whole creative, so the painter positions them
     with adFocus(): AdThumb does it for its own boxes, a direct img passes
     the result as its object-position.

   After a change to the table, run the script again.

   No directive and no JSX, so sample.ts and client code can import it. */
import FOCUS from "./adFocus.json";

export type AdImageSize = "sm" | "md" | "wide" | "hero" | "full";
export type AdShape = "thumb" | "tile" | "square" | "wide";

const ORIGINAL = /^\/ads\/([^/]+)\.(?:jpe?g|png)$/;

const FOCUS_BY_FILE: Record<string, Partial<Record<AdShape, number>>> = FOCUS;

/** The path of a variant, from the path of an original. Anything that is not
    an original under /ads (a variant, another asset) is returned as it is. */
export function adImage(url: string, size: AdImageSize): string {
  if (size === "full") return url;
  const match = ORIGINAL.exec(url);
  return match ? `/ads/${size}/${match[1]}.webp` : url;
}

/** The object-position that frames the md or full copy of a creative in a
    box of the given shape, from the path of the original. Undefined when
    the centre is right, so the caller can leave the style off. */
export function adFocus(url: string, shape: AdShape): string | undefined {
  const match = ORIGINAL.exec(url);
  const y = match ? FOCUS_BY_FILE[match[1]]?.[shape] : undefined;
  return y == null || y === 50 ? undefined : `50% ${y}%`;
}
