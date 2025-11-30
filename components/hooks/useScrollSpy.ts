"use client";

import { useEffect, useMemo, useState } from "react";

interface Options {
  rootMargin?: string;
  threshold?: number[] | number;
}

export function useScrollSpy(targetIds: string[], options: Options = {}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const idsKey = useMemo(() => targetIds.join(","), [targetIds]);
  const rootMargin = options.rootMargin ?? "-40% 0px -55% 0px";
  const threshold = useMemo(
    () => options.threshold ?? [0, 0.25, 0.5, 0.75, 1],
    [options.threshold]
  );
  useEffect(() => {
    const elements = targetIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          const id = (visible[0].target as HTMLElement).id;
          setActiveId(id);
        }
      },
      {
        rootMargin,
        threshold,
      }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [idsKey, rootMargin, threshold, targetIds]);
  return activeId;
}
