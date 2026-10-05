#!/usr/bin/env node
/**
 * Tell audit for product recreations.
 *
 * Everything under components/product/ is a static picture of the product,
 * so it has to obey the product's own register and the recreation rules in
 * CLAUDE.md. This gate fails when a device from the marketing look, or
 * anything interactive, slips into a recreation: italics, tracked uppercase
 * eyebrows, gradients (CSS or SVG), backdrop blur, big radii, shadows of
 * any kind except shadow-pb-lift, pulsing skeletons, a navy surface outside
 * the VoiceBar, the brand serif outside its few homes, heading tags, client
 * components, dark-mode or viewport-breakpoint classes, and focusable
 * elements.
 *
 * Run from the repo root: node scripts/lint-tells.mjs
 * Pass directories or files to scan something else:
 *   node scripts/lint-tells.mjs components/product/today
 * Prints file:line for every finding and exits 1 if there are any.
 *
 * Waivers. Two rules have legitimate exceptions the gate cannot see for
 * itself: font-display (the report masthead, the agent empty-state title
 * and the public brief are real homes of the serif) and shadow (the word
 * can turn up in a quoted sentence). A line is waived when it, or the line right
 * above it, carries a comment of the form
 *   tell-ok font-display: report masthead
 * with the rule id and a reason. Every waiver is printed on every run, so
 * a reviewer sees them all. No other rule can be waived.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ROOTS = process.argv.slice(2).length ? process.argv.slice(2) : ["components/product"];
const SKIP_DIRS = new Set(["node_modules", ".next"]);

/* Tracking above 0.1em: 0.11em and up, in arbitrary-value form. */
const WIDE_TRACKING = /tracking-\[0?\.(?:1[1-9]\d*|[2-9]\d*)em\]/;

/* Files that own a device by design. Paths are relative to the repo root. */
const ALLOW = {
  /* Navy speaks: a navy surface is the VoiceBar sentence, nothing else. */
  navy: ["components/product/ui/VoiceBar.tsx"],
  /* The brand serif has five homes in the product: the page title and the
     sidebar wordmark (the two files below), and the report masthead, the
     agent empty-state title and the public brief. Add those three files
     here once their builders name them; until then they carry a waiver. */
  "font-display": ["components/product/frame/PageHeader.tsx", "components/product/frame/AppWindow.tsx"],
  /* The weekly digest email is its own register: it is drawn as the
     template sends it, emphasised word included. */
  italic: ["components/product/digest/DigestEmail.tsx"],
  /* The class-merge helper names the shadow group in its own code. */
  shadow: ["components/product/ui/cx.ts"],
};

/* Rules a line may waive with a "tell-ok <rule id>: <reason>" comment. */
const WAIVABLE = new Set(["font-display", "shadow"]);

/* Any box, drop, text or inset shadow utility with a size or an arbitrary
   value, in any variant (hover:shadow-md). shadow-pb-lift (floating
   surfaces only) and shadow-none do not match; shadow-pb-soft and
   shadow-pb-glow have their own rules below. */
const SHADOW_SIZED = /(?<![\w-])(?:(?:drop|text|inset)-)?shadow-(?:2xs|xs|sm|md|lg|xl|2xl|inner|\[[^\]]+\])(?![\w-])/;
/* The bare utilities "shadow" and "drop-shadow", as a whole class token on
   a line that holds a string literal (so the word in JSX text is left alone). */
const SHADOW_BARE = /(?<=["'`\s:])(?:drop-)?shadow(?=["'`\s])/;
const HAS_STRING = /["'`]/;

/* comments: true means the rule also reads comment lines (text rules that
   apply to comments as well as code). */
const RULES = [
  { id: "italic", re: /\b(?:not-)?italic\b(?!-)/, msg: "italic type" },
  {
    id: "eyebrow",
    test: (line) => /\buppercase\b/.test(line) && WIDE_TRACKING.test(line),
    msg: "tracked uppercase eyebrow (above 0.1em)",
  },
  {
    id: "gradient",
    re: /linear-gradient\(|radial-gradient\(|conic-gradient\(|bg-gradient-to-|bg-linear-|bg-radial|bg-conic|pb-gradient-(?:ink|brand)|<(?:linear|radial)Gradient[\s>]/,
    msg: "gradient surface, CSS or SVG (the logo square uses the pb-logo class)",
  },
  { id: "backdrop-blur", re: /backdrop-blur/, msg: "backdrop blur" },
  {
    id: "radius",
    re: /rounded(?:-(?:tl|tr|br|bl|t|r|b|l|s|e|ss|se|ee|es))?-(?:4xl|\[(?:1[1-9]|[2-9]\d|\d{3,})(?:\.\d+)?px\])/,
    msg: "radius above 10px",
  },
  { id: "shadow-pb-soft", re: /shadow-pb-soft/, msg: "resting card shadow" },
  { id: "shadow-pb-glow", re: /shadow-pb-glow/, msg: "glow shadow" },
  {
    id: "shadow",
    test: (line) => SHADOW_SIZED.test(line) || (HAS_STRING.test(line) && SHADOW_BARE.test(line)),
    msg: "shadow (nothing at rest casts one; a floating surface uses shadow-pb-lift)",
  },
  { id: "animate-pulse", re: /animate-pulse/, msg: "pulsing skeleton" },
  { id: "navy", re: /\bbg-pb-ink(?:-2|-deep)?(?![\w-])|pb-gradient-ink/, msg: "navy surface outside the VoiceBar" },
  {
    id: "font-display",
    re: /(?<![\w-])font-(?:display|serif)(?![\w-])/,
    msg: "brand serif outside the page title, wordmark, report masthead, agent empty state and brief",
  },
  { id: "heading", re: /<h[1-6][\s>]/, msg: "heading element (use a div or p with the same classes)" },
  { id: "use-client", re: /^\s*["']use client["']/, msg: '"use client" (recreations are server components)' },
  { id: "hook", re: /\buse(?:State|Effect|LayoutEffect|Ref|Reducer|Memo|Callback|Context|Id|Transition)\s*\(/, msg: "React hook" },
  { id: "handler", re: /\bon[A-Z][A-Za-z]+=\{/, msg: "event handler" },
  { id: "dark", re: /(?<![\w-])dark:/, msg: "dark: class (the site has no dark mode)" },
  {
    id: "breakpoint",
    re: /(?<![\w-])(?:max-)?(?:sm|md|lg|xl|2xl):(?=[\w\-\[!])/,
    msg: "viewport breakpoint variant (resolve it for the design width)",
  },
  { id: "anchor", re: /<a[\s>]|<Link[\s>]/, msg: "link element (render an inert span)" },
  { id: "button", re: /<button[\s>]/, msg: "button element (render an inert span)" },
  { id: "input", re: /<(?:input|select|textarea)[\s>/]/, msg: "form control (render an inert div or span)" },
  { id: "em-dash", re: /\u2014/, msg: "em dash", comments: true },
  { id: "emoji", re: /[\u{1F000}-\u{1FAFF}]/u, msg: "emoji", comments: true },
];

function walk(dir, out) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts)$/.test(name)) out.push(p);
  }
  return out;
}

/* Mark the lines that are comments: line comments, and every line of a
   block comment (JS or JSX). Code that follows a closing marker on the same
   line is rare enough here to ignore. */
function commentLines(lines) {
  const flags = new Array(lines.length).fill(false);
  let inBlock = false;
  lines.forEach((line, i) => {
    const t = line.trimStart();
    if (inBlock) {
      flags[i] = true;
      if (t.includes("*/")) inBlock = false;
      return;
    }
    if (t.startsWith("//")) flags[i] = true;
    else if (t.startsWith("/*") || t.startsWith("{/*")) {
      flags[i] = true;
      if (!t.includes("*/")) inBlock = true;
    } else if (t.startsWith("*")) flags[i] = true;
  });
  return flags;
}

const missing = ROOTS.filter((r) => !existsSync(r));
if (missing.length) {
  console.error(`Tell audit: no such directory: ${missing.join(", ")} (run from the repo root)`);
  process.exit(2);
}

/* The reason given by a waiver for this rule on this line or the line
   above it, or null. A waiver with no reason does not count. */
function waiverFor(ruleId, lines, i) {
  if (!WAIVABLE.has(ruleId)) return null;
  const re = new RegExp(`tell-ok\\s+${ruleId}\\s*:\\s*([^*}]*[^*}\\s/])`);
  const m = re.exec(lines[i]) ?? (i > 0 ? re.exec(lines[i - 1]) : null);
  return m ? m[1].trim() : null;
}

const files = ROOTS.flatMap((r) => (statSync(r).isDirectory() ? walk(r, []) : [r]));
const findings = [];
const waived = [];
for (const file of files) {
  const rel = relative(process.cwd(), file).split(sep).join("/");
  const lines = readFileSync(file, "utf8").split("\n");
  const isComment = commentLines(lines);
  for (const rule of RULES) {
    const allowed = (ALLOW[rule.id] ?? []).some((a) => rel === a || (a.endsWith("/") && rel.startsWith(a)));
    if (allowed) continue;
    lines.forEach((line, i) => {
      if (isComment[i] && !rule.comments) return;
      const hit = rule.test ? rule.test(line) : rule.re.test(line);
      if (!hit) return;
      const reason = waiverFor(rule.id, lines, i);
      if (reason) waived.push({ rel, line: i + 1, rule, reason });
      else findings.push({ rel, line: i + 1, rule, text: line.trim().slice(0, 110) });
    });
  }
}

if (waived.length) {
  console.log(`\nTell audit: ${waived.length} waiver${waived.length === 1 ? "" : "s"} (check each is a real exception)\n`);
  for (const w of waived) console.log(`  ${w.rel}:${w.line}  ${w.rule.id}: ${w.reason}`);
  console.log("");
}

if (findings.length) {
  const byRule = new Map();
  for (const f of findings) byRule.set(f.rule.id, (byRule.get(f.rule.id) ?? 0) + 1);
  console.error(`\nTell audit: ${findings.length} finding${findings.length === 1 ? "" : "s"}\n`);
  for (const f of findings) console.error(`  ${f.rel}:${f.line}  ${f.rule.msg}\n      ${f.text}`);
  console.error("\nBy rule:", Object.fromEntries(byRule));
  process.exit(1);
}
console.log(`Tell audit: clean (${files.length} files).`);
