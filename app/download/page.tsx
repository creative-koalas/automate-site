import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { downloadPlatforms } from "@/config/downloads";

export const metadata: Metadata = {
  title: "下载 PsyGo",
  description: "按设备平台下载 PsyGo，支持 Android、Windows 和 Linux。",
  alternates: {
    canonical: "/download.html",
  },
};

const platformChipLabel: Record<string, string> = {
  android: "Android",
  windows: "Windows",
  linux: "Linux",
};

export default function DownloadPage() {
  const visiblePlatforms = downloadPlatforms.filter((platform) => platform.id !== "ios");

  return (
    <main
      id="main-content"
      className="mx-auto max-w-6xl px-5 pb-24 pt-[calc(var(--header-h)+1.4rem)] sm:px-8 sm:pb-32 sm:pt-[calc(var(--header-h)+2rem)]"
    >
      <section className="relative flex min-h-[calc(100svh-var(--header-h)-7rem)] items-center pt-6 sm:min-h-[calc(100svh-var(--header-h)-8rem)] sm:pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[4rem] -z-10 mx-auto h-64 max-w-3xl rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.92),rgba(255,255,255,0))] opacity-90 dark:bg-[radial-gradient(circle,rgba(255,255,255,0.08),rgba(255,255,255,0))]"
        />

        <div className="mx-auto w-full max-w-4xl text-center">
          <span className="eyebrow">PsyGo / Download</span>
          <h1 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold tracking-[-0.06em] sm:text-6xl lg:text-[4.8rem] lg:leading-[0.96]">
            下载适用于你的设备的
            <br />
            PsyGo
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
            支持 Android、Windows 和 Linux。
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {visiblePlatforms.map((platform) => (
              <a
                key={platform.id}
                href={platform.href}
                target="_blank"
                rel="noreferrer"
                className="group relative overflow-hidden rounded-[30px] border border-[var(--line)] bg-[color:var(--surface-1)] px-5 py-7 text-center shadow-[var(--shadow-soft)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[0_22px_54px_rgba(15,23,42,0.1)]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.92),transparent)] opacity-90"
                />
                <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {platformChipLabel[platform.id] ?? platform.title}
                </h2>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  {platform.format}
                </p>
                <div className="mt-6 inline-flex min-w-[152px] items-center justify-center rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--brand)] transition-colors duration-200 group-hover:bg-[var(--accent)] group-hover:text-white">
                  {platform.ctaLabel}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="apple-button-secondary min-w-[180px]">
              返回首页
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-20 sm:mt-28">
        <Footer />
      </div>
    </main>
  );
}
