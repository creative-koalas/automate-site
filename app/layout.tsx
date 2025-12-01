import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import UtmTracker from "./utm-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoMate - Let AI work for you",
  description: "The dawn of AGI starts with AutoMate.",
};

const BAIDU_TONGJI_ID = process.env.BAIDU_TONGJI_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {BAIDU_TONGJI_ID && (
          <Script id="baidu-tongji" strategy="afterInteractive">
            {`
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${BAIDU_TONGJI_ID}";
                var s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(hm, s);
              })();
            `}
          </Script>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UtmTracker />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
