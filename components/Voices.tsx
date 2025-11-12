"use client";

import { Card, CardBody } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

const TESTIMONIALS = [
  {
    name: "某行业客户 A",
    title: "CTO",
    quote: "接入后，让 AI 和同事一起排班，自动抄送、自动汇报，周转从天到小时。",
  },
  {
    name: "某行业客户 B",
    title: "运营总监",
    quote: "复杂流程全链路自动化，跨系统拉通，人工占比下降 60%+。",
  },
  {
    name: "某行业客户 C",
    title: "技术负责人",
    quote: "AutoMate...s 的多智能体协同带来了质的提升。",
  },
  {
    name: "某行业客户 D",
    title: "产品经理",
    quote: "自然的交互体验让团队更乐于使用，反馈积极。",
  },
];

export const Voices = () => {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const el = scrollerRef.current;
    if (!el) return;
    let id: any;
    const step = () => {
      el.scrollBy({ left: 1, behavior: "auto" });
      if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
        el.scrollTo({ left: 0, behavior: "auto" });
      }
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [reduce]);

  return (
    <section id="voices" className="mt-20 sm:mt-28 scroll-mt-24">
      <motion.h2
        {...(reduce
          ? { initial: false, transition: { duration: 0 } }
          : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } })}
        viewport={{ once: true }}
        className="mb-8 text-2xl sm:text-3xl font-semibold"
      >
        用户声音
      </motion.h2>
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="用户声音水平滚动列表"
      >
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={i}
            {...(reduce
              ? { initial: false, transition: { duration: 0 } }
              : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: i * 0.05, duration: 0.5 } })}
            viewport={{ once: true }}
            className="min-w-[280px] snap-start"
          >
            <Card className="bg-white/5 backdrop-blur border border-white/10">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10" />
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
    </section>
  );
};
