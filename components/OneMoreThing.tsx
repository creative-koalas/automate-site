"use client";

import { Card, CardBody, Button } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export const OneMoreThing = () => {
  const reduce = useReducedMotion();
  return (
    <section className="mt-20 sm:mt-28" aria-label="One more thing">
      <motion.div
        {...(reduce
          ? { initial: false, transition: { duration: 0 } }
          : { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } })}
        viewport={{ once: true }}
      >
        <Card className="bg-gradient-to-b from-white/10 to-white/5 border border-white/10 backdrop-blur shadow-xl">
          <CardBody className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-widest text-white/60">One more thing...</p>
              <h3 className="text-2xl sm:text-3xl font-bold">
                AutoMate...s 多智能体协作，让效率突飞猛进
              </h3>
              <p className="text-white/70 max-w-prose">
                不是一个 AI，而是一群 AI，加上一群人。人管 AI、AI 管 AI、AI 也能提醒人。
              </p>
            </div>
            <Button as={Link} href="#voices" color="primary" radius="full" size="lg">
              看用户声音 →
            </Button>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  );
};
