'use client';

import { Clock, Sparkles, CheckCircle2, TrendingUp, BarChart3, Calendar } from 'lucide-react';
import { analyticsData } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const maxHours = Math.max(...analyticsData.weeklyTrend.map(w => w.hours));

export function Analytics() {
  const { monthlyMeetingHours, aiSavedHours, taskCompletionRate, avgMeetingDuration, weeklyTrend, categoryBreakdown } = analyticsData;

  const kpiCards = [
    { label: '本月会议总时长', value: monthlyMeetingHours, unit: '小时', icon: Clock, color: 'blue', trend: '+12%' },
    { label: 'AI 节约记录时间', value: aiSavedHours, unit: '小时', icon: Sparkles, color: 'emerald', trend: '+28%' },
    { label: '待办按时完成率', value: taskCompletionRate, unit: '%', icon: CheckCircle2, color: 'amber', trend: '+5%' },
    { label: '平均会议时长', value: avgMeetingDuration, unit: '分钟', icon: Calendar, color: 'violet', trend: '-8%' },
  ];

  const colorMap: Record<string, { bg: string; icon: string; text: string }> = {
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', text: 'text-blue-600' },
    emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', text: 'text-emerald-600' },
    amber: { bg: 'bg-amber-50', icon: 'text-amber-600', text: 'text-amber-600' },
    violet: { bg: 'bg-violet-50', icon: 'text-violet-600', text: 'text-violet-600' },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">效能洞察</h2>
        <p className="mt-1 text-sm text-slate-500">企业会议效率与 ROI 指标看板</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {kpiCards.map((card) => {
          const c = colorMap[card.color];
          const Icon = card.icon;
          const isPositive = card.trend.startsWith('+');
          return (
            <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md sm:p-5">
              <div className="flex items-center justify-between">
                <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', c.bg)}>
                  <Icon className={cn('h-4 w-4 sm:h-5 sm:w-5', c.icon)} />
                </div>
                <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-semibold',
                  isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                )}>
                  <TrendingUp className={cn('mr-0.5 inline h-3 w-3', !isPositive && 'rotate-180')} />
                  {card.trend}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-xs text-slate-500">{card.label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                  {card.value}<span className="ml-1 text-xs font-normal text-slate-400">{card.unit}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Bar Chart: Weekly Trend */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-slate-900">本周会议时长趋势</h3>
          </div>
          <div className="mt-6 flex items-end gap-4" style={{ height: '160px' }}>
            {weeklyTrend.map((w) => {
              const height = (w.hours / maxHours) * 100;
              return (
                <div key={w.week} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-semibold text-slate-700">{w.hours}h</span>
                  <div className="w-full overflow-hidden rounded-t-lg bg-slate-100" style={{ height: '120px' }}>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-500"
                      style={{ height: `${height}%`, marginTop: `${100 - height}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{w.week}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-violet-500" />
            <h3 className="text-sm font-semibold text-slate-900">会议类型分布</h3>
          </div>
          <div className="mt-6 space-y-4">
            {categoryBreakdown.map((cat) => (
              <div key={cat.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-700">{cat.label}</span>
                  <span className="font-semibold text-slate-900">{cat.value}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className={cn('h-full rounded-full transition-all duration-500', cat.color)} style={{ width: `${cat.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Summary */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-blue-50 to-violet-50 p-5 shadow-sm sm:p-6">
        <h3 className="text-sm font-semibold text-slate-900">ROI 总结</h3>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-slate-500">AI 纪要生成</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{aiSavedHours}h <span className="text-xs font-normal text-slate-500">本月节约</span></p>
            <p className="text-[11px] text-slate-500">相当于 {Math.round(aiSavedHours * 60)} 分钟人工记录时间</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">待办自动追踪</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{taskCompletionRate}% <span className="text-xs font-normal text-slate-500">完成率</span></p>
            <p className="text-[11px] text-slate-500">较上月提升 5 个百分点</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">会议效率指数</p>
            <p className="mt-1 text-lg font-bold text-slate-900">8.2 <span className="text-xs font-normal text-slate-500">/ 10</span></p>
            <p className="text-[11px] text-slate-500">基于时长、参与度和产出综合评估</p>
          </div>
        </div>
      </div>
    </div>
  );
}
