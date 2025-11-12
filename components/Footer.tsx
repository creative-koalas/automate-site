"use client";

import Link from "next/link";
import { Divider } from "@heroui/react";
import { Surface } from "./Surface";

export const Footer = () => {
  return (
    <footer id="contact" className="mt-24 border-t border-white/10 py-12 text-center text-white/70">
      <Divider className="mb-8 bg-white/10" />
      <div className="mx-auto max-w-6xl px-4">
        <Surface className="p-6">
          <nav aria-label="页脚导航" className="mb-4 flex items-center justify-center gap-6 text-sm">
            <Link href="#features" className="hover:text-white">特性</Link>
            <Link href="#voices" className="hover:text-white">用户声音</Link>
            <Link href="#top" className="hover:text-white">返回顶部</Link>
          </nav>
          <p>© {new Date().getFullYear()} AI劳动力. All rights reserved.</p>
        </Surface>
      </div>
    </footer>
  );
};
