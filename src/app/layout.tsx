import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '视频会议助手',
  description: '轻量级视频会议管理工具 - 会前准备、会后跟进、纪要追踪',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}
