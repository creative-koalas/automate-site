"use client";

import { motion, useReducedMotion } from "framer-motion";

export const SectionHeader = ({ title }: { title: string }) => {
  const reduce = useReducedMotion();
  return (
    <motion.h2
      {...(reduce
        ? { initial: false, transition: { duration: 0 } }
        : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } })}
      viewport={{ once: true }}
      className="mb-8 text-2xl sm:text-3xl font-semibold"
    >
      {title}
    </motion.h2>
  );
};
