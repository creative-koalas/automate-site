"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "省心",
    desc: "无需指导，长时间连续工作，自主解决环境配置、API接入等问题。",
    icon: "🧠",
  },
  {
    title: "懂你",
    desc: "自研类脑记忆系统，在工作中持续进化，逐渐与你心有灵犀。",
    icon: "🫱🏻‍🫲🏽",
  },
  {
    title: "自然",
    desc: "人类级交互体验，会发飞书、发邮件，甚至能联系你的领导。",
    icon: "💬",
  },
  {
    title: "One more thing... AutoMate...s",
    desc: "不是一个AI，而是一群AI，加一群人。人管AI、AI管AI、AI管人类。",
    icon: "∞",
  },
];

export const Features = () => {
  return (
    <section id="features" className="mt-20 sm:mt-28">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-2xl sm:text-3xl font-semibold"
      >
        主打特性
      </motion.h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Card className="h-full bg-white/5 backdrop-blur border border-white/10">
              <CardHeader className="flex items-center gap-3">
                <div className="text-2xl">{f.icon}</div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
              </CardHeader>
              <CardBody>
                <p className="text-white/70 text-sm leading-6">{f.desc}</p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
