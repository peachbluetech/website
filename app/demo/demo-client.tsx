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
              ? "Multi-client workspaces, per-client reporting, and pricing shaped to your roster. Pick a time and we'll walk through it with your client list in mind."
              : "Pick a time and we'll walk you through Peachblue live: your platforms connected, your creatives analyzed."}
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto relative">
          <div className="rounded-2xl border border-pb-border bg-pb-card shadow-pb-soft overflow-hidden min-h-[560px]">
            <Cal
              namespace={CAL_NAMESPACE}
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", overflow: "scroll" }}
              config={{ layout: "month_view", theme: "light", "metadata[intent]": intent }}
            />
          </div>
        </div>

        <div className="max-w-[560px] mx-auto relative text-center mt-10">
          {showForm ? (
            <DemoForm salesIntent={salesIntent} showIntro={false} />
          ) : (
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="text-[13.5px] font-medium text-pb-fg underline underline-offset-4 decoration-pb-border hover:decoration-pb-fg transition-colors"
            >
              {salesIntent ? "No time that works? Tell us about your agency instead" : "No time that works? Send us a note instead"}
            </button>
          )}

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
