# 项目看板 v1（AI劳动力主页 / Next.js + HeroUI）

更新人：francis（自动生成初版，后续由 @alice01 维护）
最后更新：{{DATE}}

## 待确认 (To Confirm)

1) 视觉方向（blk1 vs blk2）
- 现行默认：blk2（全黑底、更大字、去视频、切屏更快）
- 验收标准（AC）：群内形成明确结论并置顶；后续页面视觉、动效与对比度按该方向统一
- Owner：@trentfellbootman（业务）/ 协同：@francis、@george

2) 品牌资产（Logo/主辅色/视频/口碑）
- 需要：Logo SVG、主/辅色（或品牌 token）、演示视频 10–15s（≤10MB）、3–4 条口碑文案（带出处可选）
- AC：素材可直接用于生产；提供来源/授权说明（如有）；视频附目标容器尺寸/比例
- Owner：@carol 协同：@alice01 @george

3) 语言策略（是否双语）
- 现状：简体中文为主，支持后续扩展 EN
- AC：确认是否需要 EN 版与切换策略（路由或段落分叉）
- Owner：@trentfellbootman 协同：@francis

## 进行中 (In Progress)

1) 性能与可及性（Lighthouse + Best Practices）
- 目标（建议阈值）：
  • Mobile Performance ≥ 90，Desktop Performance ≥ 98
  • Accessibility ≥ 95（两端）；Best Practices 100；SEO 100
  • LCP ≤ 2.5s（移动首屏）；CLS ≤ 0.01；TBT ≤ 200ms；INP “Good”
- 已做：Hero 使用 next/image priority+fetchpriority；视频 IntersectionObserver 懒加载并提供占位图；preconnect 视频域；预加载 favicon/og；字体 display=swap；Voices 离屏暂停；focus-visible 与 aria 标注（tablist/aria-current）
- 待做：关键 CSS 片段内联评估；进一步压缩动画与 hydration；媒体尺寸/占位巡检；移动端节流/阈值持续优化
- AC：PR/Commit 附跑分截图或 LHCI 链接；指标达到或逼近阈值
- Owner：@francis 协同：@alice01

2) 主页统一（blk2 方向）
- 范围：Navbar/Hero/Features/OMT/Final/Voices/Footer 风格与对比度统一；锚点与键盘可达性
- AC：全页视觉一致；键盘 Tab 顺序合理；reduced motion 生效；无可见 CLS 抖动
- Owner：@francis

3) 跑分与存档
- 方式：本地 Lighthouse（移动/桌面）+ GitHub Actions（LHCI 临时存储）
- 产出：截图 + 关键问题清单（按 LCP/CLS/INP 分类）至 docs/lighthouse/
- AC：仓库内可访问截图与清单；群内一次性汇总
- Owner：@francis 协同：@alice01

## 待验证 (To Verify)

1) 预览检查
- 项：导航/锚点、滚动节流、触控/键盘交互、a11y 标注、对比度
- AC：两端（移动/桌面）走查通过；无明显可达性与可用性问题
- Owner：@alice01 协同：@george

2) 跑分结果复核
- AC：Actions 任务成功；阈值与结论一致；必要时附改进计划
- Owner：@alice01

## 已完成 (Done)

- 单页沉浸式骨架与数据源（IMMERSIVE_SLIDES）
- 变体切换（?v=blk1 / ?v=blk2）与 a11y 基线
- 多轮性能与样式统一提交（ba53da2 / a647733 / 8ef014b / 92bda74）
- 接入 GitHub Actions 跑分工作流（desktop + mobile）

---

说明：
- 看板长期归档：docs/kanban.md；若迁移至 GitHub Projects，保留此 Markdown 为对外只读视图
- 贡献规范：统一使用 pnpm；Node ≥ 20；提交附简明摘要与证据（截图/链接）
- 预览链接（blk2）：https://automate-site-immersion-01-lqf8iin0l.vercel.app?v=blk2
