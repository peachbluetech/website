import { CtaBand } from "@/components/site/kit";
import { Pill } from "@/components/site/parts";
import { FINAL_CTA } from "./content";
import "./Close.css";

/* Get started (#demo).

   The kit's closing band, the same one that closes an inner page: one
   slim band between two rules, no picture, no fill, no change of
   ground. On the page's two columns: the eyebrow and the h2 at 32/36 on
   the left, and on the right the subhead, the two pills and the risk
   line.

   The h2 is two block spans with a space between them in the HTML, both
   in ink: no phrase is recoloured. The filled pill is this section's one
   action and drops its arrow; "Book a demo" is the outline pill and
   keeps its arrow inside the anchor. The risk line is the page's one
   italic, as under the hero's pills.

   The right column is taller than the heading, so it starts level with
   the heading's cap top (the split header's rule). Under 1024 the band
   stacks, left aligned: eyebrow, h2, subhead, the two pills side by
   side, the risk line.

   72px above and below (48 on a phone). This is the last band: the rule
   under it, where the rails end, is drawn by Page.tsx, and so is the
   rule above it.
   HTML order: section#demo > p, h2 (two spans), p, two links, p. */
export function Close() {
  const { primaryCta, secondaryCta } = FINAL_CTA;
  return (
    <CtaBand
      id={FINAL_CTA.id}
      eyebrow={FINAL_CTA.eyebrow}
      title={
        <>
          <span className="el-close-line">{FINAL_CTA.headlineLines[0]}</span>{" "}
          <span className="el-close-line">{FINAL_CTA.headlineLines[1]}</span>
        </>
      }
      lead={FINAL_CTA.subhead}
      actions={
        <>
          <Pill href={primaryCta.href}>{primaryCta.label}</Pill>
          <Pill href={secondaryCta.href} variant="outline" arrow={secondaryCta.arrow}>
            {secondaryCta.label}
          </Pill>
        </>
      }
      note={FINAL_CTA.riskReversal}
    />
  );
}
