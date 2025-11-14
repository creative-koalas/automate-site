"use client";

import { Card, CardBody, Button as NButton } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";

const TESTIMONIALS = [
  { name: "某行业客户 A", title: "CTO", quote: "接入后，让 AI 和同事一起排班，自动抄送、自动汇报，周转从天到小时。" },
  { name: "某行业客户 B", title: "运营总监", quote: "复杂流程全链路自动化，跨系统拉通，人工占比下降 60%+。" },
  { name: "某行业客户 C", title: "技术负责人", quote: "AutoMate...s 的多智能体协同带来了质的提升。" },
  { name: "某行业客户 D", title: "产品经理", quote: "自然的交互体验让团队更乐于使用，反馈积极。" },
];

export const Voices = ({ variant = "default" }: { variant?: "default" | "blk1" | "blk2" }) => {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const darker = variant !== "default";

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(320, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  useEffect(() => {
    if (reduce) return; // respect reduced motion
    const el = scrollerRef.current;
    const host = containerRef.current;
    if (!el || !host) return;

    let id: number | null = null;
    const step = () => {
      if (!inView || paused) { id = requestAnimationFrame(step); return; }
      el.scrollBy({ left: 1, behavior: "auto" });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "auto" });
      }
      id = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      setInView(entries.some((e) => e.isIntersecting));
    }, { threshold: 0.2 });
    io.observe(host);

    id = requestAnimationFrame(step);

    const onEnter = () => setPaused(true);
    const onLeave = () => setPaused(false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);

    const onKey = (e: KeyboardEvent) => {
      if (!el.contains(document.activeElement)) return;
      if (e.key === "ArrowRight") scrollByPage(1);
      else if (e.key === "ArrowLeft") scrollByPage(-1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      if (id) cancelAnimationFrame(id);
      io.disconnect();
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
      window.removeEventListener("keydown", onKey);
    };
  }, [reduce, inView, paused]);

  return (
    <section ref={containerRef} id="voices" className="mt-24 scroll-mt-24" aria-labelledby="voices-title" aria-roledescription="用户反馈">
      <SectionHeader id="voices-title" title="用户声音" />
      <div className={`relative rounded-brand border border-white/10 ${darker ? "bg-white/[0.04]" : "bg-white/5"} p-3 backdrop-blur`}>
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="用户反馈水平滚动列表"
          role="list"
          tabIndex={0}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              {...(reduce
                ? { initial: false, transition: { duration: 0 } }
                : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: i * 0.05, duration: 0.5 } })}
              viewport={{ once: true }}
              className="min-w-[280px] snap-start"
              role="listitem"
            >
              <Card className={`rounded-brand backdrop-blur border border-white/10 transition-shadow hover:shadow-lg shadow-md ${darker ? "bg-white/[0.06]" : "bg-gradient-to-b from-white/10 to-white/5"}`}>
                <CardBody className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/10 grid place-items-center text-white/80" aria-hidden>
                      {(t.name || "用").slice(0,1)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-white/60">{t.title}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-6">“{t.quote}”</p>
                </CardBody>
              </Card>
            </motion.blockquote>
          ))}
        </div>
        {/* Controls */}
        <div className="pointer-events-none absolute inset-y-0 flex items-center justify-between px-2">
          <NButton size="sm" radius="full" variant="flat" className="pointer-events-auto bg-white/10 text-white" aria-label="上一条" onPress={() => scrollByPage(-1)}>
            ←
          </NButton>
          <NButton size="sm" radius="full" variant="flat" className="pointer-events-auto bg-white/10 text-white" aria-label="下一条" onPress={() => scrollByPage(1)}>
            →
          </NButton>
        </div>
      </div>
    </section>
  );
};
