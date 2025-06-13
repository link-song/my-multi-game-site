import { getAllGames } from '../lib/games';
import GameListWithLoadMore from '../components/GameListWithLoadMore';

export default function Home() {
  const { games } = getAllGames();
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6 text-white">All Games</h1>
      <GameListWithLoadMore games={games} />
    </div>
  );
} 