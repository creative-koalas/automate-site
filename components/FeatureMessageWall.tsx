"use client";

import clsx from "clsx";
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

export type FeatureWallItem = {
  eyebrow: string;
  highlight: string;
  title: string;
  desc: string;
  note: string;
  startX: number;
  startY: number;
  startRotate: number;
  endRotate: number;
  wallPositionClassName: string;
  wallWidthClassName: string;
  highlightClassName: string;
};

function FloatingFeatureCard({
  item,
  progress,
  index,
}: {
  item: FeatureWallItem;
  progress: MotionValue<number>;
  index: number;
}) {
  const x = useTransform(progress, [0, 0.64, 1], [item.startX, item.startX * 0.18, 0]);
  const y = useTransform(progress, [0, 0.64, 1], [item.startY, item.startY * 0.16, 0]);
  const rotate = useTransform(progress, [0, 0.64, 1], [item.startRotate, item.endRotate, item.endRotate]);
  const scale = useTransform(progress, [0, 0.18, 0.58, 1], [0.72, 0.82, 1, 1]);
  const opacity = useTransform(progress, [0, 0.12, 0.28, 1], [0.08, 0.45, 1, 1]);
  const blur = useTransform(progress, [0, 0.22, 0.58, 1], [18, 10, 2, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.article
      style={{ x, y, rotate, scale, opacity, filter, zIndex: 20 + index }}
      className={clsx(
        "absolute",
        item.wallPositionClassName,
        item.wallWidthClassName,
      )}
    >
      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            {item.eyebrow}
          </p>
        </div>

      <p
        className={clsx(
          "mt-3 whitespace-nowrap font-semibold leading-[0.92] tracking-[-0.08em] text-[var(--foreground)] drop-shadow-[0_18px_38px_rgba(15,23,42,0.08)]",
          item.highlightClassName,
        )}
      >
        {item.highlight}
      </p>

        <h3 className="mt-4 max-w-[16ch] text-[0.95rem] font-medium leading-6 tracking-[-0.03em] text-[var(--foreground)]/82">
          {item.title}
        </h3>
      </div>
    </motion.article>
  );
}

function MobileFeatureCluster({
  item,
  index,
}: {
  item: FeatureWallItem;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? undefined : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : { duration: 0.45, delay: index * 0.05 }}
      className={clsx(
        "apple-divider py-7",
        index === 0 && "border-t-0 pt-0",
        index % 2 === 1 && "sm:pl-10",
      )}
    >
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden />
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {item.eyebrow}
        </p>
      </div>

      <p
        className={clsx(
          "mt-3 whitespace-nowrap font-semibold leading-[0.9] tracking-[-0.08em] text-[var(--foreground)]",
          item.highlightClassName,
        )}
      >
        {item.highlight}
      </p>

      <h3 className="mt-3 text-lg font-semibold tracking-[-0.04em] text-[var(--foreground)]">
        {item.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
        {item.desc}
      </p>
    </motion.article>
  );
}

export function FeatureMessageWall({ items }: { items: FeatureWallItem[] }) {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: reduce ? 240 : 120,
    damping: reduce ? 40 : 24,
    mass: 0.35,
  });

  const boardOpacity = useTransform(progress, [0, 0.12, 0.38], [0.3, 0.72, 1]);
  const boardScale = useTransform(progress, [0, 0.38, 1], [0.94, 1, 1]);
  const boardY = useTransform(progress, [0, 1], [72, 0]);
  const promptOpacity = useTransform(progress, [0, 0.2, 0.34], [0.72, 0.55, 0]);
  const haloOpacity = useTransform(progress, [0, 0.35, 1], [0.08, 0.16, 0.28]);

  return (
    <>
      <div className="mt-14 lg:hidden">
        {items.map((item, index) => (
          <MobileFeatureCluster key={item.eyebrow} item={item} index={index} />
        ))}
      </div>

      <div ref={sectionRef} className="relative mt-16 hidden h-[240vh] lg:block">
        <div className="sticky top-[6vh] h-[88vh]">
          <motion.div
            style={{ opacity: boardOpacity, scale: boardScale, y: boardY }}
            className="relative mx-auto h-full max-w-[88rem] overflow-hidden p-6"
          >
            <motion.div
              aria-hidden
              style={{ opacity: haloOpacity }}
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(0,113,227,0.18),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(90,200,250,0.12),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.74),transparent_26%)] dark:bg-[radial-gradient(circle_at_50%_12%,rgba(41,151,255,0.24),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(90,200,250,0.14),transparent_28%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.08),transparent_26%)]"
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-[14%] h-[72%] opacity-18 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:36px_36px] dark:opacity-8"
            />

            <motion.div
              style={{ opacity: promptOpacity }}
              className="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 text-[11px] font-medium tracking-[0.16em] text-[var(--muted)]"
            >
              往下滚，特点会慢慢聚成一面墙
            </motion.div>

            <div className="relative h-full w-full">
              {items.map((item, index) => (
                <FloatingFeatureCard key={item.eyebrow} item={item} progress={progress} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
