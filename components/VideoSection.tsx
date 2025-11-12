"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const VideoSection = () => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
          ref={ref}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          muted
          playsInline
          loop
          controls
          preload="metadata"
          poster="/og.svg"
          aria-label="产品演示视频（占位）"
          onLoadedData={() => setLoaded(true)}
        />
      </div>
    </motion.section>
  );
};
