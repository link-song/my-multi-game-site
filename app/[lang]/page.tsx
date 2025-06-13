import { getAllGames, getPopularTags } from '../../lib/games';
import Sidebar from '../../components/Sidebar';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import GameListWithLoadMore from '../../components/GameListWithLoadMore';

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