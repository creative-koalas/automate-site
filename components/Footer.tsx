"use client";

import { motion, useReducedMotion } from "framer-motion";

const ICP_RECORD_NUMBER = "鄂ICP备2025165530号";
const ICP_RECORD_URL = "https://beian.miit.gov.cn/";
const PUBLIC_SECURITY_RECORD_NUMBER = "鄂公网安备42010302002808号";
const PUBLIC_SECURITY_RECORD_URL =
  "https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42010302002808";

export const Footer = () => {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      initial={reduce ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={reduce ? { duration: 0 } : { duration: 0.45 }}
      className="pb-10"
    >
      <div className="apple-divider flex flex-col gap-6 pt-10 text-center sm:pt-12">
        <div className="mx-auto max-w-2xl">
          <p className="text-2xl font-semibold tracking-[-0.04em]">PsyGo</p>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
            一个 AI 助理 App。雇佣 AI 牛马，把任务交给它们。它们会持续推进，做完主动交结果。支持 iOS、Android、macOS、Windows、Linux。
          </p>
          <div className="mt-5 space-y-1 text-sm text-[var(--muted)]">
            <p>公司：武汉创意考拉科技有限公司</p>
            <p>
              企业版咨询电话：
              <a href="tel:18186338802" className="ml-1 hover:text-[var(--foreground)]">
                18186338802
              </a>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-[var(--muted)]">
            <a
              href={ICP_RECORD_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--foreground)]"
            >
              {ICP_RECORD_NUMBER}
            </a>
            <span className="hidden sm:inline">|</span>
            <a
              href={PUBLIC_SECURITY_RECORD_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[var(--foreground)]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 64 64"
                className="h-4 w-4 shrink-0"
              >
                <path
                  d="M32 4 12 12v18c0 14.2 8.3 24.1 20 30 11.7-5.9 20-15.8 20-30V12L32 4Z"
                  fill="#2D7FF9"
                />
                <path
                  d="M32 11.5 18 17v13c0 10.1 5.6 17.4 14 22 8.4-4.6 14-11.9 14-22V17L32 11.5Z"
                  fill="#FFFFFF"
                  opacity="0.96"
                />
                <path
                  d="M32 20.5c4.8 0 8.8 3.9 8.8 8.8s-3.9 8.8-8.8 8.8-8.8-3.9-8.8-8.8 3.9-8.8 8.8-8.8Z"
                  fill="#2D7FF9"
                />
                <path
                  d="M32 24.2 33.8 28l4.2.4-3.1 2.8.9 4.1-3.8-2-3.8 2 .9-4.1-3.1-2.8 4.2-.4L32 24.2Z"
                  fill="#FFFFFF"
                />
                <path
                  d="M24 43.8h16"
                  stroke="#2D7FF9"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
              <span>{PUBLIC_SECURITY_RECORD_NUMBER}</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-[var(--muted)]">© {new Date().getFullYear()} PsyGo</p>
        </div>
      </div>
    </motion.footer>
  );
};
