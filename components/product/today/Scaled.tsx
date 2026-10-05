import type { ReactNode } from "react";
import { cx } from "@/components/product/ui";

/* Scaled: a fixed-width recreation painted smaller, for a slot narrower
   than its design width (a phone column). The child is laid out at its
   design width and height, so nothing wraps or moves, and the whole
   picture is then scaled from its top left corner. The outer box takes
   the scaled size, so the page around it flows normally.

   It is a frame, not part of the product: put the Shot inside it and the
   whole thing inside a Tile. Pass the child's natural height at that
   design width (each export's comment gives it). Type gets small quickly:
   at 0.6 the navy sentence is 8.4px, so keep the factor as high as the
   slot allows and prefer a crop when the words have to be read. */
export function Scaled({
  width,
  height,
  to,
  className,
  children,
}: {
  /** The child's design width in px. */
  width: number;
  /** The child's natural height at that width in px. */
  height: number;
  /** The width to paint it at, in px. */
  to: number;
  className?: string;
  children: ReactNode;
}) {
  const scale = to / width;
  return (
    <div className={cx("overflow-hidden", className)} style={{ width: to, height: Math.ceil(height * scale) }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: "0 0" }}>{children}</div>
    </div>
  );
}
