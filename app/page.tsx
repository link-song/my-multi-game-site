import { getAllGames } from '../lib/games';
import GameListWithLoadMore from '../components/GameListWithLoadMore';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Games - Play Free Games',
  description: 'Play thousands of free online games at FreeOnlineGamesHub. Action, adventure, puzzle, sports, racing, and more games available. No download required, play instantly in your browser!',
  keywords: 'free online games, browser games, action games, puzzle games, sports games, racing games, arcade games, casual games, no download games',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Free Online Games - Play Free Games',
    description: 'Play thousands of free online games at FreeOnlineGamesHub. Action, adventure, puzzle, sports, racing, and more games available. No download required, play instantly in your browser!',
    url: 'https://freeonlinegameshub.com',
    siteName: 'FreeOnlineGamesHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'FreeOnlineGamesHub - Free Online Games',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Games - Play Free Games',
    description: 'Play thousands of free online games at FreeOnlineGamesHub. Action, adventure, puzzle, sports, racing, and more games available. No download required, play instantly in your browser!',
    images: ['/og-image.jpg'],
  },
};

export default function Home() {
  const { games } = getAllGames();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-white">All Games</h1>
      <GameListWithLoadMore games={games} />
    </div>
  );
} 