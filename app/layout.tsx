import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://peachblue.io";
const SITE_NAME = "Peachblue";
const SITE_DESC =
  "Peachblue connects to your ad platforms, syncs creative assets and performance data, and uses AI to analyze what's working and why. Creative intelligence for modern marketing teams.";
const SOCIAL_DESC =
  "AI-powered creative analysis across Meta, Google, Amazon, and TikTok. Know what's working and why.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Peachblue — Creative Intelligence for Ads",
    template: "%s · Peachblue",
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    "peachblue",
    "creative intelligence",
    "ad creative analysis",
    "ad creative performance",
    "Meta ads analytics",
    "TikTok ads analytics",
    "Google ads analytics",
    "Amazon ads analytics",
    "AI creative tagging",
    "marketing analytics",
    "creative library",
    "agent peach",
  ],
  authors: [{ name: "Peachblue Technologies Inc.", url: SITE_URL }],
  creator: "Peachblue Technologies Inc.",
  publisher: "Peachblue Technologies Inc.",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Peachblue — Creative Intelligence for Ads",
    description: SOCIAL_DESC,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peachblue — Creative Intelligence for Ads",
    description: SOCIAL_DESC,
  },
  // TODO: add `verification.google` once GSC gives you the token, and
  // `other["facebook-domain-verification"]` mirrors the DNS TXT record.
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
  ],
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Peachblue",
      alternateName: "Peachblue Technologies",
      legalName: "Peachblue Technologies Inc.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
        width: 512,
        height: 512,
      },
      email: "nick@peachblue.io",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Peachblue",
      description: SITE_DESC,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "Peachblue",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description:
        "AI-powered creative intelligence platform for ad creative analysis across Meta, TikTok, Amazon, and Google Ads.",
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/LimitedAvailability",
        description: "Early access pricing is tailored per customer.",
      },
    },
  ],
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
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
