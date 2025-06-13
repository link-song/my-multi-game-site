"use client";
import React from 'react';
import { useSidebar } from './SidebarContext';
import SidebarWrapper from './SidebarWrapper';

interface DynamicLayoutProps {
  children: React.ReactNode;
  categories: string[];
  lang: string;
}

export default function DynamicLayout({ children, categories, lang }: DynamicLayoutProps) {
  const { sidebarVisible } = useSidebar();

  return (
    <div className="flex flex-1 w-full max-w-full mx-auto">
      {/* 侧边栏容器 - 根据可见性动态调整宽度 */}
      <div 
        className={`flex-shrink-0 overflow-hidden transition-all duration-100 ease-in-out ${
          sidebarVisible ? 'w-56' : 'w-0'
        }`}
      >
        <SidebarWrapper categories={categories} lang={lang} />
      </div>
      
      {/* 主内容区域 - 动态填满剩余空间 */}
      <main className="flex-1 p-6 w-full overflow-hidden">
        {children}
      </main>
    </div>
  );
} 