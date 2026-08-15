import Link from "next/link";
import { PeachblueMark } from "./PeachblueMark";
import { DEMO_HREF, TRIAL_HREF, TRIAL_LABEL } from "@/lib/site";

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
      { label: "Your ad data in Claude", href: "/docs/mcp" },
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
    <footer className="border-t border-pb-border pt-12 pb-8 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="size-7 rounded-lg pb-gradient-peach flex items-center justify-center">
                <PeachblueMark size={16} color="#ffffff" />
              </div>
              <span className="font-display text-[15px] font-semibold tracking-tight">peachblue</span>
            </div>
            <p className="text-[12px] text-pb-fg-muted leading-relaxed max-w-[200px]">
              Creative intelligence for Meta, TikTok, Google Ads, and Amazon DSP.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-pb-fg mb-3">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="text-[12.5px] text-pb-fg-muted hover:text-pb-fg transition-colors"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="text-[12.5px] text-pb-fg-muted hover:text-pb-fg transition-colors"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-pb-border/60 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-[12px] text-pb-fg-muted">
            &copy; {new Date().getFullYear()} Peachblue Technologies Inc.
          </div>
          <div className="text-[12px] text-pb-fg-muted">
            Know what ads work, and why.
          </div>
        </div>
      </div>
    </footer>
  );
}
