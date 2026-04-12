"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "./Footer";
import { FeatureMessageWall, type FeatureWallItem } from "./FeatureMessageWall";
import { Hero } from "./Hero";
import decisionResultShot from "@/static/复杂任务成果展示图片.png";
import teamworkShot from "@/static/协同办公.png";
import scheduleShot from "@/static/定时任务.jpg";
import researchShot from "@/static/文献论文.png";

const CAPABILITIES: FeatureWallItem[] = [
  {
    eyebrow: "01",
    highlight: "开箱即用",
    title: "点一下，就开工",
    desc: "不需要配置，也不用学习。",
    note: "不是 setup，不是教程，是直接开工。",
    startX: -760,
    startY: -420,
    startRotate: -15,
    endRotate: -5,
    wallPositionClassName: "left-[5%] top-[10%]",
    wallWidthClassName: "w-[360px]",
    highlightClassName: "text-[clamp(4.2rem,6vw,6.2rem)]",
  },
  {
    eyebrow: "02",
    highlight: "说完就交",
    title: "一句话，直接派单",
    desc: "不是聊完就算，是马上开始执行。",
    note: "输入不是提问，输入就是派单。",
    startX: 740,
    startY: -360,
    startRotate: 14,
    endRotate: 4,
    wallPositionClassName: "right-[7%] top-[9%]",
    wallWidthClassName: "w-[340px]",
    highlightClassName: "text-[clamp(3.9rem,5.7vw,5.9rem)]",
  },
  {
    eyebrow: "03",
    highlight: "后台推进",
    title: "你离开，它继续",
    desc: "关掉 App，任务也不会暂停。",
    note: "关掉 App，不等于工作停止。",
    startX: -720,
    startY: 220,
    startRotate: -11,
    endRotate: -3,
    wallPositionClassName: "left-[9%] bottom-[13%]",
    wallWidthClassName: "w-[360px]",
    highlightClassName: "text-[clamp(4.4rem,6.2vw,6.6rem)]",
  },
  {
    eyebrow: "04",
    highlight: "一人成组",
    title: "一个人，也像一整个组",
    desc: "复杂任务也能拆开并行往前跑。",
    note: "从单点执行，变成多角色推进。",
    startX: 680,
    startY: 320,
    startRotate: 8,
    endRotate: 2,
    wallPositionClassName: "right-[8%] bottom-[16%]",
    wallWidthClassName: "w-[340px]",
    highlightClassName: "text-[clamp(4rem,5.8vw,6rem)]",
  },
  {
    eyebrow: "05",
    highlight: "越用越懂",
    title: "越做越贴手",
    desc: "习惯、偏好、节奏，会慢慢被记住。",
    note: "越用越顺手，越聊越少废话。",
    startX: 0,
    startY: 620,
    startRotate: -4,
    endRotate: -1,
    wallPositionClassName: "left-[36%] top-[44%]",
    wallWidthClassName: "w-[320px]",
    highlightClassName: "text-[clamp(3.5rem,5.2vw,5.4rem)]",
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
  frameWidthClassName: string;
  frameAspectClassName: string;
  framePaddingClassName?: string;
  detailImage?: StaticImageData;
  detailAlt?: string;
  detailImagePosition?: string;
  detailAspectClassName?: string;
  detailEyebrow?: string;
  detailTitle?: string;
}> = [
  {
    eyebrow: "学术研究",
    title: "文献、实验、论文，先交给它推进。",
    desc: "把资料搜集、论文梳理、实验记录和结果整理交给它，你可以先去做别的，回来再接着往下走。",
    bullets: [
      "适合文献搜索、阅读归纳、参考资料整理",
      "可以先帮你搭实验记录、论文框架和材料目录",
      "把需要时间的查找和归纳先跑起来",
    ],
    image: researchShot,
    alt: "PsyGo 用于文献论文相关任务的示意截图",
    imagePosition: "object-center",
    frameWidthClassName: "max-w-[560px]",
    frameAspectClassName: "aspect-[1978/1384]",
    framePaddingClassName: "p-3",
  },
  {
    eyebrow: "复杂决策",
    title: "留学、商业调研、方案制定，让它先把脏活累活跑完。",
    desc: "需要时间的对比、调研和信息汇总，它可以先跑。你回来时，面对的会是一份已经整理过的候选方案。",
    bullets: [
      "适合留学规划、商业调研、采购比选、路线对比",
      "先帮你铺底层信息，再把关键分歧点拎出来",
      "最后会把汇总文件和明确结论一起回传",
    ],
    image: teamworkShot,
    alt: "PsyGo 用于复杂决策和协同办公的示意截图",
    imagePosition: "object-center",
    frameWidthClassName: "max-w-[720px]",
    frameAspectClassName: "aspect-[1977/1193]",
    framePaddingClassName: "p-3",
    detailImage: decisionResultShot,
    detailAlt: "PsyGo 完成复杂任务后回传文件与结论的示意截图",
    detailImagePosition: "object-center",
    detailAspectClassName: "aspect-[1969/348]",
    detailEyebrow: "成果回传",
    detailTitle: "不是只给建议，最后会把文件和结论一起交回来。",
  },
  {
    eyebrow: "后台执行",
    title: "把任务交给它，关掉 App。回来，就有结果。",
    desc: "真正值钱的不是即时回复，而是任务在后台持续推进。它适合那些需要时间的追踪、整理和交付。",
    bullets: [
      "适合日报、周报、竞品跟踪、信息观察等任务",
      "你离开之后，它还能继续往前跑",
      "做完会回来找你，而不是等你盯着它",
    ],
    image: scheduleShot,
    alt: "PsyGo 在后台持续执行任务的示意截图",
    imagePosition: "object-top",
    frameWidthClassName: "max-w-[360px]",
    frameAspectClassName: "aspect-[1440/2716]",
    framePaddingClassName: "p-2",
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

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const blurIn = (reduce: boolean | null | undefined, delay = 0) =>
  reduce
    ? { initial: undefined, whileInView: undefined, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 24, filter: "blur(14px)" },
        whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
        transition: { duration: 0.68, delay, ease: SMOOTH_EASE },
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
            Core Ideas
          </motion.p>
          <motion.h2
            {...blurIn(reduce, 0.04)}
            viewport={{ once: true }}
            id="capabilities-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            不是陪你聊两句，
            <br className="hidden sm:block" />
            是替你把事情往前推。
          </motion.h2>
          <motion.p
            {...fadeIn(reduce, 0.08)}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
          >
            你的 AI 牛马，核心价值不是“回复得像不像人”，而是“能不能把活干出来”。PsyGo 想做的，是让结果先发生，再让你回来确认。
          </motion.p>
        </div>

        <FeatureMessageWall items={CAPABILITIES} />
      </section>

      <section id="scenarios" className="mt-20 sm:mt-28" aria-labelledby="scenarios-title">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            {...fadeIn(reduce)}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]"
          >
            Best Fits
          </motion.p>
          <motion.h2
            {...blurIn(reduce, 0.04)}
            viewport={{ once: true }}
            id="scenarios-title"
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
          >
            它适合先替你做的，
            <br className="hidden sm:block" />
            往往都是那些真正花时间的事。
          </motion.h2>
          <motion.p
            {...fadeIn(reduce, 0.08)}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
          >
            学术研究、复杂决策、后台持续任务，这些都不是一句话能瞬间解决的事。它们恰好也是最适合交给 PsyGo 先跑起来的事情。
          </motion.p>
        </div>

        <div className="mt-18 space-y-18 sm:space-y-20">
          {SCENARIOS.map((item, index) => {
            const reverse = index % 2 === 1;
            return (
              <motion.article
                key={item.title}
                {...fadeIn(reduce, index * 0.04)}
                viewport={{ once: true }}
                className={`apple-divider grid gap-10 pt-12 lg:grid-cols-[minmax(0,1fr)_minmax(380px,760px)] lg:items-center lg:pt-14 ${reverse ? "lg:[&>*:first-child]:order-2 lg:grid-cols-[minmax(380px,760px)_minmax(0,1fr)]" : ""}`}
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
                    {item.eyebrow}
                  </p>
                  <h3 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.045em] sm:text-[3.4rem] sm:leading-[1.03]">
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

                <div className={`mx-auto w-full ${item.frameWidthClassName}`}>
                  <div className={`rounded-[34px] border border-[var(--line)] bg-[color:var(--surface-2)] shadow-[var(--shadow-soft)] ${item.framePaddingClassName ?? "p-3"}`}>
                    <div className="rounded-[28px] border border-black/6 bg-[linear-gradient(180deg,rgba(253,253,254,0.98),rgba(244,247,250,0.94))] p-2 shadow-[0_16px_42px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(20,22,26,0.96),rgba(10,12,14,0.94))] dark:shadow-none">
                      <div className="mb-2 flex items-center justify-between rounded-[16px] bg-black/[0.03] px-4 py-2 text-[11px] text-[var(--muted)] dark:bg-white/[0.04]">
                        <span>{item.eyebrow}</span>
                        <span>执行中</span>
                      </div>
                      <div className={`relative overflow-hidden rounded-[22px] border border-black/6 bg-[#f4f6f8] dark:border-white/10 dark:bg-black ${item.frameAspectClassName}`}>
                        <Image
                          src={item.image}
                          alt={item.alt}
                          fill
                          quality={95}
                          sizes="(min-width: 1024px) 760px, 88vw"
                          className={`object-contain ${item.imagePosition}`}
                        />
                      </div>

                      {item.detailImage ? (
                        <div className="mt-3 overflow-hidden rounded-[22px] border border-black/6 bg-[linear-gradient(180deg,rgba(252,252,252,0.96),rgba(245,247,244,0.94))] shadow-[0_14px_34px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(20,22,26,0.94),rgba(12,14,18,0.94))] dark:shadow-none">
                          <div className="flex items-center justify-between border-b border-black/6 px-4 py-3 dark:border-white/10">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                                {item.detailEyebrow ?? "成果回传"}
                              </p>
                              <p className="mt-1 text-sm font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                                {item.detailTitle ?? "执行结果已回传"}
                              </p>
                            </div>
                            <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--brand)]">
                              已交付
                            </span>
                          </div>

                          <div className={`relative overflow-hidden bg-[#edf4e7] dark:bg-black ${item.detailAspectClassName ?? "aspect-[1969/348]"}`}>
                            <Image
                              src={item.detailImage}
                              alt={item.detailAlt ?? ""}
                              fill
                              quality={95}
                              sizes="(min-width: 1024px) 760px, 88vw"
                              className={`object-contain ${item.detailImagePosition ?? "object-center"}`}
                            />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section id="download" className="mt-20 sm:mt-28">
        <div className="apple-divider pt-12 text-center sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Download</p>
          <motion.h2
            {...blurIn(reduce, 0.02)}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.05em] sm:text-6xl lg:text-[5.2rem] lg:leading-[0.95]"
          >
            把任务交给它，
            <br />
            然后先去做别的。
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            PsyGo 不靠陪聊证明自己，结果会替它说话。先让它接住一个任务，再让它慢慢变成你手边最稳的执行者。
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a href="/download.html" className="apple-button min-w-[200px]">
              下载 PsyGo
            </a>
          </div>
        </div>
      </section>

      <div className="mt-20 sm:mt-28">
        <Footer />
      </div>
    </section>
  );
};
