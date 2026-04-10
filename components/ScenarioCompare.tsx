"use client";

import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

export type ScenarioComparison = {
  leftImage?: StaticImageData;
  rightImage?: StaticImageData;
  leftPanel?: ReactNode;
  rightPanel?: ReactNode;
  leftLabel: string;
  rightLabel: string;
  leftCaption?: string;
  rightCaption?: string;
  hint: string;
  aspectClassName: string;
  leftImageClassName?: string;
  rightImageClassName?: string;
  showGlobalLabels?: boolean;
  showGlobalCaptions?: boolean;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const ScenarioCompare = ({ comparison }: { comparison: ScenarioComparison }) => {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [split, setSplit] = useState(0.47);
  const [dragging, setDragging] = useState(false);

  const updateSplitFromClientX = (clientX: number) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const nextSplit = (clientX - rect.left) / rect.width;
    setSplit(clamp(nextSplit, 0.12, 0.88));
  };

  const splitPercent = `${(split * 100).toFixed(2)}%`;
  const overlayWidth = `calc(100% - ${splitPercent})`;
  const rightMedia = comparison.rightPanel ? (
    <div className="absolute inset-0">{comparison.rightPanel}</div>
  ) : comparison.rightImage ? (
    <Image
      src={comparison.rightImage}
      alt=""
      fill
      quality={95}
      sizes="(min-width: 1024px) 760px, 92vw"
      className={`object-cover object-center ${comparison.rightImageClassName ?? ""}`}
    />
  ) : null;

  const leftMedia = comparison.leftPanel ? (
    <div className="absolute inset-0">{comparison.leftPanel}</div>
  ) : comparison.leftImage ? (
    <Image
      src={comparison.leftImage}
      alt=""
      fill
      quality={95}
      sizes="(min-width: 1024px) 760px, 92vw"
      className={`object-cover object-center ${comparison.leftImageClassName ?? ""}`}
    />
  ) : null;

  return (
    <div
      ref={stageRef}
      role="slider"
      tabIndex={0}
      aria-label="左右拖动切换场景对比"
      aria-valuemin={12}
      aria-valuemax={88}
      aria-valuenow={Math.round(split * 100)}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
        updateSplitFromClientX(event.clientX);
      }}
      onPointerMove={(event) => {
        if (!dragging) return;
        updateSplitFromClientX(event.clientX);
      }}
      onPointerUp={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        setDragging(false);
      }}
      onPointerCancel={() => setDragging(false)}
      onLostPointerCapture={() => setDragging(false)}
      onKeyDown={(event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

        event.preventDefault();
        setSplit((current) => clamp(current + (event.key === "ArrowRight" ? 0.05 : -0.05), 0.12, 0.88));
      }}
      className={`group relative isolate overflow-hidden rounded-[22px] border border-black/6 bg-[#ebeff4] outline-none touch-none select-none dark:border-white/10 dark:bg-black ${comparison.aspectClassName}`}
    >
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${splitPercent})` }}
        aria-hidden
      >
        {rightMedia}
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_28%,rgba(117,194,255,0.18),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_48%)]" />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${overlayWidth} 0 0)` }}
        aria-hidden
      >
        {leftMedia}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,13,18,0.12),rgba(9,13,18,0.28))]" />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,transparent_58%,rgba(8,10,14,0.06)_100%)]" />

      {comparison.showGlobalLabels !== false ? (
        <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full bg-[rgba(15,23,42,0.68)] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:left-6 sm:top-6 sm:px-5 sm:text-base">
          {comparison.leftLabel}
        </div>
      ) : null}

      {comparison.showGlobalLabels !== false ? (
        <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-[rgba(15,23,42,0.68)] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:right-6 sm:top-6 sm:px-5 sm:text-base">
          {comparison.rightLabel}
        </div>
      ) : null}

      {comparison.showGlobalCaptions !== false && comparison.leftCaption ? (
        <div className="pointer-events-none absolute bottom-6 left-5 z-10 max-w-[44%] rounded-[24px] bg-[rgba(8,12,18,0.52)] px-4 py-3 text-left text-sm font-medium leading-6 tracking-[-0.03em] text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:bottom-7 sm:left-6 sm:px-5 sm:py-4 sm:text-base">
          {comparison.leftCaption}
        </div>
      ) : null}

      {comparison.showGlobalCaptions !== false && comparison.rightCaption ? (
        <div className="pointer-events-none absolute bottom-6 right-5 z-10 max-w-[44%] rounded-[24px] bg-[rgba(255,250,246,0.76)] px-4 py-3 text-right text-sm font-medium leading-6 tracking-[-0.03em] text-[#1d1d1f] shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl sm:bottom-7 sm:right-6 sm:px-5 sm:py-4 sm:text-base">
          {comparison.rightCaption}
        </div>
      ) : null}

      <div
        className="absolute inset-y-0 z-20 w-px bg-white/80 shadow-[0_0_0_1px_rgba(15,23,42,0.05)]"
        style={{ left: splitPercent }}
        aria-hidden
      />

      <div
        className={`absolute top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white text-[#1d1d1f] shadow-[0_18px_36px_rgba(15,23,42,0.18)] transition-transform duration-200 ${dragging ? "scale-105" : "group-hover:scale-105"}`}
        style={{ left: splitPercent }}
        aria-hidden
      >
        <div className="flex items-center gap-1 text-lg font-semibold">
          <span className="-translate-y-px">‹</span>
          <span className="-translate-y-px">›</span>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/50 bg-white/60 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted-strong)] shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:bottom-5">
        {comparison.hint}
      </div>
    </div>
  );
};
