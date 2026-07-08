# GitHub 部署指南

本指南将帮助你将视频会议助手项目部署到 GitHub 并进行托管。

## 📦 推送到 GitHub

### 1. 在 GitHub 创建新仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" → "New repository"
3. 填写仓库名称（如 `video-meeting-assistant`）
4. 选择 Public 或 Private（推荐 Public 作为作品集）
5. **不要**初始化 README、.gitignore 或 LICENSE（我们已经有了）
6. 点击 "Create repository"

### 2. 关联远程仓库

```bash
# 替换为你的 GitHub 用户名和仓库名
git remote add origin https://github.com/你的用户名/video-meeting-assistant.git

# 推送代码到 main 分支（或 master）
git branch -M main
git push -u origin main
```

## 🚀 部署到 Vercel（推荐）

Vercel 是部署 Next.js 应用最简单的方式，由 Next.js 官方维护。

### 方法一：通过 Vercel Dashboard 部署

1. 访问 [vercel.com](https://vercel.com) 并使用 GitHub 账号登录
2. 点击 "Add New" → "Project"
3. 选择你的 `video-meeting-assistant` 仓库
4. 配置项目设置（保持默认即可）
5. 点击 "Deploy"

部署完成后，你会获得一个类似 `https://video-meeting-assistant.vercel.app` 的链接。

### 方法二：通过 Vercel CLI 部署

```bash
# 全局安装 Vercel CLI
npm install -g vercel

# 登录并部署
vercel
```

## 🌐 部署到 Netlify

Netlify 也是一个很好的选择，提供免费额度。

1. 访问 [netlify.com](https://netlify.com) 并登录
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub 并授权
4. 选择你的仓库
5. 配置构建命令：`pnpm build`
6. 配置发布目录：`.next`
7. 点击 "Deploy site"

## 🐳 Docker 部署（可选）

如果你想要使用 Docker 部署，可以创建一个 `Dockerfile`：

```dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

# 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# 生产环境
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## 📝 仓库最佳实践

### 添加 Topics

在 GitHub 仓库页面，添加以下 Topics 让项目更容易被发现：
- `nextjs`
- `react`
- `typescript`
- `tailwindcss`
- `video-conference`
- `saas`

### 添加 Social Preview

1. 进入仓库 Settings
2. 找到 "Social preview"
3. 上传项目截图或设计一个 Logo

### 创建 Wiki（可选）

在仓库 Wiki 中添加更详细的文档。

## 🔄 持续更新

推送新代码到 GitHub：

```bash
git add .
git commit -m "描述你的更新"
git push
```

Vercel/Netlify 会自动检测到更新并重新部署。

## 📊 GitHub 仓库统计

- 使用 [Star History](https://star-history.com) 追踪 Star 增长
- 开启 GitHub Insights 查看访问统计

## 🎓 作品集展示建议

1. **README 开头**：添加项目截图或 Demo GIF
2. **功能演示**：使用 Loom 或类似工具录制演示视频
3. **技术亮点**：突出显示你使用的先进技术
4. **个人信息**：在 README 末尾添加你的联系方式

---

祝部署顺利！🎉
