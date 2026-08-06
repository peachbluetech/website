import type { Metadata } from "next";
import PricingClient from "./pricing-client";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans that scale with your ad spend. Every plan starts with a 7-day trial — multi-platform sync, AI creative analysis, and Agent Peach included.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return <PricingClient />;
}
