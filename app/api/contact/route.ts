export const runtime = "nodejs";

/**
 * POST /api/contact
 *
 * Demo requests + Agency/Enterprise sales inquiries from peachblue.io.
 * Sends a lead email via Resend to nick@peachblue.io with reply-to set to
 * the submitter, so replying starts the conversation directly.
 *
 * Env:
 *   RESEND_API_KEY  required
 *   RESEND_FROM     optional sender override. Until the domain is verified
 *                   in Resend, the default onboarding sender is the only
 *                   address that will deliver. After verification set e.g.
 *                   "Peachblue <hello@peachblue.io>".
 */

import { NextResponse } from "next/server";
import { createHmac } from "crypto";

const TO_ADDRESS = "nick@peachblue.io";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.peachblue.io";

/**
 * Best-effort forward to the app's /api/leads so every submission also gets
 * a durable database row. HMAC-signed with a key derived from the shared
 * RESEND_API_KEY (both Vercel projects hold it — no extra secret needed).
 * Failures are logged, never surfaced: the email is the critical path.
 */
async function logLead(apiKey: string, lead: Record<string, string>): Promise<void> {
  try {
    const key = createHmac("sha256", apiKey).update("peachblue-lead-ingest-v1").digest();
    const body = JSON.stringify(lead);
    const ts = Math.floor(Date.now() / 1000).toString();
    const sig = createHmac("sha256", key).update(`${ts}.${body}`).digest("hex");
    const res = await fetch(`${APP_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-peachblue-signature": `t=${ts},v1=${sig}`,
      },
      body,
    });
    if (!res.ok) {
      console.warn("[contact] lead log failed:", res.status, (await res.text()).slice(0, 200));
    }
  } catch (e: any) {
    console.warn("[contact] lead log error:", e?.message ?? e);
  }
}
const FROM_ADDRESS = process.env.RESEND_FROM ?? "Peachblue <onboarding@resend.dev>";

// Simple in-memory rate limit: 5 submissions/hour per IP. Resets on redeploy,
// which is fine for a contact form (Resend has its own sending limits too).
const hits = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 3_600_000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "contact form not configured" }, { status: 500 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 120) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const company = typeof body.company === "string" ? body.company.trim().slice(0, 160) : "";
  const spend = typeof body.spend === "string" ? body.spend.trim().slice(0, 60) : "";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 2000) : "";
  const intent = body.intent === "agency" ? "agency" : "demo";
  // Honeypot: real users never fill this hidden field. Bots do. Pretend
  // success so they move on.
  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  const who = company || name || email;
  const subject =
    intent === "agency" ? `Agency plan inquiry: ${who}` : `Demo request: ${who}`;

  const rows: Array<[string, string]> = [
    ["Name", name || "(not given)"],
    ["Email", email],
    ["Company", company || "(not given)"],
    ["Monthly ad spend", spend || "(not given)"],
    ["Interest", intent === "agency" ? "Agency plan (talk to sales)" : "Guided demo"],
  ];
  if (message) rows.push(["Message", message]);

  const html = `
    <div style="font-family:Helvetica,Arial,sans-serif;font-size:14px;color:#1F2430;line-height:1.7;">
      <p style="margin:0 0 16px;">New ${intent === "agency" ? "sales inquiry" : "demo request"} from peachblue.io:</p>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse;">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="font-weight:bold;padding-right:16px;vertical-align:top;white-space:nowrap;">${esc(k)}</td><td>${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <p style="margin:16px 0 0;color:#8A8578;font-size:12px;">Reply to this email to answer them directly.</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      reply_to: [email],
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] resend error:", res.status, detail.slice(0, 300));
    return NextResponse.json(
      { error: "Couldn't send right now. Email us directly at nick@peachblue.io." },
      { status: 502 }
    );
  }

  await logLead(apiKey, { name, email, company, spend, message, intent });

  return NextResponse.json({ ok: true });
}
