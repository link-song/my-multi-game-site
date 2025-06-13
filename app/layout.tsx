import '../styles/globals.css';
import TopBar from '../components/TopBar';
import SidebarWrapper from '../components/SidebarWrapper';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import React from 'react';
import { getAllGames } from '../lib/games';
import { notFound } from 'next/navigation';
import { SidebarProvider } from '../components/SidebarContext';
import DynamicLayout from '../components/DynamicLayout';
import Script from 'next/script';

export default function RootLayout({ children, params }: { children: React.ReactNode, params?: { lang?: string } }) {
  // 判断是否为多语言页面
  const lang = params?.lang;
  const { categories } = getAllGames();
  const supportedLangs = ['en', 'zh', 'fr', 'es', 'de'];
  if (lang && !supportedLangs.includes(lang)) notFound();

  return (
    <html lang={lang || 'en'} className="w-full h-full">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RJFSSGBY99"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RJFSSGBY99');
          `}
        </Script>
      </head>
      <body className="w-full h-full bg-[#181a2a] min-h-screen flex flex-col min-h-screen">
        <SidebarProvider>
          <TopBar lang={lang || 'en'} />
          <div className="flex-1 w-full max-w-full mx-auto flex items-stretch">
            {/* 毛玻璃主内容区 */}
            <div className="flex-1 backdrop-blur-md bg-white/5 rounded-2xl shadow-xl m-2">
              <DynamicLayout categories={categories} lang={lang || 'en'}>
                {children}
              </DynamicLayout>
            </div>
          </div>
        </SidebarProvider>
        <Footer lang={lang || 'en'} />
        <ScrollToTop />
      </body>
    </html>
  );
} 