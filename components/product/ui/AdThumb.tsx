import type { CSSProperties } from "react";
import { adFocus, adImage } from "./adImage";
import type { AdImageSize, AdShape } from "./adImage";
import { cx } from "./cx";

/* AdThumb: the creative thumbnail. An explicit aspect box on the muted
   ground with the image cropped to cover it, never letterboxed. With no
   image it falls back to the app's flat tinted swatch with the headline.
   The sample creatives are all still images, so there is no play glyph.
   Radius 8px (rounded-xl inside the product scope); callers pass
   "rounded-lg size-10 shrink-0" for the 40px row thumbnail.

   The image it requests is a resized copy of the creative (see adImage.ts),
   chosen with the size prop: "sm" for a square box up to 64px wide, "md"
   (the default) for anything up to about 280px wide, "wide" for a 16:9 box
   wider than that, "hero" for a page's one large first-screen image (a
   lighter whole copy, for a box up to 224px wide), "full" for the original
   file. Pass the original path;
   the copy is derived from it.

   Where the crop sits. "sm" and "wide" are files already cut at the
   creative's focus, so they are painted centred. "md", "hero" and "full" hold the
   whole creative, and a square, 4:5 or 16:9 box positions them at the
   creative's focus for that shape (adFocus, from adFocus.json) instead of
   the centre, so the box shows the can and the person, with the headline
   whole or not at all. The position reaches
   the img as a custom property read by one class, not as an inline
   object-position, so a caller's own "[&>img]:object-[...]" on the box
   still wins. A portrait box shows the whole 9:16 creative, and a 4:3 box
   has no focus of its own: both stay centred. */
export type ThumbRatio = "square" | "portrait" | "four-five" | "landscape" | "wide";

const RATIO_CLASS: Record<ThumbRatio, string> = {
  square: "aspect-square",
  portrait: "aspect-[9/16]",
  "four-five": "aspect-[4/5]",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/9]",
};

/* The focus each box shape reads from the table. */
const RATIO_SHAPE: Partial<Record<ThumbRatio, AdShape>> = {
  square: "square",
  "four-five": "tile",
  wide: "wide",
};

/* Intrinsic size hints for the img element; CSS sizes the box. */
const RATIO_SIZE: Record<ThumbRatio, [number, number]> = {
  square: [400, 400],
  portrait: [360, 640],
  "four-five": [400, 500],
  landscape: [400, 300],
  wide: [640, 360],
};

const ACCENT_PALETTE = [
  "#E8724A", "#3B6FE0", "#D89B6B", "#6B8BE3", "#E8A87C",
  "#8796D9", "#C77D4A", "#5E7FCF", "#E3B597", "#7990CC",
];

function seedToAccent(seed?: string): string {
  if (!seed) return ACCENT_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  return ACCENT_PALETTE[Math.abs(hash) % ACCENT_PALETTE.length];
}

export function AdThumb({
  imageUrl,
  src,
  headline,
  seed,
  ratio = "square",
  fit = "cover",
  size = "md",
  priority = false,
  className,
}: {
  /** Path under /public, for example a sample creative's image. */
  imageUrl?: string | null;
  /** Alias of imageUrl. */
  src?: string | null;
  /** Shown on the swatch when there is no image. */
  headline?: string | null;
  /** Stable seed for the swatch colour. */
  seed?: string;
  ratio?: ThumbRatio;
  /** "contain" letterboxes the image in the well instead of cropping it. */
  fit?: "cover" | "contain";
  /** Which copy of the image to request. "sm" only in a square box up to 64px wide; "wide" only with ratio "wide". */
  size?: AdImageSize;
  /** Load the image eagerly at high fetch priority. Only for a picture that is on screen when the page opens and may be its largest element; everything else stays lazy. */
  priority?: boolean;
  className?: string;
}) {
  const original = imageUrl ?? src ?? null;
  const url = original ? adImage(original, size) : null;
  const [w, h] = RATIO_SIZE[ratio];
  const shape = RATIO_SHAPE[ratio];
  const whole = size === "md" || size === "hero" || size === "full";
  const focus = original && shape && whole && fit === "cover" ? adFocus(original, shape) : undefined;
  return (
    <div className={cx("relative overflow-hidden rounded-xl bg-pb-muted", RATIO_CLASS[ratio], className)}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          width={w}
          height={h}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
          className={cx("absolute inset-0 w-full h-full", fit === "contain" ? "object-contain bg-pb-muted-2" : "object-cover object-(--ad-focus)")}
          style={focus ? ({ "--ad-focus": focus } as CSSProperties) : undefined}
        />
      ) : (
        <>
          <div className="absolute inset-0" style={{ background: `${seedToAccent(seed || headline || "ad")}33` }} />
          {headline && (
            <div className="absolute inset-0 flex items-center justify-center px-3 text-center">
              <div className="text-[11px] font-medium leading-tight line-clamp-3 text-white/95">{headline}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
