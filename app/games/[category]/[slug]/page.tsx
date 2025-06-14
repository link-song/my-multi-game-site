import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Metadata } from 'next';

function getGame(category: string, slug: string) {
  const file = path.join(process.cwd(), 'games', category, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const game = getGame(category, slug);
  
  if (!game) {
    return {
      title: 'Game Not Found - FreeOnlineGamesHub',
      description: 'The requested game could not be found. Browse our collection of free online games.',
    };
  }
  
  return {
    title: `${game.title} - Free Online Game | FreeOnlineGamesHub`,
    description: game.description || `Play ${game.title} online for free. No download required, instant play in your browser!`,
    keywords: `${game.title}, ${game.category} games, free online games, browser games, ${game.tags?.join(', ') || ''}`,
    alternates: {
      canonical: `/games/${category}/${slug}`,
    },
    openGraph: {
      title: `${game.title} - Free Online Game`,
      description: game.description || `Play ${game.title} online for free. No download required, instant play in your browser!`,
      url: `https://freeonlinegameshub.com/games/${category}/${slug}`,
      siteName: 'FreeOnlineGamesHub',
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
      description: game.description || `Play ${game.title} online for free. No download required, instant play in your browser!`,
      images: game.coverImage ? [game.coverImage] : [],
    },
  };
}

export default async function GameDetailPage(props: any) {
  // Next.js 15 正确的参数处理方式
  const resolvedProps = await props;
  const params = await resolvedProps.params;
  
  const game = getGame(params.category, params.slug);
  if (!game) return <div className="p-8 text-white">Game not found</div>;
  return (
    <div className="max-w-5xl mx-auto p-4 bg-gradient-to-br from-[#181a2a] to-[#1a0933] min-h-screen rounded-2xl shadow-2xl">
      <nav className="text-sm text-blue-200 mb-4 flex items-center gap-2">
        <Link href="/" className="hover:text-pink-400 font-bold">Home</Link>
        <span className="mx-1">›</span>
        <Link href={`/games/${game.category}`} className="hover:text-yellow-400 capitalize font-bold">{game.category}</Link>
        <span className="mx-1">›</span>
        <span className="text-white font-bold">{game.title}</span>
      </nav>
      <div className="flex flex-col md:flex-row bg-gradient-to-br from-[#23244d] to-[#2a1a3c] rounded-xl shadow-lg overflow-hidden mb-8 border border-[#2e2e5e]">
        <div className="flex-1 bg-gray-900 flex items-center justify-center min-h-[360px]">
          <iframe
            src={game.iframeUrl}
            className="w-full h-[400px] md:h-[480px] rounded-lg border-2 border-blue-900 shadow-xl"
            allowFullScreen
            title={game.title}
          />
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-pink-300">Description</h2>
        <div className="prose max-w-none text-gray-200 leading-relaxed">
          {game.description}
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-blue-300">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {game.tags.map((tag: string, index: number) => (
            <span
              key={tag + '-' + index}
              className="px-3 py-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full text-sm border border-blue-200 shadow"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      {game.updatedAt && (
        <div className="text-sm text-gray-400 mt-6 pt-4 border-t border-[#2e2e5e]">
          Last updated: {new Date(game.updatedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
} 