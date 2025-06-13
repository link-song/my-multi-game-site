import fs from 'fs/promises';
import path from 'path';
import GameCard from '../../../components/GameCard';

async function getGamesByCategory(category: string) {
  const dir = path.join(process.cwd(), 'games', category);
  try {
    const files = await fs.readdir(dir);
    return await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const data = await fs.readFile(path.join(dir, file), 'utf-8');
          return JSON.parse(data);
        })
    );
  } catch {
    return [];
  }
}

export default async function CategoryPage(props: any) {
  // Next.js 15 正确的参数处理方式
  const resolvedProps = await props;
  const params = await resolvedProps.params;
  
  const games = await getGamesByCategory(params.category);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 capitalize text-white">{params.category} Games</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {games.map(game => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </div>
  );
} 