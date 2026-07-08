'use client';

import { useState } from 'react';
import {
  CalendarDays, CheckCircle2, Clock, TrendingUp, Video, Plus, Calendar, Monitor,
  FlaskConical, Brain, Palette, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { stats, meetings, bookingTemplates, type Meeting } from '@/lib/mock-data';
import { Modal } from '@/components/modal';
import { cn } from '@/lib/utils';

interface DashboardProps {
  onOpenBooking: () => void;
  onEnterMeeting: (meetingId: string) => void;
}

const statCards = [
  { label: '本周待开会议', value: stats.weeklyMeetings, unit: '场', icon: CalendarDays, color: 'blue' },
  { label: '已完成待办', value: stats.completedTasks, unit: '项', icon: CheckCircle2, color: 'emerald' },
  { label: '进行中待办', value: stats.pendingTasks, unit: '项', icon: Clock, color: 'amber' },
  { label: '本周会议时长', value: stats.meetingHours, unit: '小时', icon: TrendingUp, color: 'violet' },
];

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600' },
  amber: { bg: 'bg-amber-50', icon: 'text-amber-600' },
  violet: { bg: 'bg-violet-50', icon: 'text-violet-600' },
};

const quickActions = [
  { label: '加入会议', desc: '通过会议号加入', icon: Video, color: 'bg-blue-600 hover:bg-blue-700' },
  { label: '快速会议', desc: '立即发起一场会议', icon: Plus, color: 'bg-emerald-600 hover:bg-emerald-700' },
  { label: '预定会议', desc: '安排未来会议日程', icon: Calendar, color: 'bg-violet-600 hover:bg-violet-700', action: 'booking' as const },
  { label: '共享屏幕', desc: '开始屏幕共享', icon: Monitor, color: 'bg-amber-600 hover:bg-amber-700' },
];

const templateIcons: Record<string, React.ElementType> = {
  calendar: Calendar,
  flask: FlaskConical,
  brain: Brain,
  palette: Palette,
};

function TodayScheduleItem({ meeting, onEnter }: { meeting: Meeting; onEnter: (id: string) => void }) {
  return (
    <div className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-blue-200 hover:shadow-sm">
      <div className="flex flex-col items-center justify-center rounded-lg bg-slate-50 px-3 py-2">
        <span className="text-lg font-bold text-slate-900">{meeting.time.split(':')[0]}</span>
        <span className="text-[10px] font-medium text-slate-400">:{meeting.time.split(':')[1]}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-slate-900">{meeting.title}</h4>
          <span className={cn(
            'rounded-full px-2 py-0.5 text-[10px] font-medium',
            meeting.prepStatus === 'ready' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
          )}>
            {meeting.prepStatus === 'ready' ? '已就绪' : '待筹备'}
          </span>
        </div>
        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
          <span>{meeting.duration}</span>
          <span className="text-slate-300">|</span>
          <span>{meeting.participants.length} 位参会人</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {meeting.agenda.slice(0, 2).map((item, i) => (
            <span key={i} className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] text-slate-600">{item}</span>
          ))}
        </div>
      </div>
      <button
        onClick={() => onEnter(meeting.id)}
        className="flex-shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white opacity-0 transition-all group-hover:opacity-100 hover:bg-blue-700"
      >
        进入会议室
      </button>
    </div>
  );
}

// ─── Booking Modal Content ───
function BookingModalContent({ onClose }: { onClose: () => void }) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [topic, setTopic] = useState('');
  const [agenda, setAgenda] = useState<string[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [syncCalendar, setSyncCalendar] = useState(false);

  const handleSelectTemplate = (templateId: string) => {
    const tpl = bookingTemplates.find(t => t.id === templateId);
    if (tpl) {
      setSelectedTemplate(templateId);
      setTopic(tpl.label + ' - ' + new Date().toLocaleDateString('zh-CN'));
      setAgenda([...tpl.agenda]);
      setSelectedParticipants([...tpl.participants]);
    }
  };

  return (
    <div className="space-y-5">
      {/* Template Selector */}
      <div>
        <label className="text-sm font-medium text-slate-700">选择会议模板</label>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {bookingTemplates.map((tpl) => {
            const Icon = templateIcons[tpl.icon] || Calendar;
            const isSelected = selectedTemplate === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl.id)}
                className={cn(
                  'flex items-center gap-3 rounded-xl border p-3 text-left transition-all duration-200',
                  isSelected
                    ? 'border-blue-300 bg-blue-50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                )}
              >
                <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', isSelected ? 'bg-blue-100' : 'bg-slate-100')}>
                  <Icon className={cn('h-4 w-4', isSelected ? 'text-blue-600' : 'text-slate-500')} />
                </div>
                <span className={cn('text-sm font-medium', isSelected ? 'text-blue-700' : 'text-slate-700')}>{tpl.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="text-sm font-medium text-slate-700">会议主题</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="输入会议主题..."
          className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium text-slate-700">日期</label>
          <input type="date" defaultValue="2025-07-09" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100" />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">时间</label>
          <input type="time" defaultValue="10:00" className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100" />
        </div>
      </div>

      {/* Agenda Preview */}
      {agenda.length > 0 && (
        <div>
          <label className="text-sm font-medium text-slate-700">议程大纲（自动填充）</label>
          <div className="mt-1.5 space-y-1.5">
            {agenda.map((item, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-600">{i + 1}</span>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Participants */}
      {selectedParticipants.length > 0 && (
        <div>
          <label className="text-sm font-medium text-slate-700">参会人（自动填充）</label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {selectedParticipants.map((name) => (
              <span key={name} className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-[8px] font-bold text-blue-800">{name.charAt(0)}</span>
                {name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Sync Calendar Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-slate-700">同步至 Outlook / 日历</p>
          <p className="text-xs text-slate-500">自动创建日历事件并发送邀请</p>
        </div>
        <button onClick={() => setSyncCalendar(!syncCalendar)} className="flex-shrink-0">
          {syncCalendar ? (
            <ToggleRight className="h-7 w-7 text-blue-600" />
          ) : (
            <ToggleLeft className="h-7 w-7 text-slate-300" />
          )}
        </button>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">取消</button>
        <button onClick={onClose} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700">创建会议</button>
      </div>
    </div>
  );
}

export function Dashboard({ onOpenBooking, onEnterMeeting }: DashboardProps) {
  const [showBooking, setShowBooking] = useState(false);
  const todayMeetings = meetings.filter((m) => m.type === 'today');

  const handleQuickAction = (action?: string) => {
    if (action === 'booking') {
      setShowBooking(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900">早上好，张明远</h2>
        <p className="mt-1 text-sm text-slate-500">今天有 {todayMeetings.length} 场会议待参加，祝你工作顺利。</p>
      </div>

      {/* Quick Action Buttons - 2x2 on mobile, 4-col on desktop */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => handleQuickAction(action.action)}
              className={cn('group flex items-center gap-3 rounded-xl px-4 py-4 text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] sm:gap-4 sm:px-5 sm:py-5', action.color)}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 sm:h-10 sm:w-10">
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold">{action.label}</p>
                <p className="hidden text-xs text-white/70 sm:block">{action.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {statCards.map((card) => {
          const c = colorMap[card.color];
          const Icon = card.icon;
          return (
            <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 sm:text-sm">{card.label}</p>
                  <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                    {card.value}
                    <span className="ml-1 text-xs font-normal text-slate-400">{card.unit}</span>
                  </p>
                </div>
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg sm:h-10 sm:w-10', c.bg)}>
                  <Icon className={cn('h-4 w-4 sm:h-5 sm:w-5', c.icon)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Today's Schedule */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900">今日核心日程</h3>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">{todayMeetings.length} 场</span>
        </div>
        <div className="mt-4 space-y-3">
          {todayMeetings.map((meeting) => (
            <TodayScheduleItem key={meeting.id} meeting={meeting} onEnter={onEnterMeeting} />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-base font-semibold text-slate-900">最近动态</h3>
        <div className="mt-4 space-y-3">
          {[
            { text: '产品迭代需求评审会 已创建', time: '10 分钟前', dot: 'bg-blue-500' },
            { text: '前端周会 议程已更新', time: '1 小时前', dot: 'bg-emerald-500' },
            { text: '设计评审 参会人已确认', time: '2 小时前', dot: 'bg-amber-500' },
            { text: 'Sprint 回顾会议纪要已生成', time: '昨天', dot: 'bg-slate-300' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className={cn('h-2 w-2 flex-shrink-0 rounded-full', item.dot)} />
              <p className="flex-1 text-sm text-slate-700">{item.text}</p>
              <span className="text-xs text-slate-400">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <Modal open={showBooking} onClose={() => setShowBooking(false)} title="预定会议" width="max-w-xl">
        <BookingModalContent onClose={() => setShowBooking(false)} />
      </Modal>
    </div>
  );
}
