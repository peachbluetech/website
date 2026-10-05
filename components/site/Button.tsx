import type { ComponentPropsWithoutRef, ReactNode } from "react";

/* The marketing site's actions, as real links. Three treatments and no
   others: a flat peach primary, the app's outline for the secondary, and a
   text link with a trailing arrow for everything else. No gradient, no
   shadow, no hover lift. Labels and hrefs come from lib/site.ts at the
   call site, never from here.

   The primary's label is the deep navy, as on the nav's button and the
   homepage's: never light type on peach (white on this peach is about 3 to
   1, under the 4.5 to 1 that text of this size needs). Under the pointer
   the ground lightens, as theirs does. The corners stay the inner pages'
   8px; the nav and the homepage are 4px.

   Each takes an `arrow` prop. The arrow is a text character inside the
   anchor, so the anchor's text content stays "Label →" as it is on the
   live site, and it is hidden from assistive tech so the accessible name is
   the label alone. It never moves on hover. TextLink shows it unless told
   not to; the two buttons show it only when asked. */

type Size = "md" | "sm";

type LinkProps = {
  href: string;
  children: ReactNode;
  size?: Size;
  className?: string;
  arrow?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pb-peach-700";

/* 44px for the page, 40px for the nav. */
const PRIMARY_SIZE: Record<Size, string> = {
  md: "h-11 px-5 text-[15px]",
  sm: "h-10 px-4 text-[13.5px]",
};
const OUTLINE_SIZE = PRIMARY_SIZE;
const TEXT_SIZE: Record<Size, string> = {
  md: "text-[14px]",
  sm: "text-[13px]",
};

function join(...parts: (string | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/* The space is a real text node, so the anchor reads "Label →" with the
   space in it; the flex gap does the visual spacing. */
function TrailingArrow() {
  return (
    <>
      {" "}
      <span aria-hidden="true">&rarr;</span>
    </>
  );
}

export function PrimaryLink({
  href,
  children,
  size = "md",
  className,
  arrow = false,
  ...rest
}: LinkProps) {
  return (
    <a
      href={href}
      className={join(
        "inline-flex items-center justify-center gap-2 rounded-lg bg-pb-peach-500 text-pb-ink-deep font-semibold hover:bg-[color-mix(in_srgb,var(--color-pb-peach-500)_84%,white)] transition-colors",
        PRIMARY_SIZE[size],
        FOCUS_RING,
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <TrailingArrow />}
    </a>
  );
}

export function OutlineLink({
  href,
  children,
  size = "md",
  className,
  arrow = false,
  ...rest
}: LinkProps) {
  return (
    <a
      href={href}
      className={join(
        "inline-flex items-center justify-center gap-2 rounded-lg border border-pb-border-control bg-pb-card text-pb-fg font-medium hover:bg-pb-muted transition-colors",
        OUTLINE_SIZE[size],
        FOCUS_RING,
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <TrailingArrow />}
    </a>
  );
}

/* Inline link with a trailing arrow. Pass arrow={false} for a bare text
   link. */
export function TextLink({
  href,
  children,
  size = "md",
  className,
  arrow = true,
  ...rest
}: LinkProps) {
  return (
    <a
      href={href}
      className={join(
        "inline-flex items-center gap-1.5 rounded-sm font-semibold text-pb-fg hover:text-pb-peach-700 transition-colors",
        TEXT_SIZE[size],
        FOCUS_RING,
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && <TrailingArrow />}
    </a>
  );
}
