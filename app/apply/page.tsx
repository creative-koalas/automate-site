"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
};

export default function ApplyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    company: "",
    job_title: "",
    use_case: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const payload = {
        phone: formData.phone,
        email: formData.email,
        job_title: `${formData.company};${formData.job_title}`,
        use_case: formData.use_case,
      };

      const response = await fetch("https://api.psygoai.com/assistant/api/website/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("提交失败，请稍后重试");
      }

      const result = await response.json();

      if (result.code !== 0) {
        throw new Error(result.msg || "提交失败，请稍后重试");
      }

      const { queue_position, estimated_wait_minutes } = result.data;
      router.push(`/apply/success?position=${queue_position}&wait=${estimated_wait_minutes}`);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "提交失败，请稍后重试");
      setIsSubmitting(false);
    }
  };

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

      {/* Form Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full">
          <motion.div {...fadeInUp}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-4">
              申请试用
            </h1>
            <p className="text-lg md:text-xl text-[#86868b] mb-12">
              填写以下信息，抢先体验 <span className="text-gradient-accent font-medium">Psygo AI 劳动力</span>
            </p>
          </motion.div>

          <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#1d1d1f] mb-2">
                  手机号
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="请输入手机号"
                  className="w-full px-4 py-3 text-lg rounded-xl border border-black/10 bg-white focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#1d1d1f] mb-2">
                  邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="请输入邮箱"
                  className="w-full px-4 py-3 text-lg rounded-xl border border-black/10 bg-white focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-[#1d1d1f] mb-2">
                  公司
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="例如：创意考拉"
                  className="w-full px-4 py-3 text-lg rounded-xl border border-black/10 bg-white focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors"
                />
              </div>

              <div>
                <label htmlFor="job_title" className="block text-sm font-medium text-[#1d1d1f] mb-2">
                  职位
                </label>
                <div className="relative">
                  <select
                    id="job_title"
                    name="job_title"
                    required
                    value={formData.job_title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg rounded-xl border border-black/10 bg-white focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors appearance-none cursor-pointer pr-10"
                  >
                    <option value="">请选择职位</option>
                    <option value="创始人/CEO">创始人/CEO</option>
                    <option value="CTO/技术负责人">CTO/技术负责人</option>
                    <option value="产品经理">产品经理</option>
                    <option value="软件工程师">软件工程师</option>
                    <option value="数据科学家">数据科学家</option>
                    <option value="设计师">设计师</option>
                    <option value="运营">运营</option>
                    <option value="市场营销">市场营销</option>
                    <option value="销售">销售</option>
                    <option value="人力资源">人力资源</option>
                    <option value="学生">学生</option>
                    <option value="自由职业">自由职业</option>
                    <option value="其他">其他</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <svg className="w-4 h-4 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="use_case" className="block text-sm font-medium text-[#1d1d1f] mb-2">
                  使用场景
                </label>
                <textarea
                  id="use_case"
                  name="use_case"
                  required
                  value={formData.use_case}
                  onChange={handleChange}
                  placeholder="请描述您希望如何使用 Psygo AI 劳动力"
                  rows={4}
                  className="w-full px-4 py-3 text-lg rounded-xl border border-black/10 bg-white focus:outline-none focus:border-[#0071e3] focus:ring-1 focus:ring-[#0071e3] transition-colors resize-none"
                />
              </div>

              {errorMessage && (
                <p className="text-[#ff3b30] text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 text-lg font-medium rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "提交中..." : "提交申请"}
              </button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
