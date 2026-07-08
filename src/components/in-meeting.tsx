'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Mic, MicOff, Video as VideoIcon, VideoOff, Monitor, Phone,
  Zap, FileText, Users, MessageSquare, ChevronLeft, Bot,
} from 'lucide-react';
import { meetings, meetingPreps } from '@/lib/mock-data';
import { Watermark } from '@/components/watermark';
import { cn } from '@/lib/utils';

interface InMeetingProps {
  meetingId: string;
  onLeave: () => void;
}

const transcriptLines = [
  { speaker: '张明远', text: '好，我们开始今天的需求评审。先回顾一下 Q2 的迭代完成情况。' },
  { speaker: '赵文博', text: 'Q2 我们完成了 24 个需求中的 21 个，完成率 87.5%。有 3 个需求因为技术复杂度超出预期被推迟到 Q3。' },
  { speaker: '张明远', text: '好的。接下来讨论 Q3 的功能优先级。我整理了 15 个候选需求，按业务价值和技术可行性做了初步排序。' },
  { speaker: '李思涵', text: '从技术角度看，用户搜索优化和性能提升的优先级应该最高。目前搜索响应时间超过 2 秒，用户反馈比较集中。' },
  { speaker: '王建国', text: '同意。另外 API 网关的升级也需要在 Q3 完成，否则后续的微服务拆分会有阻碍。' },
  { speaker: '陈雨晴', text: '设计侧，首页改版的方案已经准备好了，预计需要 2 周的设计周期。' },
  { speaker: '张明远', text: '好的，那我们把搜索优化列为 P0，API 网关升级 P0，首页改版 P1。大家确认一下？' },
  { speaker: '赵文博', text: '确认。我来更新排期表，明天同步给所有干系人。' },
];

export function InMeeting({ meetingId, onLeave }: InMeetingProps) {
  const meeting = meetings.find(m => m.id === meetingId) || meetings[0];
  const prep = meetingPreps.find(p => p.meeting.id === meetingId);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [marks, setMarks] = useState<number[]>([]);
  const transcriptRef = useRef<HTMLDivElement>(null);

  // Auto-scroll transcript
  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcriptIndex]);

  // Simulate real-time transcript
  useEffect(() => {
    if (transcriptIndex >= transcriptLines.length) return;
    const timer = setTimeout(() => {
      setTranscriptIndex(prev => prev + 1);
    }, 3000 + Math.random() * 2000);
    return () => clearTimeout(timer);
  }, [transcriptIndex]);

  const handleMark = () => {
    setMarks(prev => [...prev, transcriptIndex]);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950">
      <Watermark className="text-white" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-slate-900/80 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <button onClick={onLeave} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-slate-400 transition-colors hover:bg-white/10 hover:text-white">
            <ChevronLeft className="h-4 w-4" />离开会议
          </button>
          <div className="h-4 w-px bg-white/20" />
          <h3 className="text-sm font-medium text-white">{meeting.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-red-500/20 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="text-xs font-medium text-red-400">录制中</span>
          </div>
          <span className="text-xs text-slate-400">{meeting.participants.length} 位参会人</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Video Area */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center p-4">
            <div className="grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
              {meeting.participants.map((p, i) => (
                <div key={i} className="relative flex aspect-video items-center justify-center rounded-xl bg-slate-800 ring-1 ring-white/10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white">
                    {p.avatar}
                  </div>
                  <div className="absolute bottom-2 left-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] text-white/80">{p.name}</div>
                  {i === 0 && <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-md bg-emerald-500/20"><Mic className="h-3 w-3 text-emerald-400" /></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 border-t border-white/10 bg-slate-900/50 py-4">
            <button onClick={() => setIsMuted(!isMuted)} className={cn('flex h-12 w-12 items-center justify-center rounded-full transition-all', isMuted ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white hover:bg-white/20')}>
              {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <button onClick={() => setIsVideoOn(!isVideoOn)} className={cn('flex h-12 w-12 items-center justify-center rounded-full transition-all', !isVideoOn ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white hover:bg-white/20')}>
              {isVideoOn ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20">
              <Monitor className="h-5 w-5" />
            </button>
            <button onClick={handleMark} className="flex h-12 items-center gap-2 rounded-full bg-amber-500 px-5 text-sm font-semibold text-black transition-all hover:bg-amber-400 active:scale-95">
              <Zap className="h-4 w-4" />Mark 标记重点
            </button>
            <button onClick={onLeave} className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white transition-all hover:bg-red-600">
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Right: AI Panel */}
        <div className="hidden w-80 flex-col border-l border-white/10 bg-slate-900/50 xl:flex">
          {/* Agenda */}
          <div className="border-b border-white/10 p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-400" />
              <h4 className="text-sm font-semibold text-white">会议大纲</h4>
            </div>
            <div className="mt-2 space-y-1.5">
              {(prep?.agendaDetail || meeting.agenda).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500/20 text-[9px] font-semibold text-blue-400">{i + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Live Transcript */}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <Bot className="h-4 w-4 text-emerald-400" />
              <h4 className="text-sm font-semibold text-white">AI 语音转文字</h4>
              <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />实时
              </span>
            </div>
            <div ref={transcriptRef} className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {transcriptLines.slice(0, transcriptIndex).map((line, i) => (
                  <div key={i} className={cn('rounded-lg px-3 py-2', marks.includes(i) ? 'bg-amber-500/10 ring-1 ring-amber-500/30' : 'bg-white/5')}>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-blue-400">{line.speaker}</span>
                      {marks.includes(i) && <Zap className="h-3 w-3 text-amber-400" />}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-300">{line.text}</p>
                  </div>
                ))}
                {transcriptIndex < transcriptLines.length && (
                  <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-500">
                    <span className="flex gap-0.5">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '0ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '150ms' }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-500" style={{ animationDelay: '300ms' }} />
                    </span>
                    正在识别...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Marks Count */}
          {marks.length > 0 && (
            <div className="border-t border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-xs text-amber-400">
                <Zap className="h-3.5 w-3.5" />
                <span>已标记 {marks.length} 个重点</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
