"use client";
import Link from 'next/link';
import GameSearch from './GameSearch';
import LanguageSwitcher from './LanguageSwitcher';
import { useSidebar } from './SidebarContext';

export default function TopBar({ lang }: { lang?: string }) {
  // 没有 lang 或 lang 为 'en' 时跳转到 /，其他语言跳转到 /[lang]
  const homeHref = !lang || lang === 'en' ? '/' : `/${lang}`;
  const { toggleSidebar } = useSidebar();
  return (
    <header className="w-full bg-gradient-to-r from-[#23244d] via-[#2a1a3c] to-[#181a2a] shadow-lg flex items-center px-6 py-3 mb-4 rounded-b-2xl border-b-2 border-[#2e2e5e] relative">
      {/* 左侧：菜单和Logo */}
      <div className="flex items-center gap-2 min-w-0" style={{ flex: 1 }}>
        <button
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-pink-500/30 text-blue-300 border border-blue-700 mr-2 shadow"
          style={{ fontWeight: 'bold', fontSize: 22 }}
        >
          <span className="block" style={{ fontFamily: 'monospace' }}>≡</span>
        </button>
        <Link href={homeHref} className="text-3xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight whitespace-nowrap">
          FreeOnlineGamesHub
        </Link>
      </div>
      {/* 居中搜索框，绝对定位于中间 */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <GameSearch />
      </div>
      {/* 右侧预留空间，保持对称 */}
      <div className="flex items-center gap-2 min-w-0" style={{ flex: 1, visibility: 'hidden' }}>
        <span className="text-3xl font-extrabold">占位</span>
      </div>
    </header>
  );
} 