import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "./providers"; // adjust path if different
import { PRODUCT_NAME, PRODUCT_WORKFORCE_NAME } from "@/lib/brand";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${PRODUCT_NAME} - AI劳动力`,
  description: "忘记AI智能体。迎接AI劳动力。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
          <footer className="py-12 border-t border-black/5">
            <div className="max-w-5xl mx-auto px-6 text-center">
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#86868b]/60">
                <p>© 2026 创意考拉 {PRODUCT_WORKFORCE_NAME}</p>
                <span className="hidden sm:inline">·</span>
                <a href="https://beian.miit.gov.cn/">鄂ICP备2025165530号</a>
                <span className="hidden sm:inline">·</span>
                <a
                  href=" "
                  rel="noreferrer"
                  target="_blank"
                  className="flex items-center gap-1 hover:text-[#86868b] transition-colors"
                >
                  <img
                    src="/icons/public-security-icon.png"
                    alt="公安备案"
                    className="w-4 h-4"
                  />
                  鄂公网安备42010302002808号
                </a>
              </div>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
