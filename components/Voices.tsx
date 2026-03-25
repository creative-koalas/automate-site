"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./SectionHeader";
import { Surface } from "./Surface";

type T = { name: string; title: string; quote: string; rating: number };

const TESTIMONIALS: T[] = [
  { name: "某行业客户 A", title: "CTO", quote: "改成新的主题后，品牌质感和可信度一下就提上来了，演示时也更像成熟产品。", rating: 5 },
  { name: "某行业客户 B", title: "运营总监", quote: "首页留白更多，信息更清楚，后续只需要替换真实案例和截图，不必再改结构。", rating: 5 },
  { name: "某行业客户 C", title: "技术负责人", quote: "明亮主题更适合企业展示，暗色切换又保留了产品演示时的氛围感。", rating: 4.5 },
  { name: "某行业客户 D", title: "产品经理", quote: "占位符做得很明确，品牌、视频、Logo 和联系方式都知道该放到哪里。", rating: 5 },
];

function Stars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const items: string[] = [];
  for (let i = 0; i < full; i++) items.push("★");
  if (half) items.push("☆");
  for (let i = 0; i < empty; i++) items.push("✩");
  return (
    <div className="flex items-center gap-1 text-[12px] leading-none text-amber-400" aria-label={`评分 ${value}/5`} role="img">
      {items.map((s, i) => (
        <span key={i} aria-hidden>
          {s}
        </span>
      ))}
    </div>
  );
}

export const Voices = () => {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollByPage = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(320, Math.floor(el.clientWidth * 0.85));
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section id="voices" className="scroll-mt-32 pt-2" aria-labelledby="voices-title" aria-roledescription="用户反馈">
      <SectionHeader
        id="voices-title"
        eyebrow="Social Proof"
        title="用户声音"
        description="口碑区改成横向滑动的卡片轨道，既能容纳引用、评分和身份信息，也方便替换成客户名称、行业标签或品牌 Logo。"
      />

      <Surface className="relative overflow-hidden p-4 sm:p-6">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="用户声音水平滚动列表"
          role="region"
          tabIndex={0}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              {...(reduce
                ? { initial: false, transition: { duration: 0 } }
                : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: i * 0.05, duration: 0.5 } })}
              viewport={{ once: true }}
              className="min-w-[300px] max-w-md snap-start"
            >
              <div className="surface-shell-strong h-full rounded-brand p-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="grid h-11 w-11 place-items-center rounded-full text-sm font-semibold"
                        style={{ background: "var(--accent-soft)", color: "var(--brand)" }}
                        aria-hidden
                      >
                        {(t.name || "用").slice(0, 1)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{t.name}</p>
                        <p className="text-xs text-[var(--muted)]">{t.title}</p>
                      </div>
                    </div>
                    <Stars value={t.rating} />
                  </div>

                  <p className="text-base leading-7 text-[var(--muted-strong)]">“{t.quote}”</p>

                  <div className="placeholder-tile rounded-[22px] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Case Placeholder</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">这里可替换为客户名称、行业标签、品牌 Logo 或案例结果摘要。</p>
                  </div>
                </div>
              </div>
            </motion.blockquote>
          ))}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="surface-shell inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium text-[var(--muted-strong)]"
            aria-label="上一条"
            onClick={() => scrollByPage(-1)}
          >
            上一条
          </button>
          <button
            type="button"
            className="surface-shell inline-flex h-11 items-center justify-center rounded-full px-4 text-sm font-medium text-[var(--muted-strong)]"
            aria-label="下一条"
            onClick={() => scrollByPage(1)}
          >
            下一条
          </button>
        </div>
      </Surface>
    </section>
  );
};
