"use client";

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "某行业客户 A",
    title: "CTO",
    quote: "接入后，让 AI 和同事一起排班，自动抄送、自动汇报，周转从天到小时。",
  },
  {
    name: "某行业客户 B",
    title: "运营总监",
    quote: "复杂流程全链路自动化，跨系统拉通，人工占比下降 60%+。",
  },
  {
    name: "某行业客户 C",
    title: "技术负责人",
    quote: "AutoMate...s 的多智能体协同带来了质的提升。",
  },
];

export const Voices = () => {
  return (
    <section id="voices" className="mt-20 sm:mt-28">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-2xl sm:text-3xl font-semibold"
      >
        用户声音
      </motion.h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
          >
            <Card className="bg-white/5 backdrop-blur border border-white/10">
              <CardBody className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-white/10" />
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-white/60">{t.title}</p>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-6">“{t.quote}”</p>
              </CardBody>
            </Card>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
};
