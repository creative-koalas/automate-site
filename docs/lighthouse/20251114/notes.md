# Lighthouse 报告（2025-11-14）

预览：https://automate-site-immersion-01-lqf8iin0l.vercel.app?v=blk2

目标阈值（当前阶段）
- Desktop ≥ 95 / Mobile ≥ 90
- LCP < 2.5s（移动优先）；CLS < 0.10；INP < 200ms；TBT < 200ms

结果概览（本机初测，正式截图见同目录图片）
- Mobile: Performance ~90+ / Accessibility ~95+ / Best Practices 100 / SEO 100
- Desktop: Performance ~98+ / Accessibility ~97+ / Best Practices 100 / SEO 100

主要问题与快赢项
1) LCP（Hero）
- Hero 图像已用 next/image + priority + fetchpriority=high；保留视频时确保 poster/占位与 preconnect；考虑内联关键 CSS 片段
- 检查首屏字体与资源加载顺序（display=swap 已启用），必要时预加载关键字体
2) CLS
- 媒体/组件统一稳定尺寸与容器约束（已做 poster/容器，继续巡检）
3) INP/TBT
- 减少首屏动画与 hydration 体积；移动端对重动画降级；滚动节流与阈值已收紧

改动摘要（已合入）
- Hero 改为 next/image（priority + fetchpriority=high）
- 视频区懒加载（IntersectionObserver），未入视口前显示占位图
- 预连接视频域、预加载首屏静态资源、字体 display=swap
- focus-visible 基线；a11y 语义补充（tablist/aria-current）

后续计划
- 进一步压 LCP/CLS/INP：内联关键 CSS 评估、媒体占位巡检、动画降级
- CI 解锁后补跑 desktop+mobile，并入库链接
