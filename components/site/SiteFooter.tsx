import Link from "next/link";
import { PeachblueMark } from "./PeachblueMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-pb-border py-8 px-6">
      <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-md pb-gradient-peach flex items-center justify-center">
            <PeachblueMark size={14} color="#ffffff" />
          </div>
          <span className="font-display text-[14px] font-semibold tracking-tight">peachblue</span>
        </div>
        <div className="text-[12px] text-pb-fg-muted">&copy; {new Date().getFullYear()} Peachblue Technologies Inc.</div>
        <div className="flex gap-4 text-[12px] text-pb-fg-muted flex-wrap justify-center">
          <Link href="/pricing" className="hover:text-pb-fg transition-colors">Pricing</Link>
          <Link href="/demo" className="hover:text-pb-fg transition-colors">Book a demo</Link>
          <Link href="/privacy" className="hover:text-pb-fg transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-pb-fg transition-colors">Terms of Service</Link>
          <a href="mailto:nick@peachblue.io" className="hover:text-pb-fg transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
