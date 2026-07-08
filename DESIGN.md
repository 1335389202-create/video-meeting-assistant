# DESIGN.md - 视频会议助手

## 气质与意象
- 关键词：高效、专业、克制、清晰
- 场景：现代化企业会议室，落地窗旁长桌，白板上贴着便签，桌上有笔记本和咖啡杯
- 整体氛围：像清晨办公桌上整齐排列的文件——每样东西都有位置，没有多余

## 配色方案
- 背景：白色 #FFFFFF / 浅灰 #F8FAFC
- 强调色：科技蓝 #2563EB（按钮、选中态、关键数据）
- 文字主色：商务黑 #0F172A
- 文字次色：#64748B
- 边框：#E2E8F0
- 成功绿：#10B981（完成状态）
- 卡片背景：纯白 #FFFFFF，shadow-sm

## 字体排版
- 字体族：Inter + 系统中文字体
- 标题：font-semibold，层级通过 size 区分
- 正文：text-sm / text-base，行高舒适
- 数据数字：font-mono 或 font-semibold 突出

## 布局与组件
- 左侧 Sidebar 240px，白底+蓝色选中态，移动端降级为汉堡菜单
- 顶部 Header 64px，含 AI 智能检索浮层（backdrop-blur 毛玻璃效果）
- 卡片化设计：rounded-xl + shadow-sm + border
- 按钮：rounded-lg，hover 有 bg 色变化，transition-all
- 弹窗 Modal：居中浮层 + 半透明遮罩 + ESC 关闭
- 水印 Watermark：opacity-3 + 倾斜 -30deg + pointer-events-none
- 快捷操作按钮：2x2 触摸方块（移动端），4 列（桌面端）

## 会中伴飞模式
- 深色背景 slate-950，视频区占位 + 右侧 AI 面板
- AI 语音转写：打字机效果 + 实时脉冲指示
- Mark 标记：醒目的 amber 色按钮，标记后高亮显示
- 录制状态：红色脉冲圆点 + 文字提示

## 响应式断点
- 移动端（< lg）：Sidebar 隐藏，汉堡菜单触发
- 双栏布局在移动端自动堆叠为单栏
- 快捷操作 2x2 网格（移动端），4 列（桌面端）

## 动效与交互
- 按钮 hover：背景色加深，轻微 scale
- 菜单切换：内容区域 fade-in
- Checkbox：平滑过渡
- 所有交互 transition duration-200

## 设计禁忌
- 不使用渐变背景
- 不使用圆角过大的元素（最大 rounded-xl）
- 不使用彩色图标（统一用 gray-500，选中用 blue-600）
- 不使用动画过度的效果
