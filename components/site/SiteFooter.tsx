import { DEMO_HREF, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";
import { Logo, MEDIUM, Shell, T, TONE, TextLink, cx } from "./parts";

/* The site footer, the same on every page: the tagline, four column
   titles (as divs), sixteen links, the computed-year copyright line and
   the closing line.

   On the canvas, outside the rails: no fill and no border of its own.
   Titles are 13/18 at 500 in smoke; links are 14/21 at 500 in ink on a
   28px pitch and go to smoke under the pointer. */

/* The site's main internal-link block. Every label and href here is
   deliberate anchor text for search: restyle freely, do not reword. */
const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#product" },
      { label: "Pricing", href: "/pricing" },
      { label: TRIAL_LABEL, href: TRIAL_HREF },
      { label: "Book a demo", href: DEMO_HREF },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Meta ad analysis", href: "/integrations/meta" },
      { label: "TikTok ad analytics", href: "/integrations/tiktok" },
      { label: "Google Ads analytics", href: "/integrations/google-ads" },
      { label: "Amazon DSP reporting", href: "/integrations/amazon-dsp" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Docs", href: "/docs" },
      { label: "Your ad data in Claude", href: "/mcp" },
      { label: "Creative waste diagnostic", href: "/tools/creative-waste" },
      { label: "Amazon DSP pacing guide", href: "/blog/amazon-dsp-pacing-guide" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Contact", href: "mailto:nick@peachblue.io" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <Shell as="footer" className="el-footer">
      <div className="el-footer-grid">
        <div className="el-footer-brand">
          <div className="el-logo">
            <Logo />
          </div>
          <p className={cx(T.ui, TONE.smoke, "el-balance el-footer-tagline")}>Creative intelligence for Meta, TikTok, Google Ads, and Amazon DSP.</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <div className={cx(T.caption, MEDIUM, TONE.smoke)}>{col.title}</div>
            <ul className="el-footer-links">
              {col.links.map((l) => (
                <li key={l.label} className={cx(T.ui, MEDIUM, "el-balance")}>
                  <TextLink href={l.href}>{l.label}</TextLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="el-footer-foot">
        <div className={cx(T.caption, TONE.smoke)}>&copy; {new Date().getFullYear()} Peachblue Technologies Inc.</div>
        <div className={cx(T.caption, TONE.smoke)}>Know what ads work, and why.</div>
      </div>
    </Shell>
  );
}
