"use client";

import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color:rgba(245,245,247,0.72)] backdrop-blur-2xl dark:bg-[color:rgba(11,11,15,0.68)]" role="banner">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="PsyGo 首页">
          <Image src="/logo.svg" alt="PsyGo Logo" width={22} height={22} priority />
          <div>
            <p className="font-semibold tracking-[-0.03em]">PsyGo</p>
            <p className="text-xs text-[var(--muted)]">AI 劳动力平台</p>
          </div>
        </Link>

        <nav aria-label="页面导航" className="hidden items-center gap-6 text-sm text-[var(--muted)] lg:flex">
          <a href="#capabilities" className="hover:text-[var(--foreground)]">
            能力
          </a>
          <a href="#scenarios" className="hover:text-[var(--foreground)]">
            场景
          </a>
          <a href="#video" className="hover:text-[var(--foreground)]">
            视频
          </a>
          <a href="#download" className="hover:text-[var(--foreground)]">
            下载
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="/PsyGo-download.txt" download className="apple-button">
            下载 PsyGo
          </a>
        </div>
      </div>
    </header>
  );
}
