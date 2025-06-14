import { getAllGames, getPopularTags } from '../../lib/games';
import Sidebar from '../../components/Sidebar';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import GameListWithLoadMore from '../../components/GameListWithLoadMore';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  
  const langNames = {
    en: 'English',
    zh: 'Chinese',
    fr: 'French',
    es: 'Spanish',
    de: 'German'
  };
  
  const langName = langNames[lang as keyof typeof langNames] || 'English';
  
  return {
    title: `Free Online Games - ${langName} | FreeOnlineGamesHub`,
    description: `Play thousands of free online games in ${langName} at FreeOnlineGamesHub. Action, adventure, puzzle, sports, and more games available. No download required, play instantly!`,
    keywords: `free online games, browser games, ${langName} games, action games, puzzle games, sports games, arcade games, casual games`,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en': '/en',
        'zh': '/zh',
        'fr': '/fr',
        'es': '/es',
        'de': '/de',
      },
    },
    openGraph: {
      title: `Free Online Games - ${langName} | FreeOnlineGamesHub`,
      description: `Play thousands of free online games in ${langName} at FreeOnlineGamesHub. Action, adventure, puzzle, sports, and more games available. No download required, play instantly!`,
      url: `https://freeonlinegameshub.com/${lang}`,
      siteName: 'FreeOnlineGamesHub',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Free Online Games - ${langName} | FreeOnlineGamesHub`,
      description: `Play thousands of free online games in ${langName} at FreeOnlineGamesHub. Action, adventure, puzzle, sports, and more games available. No download required, play instantly!`,
    },
  };
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const { games, categories } = getAllGames();
  const tags = getPopularTags(20);
  return (
    <div className="flex min-h-screen">
      <Sidebar categories={categories} lang={lang} />
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <LanguageSwitcher lang={lang} />
        </div>
        <GameListWithLoadMore games={games} />
      </main>
    </div>
  );
} 