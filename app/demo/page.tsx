import type { Metadata } from "next";
import { Suspense } from "react";
import DemoClient from "./demo-client";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Get a guided walkthrough of Peachblue on your own ad data — creative analysis, Agent Peach, and cross-platform reporting.",
  alternates: { canonical: "/demo" },
};

export default function DemoPage() {
  return (
    <Suspense>
      <DemoClient />
    </Suspense>
  );
}
