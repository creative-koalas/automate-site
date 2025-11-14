"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { IMMERSIVE_SLIDES } from "./data/features";
import { Hero } from "./Hero";
import { VideoSection } from "./VideoSection";
import { Voices } from "./Voices";
import { Footer } from "./Footer";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Slide = typeof IMMERSIVE_SLIDES[number];

export const FeatureScroller = () => {
  const reduce = useReducedMotion();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const animatingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);
  const [variant, setVariant] = useState<"default" | "blk1" | "blk2">("default");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const v = new URL(window.location.href).searchParams.get("v");
      if (v === "blk1" || v === "blk2") setVariant(v);
    }
  }, []);

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = els.findIndex((el) => el === visible.target);
          if (idx !== -1) setActive(idx);
        }
      },
      { threshold: [0.55, 0.75, 0.9] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Navigation covers all slides. Also expose safe next/prev helpers.
  const dotMap = useMemo(() => IMMERSIVE_SLIDES.map((_, i) => i), []);
  const dotIndex = active;
  const safeIndex = (i: number) => Math.max(0, Math.min(dotMap.length - 1, i));
  const gotoDot = (d: number) => {
    const idx = dotMap[safeIndex(d)] ?? 0;
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  const gotoOffset = (offset: number) => gotoDot(dotIndex + offset);

  useEffect(() => {
    if (reduce) return;

    const throttle = variant === "blk2" ? 360 : 500;
    const threshold = 14;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < threshold) return;
      if (e.ctrlKey) return; // ignore pinch-zoom on some devices
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = safeIndex(dotIndex + dir);
      if (next !== dotIndex) {
        e.preventDefault();
        if (animatingRef.current) return;
        animatingRef.current = true;
        gotoDot(next);
        setTimeout(() => (animatingRef.current = false), throttle);
      }
      // allow native scroll at ends
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartY.current;
      if (start == null) return;
      const dy = start - (e.changedTouches[0]?.clientY ?? start);
      if (Math.abs(dy) < 20) return;
      if (animatingRef.current) return;
      animatingRef.current = true;
      const dir = dy > 0 ? 1 : -1;
      gotoOffset(dir);
      setTimeout(() => (animatingRef.current = false), throttle);
      touchStartY.current = null;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchend", onTouchEnd as any);
    };
  }, [dotIndex, reduce, variant, dotMap]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      gotoOffset(1);
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      gotoOffset(-1);
    } else if (e.key === "End") {
      e.preventDefault();
      gotoDot(dotMap.length - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      gotoDot(0);
    }
  };

  return (
    <section id="immersive" aria-label="沉浸式滚动" className={clsx("relative", variant !== "default" && "bg-black")}
      style={{ scrollSnapType: "y proximity" }}
    >
      <div tabIndex={0} onKeyDown={onKey} aria-label="沉浸式滚动容器">
        {IMMERSIVE_SLIDES.map((s, i) => (
          <motion.section
            id={`slide-${s.key}`}
            key={s.key}
            ref={(el: HTMLElement | null) => {
              sectionRefs.current[i] = el;
            }}
            className={clsx(
              "snap-start min-h-[100svh] flex items-center justify-center px-6 sm:px-8 scroll-mt-16 sm:scroll-mt-20",
              s.kind === "interstitial" ? "text-center bg-black" : "text-center"
            )}
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ amount: 0.6, once: false }}
            transition={reduce ? { duration: 0 } : { duration: variant === "blk2" ? 0.33 : variant === "blk1" ? 0.42 : 0.55 }}
            aria-roledescription="分屏"
          >
            {s.kind === "hero" && (
              <div className="w-full max-w-7xl mx-auto text-left md:-translate-y-4">
                <Hero variant={variant} />
              </div>
            )}

            {s.kind === "video" && (
              <div className="w-full max-w-7xl mx-auto md:-translate-y-4">
                <VideoSection />
              </div>
            )}

            {s.kind === "feature" && (
              <div className="max-w-4xl w-full mx-auto md:-translate-y-4">
                <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 grid place-items-center rounded-full bg-white/10 ring-1 ring-white/15 text-3xl" aria-hidden>
                  {(s as any).icon ?? "★"}
                </div>
                <h3 className={clsx(
                  "mt-4 font-extrabold text-white leading-tight",
                  variant === "blk2" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl"
                )}>
                  {(s as any).title}
                </h3>
                <p className={clsx(
                  "mt-3 text-lg leading-7 mx-auto px-2 sm:px-4 max-w-prose",
                  variant !== "default" ? "text-white/90" : "text-white/80"
                )}>
                  {(s as any).desc}
                </p>
              </div>
            )}

            {s.kind === "interstitial" && (
              <div className="space-y-4 max-w-2xl mx-auto px-2 sm:px-4 md:-translate-y-3">
                <p className="text-sm tracking-widest text-white/70 uppercase">One more thing...</p>
                <h3 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
                  准备好了吗
                </h3>
                <p className="text-white/70">
                  不是一句口号，是可以落地的自动化和协作。
                </p>
              </div>
            )}

            {s.kind === "final" && (
              <div className="max-w-2xl space-y-6 mx-auto px-2 sm:px-4 md:-translate-y-3">
                <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-white/10 text-3xl" aria-hidden>
                  {(s as any).icon ?? "∞"}
                </div>
                <h3 className={clsx("font-extrabold text-white leading-tight", variant === "blk2" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl")}>{(s as any).title}</h3>
                <p className="text-white/90 text-lg leading-7">{(s as any).desc}</p>
              </div>
            )}

            {s.kind === "voices" && (
              <div className="w-full max-w-6xl mx-auto md:-translate-y-4">
                <Voices variant={variant} />
              </div>
            )}

            {s.kind === "footer" && (
              <div className="w-full max-w-6xl mx-auto md:-translate-y-2">
                <Footer variant={variant} />
              </div>
            )}
          </motion.section>
        ))}

        <nav role="tablist" aria-label="滚动导航" className="fixed right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
          {dotMap.map((_, d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={dotIndex === d}
              aria-current={dotIndex === d}
              aria-controls={`slide-${IMMERSIVE_SLIDES[dotMap[d]].key}`}
              aria-label={`跳转到 ${IMMERSIVE_SLIDES[dotMap[d]].key} 屏`}
              onClick={() => gotoDot(d)}
              className={clsx(
                "h-2 w-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                variant !== "default" ? "bg-white/50" : "bg-white/40",
                dotIndex === d && "h-3 w-3 bg-white"
              )}
              title={`跳转到第 ${d + 1} 屏`}
            />
          ))}
        </nav>
      </div>
    </section>
  );
};
