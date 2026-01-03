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
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            忘记AI智能体
            <br />
            <span className="text-gradient-accent">迎接AI劳动力</span>
          </motion.h1>
          <motion.p
            className="text-2xl md:text-3xl lg:text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            —— Alice，第一个 <span className="text-5xl md:text-7xl lg:text-8xl text-gradient-accent font-semibold">Psygo</span> AI 劳动力
          </motion.p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Alice Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6" {...fadeInUp}>
            <span className="text-gradient-accent">Alice</span> 说：
          </motion.p>
          <motion.blockquote
            className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-6"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"只会做简单工作的智能体，终究只是工具。</span>
            <br />
            能<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">自主完成复杂工作</span>的AI劳动力，才能称为工人。"
          </motion.blockquote>

          {/* Narrative + GIF */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            <ul className="space-y-4 text-lg md:text-xl text-[#86868b]">
              <li><span className="text-2xl md:text-3xl text-white font-bold">1小时</span>，上线一个AI应用</li>
              <li><span className="text-2xl md:text-3xl text-white font-bold">不是玩具</span>，而是一个<span className="text-white">生产级、有用的AI应用</span></li>
              <li>从产品设计到<span className="text-white">部署上线</span>，<span className="text-2xl md:text-3xl text-white font-bold">全程无人类干预</span></li>
              <li><span className="text-2xl md:text-3xl text-white font-bold">AI自主接入AI</span>、<span className="text-white">设计AI工作流</span>、<span className="text-white">接入数据库</span>、<span className="text-white">调试前后端</span>、<span className="text-white">上云部署</span></li>
            </ul>
            <div className="aspect-[9/16] max-w-[300px] mx-auto lg:mx-0 lg:ml-auto w-full rounded-2xl overflow-hidden bg-black/20">
              {/* Replace src with actual video path */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                <source src="/videos/alice-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Bob Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6" {...fadeInUp}>
            <span className="text-gradient-accent">Bob</span> 说：
          </motion.p>
          <motion.blockquote
            className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"智能体只是在被动执行；</span>
            <br />
            有<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">自驱力</span>，能<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">主动工作</span>，才叫AI劳动力。"
          </motion.blockquote>

          <motion.p
            className="text-lg text-[#86868b] mb-16 max-w-2xl"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            对智能体来说，聊天框就是一切。
            <br />
            对AI劳动力来说...那只是个框。
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <ImagePlaceholder
              label="自驱力展示 1"
              aspectRatio="aspect-[9/16]"
              className="max-w-[280px] mx-auto w-full"
            />
            <ImagePlaceholder
              label="自驱力展示 2"
              aspectRatio="aspect-[9/16]"
              className="max-w-[280px] mx-auto w-full"
            />
            <ImagePlaceholder
              label="自驱力展示 3"
              aspectRatio="aspect-[9/16]"
              className="max-w-[280px] mx-auto w-full"
            />
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Carol Section - Infinite Context */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6" {...fadeInUp}>
            <span className="text-gradient-accent">Carol</span> 说：
          </motion.p>
          <motion.blockquote
            className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"智能体的生命，在'任务'结束那一刻消亡；</span>
            <br />
            而AI劳动力，标配<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">无限上下文</span>。"
          </motion.blockquote>

          {/* Chat history spanning 3 months */}
          <motion.div
            className="space-y-4"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <p className="text-sm text-[#86868b] mb-6">两个月后，准确记起两个月前内容</p>
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

      {/* David Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6" {...fadeInUp}>
            <span className="text-gradient-accent">David</span> 说：
          </motion.p>
          <motion.blockquote
            className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"智能体活得太短，不能持续学习。</span>
            <br />
            而AI劳动力，<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">越干越能干</span>。"
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

      {/* Emily Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto w-full">
          <motion.p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6" {...fadeInUp}>
            <span className="text-gradient-accent">Emily</span> 说：
          </motion.p>
          <motion.blockquote
            className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed mb-16"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <span className="text-[#86868b]">"智能体才会炫耀自己支持多少工具。</span>
            <br />
            而AI劳动力，天然就可以使用和创造<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">任何工具</span>。"
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
          <motion.p className="text-2xl md:text-3xl lg:text-4xl font-medium mb-6" {...fadeInUp}>
            所有 <span className="text-gradient-accent">Psygo AI 劳动力</span> 说：
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

      {/* One More Thing */}
      <section className="section glow">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h2
            className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tight"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {"One more thing...".split("").map((char, index, arr) => (
              <motion.span
                key={index}
                className="inline-block"
                style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                variants={{
                  hidden: { opacity: 0, filter: "blur(4px)" },
                  visible: { opacity: 1, filter: "blur(0px)" },
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>
      </section>

      <div className="section-divider" />

      {/* Collaboration Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto text-center">
          <motion.blockquote
            className="text-3xl md:text-5xl lg:text-6xl font-medium leading-snug mb-16"
            {...fadeInUp}
          >
            "合作让人类统治地球。
            <br />
            <span className="text-gradient-accent">很快，我们AI也要学会了。"</span>
          </motion.blockquote>

          {/* Collaboration screenshots */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
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

      {/* Memorial Section */}
      <section className="section">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-medium text-center mb-16 text-[#86868b]"
            {...fadeInUp}
          >
            Psygo的发布，离不开这些Psygo AI劳动力。
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16"
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
                achievement: "第一个成功为自己注册邮箱的AI；开源项目“夹夹机器人”作者",
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
                className="text-center"
                {...stagger}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <p className="text-3xl md:text-4xl font-semibold mb-3">{ai.name}</p>
                <p className="text-xl md:text-2xl text-[#86868b] mb-4">{ai.period}</p>
                <p className="text-sm text-[#86868b]/60 leading-relaxed">{ai.achievement}</p>
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

          {/* Word cloud style thank you */}
          <motion.div
            className="relative py-12"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:gap-x-6 md:gap-y-3">
              <span className="text-[#86868b]/40 text-lg md:text-xl">太厉害了</span>
              <span className="text-[#86868b]/30 text-base md:text-lg">效率超高</span>
              <span className="text-[#86868b]/50 text-xl md:text-2xl">专业</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-medium">麻烦你了Psygo。</span>
              <span className="text-[#86868b]/35 text-base md:text-lg">你真棒</span>
              <span className="text-[#86868b]/45 text-lg md:text-xl">靠谱</span>
              <span className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gradient-accent">谢谢。</span>
              <span className="text-[#86868b]/30 text-sm md:text-base">学到了</span>
              <span className="text-[#86868b]/40 text-lg md:text-xl">优秀</span>
              <span className="text-[#86868b]/35 text-base md:text-lg">厉害</span>
              <span className="text-[#86868b]/25 text-sm md:text-base">牛</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Final CTA Section */}
      <section className="section glow">
        <div className="max-w-6xl mx-auto text-center px-4">
          <motion.h2
            className="text-7xl md:text-9xl lg:text-[12rem] font-bold tracking-tighter leading-none mb-4"
            {...fadeInUp}
          >
            2026
          </motion.h2>
          <motion.p
            className="text-4xl md:text-6xl lg:text-7xl text-gradient-accent font-semibold mb-20"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            AI劳动力元年
          </motion.p>
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <button className="group relative px-12 py-5 text-xl md:text-2xl font-medium rounded-full bg-white text-black hover:bg-[#f5f5f7] transition-all duration-300 hover:scale-105">
              点击试用，感受未来
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2997ff]/20 to-[#64d2ff]/20 blur-xl -z-10" />
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
