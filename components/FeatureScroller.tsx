"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type Slide = {
  key: string;
  kind: "feature" | "interstitial" | "final";
  title?: string;
  desc?: string;
  icon?: string;
};

const SLIDES: Slide[] = [
  { key: "ease", kind: "feature", title: "省心", desc: "无需指导，长时间连续工作，自主解决环境配置、API接入等问题。", icon: "🧠" },
  { key: "understand", kind: "feature", title: "懂你", desc: "自研类脑记忆系统，在工作中持续进化，逐渐与你心有灵犀。", icon: "🤝" },
  { key: "natural", kind: "feature", title: "自然", desc: "人类级交互体验，会发飞书、发邮件，甚至能联系你的领导。", icon: "💬" },
  { key: "omg", kind: "interstitial" },
  { key: "automate", kind: "final", title: "不是一个 AI，而是一群 AI", desc: "AutoMate...s：人管AI、AI管AI、AI也能提醒人。", icon: "∞" },
];

export const FeatureScroller = () => {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rootEl = containerRef.current;
    const els = sectionRefs.current.filter(Boolean) as HTMLElement[];
    if (!els.length || !rootEl) return;
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
      { root: rootEl, threshold: [0.5, 0.75, 0.9] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const dotIndex = useMemo(() => {
    const slide = SLIDES[active];
    if (!slide) return 0;
    if (slide.kind === "feature") return SLIDES.slice(0, active + 1).filter((s) => s.kind !== "interstitial").length - 1;
    if (slide.kind === "interstitial") return 2;
    return 3;
  }, [active]);

  return (
    <section id="features" aria-label="主打特性滚动展示" className="relative">
      <div
        ref={containerRef}
        className="relative h-screen snap-y snap-mandatory overflow-y-scroll rounded-brand border border-white/10 bg-black/20 backdrop-blur supports-[backdrop-filter]:bg-black/30"
      >
        {SLIDES.map((s, i) => (
          <motion.section
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
            aria-label={s.kind === "interstitial" ? "One more thing 序章" : s.title ? s.title : undefined}
          >
            {s.kind === "interstitial" ? (
              <div className="space-y-6">
                <p className="text-sm tracking-widest text-white/60 uppercase">One more thing...</p>
                <h3 className="text-4xl sm:text-6xl font-extrabold text-white">准备好了吗</h3>
              </div>
            ) : (
              <div className="max-w-2xl space-y-6">
                <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-white/10 text-3xl" aria-hidden>
                  {s.icon}
                </div>
                <h3 className="text-4xl sm:text-5xl font-extrabold">{s.title}</h3>
                {s.desc && <p className="text-white/70 text-lg leading-7">{s.desc}</p>}
              </div>
            )}
          </motion.section>
        ))}

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3">
          {[0, 1, 2, 3].map((d) => (
            <div key={d} className={clsx("h-2 w-2 rounded-full bg-white/30 transition-all", dotIndex === d && "h-3 w-3 bg-white")} aria-hidden />
          ))}
        </div>
      </div>
    </section>
  );
};
