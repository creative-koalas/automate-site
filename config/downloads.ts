export type DownloadPlatform = {
  id: string;
  title: string;
  format: string;
  description: string;
  note: string;
  href: string;
  ctaLabel: string;
  badge: string;
  accentClassName: string;
};

export const downloadPlatforms: DownloadPlatform[] = [
  {
    id: "android",
    title: "Android",
    format: "APK",
    description: "适合 Android 手机和平板，直接下载安装包即可开始使用。",
    note: "如果浏览器提示未知来源安装，请在系统设置中允许本次安装。",
    href: "https://psygoai.com/dist/app_release.apk",
    ctaLabel: "下载 Android 版",
    badge: "Mobile",
    accentClassName:
      "from-emerald-300/50 via-white/80 to-cyan-200/40 dark:from-emerald-400/14 dark:via-white/8 dark:to-cyan-400/10",
  },
  {
    id: "windows",
    title: "Windows",
    format: "EXE",
    description: "适合 Windows 桌面设备，下载后运行安装程序即可完成安装。",
    note: "建议使用 HTTPS 下载，避免浏览器将可执行文件识别为不安全下载。",
    href: "https://psygoai.com/dist/psygo_setup.exe",
    ctaLabel: "下载 Windows 版",
    badge: "Desktop",
    accentClassName:
      "from-sky-300/50 via-white/80 to-indigo-200/40 dark:from-sky-400/14 dark:via-white/8 dark:to-indigo-400/10",
  },
  {
    id: "linux",
    title: "Linux",
    format: "DEB",
    description: "适合 Ubuntu、Debian 及兼容发行版，下载安装包后可直接安装。",
    note: "如果你的系统不是 Debian 系，请告诉我，我可以再补对应发行版的安装包入口。",
    href: "https://psygoai.com/dist/psygo_amd64.deb",
    ctaLabel: "下载 Debian 版",
    badge: "Developer",
    accentClassName:
      "from-amber-300/50 via-white/80 to-orange-200/40 dark:from-amber-400/14 dark:via-white/8 dark:to-orange-400/10",
  },
  {
    id: "ios",
    title: "iOS / iPadOS",
    format: "App Store",
    description: "iPhone 和 iPad 请直接前往 App Store 搜索 PsyGo 下载。",
    note: "如果没有自动跳到结果页，请在 App Store 手动搜索 PsyGo。",
    href: "https://apps.apple.com/cn/search?term=PsyGo",
    ctaLabel: "前往 App Store",
    badge: "Store",
    accentClassName:
      "from-rose-300/50 via-white/80 to-fuchsia-200/40 dark:from-rose-400/14 dark:via-white/8 dark:to-fuchsia-400/10",
  },
];
