"use client";

import { Button } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Surface } from "./Surface";
import { SectionHeader } from "./SectionHeader";

export const OneMoreThing = () => {
  const reduce = useReducedMotion();
  return (
    <section className="mt-20 sm:mt-28" aria-label="One more thing">
      <SectionHeader title="One more thing..." />
      <motion.div
        {...(reduce
          ? { initial: false, transition: { duration: 0 } }
          : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } })}
        viewport={{ once: true }}
      >
        <Surface className="p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2 text-left">
              <h3 className="text-2xl sm:text-3xl font-bold">
                不是一个 AI，是一群 AI 牛马
              </h3>
              <p className="text-white/70 max-w-prose">
                你可以雇几个 AI 牛马，各管一摊。也可以拉朋友和他们的 AI 一起进群干活。你管它们，它们也会主动提醒你。
              </p>
            </div>
            <Button as={Link} href="#voices" color="primary" radius="full" size="lg">
              看用户声音 →
            </Button>
          </div>
        </Surface>
      </motion.div>
    </section>
  );
};
