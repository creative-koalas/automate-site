"use client";

import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export const Hero = () => {
  const reduce = useReducedMotion();
  const common = reduce
    ? { initial: false, whileInView: undefined, transition: { duration: 0 } }
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

  return (
    <section className="relative grid items-center gap-10 sm:grid-cols-2">
      {/* Decorative gradient blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_60%)] blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.35),transparent_60%)] blur-2xl" />

      <div className="space-y-6">
        <motion.div {...common} viewport={{ once: true }} className="flex items-center gap-3">
          <Chip color="primary" variant="flat" size="sm" radius="sm" className="bg-white/10 text-white">
            Beta
          </Chip>
          <span className="text-white/60 text-sm">企业级 AI 劳动力平台</span>
        </motion.div>

        <motion.h1
          {...common}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent"
        >
          让 AI 成为你的同事
        </motion.h1>
        <motion.p
          {...(reduce
            ? common
            : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.1, duration: 0.6 } })}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-white/70 max-w-prose"
        >
          省心、懂你、自然。AutoMate...s 以群体智能与人机协同，让效率爆表。
        </motion.p>
        <div className="flex flex-wrap gap-3">
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
          <Button as={Link} href="#contact" variant="light" radius="full" size="lg" className="text-white/80">
            联系我们 →
          </Button>
        </div>
      </div>

      {/* Visual panel placeholder */}
      <motion.div
        {...(reduce
          ? { initial: false, transition: { duration: 0 } }
          : { initial: { opacity: 0, scale: 0.98 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: 0.6 } })}
        viewport={{ once: true }}
        className="hidden sm:block rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-6 shadow-2xl"
        aria-hidden
      >
        <div className="aspect-video w-full rounded-xl bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.12))]" />
      </motion.div>
    </section>
  );
};
