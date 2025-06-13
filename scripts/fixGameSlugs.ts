import fs from 'fs';
import path from 'path';

// slugify函数：将title或文件名转为slug
function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const gamesDir = path.join(process.cwd(), 'games');
let fixed = 0, checked = 0, errors = 0;

function fixSlugsInDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fixSlugsInDir(fullPath);
    } else if (file.endsWith('.json')) {
      checked++;
      try {
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf-8'));
        let changed = false;
        // 检查slug
        if (!data.slug || typeof data.slug !== 'string' || !data.slug.trim() || data.slug === 'undefined') {
          // 优先用文件名
          const baseName = path.basename(file, '.json');
          let newSlug = baseName;
          // 如果文件名是无效slug，再用title生成
          if (!newSlug || newSlug === 'undefined' || newSlug === '') {
            newSlug = data.title ? slugify(data.title) : '';
          }
          if (!newSlug) {
            console.warn(`无法为 ${fullPath} 生成slug，请手动检查`);
            errors++;
            continue;
          }
          data.slug = newSlug;
          changed = true;
        }
        if (changed) {
          fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8');
          fixed++;
          console.log(`修复: ${fullPath} -> slug: ${data.slug}`);
        }
      } catch (e) {
        console.error(`解析失败: ${fullPath}`, e);
        errors++;
      }
    }
  }
}

fixSlugsInDir(gamesDir);
console.log(`\n检查完成，共检查${checked}个文件，修复${fixed}个，出错${errors}个。`); 