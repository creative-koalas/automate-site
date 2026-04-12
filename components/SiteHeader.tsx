"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "@/static/logo.png";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color:rgba(251,251,253,0.82)] backdrop-blur-2xl dark:bg-[color:rgba(11,11,15,0.72)]" role="banner">
      <div className="mx-auto flex h-[66px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="PsyGo 首页">
          <Image
            src={logoImage}
            alt="PsyGo Logo"
            width={30}
            height={30}
            priority
            className="h-[30px] w-[30px] rounded-[9px] object-cover"
          />
          <div>
            <p className="font-semibold tracking-[-0.03em]">PsyGo</p>
            <p className="text-xs text-[var(--muted)]">AI 劳动力平台</p>
          </div>
        </Link>

        <nav aria-label="页面导航" className="hidden items-center gap-7 text-[13px] text-[var(--muted)] lg:flex">
          <a href="#capabilities" className="hover:text-[var(--foreground)]">
            能力
          </a>
          <a href="#scenarios" className="hover:text-[var(--foreground)]">
            场景
          </a>
          <a href="/download.html" className="hover:text-[var(--foreground)]">
            下载
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a href="/download.html" className="apple-button px-4 py-2 text-sm">
            下载 PsyGo
          </a>
        </div>
      </div>
    </header>
  );
}
