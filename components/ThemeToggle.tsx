"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted && (resolvedTheme ?? theme) === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="surface-shell inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-[var(--muted-strong)] hover:-translate-y-0.5"
      aria-label="切换主题"
    >
      <span className={`relative h-5 w-9 rounded-full transition ${isDark ? "bg-sky-500/30" : "bg-slate-900/10 dark:bg-white/15"}`}>
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            isDark ? "left-[18px]" : "left-0.5"
          }`}
        />
      </span>
      <span aria-hidden>{isDark ? "夜" : "昼"}</span>
    </button>
  );
};
