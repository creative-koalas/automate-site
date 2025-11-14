"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/react";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-black/40 backdrop-blur supports-[backdrop-filter]:bg-black/30" role="banner">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
        <Link href="#top" className="flex items-center gap-2 text-white/90" aria-label="AI 劳动力 首页">
          <Image src="/logo.svg" alt="AI 劳动力 Logo" width={28} height={28} priority />
          <span className="font-semibold tracking-tight" aria-hidden>AI 劳动力</span>
        </Link>
        <nav className="hidden gap-6 text-sm text-white/70 sm:flex" aria-label="主导航">
          <Link href="#slide-ease" className="hover:text-white">特性</Link>
          <Link href="#video-title" className="hover:text-white">演示</Link>
          <Link href="#voices-title" className="hover:text-white">口碑</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button as={Link} href="#contact" color="primary" radius="full" size="sm" aria-label="立即体验">
            立即体验
          </Button>
        </div>
      </div>
    </header>
  );
}
