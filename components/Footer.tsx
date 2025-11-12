"use client";

import Link from "next/link";

export const Footer = () => {
  return (
    <footer id="contact" className="mt-20 sm:mt-28 border-t border-white/10 py-10 text-center text-white/60">
      <nav aria-label="页脚导航" className="mb-4 flex items-center justify-center gap-6 text-sm">
        <Link href="#features" className="hover:text-white">特性</Link>
        <Link href="#voices" className="hover:text-white">用户声音</Link>
        <Link href="#top" className="hover:text-white">返回顶部</Link>
      </nav>
      <p>© {new Date().getFullYear()} AI劳动力. All rights reserved.</p>
    </footer>
  );
};
