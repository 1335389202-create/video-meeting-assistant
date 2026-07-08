'use client';

import { useState } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  CheckSquare,
  Video,
  ChevronRight,
  FolderOpen,
  BarChart3,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type PageKey = 'dashboard' | 'pre-meeting' | 'post-meeting' | 'documents' | 'todos' | 'analytics';

interface SidebarProps {
  activePage: PageKey;
  onNavigate: (page: PageKey) => void;
}

const navItems: { key: PageKey; label: string; icon: React.ElementType; section?: string }[] = [
  { key: 'dashboard', label: '工作台', icon: LayoutDashboard, section: '核心' },
  { key: 'pre-meeting', label: '会前准备', icon: ClipboardList },
  { key: 'post-meeting', label: '会后跟进', icon: CheckSquare },
  { key: 'documents', label: '文档库', icon: FolderOpen, section: '资源' },
  { key: 'todos', label: '待办事项', icon: CheckSquare },
  { key: 'analytics', label: '效能洞察', icon: BarChart3, section: '分析' },
];

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-200 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
          <Video className="h-4 w-4 text-white" />
        </div>
        <span className="text-base font-semibold text-slate-900">视频会议助手</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-0.5">
          {navItems.map((item, idx) => {
            const isActive = activePage === item.key;
            const Icon = item.icon;
            const showSection = item.section && (idx === 0 || navItems[idx - 1].section !== item.section);
            return (
              <li key={item.key}>
                {showSection && (
                  <div className={cn('px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-widest text-slate-400', idx === 0 && 'pt-0')}>
                    {item.section}
                  </div>
                )}
                <button
                  onClick={() => { onNavigate(item.key); setMobileOpen(false); }}
                  className={cn(
                    'group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <Icon className={cn('h-[18px] w-[18px] transition-colors', isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600')} />
                  {item.label}
                  {isActive && <ChevronRight className="ml-auto h-4 w-4 text-blue-400" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">ZM</div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-slate-900">张明远</p>
            <p className="truncate text-xs text-slate-500">产品经理</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white shadow-sm lg:hidden"
      >
        <Menu className="h-5 w-5 text-slate-600" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 flex h-full w-64 flex-col bg-white shadow-xl animate-in slide-in-from-left duration-200">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100"
            >
              <X className="h-4 w-4" />
            </button>
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col border-r border-slate-200 bg-white lg:flex">
        {navContent}
      </aside>
    </>
  );
}
