"use client";

import { Button, Chip } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Surface } from "./Surface";

export const Hero = ({ variant = "default" }: { variant?: "default" | "blk1" | "blk2" }) => {
  const reduce = useReducedMotion();
  const fast = variant !== "default";
  const big = variant === "blk2";
  const common = reduce
    ? { initial: false, whileInView: undefined, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: fast ? 0.35 : 0.55 },
      };

  return (
    <section className="relative grid items-center gap-10 lg:grid-cols-12 md:min-h-screen md:snap-start px-6 sm:px-8 py-24 sm:py-28 max-w-7xl mx-auto">
      {variant === "default" && (
        <>
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_60%)] blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.35),transparent_60%)] blur-2xl" />
        </>
      )}

      {/* Left: Copy */}
      <div className="space-y-6 w-full max-w-3xl mx-auto sm:mx-0 text-center sm:text-left lg:col-span-7">
        {variant === "default" && (
          <motion.div {...common} viewport={{ once: true }} className="flex items-center gap-3 justify-center sm:justify-start">
            <Chip color="primary" variant="flat" size="sm" radius="sm" className="bg-white/10 text-white">Beta</Chip>
            <span className="text-white/60 text-sm">企业级 AI 劳动力平台</span>
          </motion.div>
        )}

        <motion.h1
          {...common}
          viewport={{ once: true }}
          className={
            variant === "default"
              ? "text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent"
              : `${big ? "text-5xl sm:text-7xl" : "text-4xl sm:text-6xl"} font-extrabold tracking-tight leading-tight text-white`
          }
        >
          即插即用的 AI 劳动力，立刻为你开工
        </motion.h1>
        <motion.p
          {...(reduce
            ? common
            : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.05, duration: fast ? 0.3 : 0.5 } })}
          viewport={{ once: true }}
          className={`text-base ${big ? "sm:text-xl" : "sm:text-lg"} ${variant === "default" ? "text-white/70" : "text-white/80"} max-w-prose mx-auto sm:mx-0`}
        >
          面向产品/工程/运营的一体化自动化与协作，支持多智能体并行、可审计与人机共创。
        </motion.p>
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          <Button as={Link} href="#contact" color="primary" radius="full" size={big ? "lg" : "md"}>立即体验</Button>
          <Button as={Link} href="#contact" variant="bordered" radius="full" size={big ? "lg" : "md"} className="border-white/20 text-white">免费试用</Button>
          <Button as={Link} href="#slide-ease" variant="light" radius="full" size={big ? "lg" : "md"} className="text-white/80">了解特性</Button>
        </div>
      </div>

      {/* Right: Visual (poster on desktop), hidden for blk2 for speed */}
      {variant !== "blk2" && (
        <motion.div
          {...(reduce
            ? { initial: false, transition: { duration: 0 } }
            : { initial: { opacity: 0, scale: 0.98 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: fast ? 0.35 : 0.55 } })}
          viewport={{ once: true }}
          className="hidden lg:block lg:col-span-5"
        >
          <Surface className="p-0 overflow-hidden">
            <div className="relative aspect-video w-full rounded-brand">
              <Image
                src="/og.svg"
                alt="产品主视觉占位"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-contain"
                priority
                fetchPriority="high"
              />
            </div>
          </Surface>
        </motion.div>
      )}
    </section>
  );
};
