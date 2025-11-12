"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { SCROLLER_SLIDES } from "./data/features";

type Slide = typeof SCROLLER_SLIDES[number];

export const FeatureScroller = () => {
  const reduce = useReducedMotion();
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const animatingRef = useRef(false);
  const touchStartY = useRef<number | null>(null);

  // Observe slide visibility in the viewport (window-level scroll)
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

  const dotIndex = useMemo(() => {
    const slide = SCROLLER_SLIDES[active];
    if (!slide) return 0;
    if (slide.kind === "feature")
      return (
        SCROLLER_SLIDES.slice(0, active + 1).filter((s) => s.kind !== "interstitial").length - 1
      );
    if (slide.kind === "interstitial") return 2;
    return 3;
  }, [active]);

  const dotToSlideIndex = (d: number) => [0, 1, 2, 4][d] ?? 0;

  const gotoDot = (d: number) => {
    const idx = dotToSlideIndex(d);
    const el = sectionRefs.current[idx];
    if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  // Immediate step-on-wheel/touch for fluent feel
  useEffect(() => {
    if (reduce) return; // honor reduced motion

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 10) return;
      e.preventDefault();
      if (animatingRef.current) return;
      animatingRef.current = true;
      const dir = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(3, dotIndex + dir));
      gotoDot(next);
      setTimeout(() => (animatingRef.current = false), 650);
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const start = touchStartY.current;
      if (start == null) return;
      const dy = start - (e.changedTouches[0]?.clientY ?? start);
      if (Math.abs(dy) < 24) return;
      if (animatingRef.current) return;
      animatingRef.current = true;
      const dir = dy > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(3, dotIndex + dir));
      gotoDot(next);
      setTimeout(() => (animatingRef.current = false), 650);
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
  }, [dotIndex, reduce]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "PageDown") {
      e.preventDefault();
      gotoDot(Math.min(dotIndex + 1, 3));
    } else if (e.key === "ArrowUp" || e.key === "PageUp") {
      e.preventDefault();
      gotoDot(Math.max(dotIndex - 1, 0));
    }
  };

  return (
    <section id="features-snap" aria-label="主打特性滚动展示" className="relative">
      {/* Window-level fullpage slides */}
      <div tabIndex={0} onKeyDown={onKey} aria-label="特性滚动容器（可用上下键切换）">
        {SCROLLER_SLIDES.map((s, i) => (
          <motion.section
            id={`slide-${s.key}`}
            key={s.key}
            ref={(el: HTMLElement | null) => {
              sectionRefs.current[i] = el;
            }}
            className={clsx(
              "snap-start h-screen flex items-center justify-center px-6 text-center",
              s.kind === "interstitial" ? "bg-black" : "bg-transparent"
            )}
            initial={reduce ? undefined : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ amount: 0.6, once: false }}
            transition={reduce ? { duration: 0 } : { duration: 0.6 }}
            aria-label={
              s.kind === "interstitial" ? "One more thing 序章" : s.title ? s.title : undefined
            }
          >
            {s.kind === "interstitial" ? (
              <div className="space-y-6">
                <p className="text-sm tracking-widest text-white/60 uppercase">One more thing...</p>
                <h3 className="text-4xl sm:text-6xl font-extrabold text-white">准备好了吗</h3>
              </div>
            ) : (
              <div className="max-w-2xl space-y-6">
                <div
                  className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-white/10 text-3xl"
                  aria-hidden
                >
                  {s.icon}
                </div>
                <h3 className="text-4xl sm:text-5xl font-extrabold">{s.title}</h3>
                {"desc" in s && s.desc && (
                  <p className="text-white/70 text-lg leading-7">{s.desc}</p>
                )}
              </div>
            )}
          </motion.section>
        ))}

        {/* Fixed dot nav (desktop) */}
        <nav
          aria-label="特性滚动导航"
          className="fixed right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3"
        >
          {[0, 1, 2, 3].map((d) => (
            <button
              key={d}
              type="button"
              role="tab"
              aria-selected={dotIndex === d}
              aria-controls={`slide-${SCROLLER_SLIDES[dotToSlideIndex(d)].key}`}
              onClick={() => gotoDot(d)}
              className={clsx(
                "h-2 w-2 rounded-full bg-white/30 transition-all outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
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
