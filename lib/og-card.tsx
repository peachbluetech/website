import { ImageResponse } from "next/og";

/**
 * Shared social-card renderer for opengraph-image and twitter-image.
 *
 * 1200x630 is the Open Graph standard and what iMessage, Slack, LinkedIn and
 * X's large card all crop to. Square would get letterboxed in most of them.
 *
 * The card is the site in small, on its navy: the frame of hairline rails
 * and rules with a dot at each crossing, the logo, the headline in the
 * display face in white, and a white pill carrying the address. Few words
 * and high contrast, so it stays legible at thumbnail size and stands out
 * in a message thread.
 *
 * Both faces are fetched from Google Fonts at render time (the
 * no-User-Agent request returns TTF, which satori can embed): the display
 * face for the headline and the lines, the logo's serif for the wordmark.
 * If a fetch fails that text falls back to the default sans rather than
 * erroring the image route.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "Peachblue · The intelligence layer for ad creative";

/* The site's own values (components/site/system.css). The card stands on
   the navy of the site's filled pill and popular plan tile: white type,
   a soft blue for the quiet line, faint white hairlines, and a white pill. */
const NAVY = "#13214B";
const LOGO = "linear-gradient(135deg, #FFB48C 0%, #F27749 100%)";
const PALETTE = { ground: NAVY, ink: "#FFFFFF", soft: "#A9B7DD", line: "rgba(255,255,255,0.14)", pill: "#FFFFFF", pillInk: NAVY } as const;
type Palette = typeof PALETTE;

async function fetchTtf(family: string): Promise<ArrayBuffer | null> {
  try {
    const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

type Fonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]>;

/** The display face at 400 and the wordmark's serif at 600. */
async function loadFonts(): Promise<{ fonts: Fonts; display: string; serif: string }> {
  const [display, serif] = await Promise.all([fetchTtf("Zalando+Sans:wght@400"), fetchTtf("Fraunces:opsz,wght@9..144,600")]);
  const fonts: Fonts = [];
  if (display) fonts.push({ name: "Zalando Sans", data: display, style: "normal", weight: 400 });
  if (serif) fonts.push({ name: "Fraunces", data: serif, style: "normal", weight: 600 });
  return { fonts, display: display ? "Zalando Sans" : "sans-serif", serif: serif ? "Fraunces" : "serif" };
}

export interface OgCardContent {
  /** Headline lines. Give line2 as "" for one headline that wraps on its own. */
  line1?: string;
  line2?: string;
  /** Footer left text. */
  kicker?: string;
  /** Smaller headline for longer post titles. */
  compact?: boolean;
}

/** Auto-fit: long lines would overflow the 960px text column at 88px. A
    headline given as one line (a post title) wraps and is balanced, so it
    is sized by its whole length. */
function headlineSize(line1: string, line2: string, compact: boolean): number {
  if (!line2) {
    if (line1.length > 60) return 50;
    if (line1.length > 34) return 60;
    if (line1.length > 22) return 74;
    return 88;
  }
  if (compact) return 58;
  const longest = Math.max(line1.length, line2.length);
  if (longest > 24) return 62;
  if (longest > 19) return 80;
  return 88;
}

/** The frame: two rails, two rules, and a dot in a disc of the ground at each crossing. */
function Frame({ inset, width, height, dot, c }: { inset: number; width: number; height: number; dot: number; c: Palette }) {
  const disc = dot * 4;
  const crossings: [number, number][] = [
    [inset, inset],
    [width - inset, inset],
    [inset, height - inset],
    [width - inset, height - inset],
  ];
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width, height, display: "flex" }}>
      <div style={{ position: "absolute", left: inset, top: 0, width: 1, height, backgroundColor: c.line }} />
      <div style={{ position: "absolute", left: width - inset, top: 0, width: 1, height, backgroundColor: c.line }} />
      <div style={{ position: "absolute", left: 0, top: inset, width, height: 1, backgroundColor: c.line }} />
      <div style={{ position: "absolute", left: 0, top: height - inset, width, height: 1, backgroundColor: c.line }} />
      {crossings.map(([x, y]) => (
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x - disc / 2,
            top: y - disc / 2,
            width: disc,
            height: disc,
            borderRadius: disc,
            backgroundColor: c.ground,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: dot, height: dot, borderRadius: dot, backgroundColor: c.ink }} />
        </div>
      ))}
    </div>
  );
}

/** The logo tile: the peach square with the mark, at any size. */
function LogoTile({ size }: { size: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.286),
        background: LOGO,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg width={Math.round(size * 0.6)} height={Math.round(size * 0.6)} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="11" r="5" fill="#ffffff" />
        <rect x="10.5" y="17" width="3" height="11" rx="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
}

export async function renderOgCard(content: OgCardContent = {}): Promise<ImageResponse> {
  const {
    line1 = "The intelligence layer",
    line2 = "for ad creative.",
    kicker = "Meta · TikTok · Google Ads · Amazon DSP",
    compact = false,
  } = content;
  const { fonts, display, serif } = await loadFonts();
  const INSET = 56;
  const c = PALETTE;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: c.ground,
          color: c.ink,
          fontFamily: display,
        }}
      >
        <Frame inset={INSET} width={OG_SIZE.width} height={OG_SIZE.height} dot={6} c={c} />

        <div
          style={{
            position: "absolute",
            left: INSET,
            top: INSET,
            width: OG_SIZE.width - INSET * 2,
            height: OG_SIZE.height - INSET * 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 64px 48px",
          }}
        >
          {/* Logo row */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoTile size={60} />
            <div style={{ display: "flex", fontFamily: serif, fontSize: 40, fontWeight: 600, marginLeft: 18, letterSpacing: "-0.025em" }}>peachblue</div>
          </div>

          {/* Headline */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: headlineSize(line1, line2, compact),
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              maxWidth: 960,
            }}
          >
            <div style={{ display: "flex", textWrap: "balance" }}>{line1}</div>
            {line2 ? <div style={{ display: "flex" }}>{line2}</div> : null}
          </div>

          {/* Platform line and the address */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", whiteSpace: "nowrap", fontSize: 25, color: c.soft }}>{kicker}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                height: 52,
                padding: "0 24px",
                marginLeft: 40,
                borderRadius: 26,
                backgroundColor: c.pill,
                color: c.pillInk,
                fontSize: 23,
                whiteSpace: "nowrap",
              }}
            >
              peachblue.io
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length > 0 ? fonts : undefined },
  );
}

export const OG_SQUARE_SIZE = { width: 1200, height: 1200 };

/**
 * 1:1 variant for Google Search thumbnails, which render around 50-90px.
 * At that size a headline is illegible regardless of ratio, so this card is
 * mark-led: the peach mark does the recognition work and the type is only
 * there for the larger surfaces that also accept a square.
 */
export async function renderSquareCard(): Promise<ImageResponse> {
  const { fonts, display, serif } = await loadFonts();
  const { width, height } = OG_SQUARE_SIZE;
  const c = PALETTE;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: c.ground,
          color: c.ink,
          fontFamily: display,
        }}
      >
        <Frame inset={88} width={width} height={height} dot={8} c={c} />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoTile size={400} />
          <div style={{ display: "flex", fontFamily: serif, fontSize: 116, fontWeight: 600, letterSpacing: "-0.025em", marginTop: 72 }}>peachblue</div>
          <div style={{ display: "flex", fontSize: 42, color: c.soft, marginTop: 24 }}>The intelligence layer for ad creative</div>
        </div>
      </div>
    ),
    { ...OG_SQUARE_SIZE, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
