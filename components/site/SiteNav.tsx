"use client";

import { useState } from "react";
import Link from "next/link";
import { PeachblueMark } from "./PeachblueMark";
import { NAV_CTA_LABEL, TRIAL_HREF } from "@/lib/site";

/**
 * Shared floating pill nav. Desktop: inline links. Mobile: hamburger toggles
 * a dropdown card with the same links + CTA (previously the links were
 * simply hidden below md — no way to reach Pricing on a phone).
 *
 * Section links (Product/Platforms/FAQ) are homepage anchors, so they're
 * prefixed with "/" to work from any page.
 */

const LINKS = [
  { label: "Product", href: "/#product" },
  { label: "Platforms", href: "/#platforms" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/#faq" },
];

export function SiteNav({ current }: { current?: "pricing" | "demo" }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
      <div className="w-full max-w-[900px]">
        <div className="flex items-center justify-between h-14 px-5 rounded-full border border-pb-border/50 bg-pb-bg/80 backdrop-blur-xl shadow-pb-soft">
          <Link href="/" aria-label="Peachblue home" className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg pb-gradient-peach flex items-center justify-center shadow-[0_4px_12px_rgba(255,182,155,0.4)]">
              <PeachblueMark size={18} color="#ffffff" />
            </div>
            <span className="font-display text-[17px] font-semibold tracking-tight text-pb-fg">
              peachblue
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-pb-fg-muted">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                aria-current={current === "pricing" && l.href === "/pricing" ? "page" : undefined}
                className={
                  current === "pricing" && l.href === "/pricing"
                    ? "text-pb-fg"
                    : "hover:text-pb-fg transition-colors"
                }
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={TRIAL_HREF}
              className="inline-flex items-center h-9 px-3.5 sm:px-5 rounded-full pb-gradient-peach text-white text-[12px] sm:text-[13px] font-semibold whitespace-nowrap shadow-[0_4px_16px_rgba(242,119,73,0.35)] hover:brightness-105 transition"
            >
              {NAV_CTA_LABEL}
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="md:hidden inline-flex items-center justify-center size-9 rounded-full border border-pb-border/60 bg-pb-card text-pb-fg shadow-pb-soft"
            >
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                {open ? (
                  <>
                    <line x1={6} y1={6} x2={18} y2={18} />
                    <line x1={18} y1={6} x2={6} y2={18} />
                  </>
                ) : (
                  <>
                    <line x1={4} y1={7} x2={20} y2={7} />
                    <line x1={4} y1={12} x2={20} y2={12} />
                    <line x1={4} y1={17} x2={20} y2={17} />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden mt-2 rounded-3xl border border-pb-border/60 bg-pb-bg/95 backdrop-blur-xl shadow-pb-lift p-3">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-2xl text-[15px] font-medium text-pb-fg hover:bg-pb-card transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/demo"
              onClick={() => setOpen(false)}
              className="block px-4 py-3 rounded-2xl text-[15px] font-medium text-pb-fg hover:bg-pb-card transition-colors"
            >
              Book a demo
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
