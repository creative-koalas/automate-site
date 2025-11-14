"use client";

import { useEffect } from "react";
import { FeatureScroller } from "@/components/FeatureScroller";
import { BackToTop } from "@/components/BackToTop";
import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.style.scrollSnapType = "y proximity";
    }
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_50%),linear-gradient(to_bottom,#020617_0%,#000_100%)]">
      <div id="top" />
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-none px-0 py-0">
        <FeatureScroller />
      </main>
      <BackToTop />
    </div>
  );
}
