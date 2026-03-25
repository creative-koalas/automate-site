"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import heroShot from "@/static/psygo_home.png";

const STRIP_ITEMS = [
  "AI 劳动力平台",
  "智能网页交付",
  "定时任务执行",
];

export const Hero = ({ variant = "default" }: { variant?: "default" | "blk1" | "blk2" }) => {
  const reduce = useReducedMotion();
  const enter = reduce
    ? { initial: false, whileInView: undefined, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: variant === "default" ? 0.55 : 0.35 },
      };

  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-18">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_20%_10%,rgba(96,195,129,0.1),transparent_20%),radial-gradient(circle_at_56%_0%,rgba(0,113,227,0.14),transparent_28%),radial-gradient(circle_at_92%_10%,rgba(255,255,255,0.64),transparent_24%)] dark:bg-[radial-gradient(circle_at_20%_16%,rgba(92,196,125,0.12),transparent_18%),radial-gradient(circle_at_56%_0%,rgba(41,151,255,0.18),transparent_28%),radial-gradient(circle_at_92%_10%,rgba(255,255,255,0.06),transparent_24%)]"
      />

      <div className="mx-auto max-w-[82rem]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span {...enter} viewport={{ once: true }} className="eyebrow">
            AI Workforce Platform
          </motion.span>

          <motion.h1
            {...enter}
            viewport={{ once: true }}
            className="mx-auto mt-7 max-w-4xl text-4xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[5.25rem] lg:leading-[0.94]"
          >
            把 AI 从工具，
            <br className="hidden sm:block" />
            升级为可协作的劳动力。
          </motion.h1>

          <motion.p
            {...(reduce
              ? enter
              : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.05, duration: 0.5 } })}
            viewport={{ once: true }}
            className="mx-auto mt-7 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
          >
            PsyGo 让企业拥有一支可招聘、可调度、可追踪的 AI 劳动力团队。它能进入真实业务流程，承担智能网页生成、定时任务执行、资料整理、内容生产与多角色协作。
          </motion.p>

          <motion.div
            {...(reduce
              ? enter
              : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.5 } })}
            viewport={{ once: true }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="/PsyGo-download.txt" download className="apple-button">
              下载 PsyGo
            </a>
            <a href="#scenarios" className="apple-button-ghost">
              查看实际场景
            </a>
          </motion.div>
        </div>

        <motion.div
          {...(reduce
            ? enter
            : { initial: { opacity: 0, scale: 0.985, y: 20 }, whileInView: { opacity: 1, scale: 1, y: 0 }, transition: { delay: 0.12, duration: 0.55 } })}
          viewport={{ once: true }}
          className="relative mt-12 sm:mt-14 lg:mt-16"
        >
          <div className="surface-shell-strong relative overflow-hidden rounded-[32px] p-3 sm:p-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30 dark:opacity-15" />
            <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(246,248,238,0.92),rgba(241,246,233,0.86))] p-2 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,19,20,0.94),rgba(10,12,14,0.94))]">
              <div className="flex items-center justify-between rounded-[22px] border border-black/5 bg-white/80 px-4 py-3 text-xs text-[var(--muted)] shadow-[0_16px_38px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#56c271]" />
                  <span>多智能体工作台</span>
                </div>
                <span>实时协作中</span>
              </div>

              <div className="relative mt-3 aspect-[2238/1323] overflow-hidden rounded-[26px] border border-black/5 bg-[#edf4e7] dark:border-white/10 dark:bg-[#0d1114]">
                <Image
                  src={heroShot}
                  alt="PsyGo AI 劳动力工作台界面"
                  fill
                  priority
                  quality={95}
                  sizes="(min-width: 1536px) 1480px, (min-width: 1024px) 1312px, 100vw"
                  className="object-contain object-center"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...(reduce
            ? enter
            : { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { delay: 0.18, duration: 0.5 } })}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--muted)]"
        >
          {STRIP_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
