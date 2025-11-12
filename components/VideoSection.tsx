"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export const VideoSection = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [src, setSrc] = useState<string>(
    "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (url.searchParams.get("broken") === "1") {
        setSrc("/non-existent-video.mp4");
      }
    }
  }, []);

  useEffect(() => {
    if (reduce) return; // honor reduced motion: don't auto-play or observe
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  const busy = !loaded && !error;

  return (
    <motion.section
      initial={reduce ? undefined : { opacity: 0, scale: 0.98 }}
      whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : { duration: 0.6 }}
      className="relative mt-10 scroll-mt-24"
      aria-label="产品演示视频区域"
      aria-busy={busy}
      role="region"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        {busy && (
          <div
            aria-hidden
            className="absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.06),rgba(255,255,255,0.12),rgba(255,255,255,0.06))] bg-[length:200%_100%]"
          />
        )}
        {!error ? (
          <video
            ref={ref}
            className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            src={src}
            muted={!reduce}
            playsInline
            loop={!reduce}
            controls
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
      </div>
    </motion.section>
  );
};
