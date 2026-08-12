import { ImageResponse } from "next/og";

/**
 * Shared social-card renderer for opengraph-image and twitter-image.
 *
 * Design goals: legible at Google-thumbnail size (few words, high contrast),
 * on-brand (cream background, peach gradient mark, Fraunces serif headline
 * with the italic accent word). Fraunces is fetched from Google Fonts at
 * render time (the no-User-Agent request returns TTF, which satori can
 * embed); if the fetch fails we fall back to the default sans rather than
 * erroring the image route.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "Peachblue · Creative Intelligence for Ads";

async function fetchFrauncesTtf(italic: boolean): Promise<ArrayBuffer | null> {
  try {
    const family = italic
      ? "Fraunces:ital,opsz,wght@1,9..144,500"
      : "Fraunces:opsz,wght@9..144,500";
    const css = await (
      await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`)
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:truetype|opentype)'\)/)?.[1];
    if (!url) return null;
    return await (await fetch(url)).arrayBuffer();
  } catch {
    return null;
  }
}

export interface OgCardContent {
  /** Headline lines; the last one renders italic peach. */
  line1?: string;
  line2?: string;
  /** Footer left text. */
  kicker?: string;
  /** Smaller headline for longer post titles. */
  compact?: boolean;
}

export async function renderOgCard(content: OgCardContent = {}): Promise<ImageResponse> {
  const {
    line1 = "Know what ads work",
    line2 = "and why.",
    kicker = "Creative intelligence for Meta · TikTok · Google · Amazon DSP",
    compact = false,
  } = content;
  const [regular, italic] = await Promise.all([
    fetchFrauncesTtf(false),
    fetchFrauncesTtf(true),
  ]);

  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"] = [];
  if (regular) fonts.push({ name: "Fraunces", data: regular, style: "normal", weight: 500 });
  if (italic) fonts.push({ name: "Fraunces", data: italic, style: "italic", weight: 500 });
  const serif = fonts.length > 0 ? "Fraunces" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          backgroundColor: "#FBFAF7",
          backgroundImage:
            "radial-gradient(52% 60% at 8% 0%, rgba(255,214,200,0.85) 0%, rgba(255,214,200,0) 60%), radial-gradient(55% 55% at 100% 100%, rgba(168,210,255,0.55) 0%, rgba(168,210,255,0) 55%)",
          color: "#1F2430",
        }}
      >
        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: 26,
              background: "linear-gradient(135deg, #FFB48C 0%, #F27749 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 14px 36px rgba(242,119,73,0.35)",
            }}
          >
            <svg width="58" height="58" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="11" r="5" fill="#ffffff" />
              <rect x="10.5" y="17" width="3" height="11" rx="1.5" fill="#ffffff" />
            </svg>
          </div>
          <div
            style={{
              fontFamily: serif,
              fontSize: 52,
              fontWeight: 500,
              marginLeft: 30,
              letterSpacing: "-0.02em",
            }}
          >
            peachblue
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: serif,
            fontSize: compact ? 68 : 92,
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            maxWidth: 1040,
          }}
        >
          <span>{line1}</span>
          <span style={{ fontStyle: "italic", color: "#F27749" }}>{line2}</span>
        </div>

        {/* Platform line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 27,
            color: "#5B5648",
          }}
        >
          <div style={{ display: "flex", whiteSpace: "nowrap" }}>{kicker}</div>
          <div style={{ display: "flex", fontWeight: 600, color: "#1F2430", whiteSpace: "nowrap", marginLeft: 40 }}>
            peachblue.io
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
