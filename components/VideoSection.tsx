"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Surface } from "./Surface";
import { SectionHeader } from "./SectionHeader";

export const VideoSection = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement | null>(null);
  const hostRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [src] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.get("broken") === "1") {
        return "/non-existent-video.mp4";
      }
    }
    return "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
  });

  useEffect(() => {
    // Only load/play when in view to reduce LCP/INP impact
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        setShouldLoad((prev) => prev || vis); // latch to true once seen
        const el = ref.current;
        if (!el) return;
        if (reduce) return; // respect reduced motion
        if (vis) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(host);
    return () => io.disconnect();
  }, [reduce]);

  const busy = !loaded && !error && shouldLoad;

  return (
    <motion.section
      ref={hostRef}
      initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : { duration: 0.6 }}
      className="relative flex items-center justify-center min-h-[480px] px-6 py-8 sm:py-10"
      aria-labelledby="video-title"
      aria-busy={busy}
      role="region"
    >
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <SectionHeader id="video-title" title="产品演示" />
        <Surface className="relative aspect-video w-full max-h-[72svh] overflow-hidden p-0 mt-4 sm:mt-6 rounded-brand">
          {!shouldLoad ? (
            <Image
              src="/og.svg"
              alt="产品演示占位图"
              fill
              sizes="100vw"
              className="object-contain"
              priority={false}
            />
          ) : !error ? (
            <video
              ref={ref}
              className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
              src={src}
              muted={!reduce}
              autoPlay={!reduce}
              playsInline
              loop={!reduce}
              controls
              controlsList="nodownload"
              preload="metadata"
              poster="/og.svg"
              aria-label="产品演示视频（占位）"
              onLoadedData={() => setLoaded(true)}
              onError={() => setError("视频加载失败，请稍后重试。")}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black/40 p-6 text-center text-white/80">
              <p className="max-w-md">
                {error} 您可以稍后刷新页面，或联系团队索要演示视频链接。
              </p>
            </div>
          )}
        </Surface>
      </div>
    </motion.section>
  );
};
