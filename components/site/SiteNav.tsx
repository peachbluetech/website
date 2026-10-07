import Link from "next/link";
import { DEMO_HREF, NAV_CTA_LABEL, TRIAL_HREF } from "@/lib/site";
import { Logo, Pill } from "./parts";
import { SiteNavScript } from "./SiteNavScript";

/* The site nav: one component for every page, the homepage included, so
   the bar never moves between pages. Do not give a page its own nav.

   A full-bleed sticky bar, 64px, on the canvas, its content in the
   shell. No line at the top of the page; over the first 64px of scroll
   it takes a white ground and a rail-coloured line (system.css; where a
   browser cannot link that to scroll the line is always there). A page
   needs no top padding to clear it. Anchored sections and sticky
   sidebars should offset by 80px or more (the page's scroll padding is
   set in globals.css).

   One list in the HTML, laid out twice by CSS, so no link is duplicated:
   - from 1024: logo, the six links as a row, "Book a demo" as a white
     pill, the trial link as the filled pill;
   - under 1024: logo, the filled pill, a menu button. The button opens
     the same list as a sheet through the popover attribute: it opens
     without script, Escape and a press outside close it, and "Book a
     demo" is the pill at the sheet's foot.

   Section links (Product, Platforms, FAQ) are homepage anchors, so they
   are prefixed with "/" to work from any page. The link set is the
   site's main internal navigation: restyle freely, do not reword or
   re-point. A page passes `current` to mark itself: its link carries
   aria-current and rests on the hover plate.

   A server component: every link is in the HTML before any script. The
   two things markup cannot do are in SiteNavScript. */

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

const NAV_ID = "site-nav";
const MENU_ID = "site-nav-menu";

export function SiteNav({ current }: { current?: "pricing" | "demo" | "blog" | "docs" }) {
  const currentHref = current ? PAGE_HREF[current] : undefined;
  return (
    <nav id={NAV_ID} className="el-nav">
      <div className="el-shell el-nav-in">
        <Link href="/" aria-label="Peachblue home" className="el-logo">
          <Logo />
        </Link>
        <ul id={MENU_ID} popover="auto" className="el-nav-list">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link href={l.href} aria-current={currentHref === l.href ? "page" : undefined} className="el-nav-link">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="el-nav-demo">
            <Pill href={DEMO_HREF} variant="outline" current={currentHref === DEMO_HREF}>
              Book a demo
            </Pill>
          </li>
        </ul>
        <Pill href={TRIAL_HREF} size="sm" className="el-nav-cta">
          {NAV_CTA_LABEL}
        </Pill>
        <button type="button" popoverTarget={MENU_ID} aria-label="Menu" className="el-menu-btn" />
      </div>
      <SiteNavScript navId={NAV_ID} menuId={MENU_ID} />
    </nav>
  );
}
