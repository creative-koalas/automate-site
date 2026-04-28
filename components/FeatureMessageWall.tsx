"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

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

const SMOOTH_EASE = [0.22, 1, 0.36, 1] as const;

const ORBIT_POSITIONS = [
  "left-[4%] top-[10%] max-w-[18rem] -rotate-[5deg]",
  "right-[6%] top-[9%] max-w-[18rem] rotate-[4deg]",
  "left-[8%] bottom-[13%] max-w-[18rem] rotate-[3deg]",
  "right-[8%] bottom-[14%] max-w-[18rem] -rotate-[3deg]",
  "left-[39%] top-[16%] max-w-[17rem] -rotate-[2deg]",
  "left-[16%] top-[47%] max-w-[18rem] -rotate-[4deg]",
  "right-[16%] top-[47%] max-w-[18rem] rotate-[4deg]",
] as const;

function FeatureOrbitItem({
  item,
  index,
  active,
  inView,
}: {
  item: FeatureWallItem;
  index: number;
  active: boolean;
  inView: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, x: item.startX * 0.12, y: item.startY * 0.12, filter: "blur(12px)" }}
      animate={
        inView
          ? {
              opacity: active ? 1 : 0.36,
              x: 0,
              y: active ? -4 : 0,
              scale: active ? 1.06 : 0.94,
              filter: "blur(0px)",
            }
          : {
              opacity: 0,
              x: item.startX * 0.12,
              y: item.startY * 0.12,
              scale: 0.9,
              filter: "blur(12px)",
            }
      }
      transition={
        reduce
          ? { duration: 0 }
          : {
              delay: inView ? index * 0.045 : 0,
              duration: 0.62,
              ease: SMOOTH_EASE,
            }
      }
      className={clsx(
        "absolute z-20",
        ORBIT_POSITIONS[index % ORBIT_POSITIONS.length],
      )}
    >
      <div className="flex items-center gap-3">
        <span
          className={clsx(
            "h-1.5 w-1.5 rounded-full transition-colors",
            active ? "bg-[var(--brand)]" : "bg-[color-mix(in_srgb,var(--foreground)_20%,transparent)]",
          )}
          aria-hidden
        />
        <p className="text-[10px] font-semibold uppercase tracking-[-0.01em] text-[var(--muted)]">
          {item.eyebrow}
        </p>
      </div>

      <p
        className={clsx(
          "mt-2 whitespace-nowrap text-[clamp(1.85rem,2.9vw,3.2rem)] font-semibold leading-[0.9] tracking-normal text-[var(--foreground)]",
          active ? "opacity-100" : "opacity-70",
        )}
      >
        {item.highlight}
      </p>

      <p className="mt-2 text-sm font-medium leading-6 tracking-normal text-[var(--muted)]">
        {item.note}
      </p>
    </motion.article>
  );
}

function SpotlightCopy({
  item,
}: {
  item: FeatureWallItem;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      key={item.eyebrow}
      initial={reduce ? false : { opacity: 0, y: 26, scale: 0.98, filter: "blur(14px)" }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={reduce ? undefined : { opacity: 0, y: -22, scale: 0.985, filter: "blur(12px)" }}
      transition={reduce ? { duration: 0 } : { duration: 0.52, ease: SMOOTH_EASE }}
      className="mx-auto max-w-[76rem] text-center"
    >
      <p className="whitespace-nowrap text-[clamp(4.8rem,9.8vw,8.8rem)] font-semibold leading-[0.86] tracking-normal text-[var(--foreground)] drop-shadow-[0_28px_72px_rgba(15,23,42,0.12)]">
        {item.highlight}
      </p>

      <h3 className="mx-auto mt-7 max-w-3xl text-2xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
        {item.title}
      </h3>

      <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
        {item.desc}
      </p>
    </motion.div>
  );
}

function MobileFeatureWall({
  items,
  activeIndex,
  mobileRef,
  inView,
}: {
  items: FeatureWallItem[];
  activeIndex: number;
  mobileRef: React.RefObject<HTMLDivElement | null>;
  inView: boolean;
}) {
  const reduce = useReducedMotion();
  const active = items[activeIndex] ?? items[0];

  return (
    <motion.div
      ref={mobileRef}
      initial={reduce ? false : { opacity: 0, y: 26, filter: "blur(12px)" }}
      animate={inView || reduce ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 26, filter: "blur(12px)" }}
      transition={reduce ? { duration: 0 } : { duration: 0.62, ease: SMOOTH_EASE }}
      className="relative mt-14 overflow-hidden rounded-[36px] border border-[var(--line)] bg-[color-mix(in_srgb,var(--surface-1)_70%,transparent)] px-5 py-8 shadow-[var(--shadow-soft)] backdrop-blur-2xl lg:hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,113,227,0.14),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.34),transparent_70%)]"
      />

      <div className="relative text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.eyebrow}
            initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -16, filter: "blur(10px)" }}
            transition={reduce ? { duration: 0 } : { duration: 0.42, ease: SMOOTH_EASE }}
          >
            <p className="mx-auto whitespace-nowrap text-[clamp(3.6rem,17vw,5rem)] font-semibold leading-[0.86] tracking-normal text-[var(--foreground)]">
              {active.highlight}
            </p>

            <p className="mx-auto mt-4 max-w-[18rem] text-sm leading-7 text-[var(--muted)]">
              {active.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 grid grid-cols-2 gap-2.5 text-left">
          {items.map((item, index) => {
            const activeItem = index === activeIndex;
            return (
              <div
                key={item.eyebrow}
                className={clsx(
                  "rounded-2xl border px-3 py-3 transition-colors",
                  activeItem
                    ? "border-[color-mix(in_srgb,var(--brand)_34%,transparent)] bg-[var(--accent-soft)]"
                    : "border-[var(--line)] bg-[color-mix(in_srgb,var(--surface-1)_56%,transparent)]",
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "h-1.5 w-1.5 rounded-full",
                      activeItem ? "bg-[var(--brand)]" : "bg-[color-mix(in_srgb,var(--foreground)_20%,transparent)]",
                    )}
                    aria-hidden
                  />
                  <span className="text-[10px] font-semibold tracking-[-0.01em] text-[var(--muted)]">
                    {item.eyebrow}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold tracking-normal text-[var(--foreground)]">
                  {item.highlight}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function FeatureMessageWall({ items }: { items: FeatureWallItem[] }) {
  const reduce = useReducedMotion();
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const mobileRef = useRef<HTMLDivElement | null>(null);
  const desktopInView = useInView(desktopRef, {
    amount: 0.42,
    margin: "-14% 0px -18% 0px",
  });
  const mobileInView = useInView(mobileRef, {
    amount: 0.35,
    margin: "-12% 0px -16% 0px",
  });
  const inView = desktopInView || mobileInView;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return undefined;

    const timer = globalThis.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 2200);

    return () => globalThis.clearInterval(timer);
  }, [inView, items.length, reduce]);

  const activeItem = items[activeIndex] ?? items[0];

  return (
    <>
      <MobileFeatureWall items={items} activeIndex={activeIndex} mobileRef={mobileRef} inView={mobileInView} />

      <div ref={desktopRef} className="relative mt-16 hidden min-h-[100svh] lg:grid lg:content-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 70, scale: 0.965, filter: "blur(14px)" }}
          animate={
            desktopInView || reduce === true
              ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, y: 70, scale: 0.965, filter: "blur(14px)" }
          }
          transition={reduce ? { duration: 0 } : { duration: 0.7, ease: SMOOTH_EASE }}
          className="relative mx-auto h-[88svh] w-full max-w-[92rem] overflow-hidden px-6 py-10"
        >
          <motion.div
            aria-hidden
            animate={desktopInView && !reduce ? { opacity: [0.13, 0.25, 0.18] } : { opacity: reduce === true ? 0.22 : 0.1 }}
            transition={reduce ? { duration: 0 } : { duration: 5.2, repeat: Infinity, repeatType: "mirror" }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(0,113,227,0.2),transparent_28%),radial-gradient(circle_at_22%_22%,rgba(90,200,250,0.1),transparent_24%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.72),transparent_24%)] dark:bg-[radial-gradient(circle_at_50%_44%,rgba(41,151,255,0.22),transparent_30%),radial-gradient(circle_at_22%_22%,rgba(90,200,250,0.14),transparent_26%),radial-gradient(circle_at_80%_22%,rgba(255,255,255,0.08),transparent_24%)]"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-[12%] h-[76%] opacity-18 [background-image:linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:36px_36px] dark:opacity-8"
          />

          {items.map((item, index) => (
            <FeatureOrbitItem
              key={item.eyebrow}
              item={item}
              index={index}
              active={index === activeIndex}
              inView={desktopInView || reduce === true}
            />
          ))}

          <div className="relative z-10 grid h-full content-center px-8">
            <AnimatePresence mode="wait">
              <SpotlightCopy
                key={activeItem.eyebrow}
                item={activeItem}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </>
  );
}
