'use client';

import { useState } from 'react';
import { Sidebar, type PageKey } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Dashboard } from '@/components/dashboard';
import { PreMeeting } from '@/components/pre-meeting';
import { PostMeeting } from '@/components/post-meeting';
import { DocumentLibrary } from '@/components/document-library';
import { TodoList } from '@/components/todo-list';
import { InMeeting } from '@/components/in-meeting';
import { Analytics } from '@/components/analytics';

const pageTitles: Record<PageKey, string> = {
  'dashboard': '工作台',
  'pre-meeting': '会前准备',
  'post-meeting': '会后跟进',
  'documents': '文档库',
  'todos': '待办事项',
  'analytics': '效能洞察',
};

export default function Home() {
  const [activePage, setActivePage] = useState<PageKey>('dashboard');
  const [inMeetingId, setInMeetingId] = useState<string | null>(null);

  const handleEnterMeeting = (meetingId: string) => {
    setInMeetingId(meetingId);
  };

  const handleLeaveMeeting = () => {
    setInMeetingId(null);
  };

  // In-meeting full screen mode
  if (inMeetingId) {
    return <InMeeting meetingId={inMeetingId} onLeave={handleLeaveMeeting} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="flex flex-1 flex-col lg:ml-60">
        <Header pageTitle={pageTitles[activePage]} />

        <main className="flex-1 p-4 sm:p-6">
          <div className="mx-auto max-w-7xl">
            {activePage === 'dashboard' && (
              <Dashboard onOpenBooking={() => {}} onEnterMeeting={handleEnterMeeting} />
            )}
            {activePage === 'pre-meeting' && (
              <PreMeeting onEnterMeeting={handleEnterMeeting} />
            )}
            {activePage === 'post-meeting' && <PostMeeting />}
            {activePage === 'documents' && <DocumentLibrary />}
            {activePage === 'todos' && <TodoList />}
            {activePage === 'analytics' && <Analytics />}
          </div>
        </main>
      </div>
    </div>
  );
}
