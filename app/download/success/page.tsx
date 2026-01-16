"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const platform = searchParams.get("platform") || "Windows";

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Success checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-[#34c759] flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6"
        >
          下载已开始
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4 mb-12"
        >
          <p className="text-lg text-[#86868b]">
            Psygo管理员App ({platform}) 正在下载中
          </p>
          <p className="text-sm text-[#86868b]">
            Psygo与其他AI产品有本质差异，建议您提前阅读用户指南，获得更好的使用体验
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center gap-6"
        >
          <Link
            href="https://docs.psygoai.com/docs/intro"
            className="inline-block px-12 py-4 text-lg font-medium rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors"
          >
            阅读用户指南
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className="text-[#0071e3] hover:underline"
            >
              返回首页
            </Link>
            <span className="text-[#86868b]">·</span>
            <Link
              href="/download"
              className="text-[#0071e3] hover:underline"
            >
              下载其他版本
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

export default function DownloadSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-[#86868b]">Loading...</p>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  );
}
