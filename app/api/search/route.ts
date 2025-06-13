import { searchGames } from '../../../lib/games';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const results = searchGames(query).map(g => ({
    title: g.title,
    slug: g.slug,
    category: g.category,
  }));
  return Response.json(results);
} 