import React from "react";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PsyGo",
    url: "https://ai-workforce.example.com",
    logo: "/logo.svg",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "PsyGo 是面向企业协作与自动化场景的 AI 劳动力平台，支持智能网页生成、定时任务执行与多智能体协作。",
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
