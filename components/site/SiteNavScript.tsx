"use client";

import { useEffect } from "react";

/* The nav's only script. The bar is server-rendered and every link in
   it works without this; it adds the two things markup cannot do. It
   renders nothing and listens for presses on the nav's links.

   1. The phone menu closes when one of its links is pressed. The sheet
      is a popover, and a link to a section of the page the reader is
      already on (/#product on the homepage) does not leave the page, so
      without this the sheet would stay open over the section.

   2. On the homepage, the section links and the logo point at the page
      the reader is already on, and a link to the address already in the
      bar does not scroll. So there a section link goes to its section
      every time it is pressed, and the logo goes to the top. A section
      link is not taken over: the router still navigates to it, and this
      only adds the scroll the router skips when the address is
      unchanged. The logo is taken over, because the router keeps the
      last section it scrolled to and would return there on a link to
      "/" with no section in it; its press sets the address to "/" and
      scrolls to the top, which is where a plain link to "/" would leave
      the reader. The section lands under the bar by the page's scroll
      padding (globals.css).

   Left alone: a press with a modifier key or another button (a new
   tab), and on every other page every link's own navigation. The hrefs
   are never changed. */
export function SiteNavScript({ navId, menuId }: { navId: string; menuId: string }) {
  useEffect(() => {
    const nav = document.getElementById(navId);
    if (!nav) return;
    const onClick = (e: MouseEvent) => {
      const link = e.target instanceof Element ? e.target.closest("a") : null;
      if (!link || !nav.contains(link)) return;
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const menu = document.getElementById(menuId);
      try {
        if (menu?.matches(":popover-open")) menu.hidePopover();
      } catch {
        /* A browser without popovers has no sheet to close. */
      }

      if (window.location.pathname !== "/") return;
      const href = link.getAttribute("href") ?? "";
      if (href === "/") {
        e.preventDefault();
        if (window.location.hash || window.location.search) window.history.pushState(null, "", "/");
        window.scrollTo({ top: 0 });
      } else if (href.startsWith("/#")) {
        document.getElementById(href.slice(2))?.scrollIntoView();
      }
    };
    nav.addEventListener("click", onClick);
    return () => nav.removeEventListener("click", onClick);
  }, [navId, menuId]);
  return null;
}
