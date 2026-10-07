"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { Form, FormRow, Input, Select, Stack, Textarea } from "./kit";
import { PillButton, T, TONE, cx } from "./parts";

/* The lead form: name, company, email, spend band and a note, posted to
   /api/contact. It is the fallback on the demo page for a reader who
   finds no time in the calendar, and can stand anywhere else a page
   needs it.

   Built from the kit's form parts: white raised controls on the page's
   ground, pills for an input and a select, one filled pill to send it.
   Every control names itself in its placeholder, as it always has, and
   carries the same words as its accessible name. What is posted, what
   is required and what the form says when it fails or is sent are
   unchanged.

   `salesIntent` switches the copy and the sent state to the agency
   variant. `showIntro` puts a title and one line over the form, for a
   placement that has no header of its own. */
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

  const notePlaceholder = salesIntent ? "Tell us about your client roster" : "Anything specific you want to see? (optional)";

  return (
    <Stack gap={24}>
      {showIntro && (
        <Stack gap={12}>
          <h3 className={T.titleLg}>{salesIntent ? "Talk to sales" : "Prefer a walkthrough?"}</h3>
          <p className={cx(T.bodySm, TONE.smoke, "el-pretty")}>
            {salesIntent
              ? "Tell us about your agency and we’ll tailor an Agency plan walkthrough to your client roster."
              : "Leave your details and we’ll set up a guided demo of Peachblue on your own ad data."}
          </p>
        </Stack>
      )}
      {submitted ? (
        <div className="el-form-done" role="status">
          <p className={cx(T.body, "el-pretty")}>
            Thanks. We&apos;ll be in touch{salesIntent ? " about the Agency plan" : " to schedule your demo"} shortly.
          </p>
        </div>
      ) : (
        <Form
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
        >
          <FormRow>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" aria-label="Your name" />
            <Input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" aria-label="Company" />
          </FormRow>
          <FormRow>
            <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" aria-label="Email" />
            <Select value={spend} onChange={(e) => setSpend(e.target.value)} empty={spend === ""} aria-label="Monthly ad spend">
              <option value="">Monthly ad spend</option>
              <option value="Under $10k">Under $10k</option>
              <option value="$10k to $50k">$10k to $50k</option>
              <option value="$50k to $250k">$50k to $250k</option>
              <option value="$250k plus">$250k plus</option>
            </Select>
          </FormRow>
          <Textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder={notePlaceholder} aria-label={notePlaceholder} rows={2} />
          <input type="text" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" hidden name="website" />
          {formError && (
            <p role="alert" className="el-error">
              {formError}
            </p>
          )}
          <div>
            <PillButton type="submit" disabled={sending}>
              {sending ? "Sending..." : salesIntent ? "Talk to sales" : "Book a demo"}
            </PillButton>
          </div>
        </Form>
      )}
    </Stack>
  );
}
