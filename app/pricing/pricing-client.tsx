"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { OutlineLink, PrimaryLink } from "@/components/site/Button";

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

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-peach-500 focus-visible:ring-offset-2";

const PERIODS: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "annual", label: "Annual" },
];

/* The Monthly / Annual control: the product's segmented toggle at a size a
   thumb can hit. A white box with a control hairline; the active segment is
   the dark inverted one. 44px tall, hairline and padding included. */
export function BillingToggle() {
  const { billing, setBilling } = useContext(BillingContext);
  return (
    <div
      role="group"
      aria-label="Billing period"
      className="inline-flex items-center rounded-lg border border-pb-border-control bg-pb-card p-1"
    >
      {PERIODS.map((period) => {
        const active = billing === period.value;
        return (
          <button
            key={period.value}
            type="button"
            onClick={() => setBilling(period.value)}
            aria-pressed={active}
            className={`inline-flex h-[34px] items-center gap-2 rounded-[6px] px-3.5 text-[14px] font-medium whitespace-nowrap transition-colors ${FOCUS_RING} ${
              active ? "bg-pb-fg text-pb-bg" : "text-pb-fg-secondary hover:text-pb-fg"
            }`}
          >
            {period.label}
            {period.value === "annual" && (
              <span
                className={`rounded-[4px] border px-1.5 text-[11.5px] leading-[18px] font-medium ${
                  active ? "border-white/30 text-pb-peach-300" : "border-pb-peach-300 text-pb-peach-700"
                }`}
              >
                2 months free
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* One string that differs by billing period: a price, a "billed" line. */
export function BillingText({ monthly, annual }: { monthly: string; annual: string }) {
  const { billing } = useContext(BillingContext);
  return billing === "annual" ? annual : monthly;
}

/* A plan's signup button. Both hrefs are worked out on the server from
   lib/site.ts; this only picks the one for the chosen period. */
export function BillingLink({
  monthlyHref,
  annualHref,
  filled = false,
  className,
  children,
}: {
  monthlyHref: string;
  annualHref: string;
  /** The flat peach primary. One per page: the popular plan. */
  filled?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { billing } = useContext(BillingContext);
  const href = billing === "annual" ? annualHref : monthlyHref;
  return filled ? (
    <PrimaryLink href={href} className={className}>
      {children}
    </PrimaryLink>
  ) : (
    <OutlineLink href={href} className={className}>
      {children}
    </OutlineLink>
  );
}
