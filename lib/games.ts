import fs from 'fs';
import path from 'path';

// 游戏数据接口定义
interface GameData {
  title: string;
  category: string;
  tags: string[];
  iframeUrl: string;
  coverImage: string;
  description: string;
  updatedAt?: string;
  slug?: string;
}

// 从文件系统读取所有游戏数据
function loadAllGames(): GameData[] {
  const games: GameData[] = [];
  const gamesRoot = path.join(process.cwd(), 'games');
  
  // 获取所有分类目录
  const categories = fs.readdirSync(gamesRoot, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  // 遍历每个分类目录
  for (const category of categories) {
    const categoryPath = path.join(gamesRoot, category);
    const files = fs.readdirSync(categoryPath);
    
    // 读取每个分类下的所有 JSON 文件
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filePath = path.join(categoryPath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const gameData: GameData = JSON.parse(content);
          
          // 添加 slug 字段（从文件名获取）
          const slug = file.replace('.json', '');
          games.push({
            ...gameData,
            slug
          });
        } catch (error) {
          console.error(`Error reading game file ${file}:`, error);
        }
      }
    }
  }
  
  return games;
}

// 缓存游戏数据
let cachedGames: GameData[] | null = null;

function getGames(): GameData[] {
  if (!cachedGames) {
    cachedGames = loadAllGames();
  }
  return cachedGames;
}

// 获取所有游戏和分类
export function getAllGames() {
  const games = getGames();
  const categories = Array.from(new Set(games.map(g => g.category)));
  return { games, categories };
}

// 根据分类和 slug 获取特定游戏
export function getGameBySlug(category: string, slug: string): GameData | undefined {
  const games = getGames();
  return games.find(g => g.category === category && g.slug === slug);
}

// 获取所有游戏路径（用于静态生成）
export function getAllGameSlugs() {
  const games = getGames();
  return games.map(g => ({
    params: { 
      category: g.category, 
      slug: g.slug 
    }
  }));
}

// 根据分类获取游戏
export function getGamesByCategory(category: string): GameData[] {
  const games = getGames();
  return games.filter(g => g.category === category);
}

// 搜索游戏
export function searchGames(query: string): GameData[] {
  const games = getGames();
  const lowerQuery = query.toLowerCase();
  return games.filter(game =>
    game.title.toLowerCase().includes(lowerQuery) ||
    game.description.toLowerCase().includes(lowerQuery) ||
    game.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    game.category.toLowerCase().includes(lowerQuery)
  );
}

// 获取热门标签
export function getPopularTags(limit: number = 20): string[] {
  const games = getGames();
  const tagCount: { [key: string]: number } = {};
  
  games.forEach(game => {
    game.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCount)
    .sort(([,a], [,b]) => b - a)
    .slice(0, limit)
    .map(([tag]) => tag);
}
