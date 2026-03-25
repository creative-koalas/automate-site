"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const VideoSection = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement | null>(null);
  const hostRef = useRef<HTMLElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forceBroken] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    const url = new URL(window.location.href);
    return url.searchParams.get("broken") === "1";
  });
  const [src] = useState<string>(() => {
    return forceBroken
      ? "/non-existent-video.mp4"
      : "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        const el = ref.current;
        if (!el || reduce) return;
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

  const busy = !loaded && !error;

  return (
    <motion.section
      id="video"
      ref={hostRef}
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : { duration: 0.55 }}
      aria-labelledby="video-title"
      aria-busy={busy}
      role="region"
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Product Video</p>
        <h2 id="video-title" className="mt-4 text-4xl font-semibold tracking-[-0.06em] sm:text-6xl">
          看一段 PsyGo 的实际工作流程。
        </h2>
      </div>

      <div className="mt-12 overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.16),transparent_30%),linear-gradient(180deg,rgba(251,251,253,0.96),rgba(233,239,247,0.86))] p-3 shadow-[0_30px_120px_rgba(15,23,42,0.1)] dark:bg-[radial-gradient(circle_at_top_left,rgba(41,151,255,0.18),transparent_30%),linear-gradient(180deg,rgba(19,20,24,0.96),rgba(10,11,15,0.92))] sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-black/5 bg-white/70 px-5 py-3 text-xs text-[var(--muted)] shadow-[0_18px_44px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#56c271]" />
            <span>PsyGo 产品演示</span>
          </div>
          <span>任务执行流程</span>
        </div>

        {!error ? (
          <video
            ref={ref}
            className="aspect-video w-full rounded-[32px] object-cover"
            src={src}
            muted={!reduce}
            autoPlay={!reduce}
            playsInline
            loop={!reduce}
            controls
            controlsList="nodownload"
            preload="metadata"
            poster="/og.svg"
            aria-label="PsyGo 产品演示视频"
            onLoadedData={() => setLoaded(true)}
            onError={() => {
              if (forceBroken) {
                setError("视频加载失败，请稍后重试。");
              }
            }}
          />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-[32px] bg-black/5 p-8 text-center dark:bg-white/[0.03]">
            <p className="max-w-lg text-sm leading-8 text-[var(--muted-strong)]">
              {error}
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};
