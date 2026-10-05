"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import posthog from "posthog-js";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { DemoForm } from "@/components/site/DemoForm";
import { CAL_LINK } from "@/lib/site";

const CAL_NAMESPACE = "demo";

export default function DemoClient() {
  const params = useSearchParams();
  const salesIntent = params?.get("intent") === "agency";
  const intent = salesIntent ? "agency" : "demo";
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": "#F27749" },
          dark: { "cal-brand": "#F27749" },
        },
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          if (posthog.__loaded) posthog.capture("demo_booked", { intent });
        },
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [intent]);

  return (
    <div className="flex flex-col min-h-screen bg-pb-bg">
      <SiteNav current="demo" />

      <main className="flex-1 pt-12 pb-20 md:pt-[72px] px-6">
        <div className="max-w-[560px] mx-auto text-center">
          <div className="text-[13px] font-semibold text-pb-peach-700 mb-3">
            {salesIntent ? "Agency plan" : "Get started"}
          </div>
          <h1 className="font-display text-[clamp(30px,5vw,44px)] leading-[1.08] font-medium tracking-[-0.015em] text-pb-ink text-balance mb-4">
            {salesIntent ? "Built for agencies." : "See it on your ad data."}
          </h1>
          <p className="text-[15px] text-pb-fg-secondary leading-relaxed mb-10 max-w-[440px] mx-auto">
            {salesIntent
              ? "Multi-client workspaces, per-client reporting, and pricing shaped to your roster. Pick a time and we'll walk through it with your client list in mind."
              : "Pick a time and we'll walk you through Peachblue live: your platforms connected, your creatives analyzed."}
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto">
          <div className="rounded-[10px] border border-pb-border bg-pb-card overflow-hidden min-h-[560px]">
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "light", "metadata[intent]": intent }}
            />
          </div>
        </div>

        <div className="max-w-[560px] mx-auto text-center mt-10">
          {showForm ? (
            <DemoForm salesIntent={salesIntent} showIntro={false} />
          ) : (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="rounded-sm text-[14px] font-semibold text-pb-fg underline underline-offset-4 decoration-pb-border-control hover:text-pb-peach-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-peach-500 focus-visible:ring-offset-2"
            >
              {salesIntent ? "No time that works? Tell us about your agency instead" : "No time that works? Send us a note instead"}
            </button>
          )}

          <p className="mt-6 text-[12.5px] text-pb-fg-muted">
            Prefer email? Reach us at{" "}
            <a href="mailto:nick@peachblue.io" className="underline underline-offset-2 decoration-pb-border-control hover:text-pb-peach-600 transition-colors">
              nick@peachblue.io
            </a>
          </p>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
