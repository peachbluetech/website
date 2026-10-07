"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Badge, Segmented, SegmentedButton } from "@/components/site/kit";
import { Pill } from "@/components/site/parts";

/* The pricing page's one piece of state: the billing period. The page
   itself is server-rendered; these four small pieces are the only client
   code on it. The server sends the monthly figures and the monthly signup
   links, so the page reads the same with or without JavaScript, and the
   toggle swaps the figures and the links once it is running. */

export type Billing = "monthly" | "annual";

const BillingContext = createContext<{
  billing: Billing;
  setBilling: (billing: Billing) => void;
}>({ billing: "monthly", setBilling: () => {} });

/* Holds the billing period for everything inside it. The children are
   server-rendered and passed straight through. */
export function BillingProvider({ children }: { children: ReactNode }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  return <BillingContext.Provider value={{ billing, setBilling }}>{children}</BillingContext.Provider>;
}

const PERIODS: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

/* The Monthly / Annual control: the system's segmented choice, 44px. The
   period that is on is the white raised pill. The saving is a small
   badge inside the Annual button: white while the button rests on the
   taupe, taupe once the button itself is the white one. */
export function BillingToggle() {
  const { billing, setBilling } = useContext(BillingContext);
  return (
    <Segmented label="Billing period">
      {PERIODS.map((period) => {
        const active = billing === period.value;
        return (
          <SegmentedButton key={period.value} pressed={active} onClick={() => setBilling(period.value)}>
            {period.label}
            {period.value === "annual" && <Badge tone={active ? "taupe" : "white"}>2 months free</Badge>}
          </SegmentedButton>
        );
      })}
    </Segmented>
  );
}

/* One string that differs by billing period: a price, a "billed" line. */
export function BillingText({ monthly, annual }: { monthly: string; annual: string }) {
  const { billing } = useContext(BillingContext);
  return billing === "annual" ? annual : monthly;
}

/* A plan's signup pill, across its column. Both hrefs are worked out on
   the server from lib/site.ts; this only picks the one for the chosen
   period. `filled` is the page's one filled pill: the popular plan. */
export function BillingLink({
  monthlyHref,
  annualHref,
  filled = false,
  children,
}: {
  monthlyHref: string;
  annualHref: string;
  filled?: boolean;
  children: ReactNode;
}) {
  const { billing } = useContext(BillingContext);
  return (
    <Pill href={billing === "annual" ? annualHref : monthlyHref} variant={filled ? "filled" : "outline"} block>
      {children}
    </Pill>
  );
}
