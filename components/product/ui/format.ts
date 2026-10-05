/* Number formatting, as the app formats it. en-US grouping everywhere, a
   missing value prints an en dash, a negative delta prints a true minus
   sign (U+2212). Use these instead of hand-typing figures so every
   recreation agrees with the product. */

const DASH = "–";
const MINUS = "−";

function grouped(n: number, digits: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
}

/** $21.60, $9,400.00. Pass digits 0 for a headline figure: $48,320. */
export function formatCurrency(value: unknown, digits = 2, fallback = DASH): string {
  const n = Number(value);
  if (value == null || !Number.isFinite(n)) return fallback;
  return `$${grouped(n, digits)}`;
}

/** 2.90% */
export function formatPercent(value: unknown, digits = 2, fallback = DASH): string {
  const n = Number(value);
  if (value == null || !Number.isFinite(n)) return fallback;
  return `${n.toFixed(digits)}%`;
}

/** 2,237 */
export function formatInteger(value: unknown, fallback = DASH): string {
  const n = Number(value);
  if (value == null || !Number.isFinite(n)) return fallback;
  return grouped(n, 0);
}

/** Compact currency for chart labels and sentences: $7.1k, $1.2M, $640, $18.40. */
export function formatCurrencyCompact(value: unknown, fallback = DASH): string {
  const n = Number(value);
  if (value == null || !Number.isFinite(n)) return fallback;
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (abs >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  if (abs >= 100) return `$${Math.round(n)}`;
  return `$${n.toFixed(2)}`;
}

/** 3.40x in cells; pass digits 1 inside a sentence (4.1x). */
export function formatRoas(value: unknown, digits = 2, fallback = DASH): string {
  const n = Number(value);
  if (value == null || !Number.isFinite(n)) return fallback;
  return `${n.toFixed(digits)}x`;
}

/** A signed delta: +12.0% or (true minus) 4.3%. One decimal by default. */
export function formatSignedPct(pct: number, digits = 1): string {
  const sign = pct > 0 ? "+" : pct < 0 ? MINUS : "";
  return `${sign}${Math.abs(pct).toFixed(digits)}%`;
}
