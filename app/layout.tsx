import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { JsonLd } from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "PsyGo — AI 劳动力平台",
    template: "%s | PsyGo",
  },
  description:
    "PsyGo 是面向企业协作与自动化场景的 AI 劳动力平台，支持 AI 劳动力、多智能体协作、智能网页生成与定时任务执行。",
  applicationName: "PsyGo",
  metadataBase: new URL("https://ai-workforce.example.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "PsyGo — AI 劳动力平台",
    description:
      "PsyGo 是面向企业协作与自动化场景的 AI 劳动力平台，支持 AI 劳动力、多智能体协作、智能网页生成与定时任务执行。",
    url: "https://ai-workforce.example.com",
    siteName: "PsyGo",
    images: [
      { url: "/og.svg", width: 1200, height: 630, alt: "PsyGo" },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PsyGo — AI 劳动力平台",
    description:
      "PsyGo 是面向企业协作与自动化场景的 AI 劳动力平台，支持 AI 劳动力、多智能体协作、智能网页生成与定时任务执行。",
    images: ["/og.svg"],
  },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f5f7",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://interactive-examples.mdn.mozilla.net" crossOrigin="anonymous" />
        <link rel="preload" href="/favicon.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/og.svg" as="image" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <JsonLd />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <a href="#main-content" className="skip-link">跳到主要内容</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
