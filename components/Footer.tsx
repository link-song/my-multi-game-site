import Link from 'next/link';

export default function Footer({ lang }: { lang: string }) {
  return (
    <footer className="w-full bg-gradient-to-r from-[#23244d] via-[#2a1a3c] to-[#181a2a] text-gray-300 py-8 mt-8 border-t-2 border-[#2e2e5e] rounded-t-2xl shadow-inner">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-2">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <Link href="/" className="hover:underline text-pink-300 font-semibold">Home</Link>
          <Link href="/games/action" className="hover:underline text-blue-300">Action</Link>
          <Link href="/games/puzzle" className="hover:underline text-yellow-300">Puzzle</Link>
          <Link href="/games/adventure" className="hover:underline text-green-300">Adventure</Link>
          <Link href="/games/sports" className="hover:underline text-purple-300">Sports</Link>
          <Link href="/games/io" className="hover:underline text-cyan-300">IO</Link>
          <Link href="/games/casual" className="hover:underline text-orange-300">Casual</Link>
          <Link href="/games/other" className="hover:underline text-pink-300">Other</Link>
          <Link href="/about" className="hover:underline text-blue-300">About</Link>
        </div>
        <div className="text-sm mt-2 md:mt-0 text-gray-400">© 2025 FreeOnlineGamesHub.com. Created by Link. All rights reserved.</div>
      </div>
    </footer>
  );
} 