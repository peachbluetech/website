import Link from "next/link";
import { PeachblueMark } from "./PeachblueMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-pb-border py-8 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex gap-x-4 gap-y-2 text-[12px] text-pb-fg-muted flex-wrap justify-center sm:justify-start mb-6 pb-6 border-b border-pb-border/60">
          <span className="font-semibold text-pb-fg">Platforms</span>
          <Link href="/integrations/meta" className="hover:text-pb-fg transition-colors">Meta ad analysis</Link>
          <Link href="/integrations/tiktok" className="hover:text-pb-fg transition-colors">TikTok ad analytics</Link>
          <Link href="/integrations/google-ads" className="hover:text-pb-fg transition-colors">Google Ads analytics</Link>
          <Link href="/integrations/amazon-dsp" className="hover:text-pb-fg transition-colors">Amazon DSP reporting</Link>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md pb-gradient-peach flex items-center justify-center">
              <PeachblueMark size={14} color="#ffffff" />
            </div>
            <span className="font-display text-[14px] font-semibold tracking-tight">peachblue</span>
          </div>
          <div className="text-[12px] text-pb-fg-muted">&copy; {new Date().getFullYear()} Peachblue Technologies Inc.</div>
          <div className="flex gap-4 text-[12px] text-pb-fg-muted flex-wrap justify-center">
            <Link href="/pricing" className="hover:text-pb-fg transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-pb-fg transition-colors">Blog</Link>
            <Link href="/docs" className="hover:text-pb-fg transition-colors">Docs</Link>
            <Link href="/demo" className="hover:text-pb-fg transition-colors">Book a demo</Link>
            <Link href="/privacy" className="hover:text-pb-fg transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-pb-fg transition-colors">Terms of Service</Link>
            <a href="mailto:nick@peachblue.io" className="hover:text-pb-fg transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
