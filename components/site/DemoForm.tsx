"use client";

import { useState } from "react";
import posthog from "posthog-js";

/**
 * Qualified-lead form (name / company / email / spend band / note), posted
 * to /api/contact via Resend. Extracted from the homepage so the /demo page
 * and any future placement share one implementation.
 *
 * `salesIntent` switches the copy + submitted state to the Agency variant.
 */
export function DemoForm({ salesIntent, showIntro = true }: { salesIntent: boolean; showIntro?: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [spend, setSpend] = useState("");
  const [note, setNote] = useState("");
  const [hp, setHp] = useState("");
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="rounded-[10px] border border-pb-border bg-pb-card p-6 sm:p-7 text-left">
      {showIntro && (
        <>
          <h3 className="font-display text-[20px] font-medium tracking-tight text-pb-ink mb-1.5 text-center">
            {salesIntent ? "Talk to sales" : "Prefer a walkthrough?"}
          </h3>
          <p className="text-[13.5px] text-pb-fg-secondary leading-relaxed mb-5 text-center">
            {salesIntent
              ? "Tell us about your agency and we’ll tailor an Agency plan walkthrough to your client roster."
              : "Leave your details and we’ll set up a guided demo of Peachblue on your own ad data."}
          </p>
        </>
      )}
      {submitted ? (
        <div className="rounded-lg border border-pb-good-ring bg-pb-good-bg p-6 text-center">
          <div className="text-[15px] font-medium text-pb-good-text">
            Thanks. We&apos;ll be in touch{salesIntent ? " about the Agency plan" : " to schedule your demo"} shortly.
          </div>
        </div>
      ) : (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (!email || sending) return;
            setSending(true);
            setFormError(null);
            try {
              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name, email, company, spend, message: note,
                  intent: salesIntent ? "agency" : "demo",
                  website: hp,
                }),
              });
              const d = await res.json().catch(() => null);
              if (!res.ok) {
                setFormError(d?.error ?? "Something went wrong. Email us at nick@peachblue.io.");
                setSending(false);
                return;
              }
              setSubmitted(true);
              if (posthog.__loaded) posthog.capture("demo_form_submitted", { intent: salesIntent ? "agency" : "demo" });
            } catch {
              setFormError("Something went wrong. Email us at nick@peachblue.io.");
              setSending(false);
            }
          }}
          className="space-y-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-11 w-full rounded-lg border border-pb-border-control bg-pb-card px-3.5 text-[14px] text-pb-fg placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-500 focus:ring-2 focus:ring-pb-peach-100" />
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="h-11 w-full rounded-lg border border-pb-border-control bg-pb-card px-3.5 text-[14px] text-pb-fg placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-500 focus:ring-2 focus:ring-pb-peach-100" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-11 w-full rounded-lg border border-pb-border-control bg-pb-card px-3.5 text-[14px] text-pb-fg placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-500 focus:ring-2 focus:ring-pb-peach-100" />
            <select value={spend} onChange={(e) => setSpend(e.target.value)} className="h-11 w-full rounded-lg border border-pb-border-control bg-pb-card px-3.5 text-[14px] text-pb-fg focus:outline-none focus:border-pb-peach-500 focus:ring-2 focus:ring-pb-peach-100 appearance-none">
            <option value="">Monthly ad spend</option>
            <option value="Under $10k">Under $10k</option>
            <option value="$10k to $50k">$10k to $50k</option>
            <option value="$50k to $250k">$50k to $250k</option>
            <option value="$250k plus">$250k plus</option>
            </select>
          </div>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={salesIntent ? "Tell us about your client roster" : "Anything specific you want to see? (optional)"} rows={2} className="w-full rounded-lg border border-pb-border-control bg-pb-card px-3.5 py-2.5 text-[14px] text-pb-fg placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-500 focus:ring-2 focus:ring-pb-peach-100 resize-none" />
          <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" />
          {formError && <p className="text-[12.5px] text-pb-bad text-center">{formError}</p>}
          <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 h-11 px-5 rounded-lg bg-pb-peach-500 text-pb-ink-deep text-[15px] font-semibold hover:bg-[color-mix(in_srgb,var(--color-pb-peach-500)_84%,white)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pb-peach-500 focus-visible:ring-offset-2 disabled:opacity-60">
            {sending ? "Sending..." : salesIntent ? "Talk to sales" : "Book a demo"} &rarr;
          </button>
        </form>
      )}
    </div>
  );
}
