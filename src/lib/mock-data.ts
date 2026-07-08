// Mock data for the Video Meeting Assistant V3 - Ultimate Commercial Demo

export interface Meeting {
  id: string;
  title: string;
  time: string;
  date: string;
  dateKey: string; // e.g. '2025-07-08'
  duration: string;
  agenda: string[];
  participants: Participant[];
  status: 'upcoming' | 'in-progress' | 'completed';
  type: 'today' | 'week';
  currentUserRole: 'organizer' | 'participant';
  prepStatus: 'ready' | 'pending';
}

export interface Participant {
  name: string;
  avatar: string;
  role: string;
}

export interface Task {
  id: string;
  description: string;
  assignee: string;
  assigneeAvatar: string;
  dueDate: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  meetingTitle?: string;
  meetingId?: string;
  reminderPlatform?: 'feishu' | 'dingtalk' | 'none';
}

export interface MeetingNote {
  decisions: string[];
  discussions: string[];
  actionItems: string[];
}

export interface DocItem {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xlsx' | 'ppt' | 'md' | 'link';
  category: 'knowledge' | 'minutes';
  meetingTitle?: string;
  updatedAt: string;
  size: string;
}

export interface MeetingPrep {
  id: string;
  meeting: Meeting;
  prepStatus: 'not-started' | 'in-progress' | 'ready';
  agendaDetail: string[];
  documents: string[];
  preTasks: { description: string; assignee: string; done: boolean }[];
}

export interface BookingTemplate {
  id: string;
  label: string;
  icon: string;
  agenda: string[];
  participants: string[];
}

// ─── Participants ───
export const participants: Participant[] = [
  { name: '张明远', avatar: 'ZM', role: '产品经理' },
  { name: '李思涵', avatar: 'LS', role: '前端工程师' },
  { name: '王建国', avatar: 'WG', role: '后端工程师' },
  { name: '陈雨晴', avatar: 'CY', role: 'UI 设计师' },
  { name: '赵文博', avatar: 'ZW', role: '项目经理' },
  { name: '刘芳华', avatar: 'LH', role: '测试工程师' },
  { name: '孙浩然', avatar: 'SH', role: '技术总监' },
  { name: '周雅琴', avatar: 'ZY', role: '运营经理' },
];

// ─── Meetings (with role & prepStatus) ───
export const meetings: Meeting[] = [
  {
    id: '1',
    title: '产品迭代需求评审会',
    time: '10:00',
    date: '今天',
    dateKey: '2025-07-08',
    duration: '60 分钟',
    agenda: ['Q3 迭代计划回顾', '新功能优先级排序', '技术可行性评估'],
    participants: [participants[0], participants[1], participants[2], participants[3]],
    status: 'upcoming',
    type: 'today',
    currentUserRole: 'organizer',
    prepStatus: 'ready',
  },
  {
    id: '2',
    title: '前端周会 - 技术分享',
    time: '14:00',
    date: '今天',
    dateKey: '2025-07-08',
    duration: '45 分钟',
    agenda: ['React 19 新特性分享', '性能优化实践', '下周任务分配'],
    participants: [participants[1], participants[2], participants[5]],
    status: 'upcoming',
    type: 'today',
    currentUserRole: 'organizer',
    prepStatus: 'ready',
  },
  {
    id: '3',
    title: '设计评审 - 新版首页',
    time: '09:30',
    date: '明天',
    dateKey: '2025-07-09',
    duration: '90 分钟',
    agenda: ['首页改版方案展示', '交互细节讨论', '设计走查反馈'],
    participants: [participants[3], participants[0], participants[4]],
    status: 'upcoming',
    type: 'week',
    currentUserRole: 'organizer',
    prepStatus: 'pending',
  },
  {
    id: '4',
    title: 'Sprint 回顾与规划',
    time: '15:00',
    date: '周三',
    dateKey: '2025-07-10',
    duration: '60 分钟',
    agenda: ['Sprint 24 回顾', 'Sprint 25 规划', '风险项识别'],
    participants: [participants[0], participants[4], participants[6], participants[1]],
    status: 'upcoming',
    type: 'week',
    currentUserRole: 'organizer',
    prepStatus: 'pending',
  },
  {
    id: '5',
    title: '跨部门协作同步会',
    time: '11:00',
    date: '周四',
    dateKey: '2025-07-11',
    duration: '30 分钟',
    agenda: ['运营需求对接', '数据看板进度', '上线计划确认'],
    participants: [participants[7], participants[0], participants[4]],
    status: 'upcoming',
    type: 'week',
    currentUserRole: 'participant',
    prepStatus: 'pending',
  },
  {
    id: '6',
    title: '模型调优评审会',
    time: '14:00',
    date: '周五',
    dateKey: '2025-07-12',
    duration: '60 分钟',
    agenda: ['模型效果对比', '训练数据质量分析', '下阶段调优方向'],
    participants: [participants[6], participants[2], participants[0]],
    status: 'upcoming',
    type: 'week',
    currentUserRole: 'participant',
    prepStatus: 'pending',
  },
];

// ─── Tasks (with source tracking & reminder badges) ───
export const tasks: Task[] = [
  {
    id: 't1',
    description: '完成用户中心页面 UI 设计稿',
    assignee: '陈雨晴',
    assigneeAvatar: 'CY',
    dueDate: '2025-07-10',
    completed: false,
    priority: 'high',
    meetingTitle: '设计评审 - 新版首页',
    meetingId: '3',
    reminderPlatform: 'feishu',
  },
  {
    id: 't2',
    description: '编写 API 接口文档 v2.0',
    assignee: '王建国',
    assigneeAvatar: 'WG',
    dueDate: '2025-07-11',
    completed: false,
    priority: 'high',
    meetingTitle: '产品迭代需求评审会',
    meetingId: '1',
    reminderPlatform: 'dingtalk',
  },
  {
    id: 't3',
    description: '优化首页加载性能 (LCP < 2.5s)',
    assignee: '李思涵',
    assigneeAvatar: 'LS',
    dueDate: '2025-07-12',
    completed: false,
    priority: 'medium',
    meetingTitle: '前端周会 - 技术分享',
    meetingId: '2',
    reminderPlatform: 'feishu',
  },
  {
    id: 't4',
    description: '完成回归测试用例编写',
    assignee: '刘芳华',
    assigneeAvatar: 'LH',
    dueDate: '2025-07-09',
    completed: true,
    priority: 'medium',
    meetingTitle: '产品迭代需求评审会',
    meetingId: '1',
    reminderPlatform: 'none',
  },
  {
    id: 't5',
    description: '输出 Q3 运营推广方案',
    assignee: '周雅琴',
    assigneeAvatar: 'ZY',
    dueDate: '2025-07-15',
    completed: false,
    priority: 'low',
    meetingTitle: '跨部门协作同步会',
    meetingId: '5',
    reminderPlatform: 'dingtalk',
  },
  {
    id: 't6',
    description: '数据库索引优化与慢查询治理',
    assignee: '王建国',
    assigneeAvatar: 'WG',
    dueDate: '2025-07-08',
    completed: true,
    priority: 'high',
    meetingTitle: 'Sprint 回顾与规划',
    meetingId: '4',
    reminderPlatform: 'feishu',
  },
  {
    id: 't7',
    description: '更新项目排期表并同步至所有干系人',
    assignee: '赵文博',
    assigneeAvatar: 'ZW',
    dueDate: '2025-07-09',
    completed: true,
    priority: 'medium',
    meetingTitle: 'Sprint 回顾与规划',
    meetingId: '4',
    reminderPlatform: 'none',
  },
  {
    id: 't8',
    description: '首屏性能优化 POC 验证',
    assignee: '李思涵',
    assigneeAvatar: 'LS',
    dueDate: '2025-07-11',
    completed: false,
    priority: 'high',
    meetingTitle: '前端周会 - 技术分享',
    meetingId: '2',
    reminderPlatform: 'feishu',
  },
  {
    id: 't9',
    description: '模型训练数据集清洗与标注',
    assignee: '孙浩然',
    assigneeAvatar: 'SH',
    dueDate: '2025-07-13',
    completed: false,
    priority: 'high',
    meetingTitle: '模型调优评审会',
    meetingId: '6',
    reminderPlatform: 'dingtalk',
  },
];

// ─── Meeting Notes ───
export const meetingNotes: MeetingNote = {
  decisions: [
    'Q3 迭代重点确定为用户增长与留存优化，预计投入 60% 研发资源',
    '新版首页改版方案通过，设计团队于 7/15 前交付终稿',
    'API 网关升级方案采用渐进式迁移策略，分三期上线',
    '每周三下午固定为跨部门同步会，时长 30 分钟',
  ],
  discussions: [
    '关于用户反馈的搜索功能优化：团队讨论了全文搜索与 AI 语义搜索的取舍，最终决定先上线关键词搜索增强，后续迭代引入语义搜索',
    '性能优化目标：首屏 LCP 从当前 3.2s 降至 2.5s 以内，重点优化图片加载与 JS 包体积',
    '设计系统统一：目前各业务线 UI 组件存在不一致，决定基于 shadcn/ui 建立统一设计系统',
    '数据看板需求：运营团队需要实时数据看板，技术侧评估后认为可基于现有 BI 平台快速搭建',
  ],
  actionItems: [
    '陈雨晴完成首页改版高保真设计稿 - 截止 7/15',
    '王建国输出 API 网关迁移技术方案文档 - 截止 7/12',
    '李思涵完成首屏性能优化 POC 验证 - 截止 7/11',
    '赵文博更新项目排期表并同步至所有干系人 - 截止 7/9',
  ],
};

// ─── Documents ───
export const documents: DocItem[] = [
  { id: 'd1', name: 'Q3 产品迭代规划书', type: 'pdf', category: 'knowledge', meetingTitle: '产品迭代需求评审会', updatedAt: '2025-07-08', size: '2.4 MB' },
  { id: 'd2', name: '前端技术选型方案', type: 'doc', category: 'knowledge', meetingTitle: '前端周会 - 技术分享', updatedAt: '2025-07-07', size: '1.1 MB' },
  { id: 'd3', name: '首页改版设计稿 v3', type: 'link', category: 'knowledge', meetingTitle: '设计评审 - 新版首页', updatedAt: '2025-07-06', size: '-' },
  { id: 'd4', name: 'Sprint 24 数据报告', type: 'xlsx', category: 'knowledge', meetingTitle: 'Sprint 回顾与规划', updatedAt: '2025-07-05', size: '856 KB' },
  { id: 'd5', name: 'API 网关迁移方案', type: 'doc', category: 'knowledge', updatedAt: '2025-07-04', size: '1.8 MB' },
  { id: 'd6', name: '运营推广方案 Q3', type: 'ppt', category: 'knowledge', meetingTitle: '跨部门协作同步会', updatedAt: '2025-07-03', size: '5.2 MB' },
  { id: 'd7', name: '需求评审会纪要 07/08', type: 'md', category: 'minutes', meetingTitle: '产品迭代需求评审会', updatedAt: '2025-07-08', size: '12 KB' },
  { id: 'd8', name: '前端周会纪要 07/07', type: 'md', category: 'minutes', meetingTitle: '前端周会 - 技术分享', updatedAt: '2025-07-07', size: '8 KB' },
  { id: 'd9', name: '设计评审纪要 07/05', type: 'md', category: 'minutes', meetingTitle: '设计评审 - 新版首页', updatedAt: '2025-07-05', size: '15 KB' },
  { id: 'd10', name: 'Sprint 回顾纪要 07/03', type: 'md', category: 'minutes', meetingTitle: 'Sprint 回顾与规划', updatedAt: '2025-07-03', size: '10 KB' },
  { id: 'd11', name: '跨部门同步纪要 07/02', type: 'md', category: 'minutes', meetingTitle: '跨部门协作同步会', updatedAt: '2025-07-02', size: '6 KB' },
  { id: 'd12', name: '性能优化专项纪要', type: 'md', category: 'minutes', meetingTitle: '前端周会 - 技术分享', updatedAt: '2025-07-01', size: '9 KB' },
];

// ─── Meeting Preps (derived from meetings for consistency) ───
export const meetingPreps: MeetingPrep[] = [
  {
    id: 'mp1',
    meeting: meetings[0],
    prepStatus: 'ready',
    agendaDetail: [
      '回顾 Q2 迭代完成情况与遗留问题',
      '讨论 Q3 新功能需求优先级 (P0/P1/P2)',
      '技术团队评估各需求的实现难度与工期',
      '确定 Q3 第一个 Sprint 的范围',
    ],
    documents: ['Q3 产品迭代规划书', '竞品分析报告'],
    preTasks: [
      { description: '阅读 Q3 产品迭代规划书', assignee: '李思涵', done: true },
      { description: '准备技术可行性评估表', assignee: '王建国', done: true },
      { description: '整理用户反馈 Top 10', assignee: '张明远', done: true },
    ],
  },
  {
    id: 'mp2',
    meeting: meetings[1],
    prepStatus: 'ready',
    agendaDetail: [
      'React 19 Server Components 实践分享',
      '首屏性能优化方案讨论',
      '下周迭代任务分配与排期',
    ],
    documents: ['前端技术选型方案'],
    preTasks: [
      { description: '阅读 React 19 变更日志', assignee: '李思涵', done: true },
      { description: '准备性能基准测试数据', assignee: '王建国', done: true },
    ],
  },
  {
    id: 'mp3',
    meeting: meetings[2],
    prepStatus: 'in-progress',
    agendaDetail: [
      '展示首页改版 3 套备选方案',
      '逐一讨论各方案的交互细节',
      '收集各方反馈并投票选定方向',
      '确认后续设计排期',
    ],
    documents: ['首页改版设计稿 v3'],
    preTasks: [
      { description: '提前浏览设计稿并标注问题', assignee: '张明远', done: false },
      { description: '准备用户调研数据摘要', assignee: '周雅琴', done: false },
    ],
  },
  {
    id: 'mp4',
    meeting: meetings[3],
    prepStatus: 'not-started',
    agendaDetail: [
      'Sprint 24 完成率与质量回顾',
      '识别阻塞因素与改进措施',
      'Sprint 25 需求池梳理与容量评估',
      '风险项识别与应对方案',
    ],
    documents: ['Sprint 24 数据报告', '燃尽图分析'],
    preTasks: [
      { description: '更新 Sprint 24 任务完成数据', assignee: '赵文博', done: false },
      { description: '整理 Sprint 25 需求池', assignee: '张明远', done: false },
      { description: '准备技术风险清单', assignee: '孙浩然', done: false },
    ],
  },
];

// ─── Booking Templates ───
export const bookingTemplates: BookingTemplate[] = [
  {
    id: 'bt1',
    label: '常规例会',
    icon: 'calendar',
    agenda: ['上周工作回顾', '本周计划同步', '问题与风险讨论', '行动项确认'],
    participants: ['张明远', '赵文博', '李思涵'],
  },
  {
    id: 'bt2',
    label: '科研项目推进',
    icon: 'flask',
    agenda: ['实验进展汇报', '数据结果分析', '下一步实验方案', '资源需求讨论'],
    participants: ['孙浩然', '王建国', '张明远'],
  },
  {
    id: 'bt3',
    label: '算法/模型评审',
    icon: 'brain',
    agenda: ['模型效果指标对比', '训练数据质量评估', '算法优化方向讨论', '上线计划确认'],
    participants: ['孙浩然', '王建国', '刘芳华'],
  },
  {
    id: 'bt4',
    label: '设计评审',
    icon: 'palette',
    agenda: ['设计方案展示', '交互细节讨论', '技术可行性确认', '排期与交付确认'],
    participants: ['陈雨晴', '张明远', '李思涵'],
  },
];

// ─── Analytics Data ───
export const analyticsData = {
  monthlyMeetingHours: 42.5,
  aiSavedHours: 18.3,
  taskCompletionRate: 78,
  avgMeetingDuration: 48,
  weeklyTrend: [
    { week: 'W1', hours: 8.5 },
    { week: 'W2', hours: 12.0 },
    { week: 'W3', hours: 9.5 },
    { week: 'W4', hours: 12.5 },
  ],
  categoryBreakdown: [
    { label: '需求评审', value: 35, color: 'bg-blue-500' },
    { label: '技术分享', value: 25, color: 'bg-emerald-500' },
    { label: '项目规划', value: 20, color: 'bg-violet-500' },
    { label: '跨部门协作', value: 12, color: 'bg-amber-500' },
    { label: '其他', value: 8, color: 'bg-slate-400' },
  ],
};

// ─── Stats ───
export const stats = {
  weeklyMeetings: 8,
  completedTasks: 12,
  pendingTasks: 6,
  meetingHours: 14.5,
};
