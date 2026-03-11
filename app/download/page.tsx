"use client";

import { motion } from "framer-motion";
import { PRODUCT_APP_NAME, PRODUCT_NAME } from "@/lib/brand";

type DownloadOption = {
  platform: string;
  requirement: string;
  note: string;
};

const downloads: DownloadOption[] = [
  {
    platform: "Windows",
    requirement: "Windows 11 及以上",
    note: "适用于 Windows 电脑",
  },
  {
    platform: "安卓手机",
    requirement: "安卓 10 及以上",
    note: "适用于大多数安卓手机",
  },
  {
    platform: "Linux",
    requirement: "Ubuntu / Debian",
    note: "适用于 Linux 电脑",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-[#ffffff] text-[#1d1d1f]">
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold mb-6">
              下载 {PRODUCT_APP_NAME}
            </h1>
            <p className="text-lg text-[#86868b]">
              安装包暂未开放下载，正式发布后统一开启。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-16 p-6 bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl"
          >
            <p className="text-[#6e6e73] text-sm leading-relaxed">
              请注意，您所下载的 {PRODUCT_APP_NAME} 主要用于管理 {PRODUCT_NAME} AI 劳动力，而非一般意义上的“客户端App”。App 提供基本的聊天软件功能，但<strong className="text-[#1d1d1f]">{PRODUCT_NAME} 并非聊天机器人</strong>；我们建议您<strong className="text-[#1d1d1f]">仅将此 App 作为联络 {PRODUCT_NAME} 的工具</strong>，对于复杂任务的交付与协同，建议您与您的 {PRODUCT_NAME} AI 劳动力<strong className="text-[#1d1d1f]">使用 gitee / 传压缩包等人类常规工作方式</strong>。
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#86868b]">
              当前页面仅展示首批支持的平台，下载入口将在公开发布时启用。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {downloads.map((download, index) => (
              <motion.button
                key={download.platform}
                disabled
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex min-h-[220px] flex-col justify-between rounded-[2rem] border border-[#d2d2d7] bg-[#f5f5f7] px-8 py-8 text-left text-[#1d1d1f] opacity-90"
              >
                <div>
                  <p className="text-sm text-[#86868b]">即将开放</p>
                  <p className="mt-4 text-3xl font-medium">{download.platform}</p>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-[#1d1d1f]">{download.note}</p>
                  <p className="mt-2 text-sm text-[#86868b]">
                    {download.requirement}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
