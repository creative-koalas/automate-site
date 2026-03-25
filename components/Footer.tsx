"use client";

import { motion, useReducedMotion } from "framer-motion";

export const Footer = () => {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : { duration: 0.45 }}
      className="pb-8"
    >
      <div className="flex flex-col gap-6 border-t border-[var(--line)] pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-2xl font-semibold tracking-[-0.04em]">PsyGo</p>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--muted)]">
            面向企业协作与自动化场景的 AI 劳动力平台，让 AI 以可调度、可执行、可追踪的方式进入真实工作流。
          </p>
          <div className="mt-4 space-y-1 text-sm text-[var(--muted)]">
            <p>公司：武汉创意考拉科技有限公司</p>
            <p>
              邮箱：
              <a href="mailto:1234567890@qq.com" className="ml-1 hover:text-[var(--foreground)]">
                1234567890@qq.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <p className="text-xs text-[var(--muted)]">© {new Date().getFullYear()} PsyGo</p>
        </div>
      </div>
    </motion.footer>
  );
};
