import { ArrowRight } from "lucide-react";
import { RecipeLedger } from "@/components/product/brief";
import { PLATFORMS, PLATFORM_ORDER, type PlatformKey } from "@/components/product/connect/data";
import { STRATEGIC_TAGS, VISUAL_TAGS, labelForValue } from "@/components/product/library/data";
import { HERO_CREATIVE } from "@/components/product/sample";
import { PULSE_EVENTS, type PulseEvent } from "@/components/product/today/data";
import { AdThumb, formatCurrency } from "@/components/product/ui";
import { MonoMark, type PlatformMark } from "./Marks";
import { MAT_H, MONO_FIG } from "./parts";

/* The page's figures off the navy bands. Two kinds, nothing else.

   1. A product fragment: a small true piece of the sample account, read
      from components/product data. The three steps of How it works each
      take a different form, so the row is not one list three times: a
      grid of platform cells, a picture over what was read from it, a
      worklist. All three are laid out at MAT_W by MAT_H (324 by 308) and
      the stage's bottom edge cuts them at MAT_H: through the middle of a
      thumbnail, or exactly where the fragment ends. The close's recipe
      is the same kind, on its own stage (Sections.tsx).
   2. One hairline diagram: the essay's loop.

   A fragment here is the picture alone; whoever places it wraps it in
   Shot (through `Stage` or `Peek` in parts.tsx) with the label exported
   beside it. */

const RULE = "border-[color:var(--mn-paper-rule)]";
const INK = "text-[color:var(--mn-paper-ink)]";
const MUTED = "text-[color:var(--mn-paper-muted)]";
const BODY = "text-[color:var(--mn-paper-body)]";
/* The label inside a fragment: 11px, and 12px on a phone, where a stage
   paints its fragment at nine tenths and nothing may fall under 11px. */
const FIG_LABEL = "font-mono text-[12px] font-medium uppercase leading-none tracking-[0.12em] sm:text-[11px]";
/* The page's 4px corner on a tile inside a fragment, at whatever scale
   the fragment is painted (the scale is the .pb-fluid box's own). */
const CORNER = "rounded-[calc(4px/var(--pb-fluid-scale,1))]";

/* A row's verb: the product's own link, as in the lit card. */
function Verb({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[14px] font-semibold leading-[20px] text-[color:var(--mn-paper-accent)]">
      {children}
      <ArrowRight className="size-4" strokeWidth={1.5} />
    </span>
  );
}

/* ── How it works, 01 Connect ───────────────────────────────────── */

/* The sample account's Data Hub as four cells, two across and two down,
   in the app's own order and the app's own words: a platform's mark in a
   ruled square, its name, and at the cell's foot its true state. Three
   are connected and show the ads they have synced beside the app's green
   dot; Amazon is not part of the sample account, so it shows the app's
   Connect action. A cell is half the mat each way (162 by 154), so all
   four marks and their names are whole and the cells end exactly on the
   stage's foot: the edge cuts nothing. */
const HUB_MARK: Record<PlatformKey, PlatformMark> = { meta: "facebook", tiktok: "tiktok", amazon: "amazon", google: "google" };
const CELL_H = MAT_H / 2;

export const CONNECT_LABEL = `The platforms of a sample account: ${PLATFORM_ORDER.map((key) => {
  const p = PLATFORMS[key];
  return p.adsSynced > 0 ? `${p.name}, ${p.adsSynced} ads synced` : `${p.name}, not connected yet`;
}).join("; ")}.`;

export function ConnectFigure() {
  return (
    <div className="grid grid-cols-2">
      {PLATFORM_ORDER.map((key, i) => {
        const p = PLATFORMS[key];
        return (
          <div key={key} style={{ height: CELL_H }} className={`flex flex-col items-start p-4 ${i % 2 === 0 ? "border-r" : ""} ${i >= 2 ? "border-t" : ""} ${RULE}`}>
            <span className={`flex size-12 shrink-0 items-center justify-center border ${CORNER} ${RULE} ${INK}`}>
              <MonoMark mark={HUB_MARK[key]} size={24} />
            </span>
            <span className={`mt-3 whitespace-nowrap text-[14px] font-semibold leading-[20px] ${INK}`}>{p.name}</span>
            <span className="mt-auto flex h-4 items-center">
              {p.adsSynced > 0 ? (
                <span className={`flex items-center gap-2 whitespace-nowrap text-[13px] leading-[16px] ${MUTED}`}>
                  <span className="size-1.5 shrink-0 rounded-full bg-pb-good" />
                  <span>
                    <span className={`${MONO_FIG} ${INK}`}>{p.adsSynced}</span> ads synced
                  </span>
                </span>
              ) : (
                <Verb>Connect</Verb>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── How it works, 02 Analyze ───────────────────────────────────── */

/* The winning ad, then what was read from it. The picture is the ad's
   own 16:9 band (the copy of the creative cut for wide slots at its
   focus, so new art frames itself), whole, across the mat. Under it the
   four dimensions the step names, in its order, as ruled cells: the key
   in the label style over the product's own tag value for this ad
   (library/data.ts). The cells end exactly on the stage's edge.
   `key` is the product's tag; the word in front of it is the step's own. */
const TAGS = new Map<string, string | boolean>([...STRATEGIC_TAGS, ...VISUAL_TAGS]);
const READ: [label: string, key: string][] = [
  ["Hook", "headline_style"],
  ["Tone", "emotional_tone"],
  ["Format", "format"],
  ["CTA", "cta_type"],
];
/* The product prints a tag value in Title Case; the page sets it in
   sentence case, like every other line here. */
const sentence = (value: string) => {
  const s = labelForValue(value).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
};
/** The product's value for one of the winning ad's tags, in sentence case. */
export const tagValue = (key: string) => sentence(String(TAGS.get(key) ?? ""));
const VALUES: [string, string][] = READ.map(([label, key]) => [label, tagValue(key)]);

export const ANALYZE_LABEL = `One ad from a sample account, "${HERO_CREATIVE.name}", over what Peachblue read from it: ${VALUES.map(([label, value]) => `${label === "CTA" ? label : label.toLowerCase()}, ${value.toLowerCase()}`).join("; ")}.`;

/* The picture is 324 by 182 (16:9 at the mat's width, to the whole
   pixel); two rows of cells take the other 126px. */
const WIDE_H = 182;
const TAG_ROW_H = (MAT_H - WIDE_H) / 2;

export function AnalyzeFigure() {
  return (
    <div>
      <div className="overflow-hidden" style={{ height: WIDE_H }}>
        <AdThumb imageUrl={HERO_CREATIVE.image} ratio="wide" size="wide" className="rounded-none!" />
      </div>
      <div className="grid grid-cols-2">
        {VALUES.map(([label, value], i) => (
          <div key={label} style={{ height: TAG_ROW_H }} className={`flex flex-col justify-center px-4 ${i % 2 === 0 ? "border-r" : ""} ${i > 1 ? "border-t" : ""} ${RULE}`}>
            <div className={`${FIG_LABEL} ${MUTED}`}>{label}</div>
            <div className={`mt-2 whitespace-nowrap text-[14px] font-medium leading-none ${INK}`}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── How it works, 03 Act ───────────────────────────────────────── */

/* The top of the week's worklist for the sample account, in the product's
   own order (act first, then watch): the drain, then the two fatigue
   flags. The hero's winner is left out: it is the lit card. The first
   row is told in full, with its sentence; the second is a title, a verb
   and its dollars; and the stage's edge passes through the third row's
   thumbnail, under its title (rows of 170 and 89px put that thumbnail at
   275 to 315). A row whose title opens with its dollars
   does not print them a second time (the product's own rule for the
   drain row). */
const FINDINGS: PulseEvent[] = PULSE_EVENTS.filter((ev) => ev.type === "drain" || ev.type === "fatigue").slice(0, 3);
const titleHasDollars = (ev: PulseEvent) => ev.title.startsWith("$");

export const ACT_LABEL = `The top of a sample account's weekly worklist: ${FINDINGS.slice(0, 2)
  .map((ev) => `"${ev.title}"${titleHasDollars(ev) ? "" : `, ${formatCurrency(ev.dollarImpact)}`}, ${ev.action.toLowerCase()}`)
  .join("; ")}; and more under them.`;

function Thumb({ ev }: { ev: PulseEvent }) {
  return ev.image ? <AdThumb imageUrl={ev.image} size="sm" className="size-10 shrink-0 rounded-[calc(4px/var(--pb-fluid-scale,1))]!" /> : <span className={`size-10 shrink-0 bg-[var(--mn-paper-2)] ${CORNER}`} />;
}

export function ActFigure() {
  return (
    <ul>
      {FINDINGS.map((ev, i) => (
        <li key={ev.key} className={`flex items-start gap-3 border-b p-4 ${RULE}`}>
          <Thumb ev={ev} />
          <div className="min-w-0 flex-1">
            <div className={`text-[14px] font-semibold leading-[20px] ${i === 0 ? "" : "whitespace-nowrap"} ${INK}`}>{ev.title}</div>
            {i === 0 && <p className={`mt-1 text-[13px] leading-[19px] ${BODY}`}>{ev.detail}</p>}
            {/* The third row is the one the edge cuts: it is its thumbnail and its title, and nothing under them. */}
            {i < 2 && (
              <div className="mt-4 flex items-center justify-between gap-3">
                <Verb>{ev.action}</Verb>
                {!titleHasDollars(ev) && <span className={`${MONO_FIG} ${MUTED}`}>{formatCurrency(ev.dollarImpact)}</span>}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── Close: the recipe for the next winner ──────────────────────── */

/* "The blueprint for your next winning ad" is a real thing in the
   product: the winning recipe at the head of the creative brief. The
   product's own ledger, at its own size: five tag values, each with the
   lift it carries. Under 1440 the mat is too narrow for the ledger's
   cohort column, so it is left out there, as the app leaves it out in a
   narrow window. */
export const RECIPE_LABEL =
  "The winning recipe from a creative brief for a sample account: playful tone, studio backdrop, benefit-led hook, minimal text and a vibrant palette, each with the lift in return it carries across the account.";

export function RecipeFigure() {
  return (
    <div className="px-6 pt-6 max-[1439px]:[&_.text-pb-fg-faint]:hidden min-[90rem]:pt-8">
      <RecipeLedger />
    </div>
  );
}

/* ── Essay: the loop that breaks at Learn ───────────────────────── */

/* A hairline ring of four stops, read clockwise from the top. What runs
   is one unbroken 1.5px arc: it leaves Make, passes through Launch and
   Measure (8px discs that sit on the line) and runs all the way to Learn,
   ending on the figure's one arrowhead at Learn's ring. Learn is a hollow
   peach ring, the figure's one peach point. What is missing is said once,
   by one device: the way back from Learn to Make is the page's one dashed
   line, and it stops short of Make. The four names stand inside the ring,
   horizontal, in the label style. The centre is empty and nothing moves.
   Drawn at a real pixel size (the `size` of its square box, the ring 8px
   inside it), so the two stroke weights hold. Angles are degrees
   clockwise from the top. */
const ON_NAVY = "var(--mn-on-navy)";
/* The dash: the page's one pattern, 1px, 2 on and 6 off, fitted so the
   line both starts and ends on a whole dash. */
const DASH = 2;
const GAP = 6;

export function LoopFigure({ size, className = "" }: { size: number; className?: string }) {
  const c = size / 2;
  const r = c - 8;
  const deg = (px: number) => (px / r) * (180 / Math.PI);
  const at = (a: number, rr = r): [number, number] => {
    const t = (a * Math.PI) / 180;
    return [c + rr * Math.sin(t), c - rr * Math.cos(t)];
  };
  const p = ([x, y]: [number, number]) => `${x.toFixed(2)} ${y.toFixed(2)}`;
  const arc = (a0: number, a1: number) => `M${p(at(a0))}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(at(a1))}`;
  /* The solid arc's tip stands 11px of ring short of Learn's centre: on
     the outside of its 6px ring. The way back leaves Learn by the same
     clearance and stops 28px of ring short of Make. */
  const end = 270 - deg(11);
  const back0 = 270 + deg(11);
  const back1 = 360 - deg(28);
  /* An open arrowhead whose tip is the end of the solid arc. */
  const t = (end * Math.PI) / 180;
  const [ex, ey] = at(end);
  const tan: [number, number] = [Math.cos(t), Math.sin(t)];
  const nor: [number, number] = [Math.sin(t), -Math.cos(t)];
  const wing = (s: number): [number, number] => [ex - tan[0] * 7 + nor[0] * 4.5 * s, ey - tan[1] * 7 + nor[1] * 4.5 * s];
  const head = `M${p(wing(1))}L${p([ex, ey])}L${p(wing(-1))}`;
  /* The missing arc's length, as a whole number of dashes. */
  const missing = (r * (back1 - back0) * Math.PI) / 180;
  const dashes = Math.round((missing - DASH) / (DASH + GAP));
  /* A name stands 24px inside its stop (20px at the phone size). */
  const inset = size < 300 ? 20 : 24;
  const stops: { name: string; angle: number }[] = [
    { name: "Make", angle: 0 },
    { name: "Launch", angle: 90 },
    { name: "Measure", angle: 180 },
    { name: "Learn", angle: 270 },
  ];
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={`block overflow-visible ${className}`}>
      {/* The way back, which never arrives. */}
      <path d={arc(back0, back1)} stroke={ON_NAVY} strokeWidth={1} pathLength={dashes * (DASH + GAP) + DASH} strokeDasharray={`${DASH} ${GAP}`} />
      {/* Make, Launch, Measure, and on to Learn. */}
      <path d={arc(0, end)} stroke={ON_NAVY} strokeWidth={1.5} />
      <path d={head} stroke={ON_NAVY} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
      {stops.map((s) => {
        const [x, y] = at(s.angle);
        const learn = s.name === "Learn";
        const [lx, ly] = at(s.angle, r - inset);
        const anchor = s.angle === 90 ? "end" : s.angle === 270 ? "start" : "middle";
        const dy = s.angle === 0 ? 8 : s.angle === 180 ? 0 : 4;
        return (
          <g key={s.name}>
            {learn ? <circle cx={x} cy={y} r={6} stroke="var(--mn-peach)" strokeWidth={1.5} /> : <circle cx={x} cy={y} r={4} fill={ON_NAVY} />}
            <text x={lx} y={ly + dy} textAnchor={anchor} fill={learn ? "var(--mn-on-navy-accent)" : "var(--mn-on-navy-label)"} className="font-mono uppercase" fontSize={11} fontWeight={500} letterSpacing="0.12em">
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
