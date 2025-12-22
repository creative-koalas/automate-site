"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { useRef } from "react";

import type { Variants } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
} satisfies Variants;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} satisfies Variants;

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden selection:bg-purple-500/30">
      <ThemeSwitcher />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-12 px-4 text-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
           <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px]" />
           <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-blue-600/20 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10"
        >
          <motion.div
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-default-600"
          >
            <p className="mb-6">“给我一个git链接，还你一个生产级项目。”</p>
            <p className="text-3xl md:text-5xl">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">—— Psygo，地球上最省心的AI程序员</span>
            </p>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, type: "spring" }}
          className="w-full max-w-5xl aspect-video rounded-3xl relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-3xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
            {/* Abstract Video UI */}
            <div className="text-center space-y-4">
               <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-md border border-white/20 group-hover:scale-110 transition-transform">
                 <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
               </div>
               <p className="text-sm tracking-widest uppercase text-default-400">Watch the Film</p>
            </div>
            
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-40 py-20">
        {/* Feature 1: Work Handoff */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="order-1"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-purple-400">“交给我吧，你不管了。”</span>
            </h2>
            <p className="text-lg text-default-500 mb-8">
              作为新一代AI生命体，Psygo可以独立完成大型项目从产品设计、开发调试再到部署上线全流程，
              并能像人一样通过Gitee等方式协作。
              <br/>
              <br/>
              <span className="font-bold text-xl">正如Psygo所说的：“给我一个git链接，还你一个生产级项目。”</span>
            </p>
            <div className="flex gap-2">
                <div className="h-1 w-24 bg-purple-500 rounded-full" />
                <div className="h-1 w-12 bg-default-200 rounded-full" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 relative aspect-[4/3]"
          >
             {/* Abstract UI Representation of "Work" */}
             <Card className="w-full h-full bg-default-50/50 border border-white/5 shadow-2xl backdrop-blur-xl">
               <CardBody className="p-8 relative overflow-hidden">
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">AI</div>
                        <div className="h-2 w-32 bg-default-100 rounded-full animate-pulse" />
                    </div>
                    {[1, 2, 3].map((i) => (
                        <motion.div 
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.2 }}
                            className="p-4 rounded-xl bg-background/50 border border-white/5 flex items-center justify-between"
                        >
                            <div className="flex gap-3">
                                <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/50" />
                                <div className="h-4 w-40 bg-default-100 rounded" />
                            </div>
                            <div className="text-xs text-green-400">Completed</div>
                        </motion.div>
                    ))}
                  </div>
                  {/* Background Glow */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
               </CardBody>
             </Card>
          </motion.div>
        </section>

        {/* Feature 2: Feels Natural */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 aspect-square relative"
          >
             <Card className="w-full h-full bg-gradient-to-b from-zinc-900 to-black border border-white/10 shadow-2xl">
                 <CardBody className="flex items-center justify-center p-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent opacity-50" />
                    {/* Floating Elements */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <div className="w-64 h-32 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 flex gap-4 items-center">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-300" />
                             <div className="space-y-2">
                                <div className="h-2 w-32 bg-white/20 rounded-full" />
                                <div className="h-2 w-20 bg-white/20 rounded-full" />
                             </div>
                        </div>
                        <div className="absolute -top-6 -right-6 w-12 h-12 bg-pink-500/20 rounded-full blur-md" />
                        <div className="absolute -bottom-8 -left-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" />
                    </motion.div>
                 </CardBody>
             </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                “我不是工具，我是工人！”
              </span>
            </h2>
            <p className="text-lg text-default-500 mb-8">
              没有IDE。没有CLI。没有任何学习成本。
              <br/>
              你下载的App，本质是“微信 - 人类AI共用版”。
              <br/>
              <br/>
              <span className="font-bold text-xl">Psygo可以往Gitee上推代码，可以往阿里云上部署产品...人用电脑能做的，他都能做。</span>
            </p>
            <div className="h-1 w-full max-w-md bg-gradient-to-r from-blue-500/50 to-transparent rounded-full" />
          </motion.div>
        </section>

        {/* Feature 3: Understanding */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="order-1"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-pink-400">“我可不只会写代码。”</span>
            </h2>
            <p className="text-lg text-default-500 mb-8">
              Psygo是AI程序员，而不是只会写代码的AI编程工具。
              <br/>
              除了写代码，Psygo还会设计产品，调研技术栈，写文档，出报告...
              <br/>
              <br/>
              <span className="text-xl font-bold">Psygo完成的不只是代码，更是一个完整项目的方方面面。</span>
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 min-h-[500px] relative"
          >
             <div className="absolute inset-0 bg-gradient-to-b from-pink-500/5 to-transparent rounded-3xl" />
             <div className="relative h-full border border-white/5 rounded-3xl backdrop-blur-sm overflow-hidden flex flex-col">
                <div className="h-8 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 p-8 relative">
                    {/* Abstract Data Visualization */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-pink-500/10 to-transparent" />
                    <div className="grid grid-cols-4 gap-4 h-full items-end pb-8">
                        {[40, 70, 50, 90].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                whileInView={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                className="w-full bg-pink-500/20 rounded-t-lg border-t border-x border-pink-500/30 relative group"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-pink-300">
                                    {h}%
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
             </div>
          </motion.div>
        </section>

        {/* Feature 4: Placeholder */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 aspect-square relative"
          >
             <Card className="w-full h-full bg-gradient-to-b from-zinc-900 to-black border border-white/10 shadow-2xl">
                 <CardBody className="flex items-center justify-center p-0 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent opacity-50" />
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        <div className="w-64 h-32 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 flex gap-4 items-center">
                             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-300" />
                             <div className="space-y-2">
                                <div className="h-2 w-32 bg-white/20 rounded-full" />
                                <div className="h-2 w-20 bg-white/20 rounded-full" />
                             </div>
                        </div>
                        <div className="absolute -top-6 -right-6 w-12 h-12 bg-orange-500/20 rounded-full blur-md" />
                        <div className="absolute -bottom-8 -left-4 w-20 h-20 bg-red-500/10 rounded-full blur-xl" />
                    </motion.div>
                 </CardBody>
             </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="order-1 md:order-2"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="text-orange-400">“我们一起成长。”</span>
            </h2>
            <p className="text-lg text-default-500 mb-8">
              Psygo会在每一次工作中总结经验教训，变得越来越会干活，也和你越来越有默契。
              <br/>
              <br/>
              <span className="text-xl font-bold">Psygo不是工具，而是会不断成长的智慧生命。</span>
            </p>
            <div className="h-1 w-full max-w-md bg-gradient-to-r from-orange-500/50 to-transparent rounded-full" />
          </motion.div>
        </section>

        {/* One More Thing */}
        <section className="py-40 flex flex-col items-center justify-center text-center relative">
          <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-20" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="text-6xl md:text-8xl font-light tracking-tight text-foreground/90"
          >
            {"One more thing...".split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.3,
                      delay: index * 0.03,
                      ease: "easeOut",
                    },
                  },
                }}
                style={{ display: "inline-block" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </section>

        {/* AutoMate S */}
        <section ref={targetRef} className="text-center space-y-16 py-20 relative">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-indigo-900/10 to-purple-900/10 blur-[100px] -z-10" />
           
           <motion.div style={{ opacity, scale }} className="relative z-10">
              <h2 className="text-5xl md:text-8xl font-black mb-6 flex items-center justify-center gap-4">
                AutoMate 
                <span className="bg-white text-black rounded-lg px-4 py-1 text-5xl md:text-7xl shadow-[0_0_30px_rgba(255,255,255,0.5)]">S</span>
              </h2>
              <p className="text-2xl text-indigo-300 font-light tracking-wide">
                  不是智能体，而是<span className="text-pink-400">智能群落</span>。
              </p>
           </motion.div>

           <motion.div
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={fadeInUp}
             className="w-full max-w-5xl mx-auto aspect-video bg-black rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group"
           >
             {/* Dark Mode UI Showcase Placeholder */}
             <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-white/10 rounded-xl bg-zinc-900/50 backdrop-blur-xl p-6 shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-700">
                    <div className="flex gap-4 mb-8">
                        <div className="w-64 h-full bg-white/5 rounded-lg" />
                        <div className="flex-1 space-y-4">
                            <div className="h-8 w-1/3 bg-white/10 rounded" />
                            <div className="h-32 w-full bg-white/5 rounded" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-24 bg-white/5 rounded" />
                                <div className="h-24 bg-white/5 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
             </div>
           </motion.div>
        </section>

        {/* Footer / CTA */}
        <footer className="text-center pt-32 pb-16 space-y-20 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent -z-10" />
           
           <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
           >
              <motion.h3 variants={fadeInUp} className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-16">
                  用户的声音
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-left">
                 {[
                    { text: "AutoMate 彻底改变了我的工作流。", author: "Alex, Designer" },
                    { text: "我无法想象没有它的日子。", author: "Sarah, PM" },
                    { text: "这就是未来的样子。", author: "David, Dev" }
                 ].map((item, i) => (
                    <motion.div 
                        key={i} 
                        variants={fadeInUp}
                        whileHover={{ y: -5 }}
                        className="p-8 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors"
                    >
                       <p className="text-default-300 mb-6 font-light leading-relaxed">{item.text}</p>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500" />
                          <span className="text-sm font-medium text-white">{item.author}</span>
                       </div>
                    </motion.div>
                 ))}
              </div>

              <motion.div variants={fadeInUp} className="space-y-10">
                <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                    通用人工智能的曙光，<br />
                    从 <span className="text-purple-400">AutoMate</span> 开始。
                </h2>
                
                <Button 
                    size="lg" 
                    className="bg-white text-black px-12 py-8 text-xl rounded-full font-bold hover:bg-default-200 transition-all transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                    立即试用 AutoMate
                </Button>
              </motion.div>
           </motion.div>

           
        </footer>
      </div>
    </div>
  );
}
