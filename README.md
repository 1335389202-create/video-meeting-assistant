# 视频会议助手 V3

> 商业级 B 端 SaaS 视频会议管理平台，支持全流程会议管理：会前准备、会中伴飞、会后跟进

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000.svg)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4.svg)](https://tailwindcss.com)
[![Deployed](https://img.shields.io/badge/Deployed-Live-brightgreen.svg)](https://5mhb9wjg29.coze.site)

## 🌐 在线演示

立即体验：**[视频会议助手 V3](https://5mhb9wjg29.coze.site)**

## 📋 项目简介

这是一个现代化的商业级视频会议管理单页应用（SPA），采用最新的技术栈构建，提供完整的会议全生命周期管理解决方案。

### ✨ 核心特性

- **工作台** - 快捷操作 + 统计卡片 + 今日日程 + 预定模板
- **会前准备** - 三Tab双轨制（待筹备/已就绪/受邀参加）+ 左列表右详情
- **会后跟进** - AI纪要 + 待办指派 + 截止日期提醒
- **文档库** - 知识库/纪要分类 + 网格卡片 + 防泄密水印
- **待办事项** - 全局任务列表 + 来源追踪 + 提醒徽章
- **会中伴飞** - 全屏模式 + AI语音转写 + Mark标记
- **效能洞察** - KPI指标 + 数据可视化 + ROI分析

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Next.js | 16.1.1 | React 框架，App Router |
| React | 19.2.3 | UI 库 |
| TypeScript | 5.x | 类型安全 |
| Tailwind CSS | 4 | 原子化 CSS |
| shadcn/ui | latest | 组件库（基于 Radix UI） |
| Lucide React | latest | 图标库 |
| Recharts | 2.15.4 | 图表库 |
| React Hook Form | 7.70.0 | 表单管理 |
| Zod | 4.3.5 | 数据验证 |

## 📁 项目结构

```
src/
├── app/
│   ├── globals.css          # 全局样式 + 主题变量
│   ├── layout.tsx           # 根布局组件
│   └── page.tsx             # 主页面（状态路由 + 会中伴飞全屏）
├── components/
│   ├── ui/                  # shadcn/ui 基础组件
│   ├── sidebar.tsx          # 左侧导航栏（响应式）
│   ├── header.tsx           # 顶部栏（AI 检索 + 时间）
│   ├── dashboard.tsx        # 工作台
│   ├── pre-meeting.tsx      # 会前准备
│   ├── post-meeting.tsx     # 会后跟进
│   ├── document-library.tsx # 文档库
│   ├── todo-list.tsx        # 待办事项
│   ├── in-meeting.tsx       # 会中伴飞
│   ├── analytics.tsx        # 效能洞察
│   ├── modal.tsx            # 通用弹窗
│   └── watermark.tsx        # 防泄密水印
└── lib/
    ├── utils.ts             # 工具函数
    └── mock-data.ts         # Mock 数据
```

## 🚀 快速开始

### 环境要求

- Node.js 18+
- pnpm 9+

### 安装依赖

```bash
# 使用 pnpm 安装依赖（项目已配置仅允许 pnpm）
pnpm install
```

### 开发模式

```bash
pnpm dev
```

打开浏览器访问 [http://localhost:5000](http://localhost:5000)

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务

```bash
pnpm start
```

### 代码检查

```bash
# TypeScript 类型检查
pnpm ts-check

# ESLint 检查
pnpm lint

# 完整验证（类型 + Lint）
pnpm validate
```

## 🎨 设计规范

- **主色调**：#2563EB（科技蓝）
- **背景色**：#F8FAFC
- **卡片设计**：圆角 XL + 阴影 + 边框
- **响应式**：支持移动端到桌面端自适应
- **字体**：Inter + 系统中文字体

详见 [DESIGN.md](./DESIGN.md)

## 📊 数据模型

### Meeting（会议）
```typescript
interface Meeting {
  id: string;
  title: string;
  currentUserRole: 'organizer' | 'participant';
  prepStatus: 'ready' | 'pending';
  // ...
}
```

### Task（任务）
```typescript
interface Task {
  id: string;
  title: string;
  meetingTitle: string; // 来源追踪
  reminderPlatform: 'feishu' | 'dingtalk' | 'none';
  // ...
}
```

## 📝 开发指南

### 组件开发

优先使用 shadcn/ui 组件：

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
```

### 路径别名

使用 `@/` 前缀导入模块：

```tsx
import { utils } from '@/lib/utils';
import { Sidebar } from '@/components/sidebar';
```

### 样式开发

使用 Tailwind CSS 原子化类名：

```tsx
<div className="flex items-center gap-4 p-4 rounded-lg bg-background">
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题，请通过 Issue 联系。

---

**Made with ❤️ using Next.js + shadcn/ui + Tailwind CSS**
