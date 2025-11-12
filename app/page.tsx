"use client";

import { Navbar } from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import { VideoSection } from "@/components/VideoSection";
import { Features } from "@/components/Features";
import { Voices } from "@/components/Voices";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),transparent_50%),linear-gradient(to_bottom,#020617_0%,#000_100%)]">
      <div id="top" />
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/30">
        <Navbar />
      </header>

      <main id="main-content" className="mx-auto max-w-6xl px-4 py-12 sm:py-20">
        <Hero />
        <VideoSection />
        <Features />
        <Voices />
        <Footer />
      </main>
      <BackToTop />
    </div>
  );
}
