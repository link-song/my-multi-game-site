import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About FreeOnlineGamesHub - Gaming Platform',
  description: 'Learn about FreeOnlineGamesHub - the ultimate destination for free online games. Discover our gaming library, features, and why millions choose us for their gaming entertainment.',
  keywords: 'about FreeOnlineGamesHub, online gaming platform, free games, gaming community, browser games',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About FreeOnlineGamesHub - Gaming Platform',
    description: 'Learn about FreeOnlineGamesHub - the ultimate destination for free online games. Discover our gaming library, features, and why millions choose us for their gaming entertainment.',
    url: 'https://freeonlinegameshub.com/about',
    siteName: 'FreeOnlineGamesHub',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'About FreeOnlineGamesHub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About FreeOnlineGamesHub - Gaming Platform',
    description: 'Learn about FreeOnlineGamesHub - the ultimate destination for free online games. Discover our gaming library, features, and why millions choose us for their gaming entertainment.',
    images: ['/og-image.jpg'],
  },
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6 text-pink-300">About FreeOnlineGamesHub</h1>
      <p className="mb-4 text-lg">
        Welcome to <Link href="/" className="font-semibold text-blue-300 hover:underline">FreeOnlineGamesHub</Link> – the heart of free online fun! Enjoy our exclusive collection of browser games, all in one place.
      </p>
      <p className="mb-4">
        Our gaming library covers a wide range of genres: action, adventure, strategy, simulation, puzzle, sports, IO, casual, and more. Whether you love casual arcade games or crave challenging strategy and skill-based games, we have something for everyone. It doesn't matter if you're a beginner or a master gamer – you'll find games to enjoy here.
      </p>
      <p className="mb-4">
        Play solo, with friends, or connect with players from all around the world. Enjoy unlimited fun, chat, comment, and share your joy with a vibrant gaming community.
      </p>
      <p className="mb-4">
        Best of all, you don't need to register or download any software. Start playing instantly on your desktop, laptop, Chromebook, tablet, or phone. Experience action-packed gameplay and high-quality graphics that load quickly and smoothly.
      </p>
      <p className="text-blue-200 font-semibold mt-8">Start your adventure now at FreeOnlineGamesHub.com!</p>
    </main>
  );
} 