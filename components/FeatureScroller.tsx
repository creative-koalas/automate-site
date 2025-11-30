"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CORE_FEATURES } from "./data/features";
import { Hero } from "./Hero";
import { VideoSection } from "./VideoSection";
import { Voices } from "./Voices";
import { Footer } from "./Footer";

export const FeatureScroller = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="immersive"
      aria-label="产品海报"
      className="relative mx-auto max-w-7xl px-6 sm:px-8 py-16 sm:py-20 space-y-16 sm:space-y-20"
    >
      <div className="mx-auto w-full">
        <Hero />
      </div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
        {CORE_FEATURES.map((f, i) => (
          <motion.div
            key={f.key}
            initial={reduce ? undefined : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reduce ? { duration: 0 } : { duration: 0.35, delay: i * 0.05 }}
            className="rounded-brand border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
          >
            <div className="mx-auto h-14 w-14 sm:h-16 sm:w-16 grid place-items-center rounded-full bg-white/10 ring-1 ring-white/15 text-3xl" aria-hidden>
              {f.icon}
            </div>
            <h3 className="mt-4 text-2xl font-bold text-white">{f.title}</h3>
            <p className="mt-2 text-white/75 leading-7">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto w-full">
        <VideoSection />
      </div>

      <div className="mx-auto w-full">
        <Voices />
      </div>

      <div className="mx-auto w-full">
        <Footer />
      </div>
    </section>
  );
};
