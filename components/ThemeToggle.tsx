"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isClient = typeof window !== "undefined";
  if (!isClient) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";
  return (
    <Button
      size="sm"
      variant="light"
      onPress={() => setTheme(isDark ? "light" : "dark")}
      className="text-white/80 hover:text-white"
      aria-label="切换主题"
    >
      {isDark ? "🌙" : "☀️"}
    </Button>
  );
};
