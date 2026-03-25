"use client";

import clsx from "clsx";
import { motion, useReducedMotion } from "framer-motion";

export const SectionHeader = ({
  id,
  title,
  eyebrow,
  description,
  align = "left",
}: {
  id?: string;
  title: string;
  eyebrow?: string;
  description?: string;
  align?: "left" | "center";
}) => {
  const reduce = useReducedMotion();
  return (
    <div className={clsx("mb-8 space-y-4", align === "center" && "text-center")}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <motion.h2
        id={id}
        {...(reduce
          ? { initial: false, transition: { duration: 0 } }
          : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.55 } })}
        viewport={{ once: true }}
        className="text-3xl font-semibold tracking-[-0.04em] sm:text-5xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <p className={clsx("max-w-3xl text-base leading-7 text-[var(--muted)] sm:text-lg", align === "center" && "mx-auto")}>
          {description}
        </p>
      ) : null}
    </div>
  );
};
