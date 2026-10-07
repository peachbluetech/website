import type { Metadata } from "next";
import { Suspense } from "react";
import { SitePage } from "@/components/site/SitePage";
import DemoClient from "./demo-client";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Get a guided walkthrough of Peachblue on your own ad data: creative analysis, Agent Peach, and cross-platform reporting.",
  alternates: { canonical: "/demo" },
};

/* Book a demo. The shell, the nav and the footer are the server's; what
   stands between them (demo-client.tsx) reads the visit's intent from
   the address, so it is a client component behind a Suspense boundary,
   as it always was. */
export default function DemoPage() {
  return (
    <SitePage current="demo">
      <Suspense>
        <DemoClient />
      </Suspense>
    </SitePage>
  );
}
