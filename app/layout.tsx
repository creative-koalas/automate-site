import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Psygo - AI劳动力",
  description: "忘记AI智能体。迎接AI劳动力。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} antialiased`}>
        {children}
        <footer className="py-12 border-t border-white/5">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-sm text-[#86868b]">
              © 2026 创意考拉 Psygo AI 劳动力
            </p>
            <p className="text-xs text-[#86868b]/60 mt-2">
              鄂ICP备2025165530号
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
