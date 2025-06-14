import { MetadataRoute } from 'next';
import { getAllGames, getAllGameSlugs } from '../lib/games';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://freeonlinegameshub.com';
  const { games, categories } = getAllGames();
  const supportedLangs = ['en', 'zh', 'fr', 'es', 'de'];
  
  const sitemap: MetadataRoute.Sitemap = [];

  // 添加静态页面
  sitemap.push({
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  });

  sitemap.push({
    url: `${baseUrl}/about`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  });

  // 添加多语言首页
  supportedLangs.forEach(lang => {
    sitemap.push({
      url: `${baseUrl}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // 添加分类页面
  categories.forEach(category => {
    // 默认分类页面
    sitemap.push({
      url: `${baseUrl}/games/${category}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // 多语言分类页面
    supportedLangs.forEach(lang => {
      sitemap.push({
        url: `${baseUrl}/${lang}/games/${category}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // 添加游戏详情页面
  games.forEach(game => {
    if (game.slug) {
      // 默认游戏页面
      sitemap.push({
        url: `${baseUrl}/games/${game.category}/${game.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
      });

      // 多语言游戏页面
      supportedLangs.forEach(lang => {
        sitemap.push({
          url: `${baseUrl}/${lang}/games/${game.category}/${game.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    }
  });

  return sitemap;
} 