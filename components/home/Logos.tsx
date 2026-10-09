import "./Logos.css";
import type { CSSProperties } from "react";
import { Shell, T, TONE, cx } from "@/components/site/parts";
import { LOGO_STRIP } from "./content";

/* The logo strip: the last thing outside the rails, between the hero's
   picture and the rule that opens the frame.

   One row from 1024: the label on the left in smoke, on the logos'
   centre line, and the logos across the rest of the shell, the last one
   ending on the shell's right edge. From 768 the label stands over the
   row. On a phone the logos are three across, each at the start of its
   column.

   Every logo is one colour, as the platform marks are, and quieter than
   the text, so no brand's colour or weight competes with the product
   picture above. Each is drawn at its own height (content.ts) so they
   cover about the same area. They are pictures, not links: nothing
   happens under the pointer.

   The strip stands a band under the hero's panel and a band over the
   first rule. */
export function Logos() {
  return (
    <Shell className="el-logos">
      <p className={cx(T.bodySm, TONE.smoke, "el-logos-label")}>{LOGO_STRIP.label}</p>
      <ul className="el-logos-row">
        {LOGO_STRIP.logos.map((logo) => (
          <li key={logo.src} className="el-logos-item" style={{ "--el-logo-h": `${logo.height}px` } as CSSProperties}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo.src} alt={logo.name} width={logo.width} height={logo.height} loading="lazy" decoding="async" className="el-logos-img" />
          </li>
        ))}
      </ul>
    </Shell>
  );
}
