"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="grid items-center gap-8 sm:grid-cols-2">
      <div className="space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold tracking-tight"
        >
          让 AI 成为你的同事
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-base sm:text-lg text-white/70"
        >
          省心、懂你、自然。AutoMate...s 以群体智能与人机协同，让效率爆表。
        </motion.p>
        <div className="flex gap-3">
          <Button as={Link} href="#features" color="primary" radius="full" size="lg">
            了解特性
          </Button>
          <Button
            as={Link}
            href="#voices"
            variant="bordered"
            radius="full"
            size="lg"
            className="border-white/20 text-white"
          >
            用户声音
          </Button>
        </div>
      </div>
    </section>
  );
};
