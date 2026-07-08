'use client';

import { useState } from 'react';
import {
  Plus, Clock, Users, FileText, X, Calendar,
  CheckCircle2, Circle, Upload, Save, Send,
  ChevronRight, FolderOpen, Video, Download,
  AlertCircle,
} from 'lucide-react';
import { meetingPreps, type MeetingPrep } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

type TabKey = 'pending' | 'ready' | 'invited';

const tabs: { key: TabKey; label: string; emoji: string }[] = [
  { key: 'pending', label: '待筹备', emoji: '' },
  { key: 'ready', label: '已就绪', emoji: '✅' },
  { key: 'invited', label: '受邀参加', emoji: '' },
];

const timeGroups = [
  { label: '今日紧急', color: 'text-red-600 bg-red-50', filter: (m: MeetingPrep) => m.meeting.type === 'today' },
  { label: '未来三天', color: 'text-amber-600 bg-amber-50', filter: (m: MeetingPrep) => ['明天', '周三'].includes(m.meeting.date) },
  { label: '未来一周', color: 'text-blue-600 bg-blue-50', filter: (m: MeetingPrep) => ['周四', '周五'].includes(m.meeting.date) },
];

function PrepListItem({ prep, isActive, onClick }: { prep: MeetingPrep; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-xl border p-4 text-left transition-all duration-200',
        isActive ? 'border-blue-200 bg-blue-50/50 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
      )}
    >
      <div className="flex items-start justify-between">
        <h4 className={cn('text-sm font-semibold', isActive ? 'text-blue-700' : 'text-slate-900')}>{prep.meeting.title}</h4>
      </div>
      <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{prep.meeting.date} {prep.meeting.time}</span>
        <span className="flex items-center gap-1"><Users className="h-3 w-3" />{prep.meeting.participants.length} 人</span>
      </div>
      {prep.prepStatus !== 'ready' && (
        <div className="mt-2.5 flex items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn('h-full rounded-full transition-all',
                prep.prepStatus === 'in-progress' ? 'bg-amber-500 w-1/2' : 'bg-slate-300 w-0'
              )}
            />
          </div>
          <span className="text-[10px] text-slate-400">{prep.preTasks.filter(t => t.done).length}/{prep.preTasks.length} 预读完成</span>
        </div>
      )}
    </button>
  );
}

export function PreMeeting({ onEnterMeeting }: { onEnterMeeting: (id: string) => void }) {
  const [activeTab, setActiveTab] = useState<TabKey>('pending');
  const [selectedPrepId, setSelectedPrepId] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [agendaItems, setAgendaItems] = useState<string[]>([]);
  const [preTasks, setPreTasks] = useState<{ description: string; assignee: string; done: boolean }[]>([]);

  // Filter meetings by tab
  const pendingPreps = meetingPreps.filter(p => p.meeting.currentUserRole === 'organizer' && p.prepStatus !== 'ready');
  const readyPreps = meetingPreps.filter(p => p.meeting.currentUserRole === 'organizer' && p.prepStatus === 'ready');
  const invitedPreps = meetingPreps.filter(p => p.meeting.currentUserRole === 'participant');

  const currentList = activeTab === 'pending' ? pendingPreps : activeTab === 'ready' ? readyPreps : invitedPreps;

  const handleSelectPrep = (id: string) => {
    const prep = meetingPreps.find(p => p.id === id)!;
    setSelectedPrepId(id);
    setAgendaItems([...prep.agendaDetail]);
    setPreTasks([...prep.preTasks]);
    setIsEditing(false);
  };

  // Auto-select first item when tab changes
  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    const list = tab === 'pending' ? pendingPreps : tab === 'ready' ? readyPreps : invitedPreps;
    if (list.length > 0) {
      handleSelectPrep(list[0].id);
    }
  };

  // Initialize selection
  if (!selectedPrepId && currentList.length > 0) {
    handleSelectPrep(currentList[0].id);
  }

  const selectedPrep = meetingPreps.find(p => p.id === selectedPrepId);
  const isReadOnly = activeTab === 'ready' || activeTab === 'invited';
  const isInvited = activeTab === 'invited';

  const handleAddAgenda = () => setAgendaItems([...agendaItems, '']);
  const handleAgendaChange = (index: number, value: string) => {
    const updated = [...agendaItems];
    updated[index] = value;
    setAgendaItems(updated);
  };
  const handleRemoveAgenda = (index: number) => setAgendaItems(agendaItems.filter((_, i) => i !== index));
  const toggleTask = (index: number) => {
    const updated = [...preTasks];
    updated[index] = { ...updated[index], done: !updated[index].done };
    setPreTasks(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">会议筹备看板</h2>
        <p className="mt-1 text-sm text-slate-500">深度筹备每一场会议：完善议程、关联文档、分配预读任务</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
        {tabs.map((tab) => {
          const count = tab.key === 'pending' ? pendingPreps.length : tab.key === 'ready' ? readyPreps.length : invitedPreps.length;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={cn(
                'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
                activeTab === tab.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              )}
            >
              {tab.emoji} {tab.label}
              <span className={cn('ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                activeTab === tab.key ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-500'
              )}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        {/* Left: Meeting List */}
        <div className="xl:col-span-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            {activeTab === 'pending' ? (
              /* Time-grouped list for pending */
              <div className="space-y-4">
                {timeGroups.map((group) => {
                  const groupItems = currentList.filter(group.filter);
                  if (groupItems.length === 0) return null;
                  return (
                    <div key={group.label}>
                      <div className={cn('mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold', group.color)}>
                        {group.label}
                      </div>
                      <div className="space-y-2">
                        {groupItems.map((prep) => (
                          <PrepListItem key={prep.id} prep={prep} isActive={selectedPrepId === prep.id} onClick={() => handleSelectPrep(prep.id)} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-2">
                {currentList.map((prep) => (
                  <PrepListItem key={prep.id} prep={prep} isActive={selectedPrepId === prep.id} onClick={() => handleSelectPrep(prep.id)} />
                ))}
              </div>
            )}
            {currentList.length === 0 && (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 className="h-8 w-8 text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">暂无会议</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="xl:col-span-8">
          {selectedPrep ? (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
              {/* Meeting Header */}
              <div className="border-b border-slate-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900">{selectedPrep.meeting.title}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{selectedPrep.meeting.date} {selectedPrep.meeting.time}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{selectedPrep.meeting.duration}</span>
                      <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{selectedPrep.meeting.participants.length} 位参会人</span>
                    </div>
                  </div>
                  {!isReadOnly && (
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className={cn('rounded-lg px-3.5 py-2 text-xs font-medium transition-all',
                        isEditing ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      )}
                    >
                      {isEditing ? '取消编辑' : '编辑筹备方案'}
                    </button>
                  )}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-slate-500">参会人:</span>
                  <div className="flex -space-x-2">
                    {selectedPrep.meeting.participants.map((p, i) => (
                      <div key={i} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-blue-500 to-blue-600 text-[10px] font-semibold text-white" title={`${p.name} - ${p.role}`}>
                        {p.avatar}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6 p-6">
                {/* Agenda */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <FileText className="h-4 w-4 text-blue-500" />
                    详细议程大纲
                  </h4>
                  <div className="mt-3 space-y-2">
                    {agendaItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 text-xs font-semibold text-blue-600">{i + 1}</span>
                        {isEditing && !isReadOnly ? (
                          <input type="text" value={item} onChange={(e) => handleAgendaChange(i, e.target.value)}
                            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            placeholder={`议题 ${i + 1}...`}
                          />
                        ) : (
                          <p className="flex-1 text-sm text-slate-700">{item}</p>
                        )}
                        {isEditing && !isReadOnly && agendaItems.length > 1 && (
                          <button onClick={() => handleRemoveAgenda(i)} className="flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {isEditing && !isReadOnly && (
                    <button onClick={handleAddAgenda} className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
                      <Plus className="h-3.5 w-3.5" />添加议题
                    </button>
                  )}
                </div>

                {/* Documents */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <FolderOpen className="h-4 w-4 text-amber-500" />
                    {isInvited ? '预读资料' : '会前必读文档'}
                  </h4>
                  <div className="mt-3 space-y-2">
                    {selectedPrep.documents.map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5">
                        <FileText className="h-4 w-4 text-slate-400" />
                        <span className="flex-1 text-sm text-slate-700">{doc}</span>
                        <ChevronRight className="h-4 w-4 text-slate-300" />
                      </div>
                    ))}
                  </div>
                  {isEditing && !isReadOnly && (
                    <div className="mt-2 flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-3 transition-colors hover:border-blue-300 hover:bg-blue-50/30">
                      <Upload className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-500">上传或关联文档</span>
                    </div>
                  )}
                </div>

                {/* Pre-reading Tasks (only for organizer tabs) */}
                {!isInvited && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      会前预读任务
                    </h4>
                    <div className="mt-3 space-y-2">
                      {preTasks.map((task, i) => (
                        <div key={i} className={cn('flex items-center gap-3 rounded-lg border px-4 py-3 transition-all',
                          task.done ? 'border-slate-100 bg-slate-50/50' : 'border-slate-200 bg-white'
                        )}>
                          {!isReadOnly && (
                            <button onClick={() => toggleTask(i)}>
                              {task.done ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-slate-300" />}
                            </button>
                          )}
                          {isReadOnly && (
                            <span>{task.done ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <AlertCircle className="h-5 w-5 text-amber-400" />}</span>
                          )}
                          <p className={cn('flex-1 text-sm', task.done ? 'text-slate-400 line-through' : 'text-slate-900')}>{task.description}</p>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[8px] font-semibold text-blue-700">{task.assignee.charAt(0)}</span>
                          <span className="text-xs text-slate-500">{task.assignee}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                {isInvited ? (
                  <>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50">
                      <Download className="h-4 w-4" />下载预读资料
                    </button>
                    <button onClick={() => onEnterMeeting(selectedPrep.meeting.id)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                      <Video className="h-4 w-4" />进入会议室
                    </button>
                  </>
                ) : activeTab === 'ready' ? (
                  <>
                    <button onClick={() => { setIsEditing(true); setActiveTab('pending'); }} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50">
                      修改筹备方案
                    </button>
                    <button onClick={() => onEnterMeeting(selectedPrep.meeting.id)} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                      <Video className="h-4 w-4" />进入会议室
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition-all hover:bg-slate-50">
                      <Save className="h-4 w-4" />保存筹备方案
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                      <Send className="h-4 w-4" />发送会议邀请
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white py-20 shadow-sm">
              <Calendar className="h-10 w-10 text-slate-300" />
              <p className="mt-3 text-sm text-slate-500">选择一场会议查看筹备详情</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
