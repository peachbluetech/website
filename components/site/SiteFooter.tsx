import Link from "next/link";
import { PeachblueMark } from "./PeachblueMark";
import { DEMO_HREF, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";

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

/* Keyboard focus shows the same peach ring as the nav and the buttons. */
const LINK_CLASS =
  "rounded-sm text-pb-fg-secondary hover:text-pb-fg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pb-peach-700";

export function SiteFooter() {
  return (
    <footer className="border-t border-pb-border bg-pb-bg px-6 pt-14 pb-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[repeat(4,max-content)] md:justify-between lg:grid-cols-[minmax(0,1fr)_repeat(4,max-content)] xl:grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] gap-x-8 lg:gap-x-10 xl:gap-x-8 gap-y-10 mb-12">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              {/* The logo square: the one gradient on the site. */}
              <div className="size-7 rounded-lg pb-logo flex items-center justify-center">
                <PeachblueMark size={16} color="#ffffff" />
              </div>
              <span className="font-display text-[15px] font-semibold tracking-tight text-pb-fg">peachblue</span>
            </div>
            <p className="text-[14px] leading-[1.55] text-pb-fg-secondary max-w-[260px]">
              Creative intelligence for Meta, TikTok, Google Ads, and Amazon DSP.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-[13px] font-semibold text-pb-fg mb-3.5">
                {col.title}
              </div>
              <ul className="space-y-3 text-[14px] leading-[1.4]">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link href={l.href} className={LINK_CLASS}>
                        {l.label}
                      </Link>
                    ) : (
                      <a href={l.href} className={LINK_CLASS}>
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-pb-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="text-[12.5px] text-pb-fg-muted">
            &copy; {new Date().getFullYear()} Peachblue Technologies Inc.
          </div>
          <div className="text-[12.5px] text-pb-fg-muted">
            Know what ads work, and why.
          </div>
        </div>
      </div>
    </footer>
  );
}
