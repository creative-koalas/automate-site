# 部署指南（Vercel CLI / Git 集成）

本文档说明如何使用 Vercel CLI 或 Git 集成部署本项目。

前置条件
- Node.js 20+，pnpm 10+
- 有效的 Vercel Token（个人空间或团队空间）。

CLI 部署（推荐给个人空间/Hobby）
1) 准备环境变量：复制 .env.example 为 .env，设置：
   - VERCEL_TOKEN=你的 token
   - VERCEL_PROJECT=automate-site（可改）
   - VERCEL_TEAM=团队 slug（个人空间留空）
2) 运行脚本：
   - 预览部署：bash scripts/vercel-deploy.sh
   - 生产部署：bash scripts/vercel-deploy.sh --prod
3) 如果遇到协作权限报错：在 Vercel 项目的 Settings → Members 中将部署者账号加入为 Collaborator。

Git 集成部署（推荐给团队/Pro）
1) 在 Vercel 控制台导入 GitHub 仓库 creative-koalas/automate-site。
2) 配置环境变量（如有）与构建命令（默认 next build）。
3) 开启 Preview/Production 自动部署。

常见问题
- 私有组织仓库 + Hobby 账号：无法直接绑定 Git 仓库，可使用 CLI 上传部署。
- 首次能成功、二次失败：需要将部署者加入 Vercel 项目协作者，或升级至合适的方案。
