"use client";

import { useSearchParams } from "next/navigation";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DemoForm } from "@/components/site/DemoForm";

export default function DemoClient() {
  const params = useSearchParams();
  const salesIntent = params?.get("intent") === "agency";

  return (
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <SiteNav current="demo" />

      <main className="flex-1 pt-32 pb-20 md:pt-40 px-6 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(60% 50% at 25% 20%, rgba(255,214,200,0.55) 0%, transparent 55%), radial-gradient(60% 50% at 85% 80%, rgba(168,210,255,0.45) 0%, transparent 60%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-[560px] mx-auto relative text-center">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-pb-fg-muted mb-3">
            {salesIntent ? "Agency plan" : "Get started"}
          </div>
          <h1 className="font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-fg mb-4">
            {salesIntent ? (
              <>Built for <span className="italic">agencies</span>.</>
            ) : (
              <>See it on <span className="italic">your</span> ad data.</>
            )}
          </h1>
          <p className="text-[15px] text-pb-fg-muted leading-relaxed mb-10 max-w-[440px] mx-auto">
            {salesIntent
              ? "Multi-client workspaces, per-client reporting, and pricing shaped to your roster. Tell us about your agency and we'll set up a walkthrough."
              : "Leave your details and we'll walk you through Peachblue live: your platforms connected, your creatives analyzed."}
          </p>

          <DemoForm salesIntent={salesIntent} showIntro={false} />

          <p className="mt-6 text-[12.5px] text-pb-fg-muted">
            Prefer email? Reach us at{" "}
            <a href="mailto:nick@peachblue.io" className="underline underline-offset-2 hover:text-pb-fg">
              nick@peachblue.io
            </a>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
