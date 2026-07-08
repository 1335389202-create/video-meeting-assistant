'use client';

import { useState } from 'react';
import {
  Search, FileText, FileSpreadsheet, Presentation, Link2, File,
  Plus, Grid3X3, List, MoreHorizontal, Clock, Tag,
} from 'lucide-react';
import { documents, type DocItem } from '@/lib/mock-data';
import { Modal } from '@/components/modal';
import { Watermark } from '@/components/watermark';
import { cn } from '@/lib/utils';

type TabKey = 'knowledge' | 'minutes';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'knowledge', label: '知识库' },
  { key: 'minutes', label: '会议纪要存档' },
];

const typeIcons: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  pdf: { icon: FileText, color: 'text-red-500', bg: 'bg-red-50' },
  doc: { icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
  xlsx: { icon: FileSpreadsheet, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ppt: { icon: Presentation, color: 'text-amber-500', bg: 'bg-amber-50' },
  md: { icon: File, color: 'text-slate-500', bg: 'bg-slate-100' },
  link: { icon: Link2, color: 'text-violet-500', bg: 'bg-violet-50' },
};

function DocCard({ doc }: { doc: DocItem }) {
  const t = typeIcons[doc.type] || typeIcons.md;
  const Icon = t.icon;

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg', t.bg)}>
          <Icon className={cn('h-5 w-5', t.color)} />
        </div>
        <button className="flex h-7 w-7 items-center justify-center rounded-md text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-slate-100 hover:text-slate-500">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <h4 className="mt-3 text-sm font-semibold text-slate-900 line-clamp-1">{doc.name}</h4>
      {doc.meetingTitle && (
        <div className="mt-1.5 flex items-center gap-1">
          <Tag className="h-3 w-3 text-slate-400" />
          <span className="text-[11px] text-slate-500 line-clamp-1">{doc.meetingTitle}</span>
        </div>
      )}
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{doc.updatedAt}</span>
        <span>{doc.size}</span>
      </div>
    </div>
  );
}

export function DocumentLibrary() {
  const [activeTab, setActiveTab] = useState<TabKey>('knowledge');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocDesc, setNewDocDesc] = useState('');

  const filteredDocs = documents.filter(d => {
    if (d.category !== activeTab) return false;
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="relative space-y-6">
      <Watermark />

      <div>
        <h2 className="text-xl font-semibold text-slate-900">文档库</h2>
        <p className="mt-1 text-sm text-slate-500">知识库与会议纪要的统一管理中心</p>
      </div>

      {/* Top Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索文档..."
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button
          onClick={() => setShowNewModal(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />新建知识库/文档
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200',
              activeTab === tab.key ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            )}
          >
            {tab.label}
            <span className={cn('ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
              activeTab === tab.key ? 'bg-blue-50 text-blue-600' : 'bg-slate-200 text-slate-500'
            )}>
              {documents.filter(d => d.category === tab.key).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDocs.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="flex flex-col items-center py-12 text-center">
          <FileText className="h-8 w-8 text-slate-300" />
          <p className="mt-2 text-sm text-slate-500">暂无文档</p>
        </div>
      )}

      {/* New Doc Modal */}
      <Modal open={showNewModal} onClose={() => setShowNewModal(false)} title="新建知识库/文档">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">名称</label>
            <input
              type="text"
              value={newDocName}
              onChange={(e) => setNewDocName(e.target.value)}
              placeholder="输入文档或知识库名称..."
              className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">描述</label>
            <textarea
              value={newDocDesc}
              onChange={(e) => setNewDocDesc(e.target.value)}
              placeholder="简要描述..."
              rows={3}
              className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">类型</label>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {['知识库', '会议纪要', '技术方案'].map((t) => (
                <button key={t} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setShowNewModal(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">取消</button>
            <button onClick={() => setShowNewModal(false)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700">创建</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
