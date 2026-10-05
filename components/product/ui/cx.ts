/* cx: the class joiner for product recreations.

   The app joins classes with clsx + tailwind-merge, so a caller's class
   beats a primitive's base class of the same kind (a Card given
   "border-pb-peach-200" drops its own "border-pb-border"). A plain join
   leaves both in the string and lets stylesheet order pick the winner.
   cx keeps the app's behaviour for the utility groups the product uses:
   when two classes set the same thing under the same variant prefix, the
   later one wins and the earlier one is dropped. Anything it does not
   recognise is passed through untouched. No dependency. */

export type ClassValue = string | false | null | undefined | 0;

const DISPLAY = new Set([
  "block", "inline-block", "inline", "flex", "inline-flex", "grid", "inline-grid", "hidden", "contents", "table",
]);
const POSITION = new Set(["static", "relative", "absolute", "fixed", "sticky"]);
const TEXT_SIZE = /^(xs|sm|base|lg|xl|\dxl|\[[\d.]+(px|rem|em)\])$/;
const TEXT_ALIGN = /^(left|center|right|justify|start|end)$/;
const TEXT_WRAP = /^(wrap|nowrap|balance|pretty)$/;
const FONT_FAMILY = /^(sans|mono|display|serif)$/;
const BORDER_WIDTH = /^(\d+|\[\d[\d.]*px\])$/;
const BORDER_SIDE = /^(x|y|t|r|b|l|s|e)(?:-(\d+|\[\d[\d.]*px\]))?$/;
const BORDER_STYLE = /^(solid|dashed|dotted|double|hidden|none)$/;
const BG_NOT_COLOR =
  /^(none|cover|contain|auto|center|top|bottom|left|right|repeat|no-repeat|fixed|local|scroll|clip-|origin-|blend-|gradient-|linear-|radial-|conic-|\[(url|image|length|size|position)[(:])/;
const ROUNDED_SIDE = /^(tl|tr|br|bl|ss|se|ee|es|t|r|b|l|s|e)(?:-|$)/;
/* Padding and margin. The value must look like one ("pb-2", "pb-[3px]",
   "mx-auto") so the product's own pb-* class names (pb-hatch, pb-dots,
   pb-logo) are never mistaken for padding-bottom. */
const SPACING = /^(p|m)(x|y|t|r|b|l|s|e)?-(?:\d|\[|px$|auto$)/;
const SIMPLE_PREFIX = [
  "min-w-", "max-w-", "min-h-", "max-h-", "gap-x-", "gap-y-", "gap-", "inset-x-", "inset-y-", "inset-",
  "top-", "right-", "bottom-", "left-", "leading-", "tracking-", "opacity-", "z-", "grid-cols-", "grid-rows-",
  "col-span-", "row-span-", "items-", "self-", "justify-items-", "justify-self-", "justify-", "overflow-x-",
  "overflow-y-", "overflow-", "aspect-", "whitespace-", "line-clamp-", "basis-", "order-", "cursor-",
];

/** What a class sets, or null when cx should leave it alone. */
function groupOf(raw: string): string | null {
  const base = raw.startsWith("-") ? raw.slice(1) : raw;
  if (DISPLAY.has(base)) return "display";
  if (POSITION.has(base)) return "position";
  const sp = SPACING.exec(base);
  if (sp) return `${sp[1]}${sp[2] ?? ""}`;
  if (base === "border") return "border-w";
  if (base.startsWith("border-")) {
    const rest = base.slice(7);
    if (BORDER_WIDTH.test(rest)) return "border-w";
    const side = BORDER_SIDE.exec(rest);
    if (side) return `border-w-${side[1]}`;
    if (BORDER_STYLE.test(rest)) return "border-style";
    if (rest === "collapse" || rest === "separate") return "border-collapse";
    return "border-color";
  }
  if (base.startsWith("text-")) {
    const rest = base.slice(5);
    if (TEXT_SIZE.test(rest)) return "text-size";
    if (TEXT_ALIGN.test(rest)) return "text-align";
    if (TEXT_WRAP.test(rest)) return "text-wrap";
    if (rest === "ellipsis" || rest === "clip") return "text-overflow";
    return "text-color";
  }
  if (base.startsWith("font-")) return FONT_FAMILY.test(base.slice(5)) ? "font-family" : "font-weight";
  if (base.startsWith("bg-")) return BG_NOT_COLOR.test(base.slice(3)) ? null : "bg-color";
  if (base === "rounded") return "rounded";
  if (base.startsWith("rounded-")) {
    const side = ROUNDED_SIDE.exec(base.slice(8));
    return side ? `rounded-${side[1]}` : "rounded";
  }
  if (base === "ring" || /^ring-(\d+|\[\d[\d.]*px\])$/.test(base)) return "ring-w";
  if (base === "ring-inset") return null;
  if (base.startsWith("ring-offset-")) return null;
  if (base.startsWith("ring-")) return "ring-color";
  if (base === "shadow" || base.startsWith("shadow-")) return "shadow";
  if (base.startsWith("h-")) return "h";
  if (base.startsWith("w-")) return "w";
  if (base.startsWith("size-")) return "size";
  if (base === "flex-row" || base === "flex-col" || base === "flex-row-reverse" || base === "flex-col-reverse") return "flex-dir";
  if (base === "flex-wrap" || base === "flex-nowrap" || base === "flex-wrap-reverse") return "flex-wrap";
  if (/^flex-(1|auto|none|initial|\[.+\])$/.test(base)) return "flex";
  if (base === "shrink" || base.startsWith("shrink-")) return "shrink";
  if (base === "grow" || base.startsWith("grow-")) return "grow";
  if (base.startsWith("object-")) {
    return /^object-(contain|cover|fill|none|scale-down)$/.test(base) ? "object-fit" : "object-pos";
  }
  if (base.startsWith("fill-")) return "fill";
  if (base.startsWith("stroke-")) return /^stroke-(\d+|\[\d[\d.]*(px)?\])$/.test(base) ? "stroke-w" : "stroke-color";
  if (base === "truncate") return null;
  for (const p of SIMPLE_PREFIX) if (base.startsWith(p)) return p;
  return null;
}

/* Groups a later class also clears (padding "p-5" clears an earlier
   "px-3" or "pt-0"; "size-10" clears an earlier "h-8" and "w-8"). */
const CLEARS: Record<string, string[]> = {
  p: ["px", "py", "pt", "pr", "pb", "pl", "ps", "pe"],
  px: ["pl", "pr"],
  py: ["pt", "pb"],
  m: ["mx", "my", "mt", "mr", "mb", "ml", "ms", "me"],
  mx: ["ml", "mr"],
  my: ["mt", "mb"],
  size: ["h", "w"],
  "inset-": ["inset-x-", "inset-y-", "top-", "right-", "bottom-", "left-"],
  "inset-x-": ["left-", "right-"],
  "inset-y-": ["top-", "bottom-"],
  "gap-": ["gap-x-", "gap-y-"],
  "overflow-": ["overflow-x-", "overflow-y-"],
  "border-w": ["border-w-x", "border-w-y", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
  "border-w-x": ["border-w-l", "border-w-r"],
  "border-w-y": ["border-w-t", "border-w-b"],
  rounded: [
    "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl",
  ],
};

/** Split "hover:[&>p]:text-sm" into its variant prefix and base class. */
function split(cls: string): [string, string] {
  let depth = 0;
  let cut = -1;
  for (let i = 0; i < cls.length; i++) {
    const ch = cls[i];
    if (ch === "[" || ch === "(") depth++;
    else if (ch === "]" || ch === ")") depth--;
    else if (ch === ":" && depth === 0) cut = i;
  }
  return cut === -1 ? ["", cls] : [cls.slice(0, cut + 1), cls.slice(cut + 1)];
}

export function cx(...parts: ClassValue[]): string {
  const tokens: string[] = [];
  for (const part of parts) {
    if (!part) continue;
    for (const t of part.split(/\s+/)) if (t) tokens.push(t);
  }
  const taken = new Set<string>();
  const seen = new Set<string>();
  const out: string[] = [];
  for (let i = tokens.length - 1; i >= 0; i--) {
    const token = tokens[i];
    if (seen.has(token)) continue;
    seen.add(token);
    const [variant, rawBase] = split(token);
    const base = rawBase.replace(/^!|!$/g, "");
    const group = groupOf(base);
    if (group) {
      const key = variant + group;
      if (taken.has(key)) continue;
      taken.add(key);
      for (const cleared of CLEARS[group] ?? []) taken.add(variant + cleared);
    }
    out.push(token);
  }
  return out.reverse().join(" ");
}
