'use client';

import { useState, useEffect, useCallback } from 'react';

interface ScrollToTopProps {
  threshold?: number; // 显示按钮的滚动阈值（像素）
  smooth?: boolean;   // 是否使用平滑滚动
  className?: string; // 自定义样式类
  debounceMs?: number; // 防抖延迟时间
}

export default function ScrollToTop({ 
  threshold = 800, // 默认一个屏幕高度
  smooth = true,
  className = '',
  debounceMs = 100
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  // 防抖函数
  const debounce = useCallback((func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  // 监听滚动事件
  useEffect(() => {
    const toggleVisibility = debounce(() => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, debounceMs);

    // 添加滚动监听器
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    // 清理函数
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold, debounceMs, debounce]);

  // 滚动到顶部
  const scrollToTop = useCallback(() => {
    if (isScrolling) return; // 防止重复点击

    setIsScrolling(true);

    let lastScrollY = window.scrollY;
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    // 兜底多方式强制滚动
    const forceScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: smooth && 'scrollBehavior' in document.documentElement.style ? 'smooth' : 'auto' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    const checkScrollComplete = () => {
      if (window.scrollY === 0) {
        setIsScrolling(false);
        window.removeEventListener('scroll', checkScrollComplete);
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      } else if (window.scrollY === lastScrollY) {
        // 滚动位置没有变化，说明滚动失败，兜底
        setIsScrolling(false);
        window.removeEventListener('scroll', checkScrollComplete);
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      } else {
        lastScrollY = window.scrollY;
        // 继续等待
      }
    };

    window.addEventListener('scroll', checkScrollComplete, { passive: true });

    // 兜底：500ms后强制恢复
    timeoutId = setTimeout(() => {
      setIsScrolling(false);
      window.removeEventListener('scroll', checkScrollComplete);
      clearInterval(intervalId);
    }, 500);

    // 多次尝试强制滚动，兼容所有主流浏览器
    forceScrollToTop();
    intervalId = setInterval(forceScrollToTop, 50);
    setTimeout(() => clearInterval(intervalId), 400);
  }, [smooth, isScrolling]);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          disabled={isScrolling}
          className={`
            fixed bottom-6 right-6 z-50
            w-12 h-12 rounded-full
            bg-gradient-to-r from-blue-500 to-purple-600
            hover:from-blue-600 hover:to-purple-700
            disabled:from-gray-400 disabled:to-gray-500
            shadow-lg hover:shadow-xl
            transition-all duration-300 ease-in-out
            transform hover:scale-110 active:scale-95
            flex items-center justify-center
            text-white
            opacity-0 animate-fade-in
            ${className}
          `}
          aria-label="返回顶部"
          title="返回顶部"
          style={{
            animation: 'fadeInUp 0.3s ease-out forwards'
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${isScrolling ? 'animate-spin' : ''}`}
          >
            <polyline points="18,15 12,9 6,15"></polyline>
          </svg>
        </button>
      )}
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
} 