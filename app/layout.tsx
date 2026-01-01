import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Psygo - AI劳动力",
  description: "全球首个AI劳动力",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
          <div className="pt-20 border-t border-white/5 text-default-400 text-sm flex flex-col md:flex-row justify-center items-center max-w-7xl mx-auto px-6">
            <p>© 2025 创意考拉 Psygo AI 劳动力 / 鄂ICP备2025165530号</p>
          </div>
        </Providers>
      </body>
    </html>
  );
}
