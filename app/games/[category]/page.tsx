import fs from 'fs/promises';
import path from 'path';
import GameCard from '../../../components/GameCard';
import type { Metadata } from 'next';

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

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const games = await getGamesByCategory(category);
  
  const categoryDescriptions = {
    action: 'Play exciting action games with fast-paced gameplay, combat, and adventure.',
    adventure: 'Explore amazing worlds and embark on epic adventures in our adventure game collection.',
    puzzle: 'Challenge your mind with brain-teasing puzzle games and logic challenges.',
    sports: 'Compete in various sports games including racing, football, basketball, and more.',
    io: 'Play multiplayer IO games and compete with players from around the world.',
    casual: 'Enjoy relaxing casual games perfect for quick entertainment and fun.',
  };
  
  const description = categoryDescriptions[category as keyof typeof categoryDescriptions] || 
    `Play the best ${category} games online for free. No download required, instant play!`;
  
  return {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Games - Free Online ${category.charAt(0).toUpperCase() + category.slice(1)} Games`,
    description: description,
    keywords: `${category} games, free ${category} games, online ${category} games, browser ${category} games, ${category} gaming`,
    alternates: {
      canonical: `/games/${category}`,
    },
    openGraph: {
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Games - Free Online ${category.charAt(0).toUpperCase() + category.slice(1)} Games`,
      description: description,
      url: `https://freeonlinegameshub.com/games/${category}`,
      siteName: 'FreeOnlineGamesHub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Games - Free Online ${category.charAt(0).toUpperCase() + category.slice(1)} Games`,
      description: description,
    },
  };
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