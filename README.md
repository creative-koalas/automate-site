# AI劳动力 — 产品主页

技术栈：Next.js 16 (App Router, TS) + Tailwind CSS v4 + HeroUI v2 + Framer Motion + next-themes

开发
- 安装依赖：pnpm i
- 本地运行：pnpm dev
- 构建：pnpm build；预览：pnpm preview

测试
- 单元测试：pnpm test（Vitest + Testing Library；已含 jsdom polyfills 与路径别名）
- 端到端测试：先执行 pnpm preview，再执行 pnpm test:e2e（或在 CI 中自动执行）

结构
- app/layout.tsx: 元数据、Provider、JSON-LD、manifest 链接
- app/page.tsx: 页面入口，拆分为 components/*
- app/robots.ts, app/sitemap.ts, app/manifest.ts, app/not-found.tsx
- components: NavBar, Hero, VideoSection, Features, Voices, Footer, JsonLd, ThemeToggle
- public: favicon.svg, logo.svg, og.svg

占位替换清单
- Logo: /public/logo.svg 或 NavBar 中 Image 源
- 视频: components/VideoSection.tsx 的 src/poster
- 特性文案: components/Features.tsx 的 FEATURES 常量
- 用户声音: components/Voices.tsx 的 TESTIMONIALS 常量
- SEO: app/layout.tsx 的 metadata/OG/Twitter/canonical；robots/sitemap/manifest 基础域名
- 品牌色: tailwind.config.ts 中 brand 颜色

推送脚本
- 复制 .env.example 为 .env，设置：GIT_URL、REMOTE(默认origin)、BRANCH(默认main)
- 执行：pnpm push

注意
- 已实现移动端抽屉导航、Skip Link、焦点可达、对比度与悬浮微动效；支持 prefers-reduced-motion
- 推荐部署：Vercel（自动预览/环境变量/域名）
