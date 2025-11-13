"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { IMMERSIVE_SLIDES } from "./data/features";
import { Hero } from "./Hero";
import { VideoSection } from "./VideoSection";
import { Voices } from "./Voices";
import { Footer } from "./Footer";

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

  const dotMap = [0, 1, 2, 3, 5];
  const dotIndex = useMemo(() => {
    const slide = IMMERSIVE_SLIDES[active]?.kind;
    if (slide === "hero") return 0;
    if (slide === "feature") return Math.min(3, Math.max(1, active));
    if (slide === "interstitial") return 3;
    if (slide === "final") return 4;
    return 4;
  }, [active]);

  const gotoDot = (d: number) => {
    const idx = dotMap[d] ?? 0;
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  useEffect(() => {
    if (reduce) return;

    const throttle = variant === "blk2" ? 400 : 550;
    const threshold = 15;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < threshold) return;
      e.preventDefault();
      if (animatingRef.current) return;
      animatingRef.current = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(dotMap.length - 1, dotIndex + dir));
      gotoDot(next);
      setTimeout(() => (animatingRef.current = false), throttle);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartY.current;
      if (start == null) return;
      const dy = start - (e.changedTouches[0]?.clientY ?? start);
      if (Math.abs(dy) < 18) return;
      if (animatingRef.current) return;
      animatingRef.current = true;
      const dir = dy > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(dotMap.length - 1, dotIndex + dir));
      gotoDot(next);
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
  }, [dotIndex, reduce, variant]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      gotoDot(Math.min(dotMap.length - 1, dotIndex + 1));
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      gotoDot(Math.max(0, dotIndex - 1));
    }
  };

  return (
    <section id="immersive" aria-label="沉浸式滚动" className={clsx("relative", variant !== "default" && "bg-black")}> 
      <div tabIndex={0} onKeyDown={onKey} aria-label="沉浸式滚动容器">
        {IMMERSIVE_SLIDES.map((s, i) => (
          <motion.section
            id={`slide-${s.key}`}
            key={s.key}
            ref={(el: HTMLElement | null) => {
              sectionRefs.current[i] = el;
            }}
            className={clsx(
              "snap-start h-screen flex items-center justify-center px-6 text-center",
              s.kind === "interstitial" ? "bg-black" : variant !== "default" ? "bg-transparent" : "bg-transparent"
            )}
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ amount: 0.6, once: false }}
            transition={reduce ? { duration: 0 } : { duration: variant === "blk2" ? 0.35 : variant === "blk1" ? 0.45 : 0.6 }}
          >
            {s.kind === "hero" && (
              <div className="w-full max-w-6xl mx-auto text-left">
                <Hero variant={variant} />
                <div className="mt-8">
                  <VideoSection />
                </div>
              </div>
            )}

            {s.kind === "feature" && (
              <div className="max-w-2xl space-y-6">
                <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-white/10 text-3xl" aria-hidden>
                  {/* icon */}
                </div>
                <h3 className={clsx("font-extrabold", variant === "blk2" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl")}>{(s as any).title}</h3>
                <p className={clsx("text-lg leading-7", variant !== "default" ? "text-white/80" : "text-white/70")}>{(s as any).desc}</p>
              </div>
            )}

            {s.kind === "interstitial" && (
              <div className="space-y-6">
                <p className="text-sm tracking-widest text-white/60 uppercase">One more thing...</p>
                <h3 className="text-4xl sm:text-6xl font-extrabold text-white">准备好了吗</h3>
              </div>
            )}

            {s.kind === "final" && (
              <div className="max-w-2xl space-y-6">
                <h3 className={clsx("font-extrabold", variant === "blk2" ? "text-5xl sm:text-6xl" : "text-4xl sm:text-5xl")}>{(s as any).title}</h3>
                <p className="text-white/80 text-lg leading-7">{(s as any).desc}</p>
              </div>
            )}

            {s.kind === "voices" && (
              <div className="w-full max-w-6xl mx-auto">
                <Voices />
              </div>
            )}

            {s.kind === "footer" && (
              <div className="w-full max-w-6xl mx-auto">
                <Footer />
              </div>
            )}
          </motion.section>
        ))}

        <nav aria-label="滚动导航" className="fixed right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
          {dotMap.map((_, d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={dotIndex === d}
              aria-controls={`slide-${IMMERSIVE_SLIDES[dotMap[d]].key}`}
              onClick={() => gotoDot(d)}
              className={clsx(
                "h-2 w-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
                variant !== "default" ? "bg-white/40" : "bg-white/30",
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
