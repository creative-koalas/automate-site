import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: {
    default: "PsyGo 你的 AI 牛马",
    template: "%s PsyGo",
  },
  description:
    "PsyGo 是一个 AI 助理 App，覆盖 iOS、Android、macOS、Windows 和 Linux。你可以直接雇佣 AI 牛马，把任务交给它们。做完了，它们会主动把结果交回来。",
  applicationName: "PsyGo",
  metadataBase: new URL("https://ai-workforce.example.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "PsyGo 你的 AI 牛马",
    description:
      "PsyGo 是一个 AI 助理 App，覆盖 iOS、Android、macOS、Windows 和 Linux。你可以直接雇佣 AI 牛马，把任务交给它们。做完了，它们会主动把结果交回来。",
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
    title: "PsyGo 你的 AI 牛马",
    description:
      "PsyGo 是一个 AI 助理 App，覆盖 iOS、Android、macOS、Windows 和 Linux。你可以直接雇佣 AI 牛马，把任务交给它们。做完了，它们会主动把结果交回来。",
    images: ["/og.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.png?v=2", type: "image/png", sizes: "1024x1024" },
    ],
    shortcut: "/favicon.png?v=2",
    apple: [
      { url: "/apple-touch-icon.png?v=2", sizes: "180x180", type: "image/png" },
    ],
  },
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
        <link rel="preload" href="/favicon.png" as="image" type="image/png" />
        <link rel="preload" href="/og.svg" as="image" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <JsonLd />
      </head>
      <body className="antialiased bg-background text-foreground">
        <a href="#main-content" className="skip-link">跳到主要内容</a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
