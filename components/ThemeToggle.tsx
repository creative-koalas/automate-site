"use client";

import { Button } from "@heroui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = (resolvedTheme ?? theme) === "dark";
  return (
    <Button
      size="sm"
      variant="light"
      onPress={() => setTheme(isDark ? "light" : "dark")}
      className="text-white/80 hover:text-white"
    >
      {isDark ? "🌙" : "☀️"}
    </Button>
  );
};
