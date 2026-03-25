"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import pptShot from "@/static/ppt任务.jpg";
import scheduleShot from "@/static/定时任务.jpg";
import smartPageShot from "@/static/智能页具体.jpg";

const CAPABILITIES = [
  {
    eyebrow: "AI 劳动力",
    title: "不是再加一个聊天框，而是给团队新增可用产能。",
    desc: "PsyGo 的核心不是单次问答，而是让 AI 以劳动力的身份进入组织，承担清晰任务、交付结果并持续复用。",
  },
  {
    eyebrow: "智能网页",
    title: "把一句需求，变成可交付的页面与互动体验。",
    desc: "PsyGo 可以围绕网页、活动页、演示页和互动内容自动生成结构、文案、视觉要点和首版成果，缩短从想法到上线的路径。",
  },
  {
    eyebrow: "定时任务",
    title: "让重复性的工作自动持续执行，而不是每天重新提醒。",
    desc: "日报、周报、监控、信息追踪、资料整理都可以被固定调度，让 AI 劳动力在你下班后继续工作。",
  },
];

const SCENARIOS: Array<{
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  image: StaticImageData;
  alt: string;
  imagePosition: string;
}> = [
  {
    eyebrow: "智能网页",
    title: "一句话下达任务，AI 劳动力生成可交付的智能页面。",
    desc: "从活动页、演示页到互动式小游戏，PsyGo 可以理解需求目标，完成结构设计、内容编排与页面初版交付。",
    bullets: [
      "面向营销、活动、售前展示等页面生产场景",
      "自动补正文案逻辑、交互结构和交付样式",
      "让网页生成从零散工具链变成完整工作流",
    ],
    image: smartPageShot,
    alt: "PsyGo 生成智能网页的示意截图",
    imagePosition: "object-[center_12%]",
  },
  {
    eyebrow: "内容产出",
    title: "从资料搜集到 PPT 草案，交给 AI 劳动力一条龙处理。",
    desc: "PsyGo 可以围绕发布会、汇报、培训等需求整理信息、构建结构，并直接产出可继续编辑的演讲资料。",
    bullets: [
      "自动搜集素材并整理成清晰目录",
      "把观点、结构和表达形式一起产出",
      "适合发布会、销售提案、内部培训等任务",
    ],
    image: pptShot,
    alt: "PsyGo 自动生成产品发布会 PPT 的示意截图",
    imagePosition: "object-top",
  },
  {
    eyebrow: "定时任务",
    title: "让日报、监控和追踪自动执行，每天按时把结果交回来。",
    desc: "PsyGo 支持按时间持续运行任务，自动采集、整理和发送结果，让重复性的认知劳动稳定在线。",
    bullets: [
      "支持每日、每周和固定时间段自动触发",
      "适合 AI 新闻追踪、竞品观察、经营日报等场景",
      "把高频重复工作变成持续运转的数字班组",
    ],
    image: scheduleShot,
    alt: "PsyGo 定时生成 AI 新闻日报的示意截图",
    imagePosition: "object-top",
  },
];

const fadeIn = (reduce: boolean | null | undefined, delay = 0) =>
  reduce
    ? { initial: undefined, whileInView: undefined, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.5, delay },
      };

export const FeatureScroller = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-24 pt-[calc(var(--header-h)+2rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+2.6rem)]">
      <Hero />

      <section id="capabilities" className="mt-20 sm:mt-28" aria-labelledby="capabilities-title">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            {...fadeIn(reduce)}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]"
          >
            Product Positioning
          </motion.p>
          <motion.h2
            {...fadeIn(reduce, 0.04)}
            viewport={{ once: true }}
            id="capabilities-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            重新定义 AI 的角色，不是工具，而是劳动力。
          </motion.h2>
          <motion.p
            {...fadeIn(reduce, 0.08)}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
          >
            当企业真正需要的是产能，而不是更多零散工具时，PsyGo 提供的是一个可组织、可管理、可持续运行的 AI 劳动力平台。
          </motion.p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {CAPABILITIES.map((item, index) => (
            <motion.article
              key={item.title}
              {...fadeIn(reduce, index * 0.05)}
              viewport={{ once: true }}
              className="surface-shell rounded-[28px] p-6 sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                {item.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-[1.8rem] sm:leading-[1.15]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--muted)]">
                {item.desc}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="scenarios" className="mt-20 sm:mt-28" aria-labelledby="scenarios-title">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            {...fadeIn(reduce)}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]"
          >
            Real Scenarios
          </motion.p>
          <motion.h2
            {...fadeIn(reduce, 0.04)}
            viewport={{ once: true }}
            id="scenarios-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            三个已经可以看见的交付场景。
          </motion.h2>
          <motion.p
            {...fadeIn(reduce, 0.08)}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
          >
            我把本地静态图直接接入页面，保留实际界面感，但尽量收起不必要的视觉装饰，让重点回到产品能力和落地场景本身。
          </motion.p>
        </div>

        <div className="mt-16 space-y-14 sm:space-y-16">
          {SCENARIOS.map((item, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.article
                key={item.title}
                {...fadeIn(reduce, index * 0.04)}
                viewport={{ once: true }}
                className={`grid gap-8 border-t border-[var(--line)] pt-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center ${reverse ? "lg:[&>*:first-child]:order-2 lg:grid-cols-[380px_minmax(0,1fr)]" : ""}`}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-4 max-w-3xl text-2xl font-semibold tracking-[-0.035em] sm:text-4xl lg:leading-[1.08]">
                    {item.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                    {item.desc}
                  </p>
                  <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--muted-strong)] sm:text-base">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 flex-none rounded-full bg-[var(--brand)]" aria-hidden />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mx-auto w-full max-w-[360px]">
                  <div className="surface-shell relative overflow-hidden rounded-[28px] p-2">
                    <div className="rounded-[22px] border border-black/6 bg-[linear-gradient(180deg,rgba(253,253,254,0.98),rgba(244,247,250,0.94))] p-2 shadow-[0_16px_42px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(20,22,26,0.96),rgba(10,12,14,0.94))] dark:shadow-none">
                      <div className="mb-2 flex items-center justify-between rounded-[14px] bg-black/[0.03] px-4 py-2 text-[11px] text-[var(--muted)] dark:bg-white/[0.04]">
                        <span>{item.eyebrow}</span>
                        <span>执行中</span>
                      </div>
                      <div className="relative aspect-[10/19] overflow-hidden rounded-[18px] border border-black/6 bg-[#f4f6f8] dark:border-white/10 dark:bg-black">
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          quality={95}
                          sizes="(min-width: 1024px) 380px, 88vw"
                          className={`object-contain ${item.imagePosition}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="download" className="mt-20 sm:mt-28">
        <div className="border-t border-[var(--line)] pt-10 sm:pt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Download</p>
          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
                把第一支 AI 劳动力班组，放进你的团队里。
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
                下载 PsyGo，开始搭建你的 AI 劳动力系统。先让它接住一个任务，再让它变成持续可复用的生产力。
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a href="/PsyGo-download.txt" download className="apple-button min-w-[200px]">
                下载 PsyGo
              </a>
              <a href="mailto:1234567890@qq.com" className="apple-button-secondary min-w-[200px]">
                联系咨询
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-20 sm:mt-28">
        <Footer />
      </div>
    </section>
  );
};
