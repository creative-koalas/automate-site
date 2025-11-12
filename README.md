# AI劳动力 — 产品主页

技术栈：Next.js 16 (App Router, TS) + Tailwind CSS v4 + HeroUI v2 + Framer Motion + next-themes

开发
- 安装依赖：pnpm i
- 本地运行：pnpm dev
- 构建：pnpm build；预览：pnpm preview

测试
- 单元测试：pnpm test（Vitest + Testing Library；已含 jsdom polyfills 与路径别名）
- 端到端测试（本地）：
  1) 安装浏览器：npx playwright install --with-deps chromium
  2) 启动预览：pnpm preview（另一个窗口）
  3) 运行：pnpm test:e2e
- 端到端测试（CI）：自动在 GitHub Actions 中执行

部署
- Vercel CLI（个人空间/Hobby 适用）：
  export VERCEL_TOKEN=...; npx vercel --yes --name automate-site --token $VERCEL_TOKEN
  预览部署：可使用不同 name 作为临时项目（不绑定 Git），生成独立的预览域名
  再次部署生产可使用：npx vercel --prod --token $VERCEL_TOKEN（若报权限需将提交者加入项目或改用 Git 集成）
- Vercel Git 集成（推荐）：在 Vercel 连接 GitHub 仓库 creative-koalas/automate-site，开启自动预览与生产部署
- GitHub PAT 推送：PAT 需包含 workflow scope 才能推送 .github/workflows/**

结构
- app/layout.tsx: 元数据、Provider、JSON-LD、manifest 链接
- app/page.tsx: 页面入口，拆分为 components/*；附 BackToTop 与 #top 锚点
- app/robots.ts, app/sitemap.ts, app/manifest.ts, app/not-found.tsx
- components: NavBar(ScrollSpy 高亮), Hero, VideoSection(Skeleton/错误 fallback/aria-busy), Features, Voices(水平滚动), Footer, JsonLd, ThemeToggle, BackToTop
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
- 已实现移动端抽屉导航、Skip Link、焦点可达、对比度与悬浮微动效；支持 prefers-reduced-motion；导航自动高亮当前锚点；支持返回顶部按钮
- E2E 覆盖：锚点跳转、移动端菜单、响应式、Voices 横向滚动、视频失败 fallback、nav 高亮、返回顶部、CTA 跳转
- 推荐部署：Vercel（自动预览/环境变量/域名）
