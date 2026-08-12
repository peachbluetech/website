import type { FaqEntry } from "@/content/blog/manifest";

/**
 * Visible FAQ section. The matching FAQPage JSON-LD is emitted by the post
 * page from the same manifest entries, so content and schema never drift.
 */
export function FaqBlock({ faq }: { faq: FaqEntry[] }) {
  if (faq.length === 0) return null;
  return (
    <section className="mt-14" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="font-display text-[26px] font-medium tracking-[-0.015em] text-pb-fg mb-6"
      >
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {faq.map((f) => (
          <details
            key={f.q}
            className="group rounded-2xl border border-pb-border bg-pb-card shadow-pb-soft px-5 py-4 open:pb-5"
          >
            <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-[15px] font-semibold text-pb-fg">
              {f.q}
              <span
                aria-hidden="true"
                className="mt-0.5 text-pb-fg-muted transition-transform group-open:rotate-45 text-[18px] leading-none"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-[14.5px] leading-relaxed text-pb-fg-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
