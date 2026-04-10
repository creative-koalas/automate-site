"use client";

import { useEffect } from "react";
import { FeatureScroller } from "@/components/FeatureScroller";
import { BackToTop } from "@/components/BackToTop";
import { CustomerServiceChat } from "@/components/CustomerServiceChat";
// import { SiteHeader } from "@/components/SiteHeader";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  return (
    <div className="min-h-screen">
      <div id="top" />
      {/* <SiteHeader /> */}
      <main id="main-content" className="mx-auto max-w-none px-0 py-0">
        <FeatureScroller />
      </main>
      <BackToTop />
      <CustomerServiceChat />
    </div>
  );
}
