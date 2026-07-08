'use client';

import { useState } from 'react';
import {
  Play, Pause, FileText, CheckCircle2, Circle,
  Sparkles, Clock, Users, Calendar, UserPlus, CalendarDays, Bot,
} from 'lucide-react';
import { meetings, meetingNotes, tasks } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function PostMeeting() {
  const [showNotes, setShowNotes] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskList, setTaskList] = useState(
    meetingNotes.actionItems.map((item, i) => ({
      id: `task-${i}`,
      text: item,
      completed: false,
      assignee: item.split(' ')[0],
      dueDate: item.match(/\d+\/\d+/)?.[0] || '',
    }))
  );
  const [assignDropdown, setAssignDropdown] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowNotes(true);
    }, 1500);
  };

  const toggleTask = (id: string) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const currentMeeting = meetings[0];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{currentMeeting.title} - 纪要与待办</h2>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />今天 {currentMeeting.time}</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{currentMeeting.duration}</span>
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{currentMeeting.participants.length} 位参会人</span>
        </div>
      </div>

      {/* Main Content: Two Column */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left: Video Placeholder */}
        <div className="xl:col-span-5">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex aspect-video items-center justify-center rounded-lg bg-slate-50">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-200">
                  <Play className="h-6 w-6 text-slate-500" />
                </div>
                <p className="mt-3 text-sm font-medium text-slate-600">会议录像</p>
                <p className="mt-1 text-xs text-slate-400">点击播放回放</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pause className="h-4 w-4 text-slate-400" />
                <div className="h-1 w-32 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-1/3 rounded-full bg-blue-500" />
                </div>
                <span className="text-xs text-slate-400">18:32 / 56:00</span>
              </div>
            </div>
          </div>

          {/* Participants */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-slate-900">参会人</h4>
            <div className="mt-3 space-y-2">
              {currentMeeting.participants.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white">{p.avatar}</div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{p.name}</p>
                    <p className="text-xs text-slate-500">{p.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Notes */}
        <div className="xl:col-span-7">
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FileText className="h-4 w-4 text-blue-500" />
                  AI 结构化纪要
                </h3>
                {!showNotes && (
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:opacity-60"
                  >
                    <Sparkles className={cn('h-3.5 w-3.5', isGenerating && 'animate-pulse')} />
                    {isGenerating ? 'AI 正在分析...' : '一键生成 AI 纪要'}
                  </button>
                )}
              </div>
            </div>

            {showNotes ? (
              <div className="space-y-5 p-5">
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2">
                  <Bot className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700">机器人已提取 {meetingNotes.decisions.length + meetingNotes.discussions.length} 条关键信息</span>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />会议决议
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {meetingNotes.decisions.map((d, i) => (
                      <li key={i} className="flex gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-semibold text-emerald-600">{i + 1}</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <FileText className="h-4 w-4 text-blue-500" />核心讨论点
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {meetingNotes.discussions.map((d, i) => (
                      <li key={i} className="flex gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-600">{i + 1}</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Sparkles className="h-8 w-8 text-slate-300" />
                <p className="mt-3 text-sm text-slate-500">点击上方按钮，AI 将自动提炼会议要点</p>
                <p className="mt-1 text-xs text-slate-400">基于录音转写文本生成结构化纪要</p>
              </div>
            )}
          </div>

          {/* Task Tracking */}
          <div className="mt-4 rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 px-5 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-slate-900">待办追踪</h3>
                <span className="text-xs text-slate-500">{taskList.filter(t => t.completed).length}/{taskList.length} 已完成</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500 transition-all duration-300" style={{ width: `${(taskList.filter(t => t.completed).length / taskList.length) * 100}%` }} />
              </div>
            </div>
            <div className="divide-y divide-slate-100">
              {taskList.map((task) => (
                <div key={task.id} className={cn('flex items-center gap-3 px-5 py-3.5 transition-colors', task.completed && 'bg-slate-50/50')}>
                  <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-slate-300" />}
                  </button>
                  <p className={cn('flex-1 text-sm', task.completed ? 'text-slate-400 line-through' : 'text-slate-900')}>{task.text}</p>
                  <div className="flex items-center gap-2">
                    {/* Assign dropdown */}
                    <div className="relative">
                      <button
                        onClick={() => setAssignDropdown(assignDropdown === task.id ? null : task.id)}
                        className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100"
                      >
                        <UserPlus className="h-3 w-3" />指派
                      </button>
                      {assignDropdown === task.id && (
                        <div className="absolute right-0 top-8 z-10 w-36 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                          {currentMeeting.participants.map((p) => (
                            <button key={p.name} onClick={() => setAssignDropdown(null)} className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs text-slate-700 hover:bg-slate-50">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 text-[8px] font-bold text-blue-700">{p.avatar}</span>
                              {p.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-slate-500 transition-colors hover:bg-slate-100">
                      <CalendarDays className="h-3 w-3" />{task.dueDate}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
