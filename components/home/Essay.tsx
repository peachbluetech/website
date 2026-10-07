import { ESSAY } from "./content";
import { Block, Eyebrow, T, cx } from "@/components/site/parts";
import "./Essay.css";

/* Why Peachblue exists (no id).

   The page's long statement, with the loop that breaks at Learn beside
   it. Left (columns 1 to 6): eyebrow, h2, then the
   three paragraphs of ESSAY.paragraphs in the order they are written, at
   the lead's own size and in ink. The short middle paragraph gets no
   styling of its own: it is one more paragraph. Right (columns 7 to 12):
   the loop, centred on the height of the text. Under 1024 the loop
   stands between the heading and the paragraphs.

   The loop is drawn straight on the canvas, not in a card: both
   neighbours are card sections, and the figure is made of the frame's
   own parts plus the page's one accent of peach (see Loop). No action:
   the words carry it.

   160px above, 120px under. Page.tsx draws the rule above this section
   and the rule under it.
   HTML order: section > p, h2, (the figure, hidden from readers), p, p, p. */
export function Essay() {
  return (
    <section className="el-essay">
      <Block top="top" bottom="pad">
        <div className="el-essay-grid">
          <div className="el-essay-head">
            <Eyebrow className="el-essay-pre">{ESSAY.eyebrow}</Eyebrow>
            <h2 className={cx(T.heading, "el-essay-title")}>{ESSAY.headline}</h2>
          </div>
          <div className="el-essay-fig">
            <Loop size={264} className="el-essay-loop--sm" />
            <Loop size={340} className="el-essay-loop--lg" />
          </div>
          <div className="el-essay-body">
            {ESSAY.paragraphs.map((text) => (
              <p key={text} className={cx(T.body, "el-pretty el-essay-p")}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </Block>
    </section>
  );
}

/* The loop that breaks at Learn: a ring of four stops read clockwise
   from the top, made of the frame's own parts. The line that runs is a
   1.5px navy line, and it stops short of every stop the way a rail stops
   short of a crossing. It leaves Make, passes Launch and Measure (navy
   dots) and ends on the figure's one arrowhead at Learn.

   What is missing is in the brand's other colour, peach: Learn
   is an open peach ring, and the way back from Learn to Make is a trail
   of peach dots that thins and fades and gives out well before it
   arrives. That quarter is the gap the essay says Peachblue closes. The
   four names stand inside the ring in ink.

   Nothing moves and the centre is empty. Drawn at a real pixel size (the
   `size` of its square box), so the line and the dots hold. Angles are
   degrees clockwise from the top. The figure is hidden from readers:
   the essay beside it says what it shows. */
const STOPS = [
  { name: "Make", angle: 0 },
  { name: "Launch", angle: 90 },
  { name: "Measure", angle: 180 },
  { name: "Learn", angle: 270 },
] as const;
/* The trail: a dot every 9px of ring, from 2.25px of radius down to 0.9
   and from solid down to under a third. */
const STEP = 9;

function Loop({ size, className }: { size: number; className?: string }) {
  const small = size < 300;
  const c = size / 2;
  const r = c - 12;
  const deg = (px: number) => (px / r) * (180 / Math.PI);
  const at = (a: number, rr = r): [number, number] => {
    const t = (a * Math.PI) / 180;
    return [c + rr * Math.sin(t), c - rr * Math.cos(t)];
  };
  const p = ([x, y]: [number, number]) => `${x.toFixed(2)} ${y.toFixed(2)}`;
  const arc = (a0: number, a1: number) => `M${p(at(a0))}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${p(at(a1))}`;
  /* The line clears a stop by 13px of ring on either side, and its tip
     stands 15px short of Learn's centre: just outside the open ring. */
  const clear = deg(13);
  const tip = 270 - deg(15);
  /* An open arrowhead whose point is the end of the line. */
  const t = (tip * Math.PI) / 180;
  const [ex, ey] = at(tip);
  const tan: [number, number] = [Math.cos(t), Math.sin(t)];
  const nor: [number, number] = [Math.sin(t), -Math.cos(t)];
  const wing = (s: number): [number, number] => [ex - tan[0] * 7 + nor[0] * 4.5 * s, ey - tan[1] * 7 + nor[1] * 4.5 * s];
  /* The way back leaves Learn 17px on and gives out about a fifth of
     the quarter before Make. */
  const from = 270 + deg(17);
  const count = Math.floor((r * ((360 - deg(r * 0.3) - from) * Math.PI)) / 180 / STEP) + 1;
  const trail = Array.from({ length: count }, (_, i) => {
    const k = count > 1 ? i / (count - 1) : 0;
    const [x, y] = at(from + deg(i * STEP));
    return { x, y, r: 2.25 - 1.35 * k, o: 1 - 0.7 * k };
  });
  /* A name stands inside its stop: 26px (20 at the small size). */
  const inset = small ? 20 : 26;
  /* Caps are about 11px tall at 15px: so 11 under the top stop, half at the sides, none over the foot. */
  const cap = small ? 10 : 11;
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={cx("el-essay-loop", small && "el-essay-loop--small", className)}>
      {trail.map((d, i) => (
        <circle key={i} className="el-essay-loop-back" cx={d.x.toFixed(2)} cy={d.y.toFixed(2)} r={d.r.toFixed(2)} opacity={d.o.toFixed(2)} />
      ))}
      <path className="el-essay-loop-run" d={arc(clear, 90 - clear)} />
      <path className="el-essay-loop-run" d={arc(90 + clear, 180 - clear)} />
      <path className="el-essay-loop-run" d={arc(180 + clear, tip)} />
      <path className="el-essay-loop-run" d={`M${p(wing(1))}L${p([ex, ey])}L${p(wing(-1))}`} />
      {STOPS.map((s) => {
        const [x, y] = at(s.angle);
        const [lx, ly] = at(s.angle, r - inset);
        const anchor = s.angle === 90 ? "end" : s.angle === 270 ? "start" : "middle";
        const dy = s.angle === 0 ? cap : s.angle === 180 ? 0 : cap / 2;
        return (
          <g key={s.name}>
            {s.name === "Learn" ? <circle className="el-essay-loop-open" cx={x} cy={y} r={small ? 6 : 7} /> : <circle className="el-essay-loop-stop" cx={x} cy={y} r={small ? 3.5 : 4} />}
            <text className="el-essay-loop-name" x={lx} y={ly + dy} textAnchor={anchor}>
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
