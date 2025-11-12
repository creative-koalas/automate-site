import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI劳动力 — 产品主页",
  description: "面向企业的AI劳动力，省心、懂你、自然，AutoMate...s 让人与AI同事协作无界。",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <NextThemesProvider attribute="class" defaultTheme="dark" enableSystem>
          <HeroUIProvider>{children}</HeroUIProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
