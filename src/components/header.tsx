'use client';

import { Bell, Search, Settings, Sparkles, X, ExternalLink } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface HeaderProps {
  pageTitle: string;
}

export function Header({ pageTitle }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }));
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-sm sm:px-6 lg:pl-6">
      <div className="pl-12 lg:pl-0">
        <h1 className="text-lg font-semibold text-slate-900">{pageTitle}</h1>
        <p className="hidden text-xs text-slate-500 sm:block">{currentDate}</p>
      </div>

      <div className="flex items-center gap-2">
        <span className="mr-1 hidden text-sm font-medium text-slate-600 sm:inline">{currentTime}</span>

        {/* AI Search */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          {searchOpen && (
            <div className="absolute right-0 top-12 z-50 w-96 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/90 shadow-2xl backdrop-blur-xl">
                {/* Search Input */}
                <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索会议、文档、待办..."
                    className="flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                    autoFocus
                  />
                  <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="text-slate-400 hover:text-slate-600">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* AI Panel */}
                <div className="p-4">
                  <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-50 to-violet-50 p-4">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-700">AI 智能问答</p>
                      <p className="mt-0.5 text-[11px] text-slate-500">
                        {searchQuery ? `正在分析 "${searchQuery}" 相关内容...` : '输入问题，AI 帮你快速检索与总结'}
                      </p>
                    </div>
                  </div>

                  {/* Mock Results */}
                  <div className="mt-3 space-y-2">
                    {[
                      { title: '产品迭代需求评审会 纪要', source: '会议纪要', time: '今天 10:00' },
                      { title: 'Q3 产品迭代规划书', source: '知识库', time: '昨天' },
                      { title: '完成 API 接口文档 v2.0', source: '待办事项', time: '截止 7/11' },
                    ].map((r, i) => (
                      <button key={i} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-50">
                        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-slate-100">
                          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm text-slate-700">{r.title}</p>
                          <p className="text-[11px] text-slate-400">{r.source} · {r.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-3 border-t border-slate-100 pt-3 text-center">
                    <span className="text-[10px] text-slate-400">引用来源: 知识库 · 会议纪要 · 待办追踪</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>
        <button className="hidden h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 sm:flex">
          <Settings className="h-[18px] w-[18px]" />
        </button>
      </div>
    </header>
  );
}
