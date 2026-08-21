import { ImageResponse } from "next/og";

/**
 * Shared social-card renderer for opengraph-image and twitter-image.
 *
 * 1200x630 is the Open Graph standard and what iMessage, Slack, LinkedIn and
 * X's large card all crop to. Square would get letterboxed in most of them.
 *
 * Design goals: legible at Google-thumbnail size (few words, high contrast),
 * on-brand (the V3 ink surface, peach gradient mark, Fraunces serif headline
 * with the italic peach accent). Fraunces is fetched from Google Fonts at
 * render time (the no-User-Agent request returns TTF, which satori can
 * embed); if the fetch fails we fall back to the default sans rather than
 * erroring the image route.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "Peachblue · The intelligence layer for ad creative";

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

/** Auto-fit: long lines would overflow the 1040px text column at 92px. */
function headlineSize(line1: string, line2: string, compact: boolean): number {
  if (compact) return 64;
  const longest = Math.max(line1.length, line2.length);
  if (longest > 24) return 68;
  if (longest > 18) return 78;
  return 92;
}

export async function renderOgCard(content: OgCardContent = {}): Promise<ImageResponse> {
  const {
    line1 = "The intelligence layer",
    line2 = "for ad creative.",
    kicker = "Meta · TikTok · Google Ads · Amazon DSP",
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
          backgroundColor: "#13214B",
          backgroundImage:
            "radial-gradient(120% 140% at 8% 0%, rgba(59,111,224,0.42) 0%, rgba(59,111,224,0) 58%), linear-gradient(135deg, #1D306B 0%, #13214B 55%, #0C1430 100%)",
          color: "#F6F8FF",
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
              boxShadow: "0 14px 36px rgba(242,119,73,0.45)",
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
              color: "#F6F8FF",
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
            fontSize: headlineSize(line1, line2, compact),
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            maxWidth: 1040,
          }}
        >
          <span>{line1}</span>
          <span style={{ fontStyle: "italic", color: "#FF9466" }}>{line2}</span>
        </div>

        {/* Platform line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 27,
            color: "#A9B7DD",
          }}
        >
          <div style={{ display: "flex", whiteSpace: "nowrap" }}>{kicker}</div>
          <div style={{ display: "flex", fontWeight: 600, color: "#F6F8FF", whiteSpace: "nowrap", marginLeft: 40 }}>
            peachblue.io
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
  const regular = await fetchFrauncesTtf(false);
  const fonts: NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"] = [];
  if (regular) fonts.push({ name: "Fraunces", data: regular, style: "normal", weight: 500 });
  const serif = fonts.length > 0 ? "Fraunces" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#13214B",
          backgroundImage:
            "radial-gradient(120% 140% at 8% 0%, rgba(59,111,224,0.42) 0%, rgba(59,111,224,0) 58%), linear-gradient(135deg, #1D306B 0%, #13214B 55%, #0C1430 100%)",
          color: "#F6F8FF",
        }}
      >
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: 108,
            background: "linear-gradient(135deg, #FFB48C 0%, #F27749 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 30px 80px rgba(242,119,73,0.45)",
          }}
        >
          <svg width="240" height="240" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="11" r="5" fill="#ffffff" />
            <rect x="10.5" y="17" width="3" height="11" rx="1.5" fill="#ffffff" />
          </svg>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: serif,
            fontSize: 116,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            marginTop: 72,
          }}
        >
          peachblue
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: serif,
            fontSize: 42,
            color: "#A9B7DD",
            marginTop: 20,
          }}
        >
          The intelligence layer for ad creative
        </div>
      </div>
    ),
    { ...OG_SQUARE_SIZE, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
