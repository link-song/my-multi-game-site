'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

const MAX_SUGGESTIONS = 7;

export default function GameSearch() {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number} | null>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 获取TopBar高度
  useEffect(() => {
    const header = document.querySelector('header');
    if (header) setTopBarHeight(header.getBoundingClientRect().height);
  }, []);

  // 计算建议层位置
  useEffect(() => {
    if (showSuggestions && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [showSuggestions]);

  // 点击外部关闭建议和遮罩
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setShowSuggestions(false);
        setShowOverlay(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // 输入变化时防抖请求
  useEffect(() => {
    if (inputValue.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      setShowOverlay(false);
      setTotalResults(0);
      return;
    }
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/search?query=${encodeURIComponent(inputValue)}`);
      const data = await res.json();
      setSuggestions(data.slice(0, MAX_SUGGESTIONS));
      setTotalResults(data.length);
      setShowSuggestions(true);
      setShowOverlay(true);
      setLoading(false);
    }, 300);
  }, [inputValue]);

  // 渲染建议和More
  const renderSuggestions = () => {
    if (loading) {
      return <div className="p-4 text-center text-blue-200">Loading...</div>;
    }
    if (inputValue.length >= 2 && suggestions.length === 0) {
      return <div className="p-4 text-center text-blue-400">No results</div>;
    }
    return (
      <>
        {suggestions.map((s: any) => (
          <div
            key={s.slug}
            className="px-4 py-3 cursor-pointer hover:bg-blue-900/60 text-white rounded-2xl transition text-lg font-medium"
            onMouseDown={() => {
              router.push(`/games/${encodeURIComponent(s.category)}/${encodeURIComponent(s.slug)}`);
              setShowSuggestions(false);
              setShowOverlay(false);
              setInputValue('');
            }}
          >
            {s.title}
          </div>
        ))}
        {totalResults > MAX_SUGGESTIONS && (
          <div
            className="px-4 py-3 cursor-pointer hover:bg-blue-700/70 text-blue-200 font-semibold rounded-2xl transition text-center text-lg"
            onMouseDown={() => {
              router.push(`/search?query=${encodeURIComponent(inputValue)}`);
              setShowSuggestions(false);
              setShowOverlay(false);
              setInputValue('');
            }}
          >
            More
          </div>
        )}
      </>
    );
  };

  // 遮罩层 Portal（只覆盖主内容区）
  const overlayPortal = showOverlay && typeof window !== 'undefined'
    ? createPortal(
        <div
          className="fixed left-0 right-0 bottom-0 z-[9999] bg-black/60 backdrop-blur-sm animate-fade-in"
          style={{ top: topBarHeight, transition: 'opacity 0.3s' }}
          onClick={() => {
            setShowSuggestions(false);
            setShowOverlay(false);
          }}
        />,
        document.body
      )
    : null;

  // 建议下拉层 Portal
  const dropdownPortal = showSuggestions && inputValue.length >= 2 && dropdownPos && typeof window !== 'undefined'
    ? createPortal(
        <div
          className="bg-[#23244d]/95 rounded-2xl shadow-2xl z-[9999] backdrop-blur-md border border-white/10 animate-fade-in"
          style={{
            position: 'absolute',
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width,
            minWidth: 200,
            maxWidth: 480
          }}
        >
          {renderSuggestions()}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {overlayPortal}
      <div className="relative w-96 flex items-center" ref={containerRef}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search games..."
          className="w-full px-4 py-2 pr-10 bg-white/30 text-white placeholder:text-white/70 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition backdrop-blur-md border border-white/20"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) { setShowSuggestions(true); setShowOverlay(true); } }}
          autoComplete="off"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
      </div>
      {dropdownPortal}
      {/* 动画样式 */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fadeInOverlay 0.3s;
        }
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
