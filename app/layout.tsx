import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "peachblue — Creative Intelligence for Ads",
  description:
    "peachblue connects to your ad platforms, syncs creative assets and performance data, and uses AI to analyze what's working and why. Creative intelligence for modern marketing teams.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "peachblue — Creative Intelligence for Ads",
    description:
      "AI-powered creative analysis across Meta, Google, Amazon, and TikTok. Know what's working and why.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "peachblue — Creative Intelligence for Ads",
    description:
      "AI-powered creative analysis across Meta, Google, Amazon, and TikTok. Know what's working and why.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
