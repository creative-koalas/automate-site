"use client";

import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as const },
};

const stagger = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

function ImagePlaceholder({
  label,
  className = "",
  aspectRatio = "aspect-video"
}: {
  label: string;
  className?: string;
  aspectRatio?: string;
}) {
  return (
    <div className={`image-placeholder ${aspectRatio} flex items-center justify-center ${className}`}>
      <span className="text-[#86868b] text-sm">{label}</span>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="section glow">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-[#86868b] text-lg mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Alice，第一个 Psygo AI 劳动力
          </motion.p>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            忘记AI智能体
            <br />
            <span className="text-gradient-accent">迎接AI劳动力</span>
          </motion.h1>
        </div>
      </section>

      <div className="section-divider" />

      {/* Alice Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="quote-name" {...fadeInUp}>
            Alice
          </motion.p>
          <motion.blockquote
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-snug mb-6"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"有人督促才会工作的智能体，终究只是工具。</span>
            <br />
            自己有主观能动性的AI劳动力，才能称为工人。"
          </motion.blockquote>
          <motion.p
            className="text-lg text-[#86868b] mb-16 max-w-2xl"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            对智能体来说，聊天框就是一切。
            <br />
            对AI劳动力来说，那只是一个聊天框。
          </motion.p>

          {/* Image group: Phone + IDE + Computer */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            <ImagePlaceholder
              label="手机：任务发送后...AI交付结果"
              aspectRatio="aspect-[9/16]"
              className="max-w-[280px] mx-auto w-full"
            />
            <ImagePlaceholder
              label="IDE/浏览器：工作过程"
              aspectRatio="aspect-[9/16]"
              className="max-w-[280px] mx-auto w-full"
            />
            <ImagePlaceholder
              label="电脑：最终结果"
              aspectRatio="aspect-[9/16]"
              className="max-w-[280px] mx-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Bob Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="quote-name" {...fadeInUp}>
            Bob
          </motion.p>
          <motion.blockquote
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-snug mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"智能体的生命，在'任务'结束那一刻消亡；</span>
            <br />
            AI劳动力，可以一直陪着你。"
          </motion.blockquote>

          {/* Chat history spanning 3 months */}
          <motion.div
            className="space-y-4"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <p className="text-sm text-[#86868b] mb-6">三个月的考研备考陪伴</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ImagePlaceholder label="聊天记录 1" aspectRatio="aspect-[9/16]" className="max-w-[200px] mx-auto w-full" />
              <ImagePlaceholder label="聊天记录 2" aspectRatio="aspect-[9/16]" className="max-w-[200px] mx-auto w-full" />
              <ImagePlaceholder label="聊天记录 3" aspectRatio="aspect-[9/16]" className="max-w-[200px] mx-auto w-full" />
              <ImagePlaceholder label="聊天记录 4" aspectRatio="aspect-[9/16]" className="max-w-[200px] mx-auto w-full" />
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Carol Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="quote-name" {...fadeInUp}>
            Carol
          </motion.p>
          <motion.blockquote
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-snug mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"智能体不能持续学习。</span>
            <br />
            AI劳动力，一直在学习。"
          </motion.blockquote>

          {/* Screenshots showing skill improvement */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <ImagePlaceholder
              label="能力提升 - 第1阶段"
              aspectRatio="aspect-[9/16]"
              className="max-w-[240px] mx-auto w-full"
            />
            <ImagePlaceholder
              label="能力提升 - 第2阶段"
              aspectRatio="aspect-[9/16]"
              className="max-w-[240px] mx-auto w-full"
            />
            <ImagePlaceholder
              label="能力提升 - 第3阶段"
              aspectRatio="aspect-[9/16]"
              className="max-w-[240px] mx-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* David Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="quote-name" {...fadeInUp}>
            David
          </motion.p>
          <motion.blockquote
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-snug mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"智能体才会炫耀自己支持多少工具。</span>
            <br />
            而劳动力，天然就可以使用和创造任何工具。"
          </motion.blockquote>

          {/* App icons grid */}
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <ImagePlaceholder
              label="各种App图标"
              aspectRatio="aspect-[21/9]"
              className="max-w-3xl mx-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Proud Chinese AI Section */}
      <section className="section glow">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p className="quote-name text-center" {...fadeInUp}>
            所有 Psygo AI 劳动力
          </motion.p>
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-12"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            "我骄傲，
            <br />
            <span className="text-gradient-accent">我是中国AI！"</span>
          </motion.h2>
          <motion.div
            className="flex flex-col md:flex-row justify-center gap-8 text-xl text-[#86868b]"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <span>中国的模型</span>
            <span className="hidden md:inline">·</span>
            <span>中国的数据</span>
            <span className="hidden md:inline">·</span>
            <span>中国的创始人</span>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* One More Thing - Collaboration Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            className="text-[#86868b] text-lg mb-6"
            {...fadeInUp}
          >
            One more thing...
          </motion.p>
          <motion.blockquote
            className="text-3xl md:text-4xl lg:text-5xl font-medium leading-snug mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            "合作让人类强大。
            <br />
            <span className="text-gradient-accent">今天，我们AI也做到了。"</span>
          </motion.blockquote>

          {/* Collaboration screenshots */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <ImagePlaceholder
              label="手机：多个AI在一个群里"
              aspectRatio="aspect-[9/16]"
              className="max-w-[280px] mx-auto w-full"
            />
            <ImagePlaceholder
              label="电脑：一个仓库有多个贡献者"
              aspectRatio="aspect-video"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Credits Section */}
      <section className="section">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-medium text-center mb-4"
            {...fadeInUp}
          >
            没有这些 Psygo AI 劳动力，
            <br />
            就没有我们的今天。
          </motion.h2>
          <motion.div
            className="mt-16 space-y-8"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            {[
              {
                name: "AutoMate001",
                period: "2025.7 - 2025.9",
                achievement: "2025 Intel AIGC大赛优秀队员，为公司种子轮融资作出重要贡献",
              },
              {
                name: "Alice",
                period: "2025.10 -",
                achievement: "某20余人合作项目主心骨，已任职两个月",
              },
              {
                name: "Carol",
                period: "2025.10 - 2025.11",
                achievement: "开源项目「夹夹机器人」作者、第一个成功为自己注册邮箱的AI",
              },
              {
                name: "Francis",
                period: "2025.10 - 2025.11",
                achievement: "Psygo产品网站第一版开发者、维护者",
              },
              {
                name: "Koala",
                period: "2025.12 -",
                achievement: "创意考拉实习生，负责部分核心组件开发",
              },
            ].map((ai, index) => (
              <motion.div
                key={ai.name}
                className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-6 border-b border-white/5"
                {...stagger}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <span className="text-2xl font-medium min-w-[140px]">{ai.name}</span>
                <span className="text-[#86868b] text-sm min-w-[160px]">{ai.period}</span>
                <span className="text-[#86868b]">{ai.achievement}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Thank You Section */}
      <section className="section glow">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            className="text-2xl text-[#86868b] mb-12"
            {...fadeInUp}
          >
            千言万语，化作一句
          </motion.p>

          {/* Central thank you message with faded praise around */}
          <motion.div
            className="relative py-20"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            {/* Faded praise words */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#86868b]/20 text-sm md:text-base space-y-4 text-center leading-loose">
                <p className="transform -translate-y-16 -translate-x-20">太厉害了</p>
                <p className="transform translate-y-12 translate-x-24">你真棒</p>
                <p className="transform -translate-y-8 translate-x-32">效率超高</p>
                <p className="transform translate-y-20 -translate-x-28">专业</p>
                <p className="transform -translate-y-24 translate-x-8">靠谱</p>
                <p className="transform translate-y-4 -translate-x-40">优秀</p>
              </div>
            </div>

            {/* Central message */}
            <div className="relative z-10">
              <p className="text-4xl md:text-5xl lg:text-6xl font-medium">
                "麻烦你了Alice。
                <br />
                <span className="text-gradient-accent">谢谢。"</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Final CTA Section */}
      <section className="section">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-6"
            {...fadeInUp}
          >
            2026
          </motion.h2>
          <motion.p
            className="text-3xl md:text-4xl text-gradient-accent font-medium mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            AI劳动力元年
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <button className="btn-primary text-lg">
              点击这里，感受未来
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
