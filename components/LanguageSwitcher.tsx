"use client";
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher({ lang }: { lang: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (targetLang: string) => {
    if (targetLang === 'en') {
      // 切换到英文，去掉语言前缀，跳转到 /
      router.push('/');
    } else {
      // 切换到其他语言，添加前缀
      router.push(`/${targetLang}`);
    }
  };

  return (
    <div className="space-x-2">
      <button className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleSwitch('en')}>EN</button>
      <button className={`px-2 py-1 rounded ${lang === 'zh' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} onClick={() => handleSwitch('zh')}>中文</button>
      {/* 可扩展更多语言 */}
    </div>
  );
}
