"use client";

import { useEffect, useState } from "react";

interface Options {
  rootMargin?: string;
  threshold?: number[] | number;
}

export function useScrollSpy(targetIds: string[], options: Options = {}) {
  const [activeId, setActiveId] = useState<string | null>(null);
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
        rootMargin: options.rootMargin ?? "-40% 0px -55% 0px",
        threshold: options.threshold ?? [0, 0.25, 0.5, 0.75, 1],
      }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [targetIds.join(","), options.rootMargin, options.threshold]);
  return activeId;
}
