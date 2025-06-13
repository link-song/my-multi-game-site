"use client";
import React from 'react';
import Link from 'next/link';

export default function GameCard({ game }: { game: any }) {
  return (
    <Link
      href={`/games/${game.category}/${game.slug}`}
      className="block bg-gradient-to-br from-[#23244d] to-[#2a1a3c] rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl hover:ring-2 hover:ring-pink-400 transition-all duration-200 border border-[#2e2e5e] overflow-hidden group"
      style={{ width: '100%', maxWidth: '300px' }}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover group-hover:opacity-80 transition"
        />
      </div>
      <div className="p-3 min-h-[80px]">
        <div className="font-bold text-lg text-white mb-1 truncate">{game.title}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {game.tags && game.tags.slice(0, 3).map((tag: string, i: number) => (
            <span
              key={tag + '-' + i}
              className="bg-gradient-to-r from-pink-500 to-blue-500 text-xs text-white px-2 py-0.5 rounded-full font-semibold shadow"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
