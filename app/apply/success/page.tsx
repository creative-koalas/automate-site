"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";

function formatWaitTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}分钟`;
  } else if (minutes < 1440) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) {
      return `${hours}小时`;
    }
    return `${hours}小时${mins}分钟`;
  } else {
    const days = Math.floor(minutes / 1440);
    const remainingMinutes = minutes % 1440;
    const hours = Math.floor(remainingMinutes / 60);
    if (hours === 0) {
      return `${days}天`;
    }
    return `${days}天${hours}小时`;
  }
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const queuePosition = searchParams.get("position") || "—";
  const waitMinutes = parseInt(searchParams.get("wait") || "0", 10);
  const waitTime = waitMinutes > 0 ? formatWaitTime(waitMinutes) : "—";

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="text-[#0071e3] hover:text-[#0077ed] transition-colors text-sm font-medium"
          >
            &larr; 返回首页
          </Link>
        </div>
      </header>

      {/* Success Content */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-8 text-[#34c759]">&#10003;</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight">
              申请成功
            </h1>
          </motion.div>

          <motion.div
            className="space-y-6 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p>
              感谢您申请试用！由于服务器容量有限，我们将分批发放试用资格。您前方还有
              <strong className="text-2xl md:text-3xl text-gradient-accent">{queuePosition}人</strong>
              等待，我们预计在
              <strong className="text-2xl md:text-3xl text-gradient-accent">{waitTime}</strong>
              后向您的邮箱发送Psygo邀请码。
            </p>
            <p className="text-base md:text-lg text-[#86868b]">
              为保证每个用户都能获得平等的试用机会，
              <strong className="text-[#1d1d1f]">内测资格有效期为6小时，从发送邮件开始计时，到期将自动销毁您的Psygo AI劳动力，请您在收到邮件后尽快试用。</strong>
            </p>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-block px-8 py-4 text-lg font-medium rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] transition-colors"
            >
              返回首页
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default function SuccessPage() {
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
