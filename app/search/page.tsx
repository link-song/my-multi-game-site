import { searchGames } from '../../lib/games';
import GameCard from '../../components/GameCard';
import GameSearch from '../../components/GameSearch';

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