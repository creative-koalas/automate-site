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
        transition: { duration: fast ? 0.4 : 0.6 },
      };

  return (
    <section className="relative grid items-center gap-10 sm:grid-cols-2 md:min-h-screen md:snap-start">
      {/* Decorative blobs (hidden in blk variants) */}
      {variant === "default" && (
        <>
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.35),transparent_60%)] blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.35),transparent_60%)] blur-2xl" />
        </>
      )}

      <div className="space-y-6">
        {variant === "default" && (
          <motion.div {...common} viewport={{ once: true }} className="flex items-center gap-3">
            <Chip color="primary" variant="flat" size="sm" radius="sm" className="bg-white/10 text-white">
              Beta
            </Chip>
            <span className="text-white/60 text-sm">企业级 AI 劳动力平台</span>
          </motion.div>
        )}

        <motion.h1
          {...common}
          viewport={{ once: true }}
          className={
            variant === "default"
              ? "text-3xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-fuchsia-500 bg-clip-text text-transparent"
              : `${big ? "text-5xl sm:text-7xl" : "text-4xl sm:text-6xl"} font-extrabold tracking-tight text-white`
          }
        >
          让 AI 成为你的同事
        </motion.h1>
        <motion.p
          {...(reduce
            ? common
            : { initial: { opacity: 0, y: 10 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: 0.05, duration: fast ? 0.35 : 0.6 } })}
          viewport={{ once: true }}
          className={`text-base ${big ? "sm:text-xl" : "sm:text-lg"} ${variant === "default" ? "text-white/70" : "text-white/80"} max-w-prose`}
        >
          省心、懂你、自然。AutoMate...s 以群体智能与人机协同，让效率爆表。
        </motion.p>
        <div className="flex flex-wrap gap-3">
          <Button as={Link} href="#slide-ease" color="primary" radius="full" size={big ? "lg" : "md"}>
            了解特性
          </Button>
          <Button as={Link} href="#slide-voices" variant="bordered" radius="full" size={big ? "lg" : "md"} className="border-white/20 text-white">
            用户声音
          </Button>
          <Button as={Link} href="#contact" variant="light" radius="full" size={big ? "lg" : "md"} className="text-white/80">
            联系我们 →
          </Button>
        </div>
      </div>

      {/* Visual panel (blk2 hides to maximize contrast/speed) */}
      {variant !== "blk2" && (
        <motion.div
          {...(reduce
            ? { initial: false, transition: { duration: 0 } }
            : { initial: { opacity: 0, scale: 0.98 }, whileInView: { opacity: 1, scale: 1 }, transition: { duration: fast ? 0.4 : 0.6 } })}
          viewport={{ once: true }}
        >
          <Surface className="hidden sm:block p-0 overflow-hidden">
            <div className="relative aspect-video w-full rounded-brand">
              <Image
                src="/og.svg"
                alt="产品主视觉占位"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
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
