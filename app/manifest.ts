import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI劳动力",
    short_name: "AI劳动力",
    description:
      "面向企业的AI劳动力，省心、懂你、自然，AutoMate...s 让人与AI同事协作无界。",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#0b1220",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
