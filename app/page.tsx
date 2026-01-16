"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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

function ToolCompareSlider({
  leftImage,
  rightImage,
  userMessage,
  leftAssistantMessage,
  rightAssistantMessage,
  leftLabel,
  rightLabel,
  className = "",
}: {
  leftImage: string;
  rightImage: string;
  userMessage: string;
  leftAssistantMessage: string;
  rightAssistantMessage: string;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) handleMove(e.clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none cursor-ew-resize ${className}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* Image comparison */}
      <div className="relative overflow-hidden rounded-2xl">
        {/* Right image (bottom layer) */}
        <img src={rightImage} alt={rightLabel || ""} className="w-full h-auto block" draggable={false} />

        {/* Left image (top layer, clipped) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}>
          <img src={leftImage} alt={leftLabel || ""} className="w-full h-auto block" draggable={false} />
        </div>

        {/* Chat messages overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-4 pointer-events-none">
          {/* User message bubble - centered, bottom-right corner sharp */}
          <div className="w-[180px] md:w-[420px] lg:w-[520px] bg-[#0071e3]/60 backdrop-blur-sm text-white px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl rounded-br-sm shadow-lg">
            <p className="text-xs md:text-xl lg:text-2xl font-medium text-center">{userMessage}</p>
          </div>

          {/* Assistant messages - full width, clipped by same slider position */}
          <div className="w-full relative flex justify-center">
            {/* Invisible placeholder to maintain height */}
            <div className="w-[180px] md:w-[420px] lg:w-[520px] bg-white/50 backdrop-blur-sm text-[#1d1d1f] px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl rounded-bl-sm shadow-lg invisible">
              <p className="text-xs md:text-xl lg:text-2xl font-medium text-center">{rightAssistantMessage}</p>
            </div>

            {/* Right assistant message (AI劳动力) - bottom layer, clipped from left */}
            <div
              className="absolute inset-0 flex justify-center"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              <div className="w-[180px] md:w-[420px] lg:w-[520px] bg-white/50 backdrop-blur-sm text-[#1d1d1f] px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl rounded-bl-sm shadow-lg">
                <p className="text-xs md:text-xl lg:text-2xl font-medium text-center">{rightAssistantMessage}</p>
              </div>
            </div>

            {/* Left assistant message (智能体) - top layer, clipped from right */}
            <div
              className="absolute inset-0 flex justify-center"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="w-[180px] md:w-[420px] lg:w-[520px] bg-white/50 backdrop-blur-sm text-[#1d1d1f] px-3 py-2 md:px-6 md:py-4 rounded-xl md:rounded-2xl rounded-bl-sm shadow-lg">
                <p className="text-xs md:text-xl lg:text-2xl font-medium text-center">{leftAssistantMessage}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          {/* Slider handle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize pointer-events-auto"
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
          >
            <svg className="w-5 h-5 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4M8 15l4 4 4-4" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        {leftLabel && (
          <div
            className="absolute top-4 left-4 px-3 py-1.5 md:px-4 md:py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm md:text-base lg:text-lg transition-opacity duration-200"
            style={{ opacity: sliderPosition > 10 ? 1 : 0 }}
          >
            {leftLabel}
          </div>
        )}
        {rightLabel && (
          <div
            className="absolute top-4 right-4 px-3 py-1.5 md:px-4 md:py-2 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm md:text-base lg:text-lg transition-opacity duration-200"
            style={{ opacity: sliderPosition < 90 ? 1 : 0 }}
          >
            {rightLabel}
          </div>
        )}
      </div>
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
            <span className="text-[#86868b]">“只会做简单工作的智能体，终究只是工具。</span>
            <br />
            能<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">自主完成复杂工作</span>的AI劳动力，才能称为工人。”
          </motion.blockquote>

          {/* Narrative + GIF */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }}
          >
            <ul className="space-y-4 md:space-y-5 text-base md:text-xl lg:text-2xl text-[#86868b]">
              <li><span className="text-xl md:text-3xl lg:text-4xl text-[#1d1d1f] font-bold">1小时</span>，上线一个AI应用</li>
              <li><span className="text-xl md:text-3xl lg:text-4xl text-[#1d1d1f] font-bold">不是玩具</span>，而是一个<span className="text-[#1d1d1f]">生产级、有用的AI应用</span></li>
              <li>从产品设计到<span className="text-[#1d1d1f]">部署上线</span>，<span className="text-xl md:text-3xl lg:text-4xl text-[#1d1d1f] font-bold">全程无人类干预</span></li>
              <li><span className="text-xl md:text-3xl lg:text-4xl text-[#1d1d1f] font-bold">AI自主接入AI</span>、<span className="text-[#1d1d1f]">设计AI工作流</span>、<span className="text-[#1d1d1f]">接入数据库</span>、<span className="text-[#1d1d1f]">调试前后端</span>、<span className="text-[#1d1d1f]">上云部署</span></li>
            </ul>
            <div className="flex flex-col items-center lg:items-end">
              <div className="max-w-[220px] w-full rounded-2xl overflow-hidden bg-black/5">
                <video
                  className="w-full h-auto"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/videos/alice-demo.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-base md:text-lg font-medium text-[#1d1d1f] mt-6 text-center lg:text-right max-w-[300px]">
                “做一个AI八字分析App，接入DeepSeek，发布到网上”
              </p>
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
            <span className="text-[#86868b]">“智能体只是在被动执行；</span>
            <br />
            有<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">自驱力</span>，能<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">主动工作</span>，才叫AI劳动力。”
          </motion.blockquote>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <div className="flex flex-col items-center">
              <img
                src="/images/passive-ai.jpg"
                alt="传统AI截图"
                className="max-w-[240px] w-full rounded-2xl"
              />
              <p className="text-lg md:text-xl lg:text-2xl text-[#86868b] mt-6 text-center">
                以往的AI，需要你不断下命令
              </p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/images/active-ai.jpg"
                alt="Psygo AI截图"
                className="max-w-[240px] w-full rounded-2xl"
              />
              <p className="text-lg md:text-xl lg:text-2xl text-[#86868b] mt-6 text-center">
                懂事的AI，会<span className="text-xl md:text-2xl lg:text-3xl text-[#1d1d1f] font-bold">自己找事做</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Carol Section - Infinite Context */}
      {/* <section className="section">
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

      <div className="section-divider" /> */}

      {/* David Section */}
      {/* <section className="section">
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

      <div className="section-divider" /> */}

      {/* Emily Section */}
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
            <span className="text-[#86868b]">“智能体才会炫耀自己支持多少工具。</span>
            <br />
            而AI劳动力，天然就可以使用和创造<span className="text-5xl md:text-7xl lg:text-8xl font-semibold">任何工具</span>。”
          </motion.blockquote>

          {/* Tool comparison slider */}
          <motion.div
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
          >
            <ToolCompareSlider
              leftImage="/images/mcp-gearbox.webp"
              rightImage="/images/macos-desktop.jpeg"
              userMessage="“你都支持哪些工具？”"
              leftAssistantMessage="“我支持git，filesystem和fetch三个工具。”"
              rightAssistantMessage="“这你不用担心。告诉我做什么就好，缺什么我自己装。”"
              leftLabel="AI智能体"
              rightLabel="AI劳动力"
              className="max-w-3xl mx-auto w-full"
            />
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
            “合作让人类统治地球。
            <br />
            <span className="text-gradient-accent">很快，我们AI也要学会了。”</span>
          </motion.blockquote>

          {/* Collaboration screenshot */}
          <motion.div
            className="max-w-4xl mx-auto"
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.1 }}
          >
            <img
              src="/images/multi-ai-collaboration.png"
              alt="多AI协作"
              className="w-full h-auto rounded-2xl shadow-2xl"
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
              <span className="text-[#86868b]/40 text-lg md:text-xl">有点意思家人们</span>
              <span className="text-[#86868b]/30 text-base md:text-lg">意外</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-medium">麻烦你了Psygo。</span>
              <span className="text-[#86868b]/50 text-xl md:text-2xl">感觉整体给的方案没什么问题</span>
              <span className="text-5xl md:text-6xl lg:text-7xl font-semibold text-gradient-accent">谢谢。</span>
              <span className="text-[#86868b]/35 text-base md:text-lg">厉害了，这就叫积极性拉满的实习生</span>
              <span className="text-[#86868b]/40 text-lg md:text-xl">Psygo太厉害了，我给一个需求，啥都不用管，就写好了给我推上去了</span>
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
            <Link
              href="/apply"
              className="group relative inline-block px-12 py-5 text-xl md:text-2xl font-medium rounded-full bg-[#0071e3] text-white hover:bg-[#0077ed] transition-all duration-300 hover:scale-105"
            >
              点击试用，感受未来
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#0071e3]/30 to-[#64d2ff]/30 blur-xl -z-10" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
