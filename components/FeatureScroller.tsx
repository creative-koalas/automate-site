"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Footer } from "./Footer";
import { FeatureMessageWall, type FeatureWallItem } from "./FeatureMessageWall";
import { Hero } from "./Hero";

const CAPABILITIES: FeatureWallItem[] = [
  {
    eyebrow: "01",
    highlight: "开箱即用",
    title: "下载就能开始",
    desc: "不用配环境，不用看教程。打开 App，雇一个 AI 牛马，直接派活。",
    note: "支持 iOS、Android、macOS、Windows、Linux。",
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
    highlight: "说完就做",
    title: "聊天就是派活",
    desc: "你说的每句话，它都当成一件要做的事。文档、代码、方案，聊完直接交付。",
    note: "不用另外写文档，对话就是指令。",
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
    title: "关掉 App 它还在做",
    desc: "任务在云端持续跑，你忙你的，它继续推进。",
    note: "做完会推送通知告诉你。",
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
    highlight: "主动汇报",
    title: "做完了会找你",
    desc: "有进展就主动告诉你，不用你追问。",
    note: "随时更新进度，做完交结果。",
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
    highlight: "一人成组",
    title: "几个 AI 一起做",
    desc: "复杂的事，它会拆给几个 AI 牛马同时跑，各管一摊。",
    note: "你也可以拉朋友和他们的 AI 一起进群干活。",
    startX: 0,
    startY: 620,
    startRotate: -4,
    endRotate: -1,
    wallPositionClassName: "left-[36%] top-[44%]",
    wallWidthClassName: "w-[320px]",
    highlightClassName: "text-[clamp(3.5rem,5.2vw,5.4rem)]",
  },
  {
    eyebrow: "06",
    highlight: "看见就懂",
    title: "拖一拖就上线了",
    desc: "不用写代码，不用找技术。你在界面上怎么摆的，上线就是那个样子。改完立刻能看到效果，觉得行，一键就发布了。",
    note: "配置过程全是可视化的，你看到什么，用户就看到什么。",
    startX: -700,
    startY: 0,
    startRotate: -12,
    endRotate: -3,
    wallPositionClassName: "left-[7%] top-[44%]",
    wallWidthClassName: "w-[350px]",
    highlightClassName: "text-[clamp(4rem,5.8vw,6rem)]",
  },
  {
    eyebrow: "07",
    highlight: "自动攒活",
    title: "几个 AI 牛马边聊边干",
    desc: "聊着聊着，它们已经在后面把关键信息捞出来了。谁负责什么、结论是什么，不用你整理。聊完不是给你一堆建议让你自己动手，是直接把文档交到你手上。",
    note: "对话结束，PDF、Word 就已经生成好了，打开就能用。",
    startX: 700,
    startY: 0,
    startRotate: 10,
    endRotate: 3,
    wallPositionClassName: "right-[7%] top-[44%]",
    wallWidthClassName: "w-[350px]",
    highlightClassName: "text-[clamp(3.8rem,5.5vw,5.8rem)]",
  },
];

const SCENARIOS: Array<{
  eyebrow: string;
  title: string;
  desc: string;
  bullets: string[];
  tags: string[];
  videoSrc: string;
  videoLabel: string;
  videoPosition: string;
}> = [
  {
    eyebrow: "学术研究",
    title: "论文前期工作，先交给它跑",
    desc: "搜文献、整理资料、搭论文框架，这些你可以先交给它。你去做别的，回来接着往下写。",
    bullets: [
      "帮你搜文献、归纳要点、整理参考资料",
      "先搭好论文框架、实验记录和材料目录",
      "整理完的内容直接输出成文档，不用你手动再排",
    ],
    tags: ["搜文献", "搭框架", "出文档"],
    videoSrc: "/videos/scenes/academic-research.mp4",
    videoLabel: "PsyGo 搜文献、搭论文框架并输出文档的视频演示",
    videoPosition: "object-center",
  },
  {
    eyebrow: "复杂决策",
    title: "留学选校、商业调研、方案对比，先让它把功课做了",
    desc: "对比、调研、信息汇总这些花时间的事，它可以先跑。你回来时，看到的是一份整理好的候选方案。",
    bullets: [
      "留学规划、采购比选、路线对比都能做",
      "先铺好基础信息，再把关键差异点拎出来",
      "最后把汇总文件和结论一起交给你",
    ],
    tags: ["信息汇总", "差异对比", "方案交付"],
    videoSrc: "/videos/scenes/study-abroad-essay.mp4",
    videoLabel: "PsyGo 用于留学选校、商业调研和方案对比的视频演示",
    videoPosition: "object-center",
  },
  {
    eyebrow: "后台执行",
    title: "交给它，关掉 App，回来就有结果",
    desc: "有些事不用你盯着，但需要有人一直在跑。追踪、整理、定时交付，这些它都能做。",
    bullets: [
      "日报、周报、竞品跟踪、信息观察都能接",
      "你离开之后，它在云端继续跑",
      "做完了推送通知找你，不用你追着问",
    ],
    tags: ["云端执行", "主动通知", "定时交付"],
    videoSrc: "/videos/scenes/document-workflow.mp4",
    videoLabel: "PsyGo 云端后台整理资料并交付文档的视频演示",
    videoPosition: "object-center",
  },
  {
    eyebrow: "快速部署",
    title: "可视化搭页面，确认后一键发布",
    desc: "不用写代码，不用找技术。页面结构、内容和样式都在界面里调整，改完立刻预览，确认后直接发布成可访问页面。",
    bullets: [
      "配置过程全是可视化的，你看到什么，用户就看到什么",
      "布局、内容、样式改完立刻预览",
      "觉得行，一键发布成可访问页面",
    ],
    tags: ["可视化配置", "实时预览", "一键发布"],
    videoSrc: "/videos/scenes/product-prototype.mp4",
    videoLabel: "PsyGo 可视化搭建网页并一键发布的视频演示",
    videoPosition: "object-center",
  },
  {
    eyebrow: "Agent 协作",
    title: "几个 AI 牛马，边聊边干",
    desc: "聊着聊着，它们已经在后面把关键信息捞出来了。谁负责什么、结论是什么，不用你整理。聊完不是给你一堆建议让你自己动手，是直接把文档交到你手上。",
    bullets: [
      "边聊边拆任务，几个 AI 同时跑",
      "谁负责什么、结论是什么，它会自动整理",
      "对话结束，PDF、Word 就已经生成好了，打开就能用",
    ],
    tags: ["边聊边干", "自动整理", "文档生成"],
    videoSrc: "/videos/scenes/multi-agent-bid.mp4",
    videoLabel: "PsyGo 多 Agent 协作投标任务书汇总的视频演示",
    videoPosition: "object-center",
  },
];

const SCENARIO_TITLE_CLASSNAME =
  "mt-4 max-w-3xl text-[clamp(1.9rem,3.8vw,4.1rem)] font-semibold leading-[1] tracking-normal";
const SCENARIO_VIDEO_FRAME_CLASSNAME = "mx-auto w-full max-w-[1500px]";
const SCENARIO_VIDEO_ASPECT_CLASSNAME = "aspect-[4/3] sm:aspect-video";

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

const ScenarioVideo = ({
  src,
  label,
  position,
}: {
  src: string;
  label: string;
  position: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return undefined;

    if (!("IntersectionObserver" in window)) {
      const loadTimer = globalThis.setTimeout(() => setShouldLoad(true), 0);
      return () => globalThis.clearTimeout(loadTimer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNearViewport = entry.isIntersecting;
        if (isNearViewport) {
          setShouldLoad(true);
          void node.play().catch(() => {});
        } else {
          node.pause();
        }
      },
      { rootMargin: "620px 0px", threshold: 0.01 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const node = videoRef.current;
    if (!node || !shouldLoad) return;

    void node.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      aria-label={label}
      muted
      loop
      playsInline
      preload={shouldLoad ? "metadata" : "none"}
      className={`h-full w-full object-cover ${position}`}
    />
  );
};

const ScenarioPanel = ({
  item,
  index,
}: {
  item: (typeof SCENARIOS)[number];
  index: number;
}) => {
  const reduce = useReducedMotion();
  const reverse = index % 2 === 1;

  return (
    <motion.article
      {...fadeIn(reduce, index * 0.04)}
      viewport={{ once: true, amount: 0.28 }}
      className="relative isolate border-t border-[var(--line)] bg-[var(--background)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(0,113,227,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.46),rgba(255,255,255,0)_58%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(41,151,255,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0)_58%)]"
      />

      <div
        className={`mx-auto grid min-h-[100svh] max-w-[104rem] content-center gap-9 px-5 py-16 sm:px-8 sm:py-20 lg:items-center lg:gap-10 xl:gap-12 ${
          reverse
            ? "lg:grid-cols-[minmax(0,1fr)_minmax(17rem,0.42fr)] lg:[&>*:first-child]:order-2"
            : "lg:grid-cols-[minmax(17rem,0.42fr)_minmax(0,1fr)]"
        }`}
      >
        <div className={reverse ? "lg:pl-4" : "lg:pr-4"}>
          <p className="text-xs font-semibold uppercase tracking-[-0.01em] text-[var(--muted)]">
            {item.eyebrow}
          </p>

          <h3 className={SCENARIO_TITLE_CLASSNAME}>
            {item.title}
          </h3>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            {item.desc}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex min-h-10 items-center rounded-full border border-[color-mix(in_srgb,var(--brand)_22%,transparent)] bg-[var(--accent-soft)] px-4 text-sm font-semibold text-[var(--brand)]"
              >
                {tag}
              </span>
            ))}
          </div>

          <ul className="mt-7 grid gap-3 text-sm leading-7 text-[var(--muted-strong)] sm:text-base">
            {item.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--brand)]" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={SCENARIO_VIDEO_FRAME_CLASSNAME}>
          <div className="overflow-hidden rounded-[34px] border border-[var(--line)] bg-[color:var(--surface-2)] p-2 shadow-[var(--shadow-strong)]">
            <div className={`overflow-hidden rounded-[28px] bg-black ${SCENARIO_VIDEO_ASPECT_CLASSNAME}`}>
              <ScenarioVideo src={item.videoSrc} label={item.videoLabel} position={item.videoPosition} />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const FeatureScroller = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative pb-24 sm:pb-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Hero />

        <section id="capabilities" className="mt-20 sm:mt-28" aria-labelledby="capabilities-title">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              {...fadeIn(reduce)}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[-0.01em] text-[var(--muted)]"
            >
              Core Ideas
            </motion.p>
            <motion.h2
              {...blurIn(reduce, 0.04)}
              viewport={{ once: true }}
              id="capabilities-title"
              className="mt-4 text-3xl font-semibold tracking-normal sm:text-5xl"
            >
              不是陪你聊两句
              <br className="hidden sm:block" />
              是替你把事情往前推
            </motion.h2>
            <motion.p
              {...fadeIn(reduce, 0.08)}
              viewport={{ once: true }}
              className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
            >
              你的 AI 牛马，重点不是回复得像不像人，而是能不能把活干出来。你可以把花时间的事交给它，它会一直做下去，做完把文件交回来。
            </motion.p>
          </div>

          <FeatureMessageWall items={CAPABILITIES} />
        </section>
      </div>

      <section id="scenarios" className="mt-20 sm:mt-28" aria-labelledby="scenarios-title">
        <div className="mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-5 text-center sm:px-8">
          <motion.p
            {...fadeIn(reduce)}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[-0.01em] text-[var(--muted)]"
          >
            Best Fits
          </motion.p>
          <motion.h2
            {...blurIn(reduce, 0.04)}
            viewport={{ once: true }}
            id="scenarios-title"
            className="mt-4 text-3xl font-semibold tracking-normal sm:text-5xl"
          >
            最适合交给它的
            <br className="hidden sm:block" />
            都是那些真正花时间的事
          </motion.h2>
          <motion.p
            {...fadeIn(reduce, 0.08)}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
          >
            论文、留学方案、商业调研，这些事没法一句话搞定。你可以先交给 PsyGo 跑着，回来看结果。
          </motion.p>
        </div>

        <div className="mt-14 sm:mt-18">
          {SCENARIOS.map((item, index) => (
            <ScenarioPanel key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section id="download" className="mx-auto mt-20 max-w-7xl px-5 sm:mt-28 sm:px-8">
        <div className="apple-divider pt-12 text-center sm:pt-16">
          <p className="text-xs font-semibold uppercase tracking-[-0.01em] text-[var(--muted)]">Download</p>
          <motion.h2
            {...blurIn(reduce, 0.02)}
            viewport={{ once: true }}
            className="mx-auto mt-5 max-w-4xl text-4xl font-semibold tracking-normal sm:text-6xl lg:text-[5.2rem] lg:leading-[0.95]"
          >
            试试雇一个 AI 牛马
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            不用想太多，先让它帮你做一件事。做得好不好，看结果就知道了。
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
