import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PsyGo",
    short_name: "PsyGo",
    description:
      "PsyGo 是面向企业协作与自动化场景的 AI 劳动力平台，支持智能网页生成、定时任务执行与多智能体协作。",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1220",
    theme_color: "#0b1220",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
