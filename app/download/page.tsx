"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DownloadPage() {
  const downloads = [
    {
      platform: "Windows",
      file: ".exe",
      requirement: "Windows 10及以上",
      url: "http://release.psygoai.com/release/windows/Psygo_Setup_latest.exe",
    },
    {
      platform: "Linux",
      file: ".deb",
      requirement: "Ubuntu/Debian",
      url: "http://release.psygoai.com/release/linux/psygo_latest_amd64.deb",
    },
  ];

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
              下载Psygo管理员App
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-3xl mx-auto mb-16 p-6 bg-[#fbfbfd] border border-[#d2d2d7] rounded-xl"
          >
            <p className="text-[#6e6e73] text-sm leading-relaxed">
              请注意，您所下载的Psygo App主要用于管理Psygo AI劳动力，而非一般意义上的"客户端App"。App提供基本的聊天软件功能，但<strong className="text-[#1d1d1f]">Psygo并非聊天机器人</strong>；我们建议您<strong className="text-[#1d1d1f]">仅将此App作为联络Psygo的工具</strong>，对于复杂任务的交付与协同，建议您与您的Psygo AI劳动力<strong className="text-[#1d1d1f]">使用gitee/传压缩包等人类常规工作方式</strong>。
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            {downloads.map((download, index) => (
              <motion.a
                key={download.platform}
                href={download.url}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center px-16 py-8 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-full text-3xl font-medium transition-colors duration-200 min-w-[280px]"
              >
                <span>{download.platform}</span>
                <span className="text-sm opacity-70 mt-2">
                  {download.requirement}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
