"use client";

import { motion } from "framer-motion";

export const VideoSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative mt-10"
    >
      <div className="aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
        <video
          className="h-full w-full object-cover"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          controls
          poster="/vercel.svg"
        />
      </div>
    </motion.section>
  );
};
