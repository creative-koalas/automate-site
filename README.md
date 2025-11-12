# AI劳动力 — 产品主页

技术栈：Next.js 16 (App Router, TS) + Tailwind CSS v4 + HeroUI v2 + Framer Motion + next-themes

开发
- 安装依赖：pnpm i
- 本地运行：pnpm dev
- 构建：pnpm build；预览：pnpm start

结构
- app/layout.tsx: 元数据、Provider
- app/page.tsx: 页面入口，拆分为 components/*
- components: NavBar, Hero, VideoSection, Features, Voices, Footer
- public/favicon.svg: 占位 favicon

占位替换清单
- Logo: /public/logo.svg 或在 NavBar 中替换 Image 源
- 视频: components/VideoSection.tsx 的 video src/poster
- 特性文案: components/Features.tsx 的 FEATURES 常量
- 用户声音: components/Voices.tsx 的 TESTIMONIALS 常量
- SEO: app/layout.tsx 的 metadata/openGraph/twitter/metadataBase、icons
- 品牌色: tailwind.config.ts 中 brand 颜色

推送脚本
- 设置环境变量：GIT_URL(远程仓库地址) REMOTE(默认origin) BRANCH(默认main)
- 执行：pnpm push

注意
- 默认深色科技风，已支持主题切换；动效已针对滚动进入与悬浮优化
- 部署推荐 Vercel；也可使用任意支持 Node 的平台
