import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  openGraph: {
    title: "AI劳动力 — 省心·懂你·自然·AutoMate...s",
    description:
      "面向企业的AI劳动力，省心、懂你、自然，AutoMate...s 让人与AI同事协作无界。",
    url: "https://ai-workforce.example.com",
    siteName: "AI劳动力",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "AI劳动力" },
    ],
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI劳动力 — 省心·懂你·自然·AutoMate...s",
    description:
      "面向企业的AI劳动力，省心、懂你、自然，AutoMate...s 让人与AI同事协作无界。",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.svg" },
  themeColor: "#0b1220",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
