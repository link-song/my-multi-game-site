import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 分类关键词映射，可根据实际需求扩展
const CATEGORY_KEYWORDS = {
  action: ['action', 'battle', 'combat', 'shooter', 'war', 'fight', 'fps', 'sniper'],
  adventure: ['adventure', 'explore', 'quest', 'story'],
  puzzle: ['puzzle', 'logic', 'brain', 'match', 'mahjong', 'solitaire'],
  sports: ['sports', 'basketball', 'football', 'soccer', 'racing', 'car', 'bike', 'drift', 'run', 'skate', 'pool', 'billiard'],
  io: ['io', 'arena', 'multiplayer'],
  casual: ['casual', 'idle', 'clicker', 'fun', 'cute', 'cozy', 'dress-up', 'makeup', 'girl', 'kids', 'animal', 'pet'],
  // 可继续扩展
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

function detectCategory(description: string, tags: string): string {
  const all = (description + ' ' + tags).toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => all.includes(k))) return cat;
  }
  return 'other';
}

function main() {
  const jsonPath = path.join(__dirname, '../GameData/games.json');
  const gamesRoot = path.join(__dirname, '../games');
  const raw = fs.readFileSync(jsonPath, 'utf-8');
  const games = JSON.parse(raw);
  const createdCategories = new Set<string>();
  
  // 添加统计计数器
  let skippedCount = 0;
  let updatedCount = 0;
  let newCount = 0;

  for (const game of games) {
    const category = detectCategory(game.description || '', game.tags || '');
    const slug = slugify(game.title);
    const catDir = path.join(gamesRoot, category);
    
    // 创建分类目录（如果不存在）
    if (!fs.existsSync(catDir)) {
      fs.mkdirSync(catDir, { recursive: true });
      createdCategories.add(category);
    }

    // 处理标签
    const tagsArr = Array.isArray(game.tags) ? game.tags : 
                   (game.tags ? game.tags.split(',').map((t: string) => t.trim()) : []);

    // 生成标准JSON结构
    const gameData = {
      title: game.title,
      category,
      tags: tagsArr,
      iframeUrl: game.embed,
      coverImage: game.image,
      description: game.description,
      // 添加更新时间戳
      updatedAt: new Date().toISOString()
    };

    const targetPath = path.join(catDir, slug + '.json');
    
    // 检查文件是否存在
    if (fs.existsSync(targetPath)) {
      try {
        const existingData = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
        // 比较除 updatedAt 外的所有字段
        const { updatedAt: _, ...existingGameData } = existingData;
        const { updatedAt: __, ...newGameData } = gameData;
        
        if (JSON.stringify(existingGameData) === JSON.stringify(newGameData)) {
          console.log(`跳过未变化的游戏: ${slug}`);
          skippedCount++;
          continue;
        }
        
        // 如果数据有变化，更新文件
        fs.writeFileSync(targetPath, JSON.stringify(gameData, null, 2), 'utf-8');
        console.log(`更新游戏: ${slug}`);
        updatedCount++;
      } catch (error) {
        console.error(`处理游戏 ${slug} 时出错:`, error);
        continue;
      }
    } else {
      // 新游戏，直接写入
      fs.writeFileSync(targetPath, JSON.stringify(gameData, null, 2), 'utf-8');
      console.log(`新增游戏: ${slug}`);
      newCount++;
    }
  }

  // 输出统计信息
  console.log('\n导入统计:');
  console.log(`- 新增游戏: ${newCount}`);
  console.log(`- 更新游戏: ${updatedCount}`);
  console.log(`- 跳过游戏: ${skippedCount}`);
  console.log(`- 总处理游戏: ${games.length}`);

  if (createdCategories.size > 0) {
    console.log('\n新增分类:', Array.from(createdCategories));
  }
  console.log('\n导入完成');
}

main(); 