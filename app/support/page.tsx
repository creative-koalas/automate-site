"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PRODUCT_NAME, PRODUCT_WORKFORCE_NAME } from "@/lib/brand";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
};

const faqs = [
  {
    question: `${PRODUCT_NAME} 不回复我的消息？`,
    answer:
      `${PRODUCT_NAME} 被设计为 AI 劳动力，而非聊天机器人。10–60 秒的响应时间属于正常范围。在首次交互或长时间未使用后，响应时间可能更长，因为 AI 劳动力需要启动计算机。`,
  },
  {
    question: `${PRODUCT_NAME} 能做什么？`,
    answer:
      `${PRODUCT_NAME} 被设计为通用型 AI 劳动力，基本上可以完成人类在电脑上能做的一切工作，例如设计、开发和部署应用程序，进行调研，以及制作 Word/PDF/PPT 文档。`,
  },
  {
    question: "如何进行多智能体协作？",
    answer:
      "只需雇佣多个 AI 劳动力，然后创建一个包含多个 AI 的群聊即可。",
  },
  {
    question: "关闭 App 后 AI 会停止工作吗？",
    answer:
      `不会。所有 ${PRODUCT_WORKFORCE_NAME} 都独立存在和行动。只要您没有明确解雇它们，AI 劳动力即使在您关闭/退出 App、卸载 App 甚至摔坏手机之后，仍然会继续存在并工作。请放心关闭 App 去做自己的事，让 AI 在后台工作——这正是我们所设计的使用方式。`,
  },
];

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-24">
      <motion.div className="max-w-3xl w-full" {...fadeInUp}>
        <Link
          href="/"
          className="inline-block mb-12 text-sm text-[#86868b] hover:text-[var(--accent)] transition-colors"
        >
          &larr; 返回首页
        </Link>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          支持与帮助
        </h1>
        <p className="text-lg text-[#86868b] mb-16">
          常见问题解答，助您快速上手 {PRODUCT_WORKFORCE_NAME}。
        </p>

        {/* FAQ Accordion */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-8">常见问题</h2>
          <div className="divide-y divide-black/[0.08]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i}>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-medium pr-4">
                      {faq.question}
                    </span>
                    <span
                      className="text-xl text-[#86868b] shrink-0 transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: isOpen ? "300px" : "0px",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <p className="pb-5 text-[#86868b] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
          <p className="text-[#86868b] leading-relaxed">
            如果以上内容未能解决您的问题，请通过邮件联系我们的支持团队：
          </p>
          <a
            href="mailto:psygosupport@163.com"
            className="inline-block mt-4 text-[var(--accent)] hover:underline font-medium"
          >
            psygosupport@163.com
          </a>
        </section>
      </motion.div>
    </main>
  );
}
