import type { ReactNode } from "react";
import { cx } from "../ui/cx";

/* Shot: the wrapper every product recreation is rendered in. It applies
   the product scope (.pb-app: stone ground, the app's tokens and radii),
   hides the picture from assistive tech, the tab order and search
   snippets, and gives it one sentence of text alternative instead. The
   alternative is for assistive tech: it names sample figures and dates,
   so it is kept out of search snippets too (data-nosnippet is honoured on
   span, div and section, hence the span inside the caption).
   A recreation is a picture, not a second page: describe it in label and
   put indexable copy about the product in real text beside it.
   A Shot can sit anywhere on the site, including inside the long-form
   prose containers (.prose-pb, .prose-pb-lg): their element rules in
   app/globals.css skip everything inside the product scope. */
export function Shot({
  label,
  width,
  ground = true,
  className,
  children,
}: {
  /** Text alternative: one sentence saying what the picture shows. */
  label: string;
  /** The recreation's design width in px. Omit to fill the container. */
  width?: number;
  /** Paint the stone ground. Pass false inside a Tile or around an AppWindow, which bring their own. */
  ground?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className="m-0">
      <div
        className={cx("pb-app", className)}
        aria-hidden="true"
        inert
        data-nosnippet=""
        style={{ width, backgroundColor: ground ? undefined : "transparent" }}
      >
        {children}
      </div>
      <figcaption className="sr-only"><span data-nosnippet="">{label}</span></figcaption>
    </figure>
  );
}
