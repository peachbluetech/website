import type { ReactNode } from "react";
import { cx } from "../ui/cx";

/* Tile: the marketing frame for a product visual. A flat rectangle in the
   product's stone, set on the site's cream. 10px radius, no border, no
   shadow, 32px of padding. It crops its child: pass bleed to drop the
   padding on one side so a table runs off the right edge or a tall panel
   runs off the bottom (the bleed side wins over any padding the page
   passes). Give it a width and height from the page (className) and put
   one Shot inside it at its design width. */
export function Tile({
  className,
  bleed = "none",
  children,
}: {
  className?: string;
  /** The side the child runs off. That side has no padding. */
  bleed?: "right" | "bottom" | "none";
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "bg-pb-stone rounded-[10px] overflow-hidden p-8",
        className,
        bleed === "right" && "pr-0!",
        bleed === "bottom" && "pb-0!",
      )}
    >
      {children}
    </div>
  );
}
