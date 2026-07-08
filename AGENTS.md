# AGENTS.md - 视频会议助手 V3

## 项目概览
商业级 B 端 SaaS 视频会议管理 SPA，支持工作台、会前准备、会后跟进、文档库、待办事项、效能洞察、会中伴飞七大模块。

## 技术栈
- Next.js 16 (App Router) + React 19 + TypeScript 5
- Tailwind CSS 4 + shadcn/ui
- Lucide React 图标库
- Inter 字体

## 目录结构
```
src/
├── app/
│   ├── globals.css          # 全局样式 + 字体引入
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 主页面（状态路由 + 会中伴飞全屏）
├── components/
│   ├── ui/                  # shadcn/ui 组件
│   ├── sidebar.tsx          # 左侧导航栏（响应式：移动端汉堡菜单）
│   ├── header.tsx           # 顶部栏（AI 智能检索浮层 + 时间）
│   ├── modal.tsx            # 通用弹窗组件（遮罩+ESC关闭）
│   ├── watermark.tsx        # 防泄密水印组件
│   ├── dashboard.tsx        # 工作台（快捷操作+统计+今日日程+预定模板弹窗）
│   ├── pre-meeting.tsx      # 会前准备（三Tab双轨制：待筹备/已就绪/受邀参加）
│   ├── post-meeting.tsx     # 会后跟进（AI纪要+指派+截止日）
│   ├── document-library.tsx # 文档库（知识库/纪要Tab+网格卡片+水印）
│   ├── todo-list.tsx        # 待办事项（来源追踪+提醒徽章+状态筛选）
│   ├── in-meeting.tsx       # 会中伴飞（视频区+AI转写+Mark标记+水印）
│   └── analytics.tsx        # 效能洞察（KPI+柱状图+ROI总结）
└── lib/
    ├── utils.ts             # 通用工具
    └── mock-data.ts         # Mock 数据（含角色/状态/来源追踪字段）
```

## 开发命令
- 开发：`pnpm dev`
- 构建：`pnpm build`
- 启动：`pnpm start`
- 类型检查：`pnpm ts-check`
- Lint：`pnpm lint`

## 页面说明
- **工作台**：4大快捷操作（加入/快速/预定/共享）+ 统计卡片 + 今日核心日程 + 最近动态
- **会前准备**：三Tab（待筹备/已就绪/受邀参加）+ 左列表右详情 + 深度编辑/只读预览
- **会后跟进**：会议录像 + AI结构化纪要 + 待办追踪（指派/截止日）
- **文档库**：知识库/纪要Tab + 搜索 + 网格卡片 + 新建弹窗 + 水印
- **待办事项**：全局任务列表 + 来源追踪标签 + 提醒徽章 + 状态筛选
- **会中伴飞**：全屏模式 + 深色视频区 + AI语音转写 + Mark标记 + 水印
- **效能洞察**：KPI卡片 + 周趋势柱状图 + 类型分布 + ROI总结

## 数据模型关键字段
- `Meeting.currentUserRole`: 'organizer' | 'participant'
- `Meeting.prepStatus`: 'ready' | 'pending'
- `Task.meetingTitle`: 来源追踪
- `Task.reminderPlatform`: 'feishu' | 'dingtalk' | 'none'

## 设计规范
详见 `DESIGN.md`。主色调 #2563EB，背景 #F8FAFC，卡片化设计。
