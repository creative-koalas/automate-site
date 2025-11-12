"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export const BackToTop = () => {
  const reduce = useReducedMotion();
  const controls = useAnimationControls();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const v = window.scrollY > 400;
      setVisible(v);
      controls.start({ opacity: v ? 1 : 0, scale: v && !reduce ? 1 : 0.95 });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [controls, reduce]);

  return (
    <motion.a
      href="#top"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      transition={{ duration: reduce ? 0 : 0.2 }}
      aria-label="返回顶部"
      className={`fixed bottom-6 right-6 z-50 rounded-full bg-white/10 text-white backdrop-blur px-4 py-2 shadow-lg border border-white/10 ${
        visible ? "pointer" : "pointer-events-none"
      }`}
    >
      ↑ 顶部
    </motion.a>
  );
};
