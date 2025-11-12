"use client";

import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { CORE_FEATURES } from "./data/features";

export const Features = () => {
  const reduce = useReducedMotion();
  return (
    <section className="mt-20 sm:mt-28" aria-labelledby="features-title">
      <SectionHeader id="features-title" title="主打特性" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CORE_FEATURES.map((f, i) => (
          <motion.div
            key={f.key}
            {...(reduce
              ? { initial: false, transition: { duration: 0 } }
              : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: i * 0.05, duration: 0.5 } })}
            viewport={{ once: true }}
            whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
          >
            <Card className={`h-full rounded-brand backdrop-blur border border-white/10 transition-transform shadow-md hover:shadow-xl hover:border-white/20 bg-white/5`}>
              <CardHeader className="flex items-center gap-3">
                <div className="text-2xl h-10 w-10 grid place-items-center rounded-full bg白/10" aria-hidden>
                  {f.icon}
                </div>
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
