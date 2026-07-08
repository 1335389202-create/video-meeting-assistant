'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, Clock, AlertTriangle, Link2, Bell, Filter } from 'lucide-react';
import { tasks as allTasks, type Task } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type FilterKey = 'all' | 'pending' | 'completed';

const priorityConfig = {
  high: { label: '高', className: 'bg-red-50 text-red-600' },
  medium: { label: '中', className: 'bg-amber-50 text-amber-600' },
  low: { label: '低', className: 'bg-slate-100 text-slate-500' },
};

const reminderIcons: Record<string, { label: string; className: string }> = {
  feishu: { label: '飞书', className: 'bg-blue-50 text-blue-500' },
  dingtalk: { label: '钉钉', className: 'bg-sky-50 text-sky-500' },
  none: { label: '', className: '' },
};

function TaskRow({ task, onToggle }: { task: Task; onToggle: () => void }) {
  const p = priorityConfig[task.priority];
  const r = reminderIcons[task.reminderPlatform || 'none'];

  return (
    <div className={cn(
      'flex items-center gap-3 rounded-xl border px-4 py-4 transition-all duration-200 hover:shadow-sm sm:gap-4 sm:px-5',
      task.completed ? 'border-slate-100 bg-slate-50/50' : 'border-slate-200 bg-white'
    )}>
      <button onClick={onToggle} className="flex-shrink-0">
        {task.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-slate-300" />}
      </button>

      <div className="min-w-0 flex-1">
        <p className={cn('text-sm font-medium', task.completed ? 'text-slate-400 line-through' : 'text-slate-900')}>
          {task.description}
        </p>
        {/* Source tracking badge */}
        {task.meetingTitle && (
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
              <Link2 className="h-2.5 w-2.5" />
              源自：{task.meetingTitle}
            </span>
            {r.label && (
              <span className={cn('inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium', r.className)}>
                <Bell className="h-2.5 w-2.5" />
                {r.label}提醒
              </span>
            )}
          </div>
        )}
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[9px] font-semibold text-blue-700" title={task.assignee}>
          {task.assigneeAvatar}
        </div>
        <span className="text-xs text-slate-500">{task.assignee}</span>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <Clock className="h-3.5 w-3.5 text-slate-400" />
        <span className="text-xs text-slate-500">{task.dueDate}</span>
      </div>

      <span className={cn('hidden rounded-full px-2 py-0.5 text-[10px] font-semibold sm:inline-block', p.className)}>
        {p.label}
      </span>
    </div>
  );
}

export function TodoList() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [taskState, setTaskState] = useState(allTasks);

  const toggleTask = (id: string) => {
    setTaskState(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filtered = taskState.filter(t => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const pendingCount = taskState.filter(t => !t.completed).length;
  const completedCount = taskState.filter(t => t.completed).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">待办事项</h2>
        <p className="mt-1 text-sm text-slate-500">个人执行控制台，追踪所有会议产生的待办任务</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">全部任务</p>
          <p className="mt-1 text-2xl font-bold text-slate-900">{taskState.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">未完成</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs text-slate-500">已完成</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">{completedCount}</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
          {([
            { key: 'all' as FilterKey, label: '全部' },
            { key: 'pending' as FilterKey, label: '未完成' },
            { key: 'completed' as FilterKey, label: '已完成' },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                'rounded-md px-4 py-1.5 text-sm font-medium transition-all duration-200',
                filter === f.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Filter className="h-3.5 w-3.5" />
          <span>按来源追踪</span>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-2">
        {filtered.map((task) => (
          <TaskRow key={task.id} task={task} onToggle={() => toggleTask(task.id)} />
        ))}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-12 text-center">
            <AlertTriangle className="h-8 w-8 text-slate-300" />
            <p className="mt-2 text-sm text-slate-500">暂无{filter === 'pending' ? '未完成' : filter === 'completed' ? '已完成' : ''}任务</p>
          </div>
        )}
      </div>
    </div>
  );
}
