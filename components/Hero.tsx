"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ScenarioCompare } from "./ScenarioCompare";
import psygoCompareImage from "@/static/psygo.png";
import vscodeCompareImage from "@/static/vscode.png";

const HERO_LINES = [
  { text: "你的 AI 牛马", accent: false },
  { text: "直接干活 不讲虚的", accent: true },
];

const SUPPORT_LINES = [
  "把任务交给它 关掉 App",
  "回来 就有结果",
];

const STRIP_ITEMS = [
  "五端都能用",
  "后台持续推进",
  "做完主动交",
];

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const ComparisonImagePanel = ({
  image,
  imageAlt,
  badge,
  title,
  description,
  overlayTone = "dark",
  variant,
}: {
  image: StaticImageData;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
  overlayTone?: "dark" | "light";
  variant: "chat" | "workforce";
}) => (
  <div
    className={`relative h-full w-full overflow-hidden ${
      variant === "chat"
        ? "bg-[linear-gradient(135deg,#222831_0%,#7f8a93_48%,#d9dee3_100%)]"
        : "bg-[linear-gradient(135deg,#f7fbf2_0%,#e6f1de_52%,#d8eaf6_100%)]"
    }`}
  >
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:42px_42px] opacity-30"
    />

    <Image
      src={image}
      alt={imageAlt}
      fill
      priority={false}
      quality={95}
      sizes="(min-width: 1024px) 1088px, 92vw"
      className="object-cover object-center"
    />

    <div
      className={
        overlayTone === "dark"
          ? "absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.08),rgba(8,10,14,0.32))]"
          : "absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.2))]"
      }
    />

    <div className="absolute inset-x-0 bottom-[4.5rem] z-10 flex justify-center px-5 sm:bottom-20 sm:px-6">
      <div
        className={`flex w-[min(86%,620px)] flex-col items-center rounded-[24px] px-5 py-4 text-center shadow-[0_22px_48px_rgba(15,23,42,0.14)] backdrop-blur-xl sm:px-7 sm:py-5 ${
          overlayTone === "dark"
            ? "bg-[rgba(7,9,14,0.62)] text-white"
            : "bg-[rgba(255,251,246,0.8)] text-[#1d1d1f]"
        }`}
      >
        <span
          className={`rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[-0.01em] shadow-[0_10px_24px_rgba(15,23,42,0.12)] ${
            overlayTone === "dark"
              ? "border border-white/14 bg-[rgba(255,255,255,0.08)] text-white/82"
              : "border border-white/60 bg-[rgba(255,255,255,0.72)] text-[#244267]"
          }`}
        >
          {badge}
        </span>

        <p className="mt-3 text-[clamp(1.15rem,2vw,1.8rem)] font-semibold leading-tight tracking-normal">
          {title}
        </p>
        <p
          className={`mt-3 max-w-[34rem] text-xs leading-5 sm:text-sm sm:leading-6 ${
            overlayTone === "dark" ? "text-white/72" : "text-[#3a3a3c]"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  </div>
);

export const Hero = ({ variant = "default" }: { variant?: "default" | "blk1" | "blk2" }) => {
  const reduce = useReducedMotion();

  const immediate = (delay = 0, y = 22) =>
    reduce
      ? { initial: false, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y, filter: "blur(12px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: {
            duration: variant === "default" ? 0.72 : 0.42,
            delay,
            ease: SMOOTH_EASE,
          },
        };

  const enter = (delay = 0, y = 22) =>
    reduce
      ? { initial: false, transition: { duration: 0 } }
      : {
          initial: { opacity: 0, y, filter: "blur(12px)" },
          whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: {
            duration: variant === "default" ? 0.58 : 0.35,
            delay,
            ease: SMOOTH_EASE,
          },
        };

  return (
    <>
      <section className="relative grid min-h-[100svh] snap-start content-center overflow-hidden py-16 pt-[calc(var(--header-h)+2rem)] sm:py-20 sm:pt-[calc(var(--header-h)+2.6rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(circle_at_20%_10%,rgba(96,195,129,0.1),transparent_20%),radial-gradient(circle_at_56%_0%,rgba(0,113,227,0.14),transparent_28%),radial-gradient(circle_at_92%_10%,rgba(255,255,255,0.64),transparent_24%)] dark:bg-[radial-gradient(circle_at_20%_16%,rgba(92,196,125,0.12),transparent_18%),radial-gradient(circle_at_56%_0%,rgba(41,151,255,0.18),transparent_28%),radial-gradient(circle_at_92%_10%,rgba(255,255,255,0.06),transparent_24%)]"
      />

      <div className="mx-auto max-w-[82rem]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span {...immediate(0)} className="eyebrow">
            PsyGo AI Workforce
          </motion.span>

          <h1 className="mx-auto mt-7 max-w-5xl text-4xl font-semibold tracking-normal sm:text-6xl lg:text-[5.35rem] lg:leading-[0.92]">
            {HERO_LINES.map((line, index) => (
              <motion.span
                key={line.text}
                {...immediate(0.12 + index * 0.1, 28)}
                className="block overflow-hidden"
              >
                <span className={line.accent ? "hero-gradient-text hero-shimmer-text" : undefined}>
                  {line.text}
                </span>
              </motion.span>
            ))}
          </h1>

          <div className="mx-auto mt-7 max-w-3xl space-y-2 text-lg leading-8 text-[var(--muted-strong)] sm:text-[1.35rem]">
            {SUPPORT_LINES.map((line, index) => (
              <motion.p key={line} {...immediate(0.34 + index * 0.1, 18)}>
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            {...immediate(0.56, 16)}
            className="mx-auto mt-10 max-w-4xl"
          >
            <p className="hero-quote text-2xl font-medium tracking-normal text-[var(--muted)] sm:text-4xl lg:text-[3.45rem] lg:leading-[1.04]">
              它不是在陪你聊天
              <br className="hidden sm:block" />
              <span className="hero-gradient-text">是在替你干活</span>
            </p>
          </motion.div>

          <motion.div
            {...immediate(0.66, 16)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <a href="/download.html" className="apple-button">
              下载 PsyGo
            </a>
            <a href="#scenarios" className="apple-button-ghost">
              看它能做什么
            </a>
          </motion.div>
        </div>

        <motion.div
          {...enter(0.06, 12)}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[var(--muted)]"
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

      <section className="apple-divider grid h-[100svh] snap-start content-center overflow-hidden py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[68rem]">
          <div className="mx-auto max-w-4xl text-center">
            <motion.p
              {...enter(0)}
              viewport={{ once: true }}
              className="text-xs font-semibold uppercase tracking-[-0.01em] text-[var(--muted)]"
            >
              Capability Compare
            </motion.p>
            <motion.h2
              {...enter(0.04, 20)}
              viewport={{ once: true }}
              className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl lg:text-5xl"
            >
              普通 AI 是聊天工具
              <br className="hidden sm:block" />
              PsyGo 是替你干活
            </motion.h2>
            <motion.p
              {...enter(0.08, 16)}
              viewport={{ once: true }}
              className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--muted)] sm:text-lg"
            >
              左右拖动看差别：一个主要回答问题，一个会持续推进任务并交付结果。
            </motion.p>
          </div>

        <motion.div
          {...(reduce
            ? { initial: false, transition: { duration: 0 } }
            : {
                initial: { opacity: 0, scale: 0.985, y: 20, filter: "blur(10px)" },
                whileInView: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
                transition: { delay: 0.12, duration: 0.7, ease: SMOOTH_EASE },
              })}
          viewport={{ once: true }}
          className="relative mt-8 sm:mt-9"
        >
          <div className="surface-shell-strong relative overflow-hidden rounded-[32px] p-3 sm:p-4">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:34px_34px] opacity-30 dark:opacity-15" />
            <div className="relative overflow-hidden rounded-[30px] border border-white/70 bg-[linear-gradient(180deg,rgba(246,248,238,0.92),rgba(241,246,233,0.86))] p-2 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,19,20,0.94),rgba(10,12,14,0.94))]">
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-black/5 bg-white/80 px-4 py-3 text-xs text-[var(--muted)] shadow-[0_16px_38px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-none">
                <div className="flex items-center gap-2 rounded-full border border-black/6 bg-black/[0.03] px-3 py-1.5 dark:border-white/10 dark:bg-white/[0.03]">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/70 shadow-[0_0_0_4px_rgba(255,255,255,0.12)] dark:bg-white/60" />
                  <span>左侧 普通 AI 工具</span>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[-0.01em] text-[var(--muted)]">
                  Capability Compare
                </span>
                <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-emerald-700 dark:border-emerald-400/25 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <span className="hero-status-dot h-2.5 w-2.5" />
                  <span>右侧 PsyGo</span>
                </div>
              </div>

              <div className="relative mt-3 overflow-hidden rounded-[26px] border border-black/5 bg-[#edf4e7] dark:border-white/10 dark:bg-[#0d1114]">
                <ScenarioCompare
                  comparison={{
                    leftPanel: (
                      <ComparisonImagePanel
                        image={vscodeCompareImage}
                        imageAlt="VSCode 内置 AI Assistant 的界面截图"
                        badge="普通 AI 工具"
                        title="能聊天 但做不了太多"
                        description="回答问题还行，但你让它持续做一件事，最后交个成果出来，就不太够用了。"
                        overlayTone="dark"
                        variant="chat"
                      />
                    ),
                    rightPanel: (
                      <ComparisonImagePanel
                        image={psygoCompareImage}
                        imageAlt="PsyGo 多设备任务工作台界面"
                        badge="PsyGo"
                        title="不只是回答 是持续把事做完"
                        description="缺什么工具自己找，遇到问题自己想办法。做完了，把文件和结论一起交给你。"
                        overlayTone="light"
                        variant="workforce"
                      />
                    ),
                    leftLabel: "普通 AI 工具",
                    rightLabel: "PsyGo",
                    leftCaption: "普通 AI 工具：能聊天，但做不了太多，能力跟着预设走。",
                    rightCaption: "PsyGo：缺什么自己找，做完主动交结果。",
                    hint: "左右拖动对比看看",
                    aspectClassName: "aspect-[2238/1323]",
                    showGlobalLabels: false,
                    showGlobalCaptions: false,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};
