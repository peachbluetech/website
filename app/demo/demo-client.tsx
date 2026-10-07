"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Cal, { getCalApi } from "@calcom/embed-react";
import posthog from "posthog-js";
import { DemoForm } from "@/components/site/DemoForm";
import { PageHeader } from "@/components/site/kit";
import { Block, Card, Frame, Inner, Rule, Shell, T, TONE, TextButton, TextLink, cx } from "@/components/site/parts";
import { CAL_LINK } from "@/lib/site";
import "./demo.css";

const CAL_NAMESPACE = "demo";

/* The demo page under the nav. Three things, in the order of the HTML:

   1. The page header: the eyebrow, the h1 and the lead, split as every
      inner page's header is.
   2. The booking calendar, whole, in a white inner card on a taupe card
      that runs the width of the shell, as the homepage's hero panel
      does. It is the page's one object and stands outside the frame.
   3. One slim band in the frame: the way to write to us instead (a
      note, which opens the lead form in its place) and the address.

   The calendar is the booking service's own embed: its link, its
   namespace, what it is told about the visit and the event it reports
   are unchanged. The service draws it inside a frame of its own, so the
   system's tokens do not reach it. Two things are passed in when it
   loads: the fill of a chosen day and of its own button, read from the
   page's navy token (the filled pill's colour), and no outline of its
   own, since the inner card is its edge. The service lays itself out by
   the width it is given: three panes side by side from 960px, and one
   tall column under that, so the inner card is either at least that
   wide or held to a narrow column (demo.css).

   `?intent=agency` switches the words to the agency variant. */
export default function DemoClient() {
  const params = useSearchParams();
  const salesIntent = params?.get("intent") === "agency";
  const intent = salesIntent ? "agency" : "demo";
  const [showForm, setShowForm] = useState(false);
  const card = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      const fill = card.current ? getComputedStyle(card.current).getPropertyValue("--el-navy").trim() : "";
      const vars = { ...(fill ? { "cal-brand": fill } : {}), "cal-border-booker": "transparent" };
      cal("ui", {
        theme: "light",
        layout: "month_view",
        hideEventTypeDetails: false,
        cssVarsPerTheme: { light: vars, dark: vars },
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
    <>
      <PageHeader
        eyebrow={salesIntent ? "Agency plan" : "Get started"}
        title={salesIntent ? "Built for agencies." : "See it on your ad data."}
        lead={
          salesIntent
            ? "Multi-client workspaces, per-client reporting, and pricing shaped to your roster. Pick a time and we'll walk through it with your client list in mind."
            : "Pick a time and we'll walk you through Peachblue live: your platforms connected, your creatives analyzed."
        }
        bottom="gap"
      />

      <Shell>
        <Block inset="none" bottom="band">
          <div ref={card}>
            <Card variant="bare" className="el-demo-card">
              <Inner flush className="el-demo-window">
                <Cal
                  namespace={CAL_NAMESPACE}
                  calLink={CAL_LINK}
                  style={{ width: "100%", height: "100%", overflow: "scroll" }}
                  config={{ layout: "month_view", theme: "light", "metadata[intent]": intent }}
                />
              </Inner>
            </Card>
          </div>
        </Block>
      </Shell>

      <Frame>
        <Rule />
        <Block top="band" bottom="band">
          <div className={cx("el-demo-alt", showForm && "el-demo-alt--form")}>
            {showForm ? (
              <DemoForm salesIntent={salesIntent} showIntro={false} />
            ) : (
              <p className={T.body}>
                <TextButton className="el-body" onClick={() => setShowForm(true)}>
                  {salesIntent ? "No time that works? Tell us about your agency instead" : "No time that works? Send us a note instead"}
                </TextButton>
              </p>
            )}

            <p className={cx(T.body, TONE.smoke)}>
              Prefer email? Reach us at{" "}
              <TextLink href="mailto:nick@peachblue.io" underline>
                nick@peachblue.io
              </TextLink>
            </p>
          </div>
        </Block>
        <Rule />
      </Frame>
    </>
  );
}
