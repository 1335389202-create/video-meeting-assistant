# Coze 部署指南

本指南将帮助你了解视频会议助手项目在 Coze 平台上的部署方式。

## 🌐 在线体验

项目已成功部署到 Coze 平台：

**访问地址**：https://5mhb9wjg29.coze.site

---

## 📦 Coze 部署流程

### 1. 在 Coze 上创建项目

1. 访问 [Coze](https://coze.com) 并登录
2. 创建新的 Next.js 项目
3. 或导入已有项目到 Coze

### 2. Coze IDE 开发

- 使用 Coze 提供的在线 IDE 进行开发
- 实时预览修改效果
- 内置代码检查和格式化工具

### 3. 自动化部署

Coze 提供自动化 CI/CD 流程：

- 代码提交后自动触发构建
- 构建成功后自动部署
- 分配 coze.site 域名
- 支持自定义域名（可选）

### 4. 访问部署后的应用

部署成功后，你会获得一个类似 `https://xxx.coze.site` 的域名。

---

## 📁 推送到 GitHub（作为作品集）

虽然项目部署在 Coze 上，但你可以将代码推送到 GitHub 作为作品集展示：

### 1. 在 GitHub 创建新仓库

1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角的 "+" → "New repository"
3. 填写仓库名称：`video-meeting-assistant`
4. 选择 Public（推荐用于作品集）
5. **不要**初始化 README、.gitignore 或 LICENSE（我们已经有了）
6. 点击 "Create repository"

### 2. 关联远程仓库

```bash
# 替换为你的 GitHub 用户名和仓库名
git remote add origin https://github.com/你的用户名/video-meeting-assistant.git

# 推送代码到 main 分支
git branch -M main
git push -u origin main
```

---

## 🔄 Coze + GitHub 工作流

推荐的开发流程：

1. 在 Coze IDE 中开发功能
2. 测试通过后，在 Coze 中提交代码
3. Coze 自动部署到生产环境
4. 同时将代码推送到 GitHub 作为作品集

---

## 💻 本地开发（可选）

如果你想在本地运行项目进行开发：

```bash
# 克隆代码（如果从 GitHub 克隆）
git clone https://github.com/你的用户名/video-meeting-assistant.git
cd video-meeting-assistant

# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务
pnpm start
```

---

## 📝 GitHub 仓库最佳实践

### 添加 Topics

在 GitHub 仓库页面，添加以下 Topics 让项目更容易被发现：
- `nextjs`
- `react`
- `typescript`
- `tailwindcss`
- `video-conference`
- `saas`
- `coze`

### 添加 Social Preview

1. 进入仓库 Settings
2. 找到 "Social preview"
3. 上传项目截图或设计一个 Logo

### 在 README 中添加部署链接

在 README 开头添加 Coze 部署链接，方便他人直接体验。

---

## 🎓 作品集展示建议

1. **README 开头**：添加 Coze 部署链接，让访问者可以直接体验
2. **功能演示**：使用 Loom 或类似工具录制演示视频
3. **技术亮点**：突出展示使用的技术栈和 Coze 平台
4. **项目说明**：说明这是在 Coze 上开发和部署的项目

---

## 📊 项目展示亮点

- ✅ 完整的 B 端 SaaS 应用
- ✅ 在 Coze 平台上开发和部署
- ✅ 专业的 PRD 文档风格 README
- ✅ 全流程会议管理功能
- ✅ 响应式设计，支持移动端
- ✅ 代码规范，结构清晰

---

祝项目展示顺利！🎉
