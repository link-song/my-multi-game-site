"use client";
import React from 'react';
import Sidebar from './Sidebar';
import { useSidebar } from './SidebarContext';

export default function SidebarWrapper({ categories, lang }: { categories: string[], lang?: string }) {
  const { sidebarVisible } = useSidebar();
  
  if (!sidebarVisible) {
    return <div className="w-0 h-full overflow-hidden" />;
  }
  
  return (
    <div className="h-full w-full">
      <Sidebar categories={categories} lang={lang} />
    </div>
  );
} 