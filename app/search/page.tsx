import { searchGames } from '../../lib/games';
import GameCard from '../../components/GameCard';
import GameSearch from '../../components/GameSearch';
import type { Metadata } from 'next';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ query?: string }> }): Promise<Metadata> {
  const params = await searchParams;
  const query = params.query || '';
  
  if (query) {
    return {
      title: `Search Results for "${query}" - Free Online Games`,
      description: `Search results for "${query}" - Find and play free online games matching your search. Browse through our collection of action, puzzle, sports, and more games.`,
      keywords: `${query}, free online games, search games, browser games, ${query} games`,
      alternates: {
        canonical: `/search?query=${encodeURIComponent(query)}`,
      },
      openGraph: {
        title: `Search Results for "${query}" - Free Online Games`,
        description: `Search results for "${query}" - Find and play free online games matching your search. Browse through our collection of action, puzzle, sports, and more games.`,
        url: `https://freeonlinegameshub.com/search?query=${encodeURIComponent(query)}`,
        siteName: 'FreeOnlineGamesHub',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `Search Results for "${query}" - Free Online Games`,
        description: `Search results for "${query}" - Find and play free online games matching your search. Browse through our collection of action, puzzle, sports, and more games.`,
      },
    };
  }
  
  return {
    title: 'Search Games - Find Free Online Games',
    description: 'Search and discover free online games at FreeOnlineGamesHub. Find action, puzzle, sports, racing, and more games by searching our extensive game library.',
    keywords: 'search games, find games, free online games, game search, browser games',
    alternates: {
      canonical: '/search',
    },
    openGraph: {
      title: 'Search Games - Find Free Online Games',
      description: 'Search and discover free online games at FreeOnlineGamesHub. Find action, puzzle, sports, racing, and more games by searching our extensive game library.',
      url: 'https://freeonlinegameshub.com/search',
      siteName: 'FreeOnlineGamesHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Search Games - Find Free Online Games',
      description: 'Search and discover free online games at FreeOnlineGamesHub. Find action, puzzle, sports, racing, and more games by searching our extensive game library.',
    },
  };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const params = await searchParams;
  const query = params.query || '';
  const results = query.length >= 2 ? searchGames(query) : [];

  return (
    <main className="flex-1 p-6">
      <div className="flex justify-center mb-8">
        <GameSearch />
      </div>
      <h1 className="text-2xl font-bold mb-6 text-white">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.length === 0 ? (
          <div className="col-span-full text-gray-400 text-center">No results found.</div>
        ) : (
          results.map(game => (
            <GameCard key={game.slug} game={game} />
          ))
        )}
      </div>
    </main>
  );
} 