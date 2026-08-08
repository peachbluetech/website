"use client";

import { useState } from "react";

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
    <div className="rounded-2xl border border-pb-border bg-pb-card/80 backdrop-blur-sm p-7 shadow-pb-soft text-left">
      {showIntro && (
        <>
          <h3 className="font-display text-[20px] font-medium tracking-tight text-pb-fg mb-1.5 text-center">
            {salesIntent ? "Talk to sales" : "Prefer a walkthrough?"}
          </h3>
          <p className="text-[13.5px] text-pb-fg-muted leading-relaxed mb-5 text-center">
            {salesIntent
              ? "Tell us about your agency and we’ll tailor an Agency plan walkthrough to your client roster."
              : "Leave your details and we’ll set up a guided demo of Peachblue on your own ad data."}
          </p>
        </>
      )}
      {submitted ? (
        <div className="rounded-2xl border border-[#3AA976]/30 bg-[#E6F4EC]/40 p-6 text-center">
          <div className="text-[15px] font-medium text-[#3AA976]">
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
            } catch {
              setFormError("Something went wrong. Email us at nick@peachblue.io.");
              setSending(false);
            }
          }}
          className="space-y-3"
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="h-12 w-full rounded-full border border-pb-border bg-pb-card px-5 text-[14px] placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-400 focus:ring-2 focus:ring-pb-peach-100 shadow-pb-soft" />
            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="h-12 w-full rounded-full border border-pb-border bg-pb-card px-5 text-[14px] placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-400 focus:ring-2 focus:ring-pb-peach-100 shadow-pb-soft" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="h-12 w-full rounded-full border border-pb-border bg-pb-card px-5 text-[14px] placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-400 focus:ring-2 focus:ring-pb-peach-100 shadow-pb-soft" />
            <select value={spend} onChange={(e) => setSpend(e.target.value)} className="h-12 w-full rounded-full border border-pb-border bg-pb-card px-5 text-[14px] text-pb-fg focus:outline-none focus:border-pb-peach-400 focus:ring-2 focus:ring-pb-peach-100 shadow-pb-soft appearance-none">
            <option value="">Monthly ad spend</option>
            <option value="Under $10k">Under $10k</option>
            <option value="$10k to $50k">$10k to $50k</option>
            <option value="$50k to $250k">$50k to $250k</option>
            <option value="$250k plus">$250k plus</option>
            </select>
          </div>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={salesIntent ? "Tell us about your client roster" : "Anything specific you want to see? (optional)"} rows={2} className="w-full rounded-2xl border border-pb-border bg-pb-card px-5 py-3 text-[14px] placeholder:text-pb-fg-muted focus:outline-none focus:border-pb-peach-400 focus:ring-2 focus:ring-pb-peach-100 shadow-pb-soft resize-none" />
          <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" />
          {formError && <p className="text-[12.5px] text-[#D64545] text-center">{formError}</p>}
          <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 h-12 px-6 rounded-full pb-gradient-peach text-white text-[14px] font-semibold shadow-[0_6px_18px_rgba(242,119,73,0.35)] hover:brightness-105 transition disabled:opacity-60">
            {sending ? "Sending..." : salesIntent ? "Talk to sales" : "Book a demo"} &rarr;
          </button>
        </form>
      )}
    </div>
  );
}
