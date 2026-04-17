import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Peachblue — Creative Intelligence for Ads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background:
            "linear-gradient(135deg, #FFE3D3 0%, #FFB89A 45%, #F27749 100%)",
          fontFamily: "sans-serif",
          color: "#0a0f1a",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 48,
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 20,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 32px rgba(0,0,0,0.08)",
            }}
          >
            <svg
              width="56"
              height="56"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="18" cy="11" r="5" fill="#F27749" />
              <rect
                x="10.5"
                y="17"
                width="3"
                height="11"
                rx="1.5"
                fill="#F27749"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              marginLeft: 28,
              letterSpacing: "-0.02em",
            }}
          >
            peachblue
          </div>
        </div>
        <div
          style={{
            fontSize: 84,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            maxWidth: 960,
          }}
        >
          Know what&apos;s working and why.
        </div>
        <div
          style={{
            fontSize: 32,
            marginTop: 32,
            opacity: 0.78,
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          Creative intelligence for ads across Meta, TikTok, Amazon, and Google.
        </div>
      </div>
    ),
    { ...size },
  );
}
