import { getGameBySlug, getAllGameSlugs, getGamesByCategory, GameData } from '../../../../../lib/games';
import type { Metadata } from 'next';
import Link from 'next/link';

export async function generateStaticParams({ params }: { params: { lang?: string } }) {
  return getAllGameSlugs().map(({ params }) => ({ ...params, lang: params.lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; category: string; slug: string }> }): Promise<Metadata> {
  const { lang, category, slug } = await params;
  const game = getGameBySlug(category, slug, lang);
  
  if (!game) {
    return {
      title: 'Game Not Found - FreeOnlineGamesHub',
      description: 'The requested game could not be found. Browse our collection of free online games.',
    };
  }
  
  const langNames = {
    en: 'English',
    zh: 'Chinese',
    fr: 'French',
    es: 'Spanish',
    de: 'German'
  };
  
  const langName = langNames[lang as keyof typeof langNames] || 'English';
  
  return {
    title: `${game.title} - Free Online Game | FreeOnlineGamesHub`,
    description: game.description || `Play ${game.title} online for free in ${langName}. No download required, instant play in your browser!`,
    keywords: `${game.title}, ${game.category} games, free online games, browser games, ${langName} games, ${game.tags?.join(', ') || ''}`,
    alternates: {
      canonical: `/${lang}/games/${category}/${slug}`,
      languages: {
        'en': `/en/games/${category}/${slug}`,
        'zh': `/zh/games/${category}/${slug}`,
        'fr': `/fr/games/${category}/${slug}`,
        'es': `/es/games/${category}/${slug}`,
        'de': `/de/games/${category}/${slug}`,
      },
    },
    openGraph: {
      title: `${game.title} - Free Online Game`,
      description: game.description || `Play ${game.title} online for free in ${langName}. No download required, instant play in your browser!`,
      url: `https://freeonlinegameshub.com/${lang}/games/${category}/${slug}`,
      siteName: 'FreeOnlineGamesHub',
      locale: lang === 'en' ? 'en_US' : `${lang}_${lang.toUpperCase()}`,
      images: game.coverImage ? [
        {
          url: game.coverImage,
          width: 800,
          height: 600,
          alt: game.title,
        }
      ] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - Free Online Game`,
      description: game.description || `Play ${game.title} online for free in ${langName}. No download required, instant play in your browser!`,
      images: game.coverImage ? [game.coverImage] : [],
    },
  };
}

export default async function GameDetail({ params }: { params: Promise<{ lang: string; category: string; slug: string }> }) {
  const { lang, category, slug } = await params;
  const game: GameData | undefined = getGameBySlug(category, slug, lang);
  const relatedGames: GameData[] = game ? getGamesByCategory(game.category, lang).filter((g: GameData) => g.slug !== game.slug).slice(0, 8) : [];
  if (!game) return <div>Game not found</div>;
  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* 面包屑导航 */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href={`/${lang}`} className="hover:text-blue-600">Home</Link>
        <span className="mx-2">›</span>
        <Link href={`/${lang}/games/${game.category}`} className="hover:text-blue-600 capitalize">{game.category}</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-700">{game.title}</span>
      </nav>
      {/* 卡片式主内容区 */}
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        {/* 左侧：游戏iframe */}
        <div className="flex-1 bg-gray-100 flex items-center justify-center min-h-[360px]">
          <iframe
            src={game.iframeUrl}
            className="w-full h-[400px] md:h-[480px] rounded-lg border-2 border-gray-200"
            allowFullScreen
            title={game.title}
          />
        </div>
        {/* 右侧：封面和按钮 */}
        <div className="w-full md:w-80 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
          <img src={game.coverImage} alt={game.title} className="w-40 h-40 object-cover rounded-lg shadow mb-4" />
          <a
            href={game.iframeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold shadow hover:bg-blue-700 transition"
          >
            ▶ PLAY GAME
          </a>
        </div>
      </div>
      {/* 游戏描述 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          {game.description}
        </div>
      </div>
      {/* 标签区块 */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm border border-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {/* 更新时间 */}
      {game.updatedAt && (
        <div className="text-sm text-gray-500 mt-6 pt-4 border-t">
          Last updated: {new Date(game.updatedAt).toLocaleDateString()}
        </div>
      )}
      {/* 相关游戏推荐 */}
      {relatedGames.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Related Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedGames.map((g: GameData) => (
              <Link
                key={g.slug}
                href={`/${lang}/games/${g.category}/${g.slug}`}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition p-2 border border-gray-100"
              >
                <img src={g.coverImage} alt={g.title} className="w-full h-24 object-cover rounded mb-2" />
                <div className="text-sm font-medium text-gray-800 truncate">{g.title}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 