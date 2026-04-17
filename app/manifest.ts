import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Peachblue",
    short_name: "Peachblue",
    description: "Creative intelligence for modern marketing teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#F27749",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
