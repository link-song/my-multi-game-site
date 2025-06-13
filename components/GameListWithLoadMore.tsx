'use client';
import { useState } from 'react';
import GameCard from './GameCard';

interface Game {
  slug?: string;
  // 其它游戏属性...
}

interface Props {
  games: Game[];
}

const GAMES_PER_ROW = 4;
const ROWS_PER_LOAD = 5;

export default function GameListWithLoadMore({ games }: Props) {
  const totalRows = Math.ceil(games.length / GAMES_PER_ROW);
  const [visibleRows, setVisibleRows] = useState(ROWS_PER_LOAD);
  const gamesToShow = games.slice(0, visibleRows * GAMES_PER_ROW);

  return (
    <>
      <div
        className="grid gap-6"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          width: '100%'
        }}
      >
        {gamesToShow.map(game => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
      {visibleRows < totalRows && (
        <div className="flex justify-center mt-8">
          <button
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
            onClick={() => setVisibleRows(v => v + ROWS_PER_LOAD)}
            aria-label="Load more games"
          >
            More
          </button>
        </div>
      )}
    </>
  );
} 