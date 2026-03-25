"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VIDEO_POINTS = [
  {
    title: "任务如何被下达",
    desc: "从一句自然语言指令开始，展示 PsyGo 如何把模糊需求转成可以执行的任务流。",
  },
  {
    title: "过程如何被看见",
    desc: "把任务拆解、角色协作和中间产出放进同一段演示里，让决策者能快速理解工作过程。",
  },
  {
    title: "结果如何被接收",
    desc: "用网页、资料或日报这类真实交付物收尾，而不是停留在聊天记录里。",
  },
];

const VIDEO_META = [
  "适合放 60-90 秒产品介绍视频",
  "可替换为录屏、讲解短片或发布视频",
  "建议突出任务下达、执行、回收三段流程",
];

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
          增加一个视频展区，把产品讲完整。
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg">
          上面先用一块介绍区说明这段视频该讲什么、适合谁看，下面再放一个足够醒目的视频占位符。后续可以直接替换成 PsyGo 的正式演示录屏或品牌短片。
        </p>
      </div>

      <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_360px]">
        <div className="surface-shell rounded-[32px] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Video Overview</p>
          <h3 className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.04em] sm:text-4xl">
            这一段视频，建议用来回答三个最关键的问题。
          </h3>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">
            不只是放一个播放器，而是先明确视频该承担什么信息任务。这样访客在点击播放前，就已经知道会看到怎样的产品流程和交付结果。
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {VIDEO_POINTS.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-[var(--line)] bg-[var(--surface-1)]/80 p-5"
              >
                <p className="text-sm font-semibold tracking-[-0.02em]">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface-shell rounded-[32px] p-6 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">What To Show</p>
          <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em]">
            视频介绍展区
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)] sm:text-base">
            这一列可以作为视频的辅助说明位，提前告诉访客这段内容是给谁看的，以及建议重点展示哪些能力。
          </p>

          <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--muted-strong)] sm:text-base">
            {VIDEO_META.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[var(--brand)]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 rounded-[24px] border border-dashed border-[var(--line-strong)] bg-[var(--surface-inset)] px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Placeholder Note</p>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              当前先保留占位结构，等正式素材准备好后，只需要把下方视频源替换掉即可，不用重做这一整段版面。
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-[40px] bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.16),transparent_30%),linear-gradient(180deg,rgba(251,251,253,0.96),rgba(233,239,247,0.86))] p-3 shadow-[0_30px_120px_rgba(15,23,42,0.1)] dark:bg-[radial-gradient(circle_at_top_left,rgba(41,151,255,0.18),transparent_30%),linear-gradient(180deg,rgba(19,20,24,0.96),rgba(10,11,15,0.92))] sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 rounded-[26px] border border-black/5 bg-white/70 px-5 py-3 text-xs text-[var(--muted)] shadow-[0_18px_44px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#56c271]" />
            <span>产品介绍视频占位</span>
          </div>
          <span>可替换正式录屏 / 品牌短片</span>
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
            aria-label="产品演示视频占位"
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
              {error} 当前这里保留的是视频占位符，后续可以替换为 PsyGo 的正式录屏、品牌短片或产品发布视频。
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};
