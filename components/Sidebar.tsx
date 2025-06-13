"use client";
import Link from 'next/link';
import { useSidebar } from './SidebarContext';

export default function Sidebar({ categories, lang }: { categories: string[], lang?: string }) {
  const { sidebarVisible } = useSidebar();
  
  return (
    <aside className="bg-gradient-to-b from-[#23244d] to-[#1a0933] shadow-xl h-full p-4 flex flex-col gap-2 rounded-2xl m-2 border border-[#2e2e5e]">
      <h2 className="text-xl font-extrabold mb-2 text-white tracking-wide">Categories</h2>
      <nav className="flex flex-col gap-1">
        {categories.map(category => (
          <Link
            key={category}
            href={`/games/${category}`}
            className="px-3 py-2 rounded-lg hover:bg-pink-500/30 text-gray-200 font-semibold transition-colors duration-150 ease-out capitalize"
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
