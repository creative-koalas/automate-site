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
    default: "AI劳动力 — 产品主页",
    template: "%s | AI劳动力",
  },
  description:
    "面向企业的AI劳动力，省心、懂你、自然，AutoMate...s 让人与AI同事协作无界。",
  applicationName: "AI劳动力",
  metadataBase: new URL("https://ai-workforce.example.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "AI劳动力 — 省心·懂你·自然·AutoMate...s",
    description:
      "面向企业的AI劳动力，省心、懂你、自然，AutoMate...s 让人与AI同事协作无界。",
    url: "https://ai-workforce.example.com",
    siteName: "AI劳动力",
    images: [
      { url: "/og.svg", width: 1200, height: 630, alt: "AI劳动力" },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI劳动力 — 省心·懂你·自然·AutoMate...s",
    description:
      "面向企业的AI劳动力，省心、懂你、自然，AutoMate...s 让人与AI同事协作无界。",
    images: ["/og.svg"],
  },
  icons: { icon: "/favicon.svg" }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1220",
  colorScheme: "dark light",
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
