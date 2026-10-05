"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { PeachblueMark } from "./PeachblueMark";
import { DEMO_HREF, NAV_CTA_LABEL, TRIAL_HREF } from "@/lib/site";

/**
 * The site nav: one component for every page, the homepage included, so the
 * row never moves between pages.
 *
 * A flat sticky row in normal flow on the paper ground, with a navy hairline
 * under it. The row is 64px tall (72px from lg) plus the hairline, and its
 * content sits in the homepage's frame: a 1312px column with 16px gutters on
 * a phone, 32px from sm and 64px from lg. A page needs no top padding to
 * clear it. Anchored sections and sticky sidebars should offset by 80px or
 * more (the page's scroll padding is set in globals.css).
 *
 * From lg: logo, the six links, then "Book a demo" as an outlined button and
 * the peach primary button. Under lg: logo, primary button, hamburger; the
 * hamburger opens a flat card with the same six links plus "Book a demo".
 * Tapping a link closes the card (an in-page link such as /#product on the
 * homepage included), and so does Escape or a press outside the nav. Under
 * 360px the gaps and the button tighten so the row still fits at 320.
 *
 * Corners are 4px; the logo tile is the row's one gradient. Every colour is
 * a site token from globals.css, so the row looks the same on every page
 * whatever the page sets for itself. The values are the homepage's light
 * tone (components/home/theme.ts): change them in both places.
 *
 * Section links (Product, Platforms, FAQ) are homepage anchors, so they are
 * prefixed with "/" to work from any page. The link set is the site's main
 * internal navigation: restyle freely, do not reword or re-point.
 *
 * On the homepage those links and the logo point at the page the reader is
 * already on, and a link to the address already in the bar does not scroll.
 * So there the row scrolls itself (`jumpOnHome`): a section link goes to its
 * section every time it is pressed, and the logo goes to the top. The hrefs
 * are untouched and the link still navigates as before; from any other page
 * nothing changes.
 *
 * A client component for the menu's open state only. The row itself is
 * fully server-rendered, so every link is in the HTML before any script.
 */

const LINKS = [
  { label: "Product", href: "/#product" },
  { label: "Platforms", href: "/#platforms" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Docs", href: "/docs" },
  { label: "FAQ", href: "/#faq" },
];

const PAGE_HREF: Record<string, string> = {
  pricing: "/pricing",
  blog: "/blog",
  docs: "/docs",
  demo: DEMO_HREF,
};

const MENU_ID = "site-nav-menu";

/* A plain press on a link to the homepage, made on the homepage: scroll to
   the section the link names, or to the top for the logo. Left alone: a
   press with a modifier key or another button (a new tab), every other
   page, and every link that is not "/" or "/#id". The section lands under
   the nav by the page's scroll padding (globals.css).

   A section link is not taken over: the router still navigates to it, and
   this only adds the scroll the router skips when the address is unchanged.
   The logo is taken over, because the router keeps the last section it
   scrolled to and would return there on a link to "/" with no section in
   it. So the logo's own press sets the address to "/" and scrolls to the
   top, which is where a plain link to "/" would leave the reader. */
function jumpOnHome(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (window.location.pathname !== "/") return;
  if (href === "/") {
    e.preventDefault();
    if (window.location.hash || window.location.search) window.history.pushState(null, "", "/");
    window.scrollTo({ top: 0 });
  } else if (href.startsWith("/#")) {
    document.getElementById(href.slice(2))?.scrollIntoView();
  }
}

const FOCUS_RING =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pb-peach-700";
/* The same ring drawn inside a menu row, so it stays clear of the card's edge. */
const FOCUS_IN =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-pb-peach-700";

/* The current page's link is set in the accent, the colour every link takes
   under the pointer. */
const ROW_LINK = "rounded-sm transition-colors duration-150 hover:text-pb-peach-700";
const MENU_LINK =
  "block rounded-[4px] px-3 py-3 text-[15px] font-medium transition-colors duration-150 hover:bg-pb-paper-2";

export function SiteNav({ current }: { current?: "pricing" | "demo" | "blog" | "docs" }) {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const currentHref = current ? PAGE_HREF[current] : undefined;
  const onDemo = currentHref === DEMO_HREF;
  const close = () => setOpen(false);

  /* While the menu is open: Escape closes it from anywhere on the page and
     hands focus back to the hamburger; a press outside the nav closes it. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (e.target instanceof Node && navRef.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <nav ref={navRef} className="sticky top-0 z-50 w-full shrink-0 border-b border-pb-rule bg-pb-bg">
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="relative mx-auto flex h-16 w-full max-w-[1312px] items-center lg:h-[72px]">
          <Link
            href="/"
            aria-label="Peachblue home"
            onClick={(e) => {
              jumpOnHome(e, "/");
              close();
            }}
            className={`flex shrink-0 items-center gap-2.5 rounded-[4px] ${FOCUS_RING}`}
          >
            {/* The logo tile: the row's one gradient and its one 6px corner. */}
            <span className="pb-logo flex size-8 items-center justify-center rounded-[6px]">
              <PeachblueMark size={18} color="#ffffff" />
            </span>
            <span className="font-display text-[18px] font-semibold tracking-tight text-pb-ink">
              peachblue
            </span>
          </Link>

          {/* The link row, from lg. Always in the HTML. */}
          <div className="ml-14 hidden items-center gap-8 text-[14px] font-medium text-pb-ink lg:flex">
            {LINKS.map((l) => {
              const here = currentHref === l.href;
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={(e) => jumpOnHome(e, l.href)}
                  aria-current={here ? "page" : undefined}
                  className={`${ROW_LINK} ${FOCUS_RING}${here ? " text-pb-peach-700" : ""}`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="ml-auto flex items-center gap-3 pl-3 max-[359px]:gap-2 max-[359px]:pl-2">
            <span className="hidden lg:block">
              <Link
                href={DEMO_HREF}
                aria-current={onDemo ? "page" : undefined}
                className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[4px] border bg-pb-card px-4 text-[14px] font-medium text-pb-ink transition-colors duration-150 hover:border-pb-ink ${
                  onDemo ? "border-pb-ink" : "border-pb-line"
                } ${FOCUS_RING}`}
              >
                Book a demo
              </Link>
            </span>
            {/* The one peach action. Its label is dark: never light type on peach. */}
            <a
              href={TRIAL_HREF}
              className={`inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-[4px] bg-pb-peach-500 px-4 text-[14px] font-semibold text-pb-ink-deep transition-colors duration-150 hover:bg-[color-mix(in_srgb,var(--color-pb-peach-500)_84%,white)] max-[359px]:px-2.5 max-[359px]:text-[12.5px] ${FOCUS_RING}`}
            >
              {NAV_CTA_LABEL}
            </a>

            {/* The hamburger, under lg. */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={MENU_ID}
              aria-label={open ? "Close menu" : "Open menu"}
              className={`flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-[4px] border border-pb-line bg-pb-card text-pb-ink transition-colors duration-150 hover:border-pb-ink lg:hidden ${FOCUS_RING}`}
            >
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path d={open ? "M4.5 4.5l11 11M15.5 4.5l-11 11" : "M3 5.75h14M3 10h14M3 14.25h14"} />
              </svg>
            </button>
          </div>

          {/* The phone menu: a flat card over the page, under the row, as
              wide as the frame. Rendered only while it is open; the same
              links are always in the row above. */}
          {open && (
            <div id={MENU_ID} className="absolute inset-x-0 top-full pt-2 lg:hidden">
              <div className="rounded-[4px] border border-pb-line bg-pb-card p-2">
                {LINKS.map((l) => {
                  const here = currentHref === l.href;
                  return (
                    <Link
                      key={l.label}
                      href={l.href}
                      onClick={(e) => {
                        jumpOnHome(e, l.href);
                        close();
                      }}
                      aria-current={here ? "page" : undefined}
                      className={`${MENU_LINK} ${here ? "text-pb-peach-700" : "text-pb-ink"} ${FOCUS_IN}`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
                <Link
                  href={DEMO_HREF}
                  onClick={close}
                  aria-current={onDemo ? "page" : undefined}
                  className={`${MENU_LINK} ${onDemo ? "text-pb-peach-700" : "text-pb-ink"} ${FOCUS_IN}`}
                >
                  Book a demo
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
