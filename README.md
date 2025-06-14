# FreeOnlineGamesHub 项目说明（基于 Next.js 15 App Router）

## 技术选型

- Next.js 15（App Router，`app/` 目录结构）
- React 19
- TypeScript 5
- Tailwind CSS 3
- 组件库：自定义 + Tailwind
- 其它依赖见 `package.json`

---

## 目录结构（实际项目）

```
/app/
  layout.tsx           // 全局布局（TopBar、Sidebar、Footer、ScrollToTop、Google Analytics、默认 metadata）
  page.tsx             // 首页（完整 SEO metadata）
  about/page.tsx       // 关于页面（完整 SEO metadata）
  search/page.tsx      // 搜索结果页（动态 SEO metadata）
  api/search/route.ts  // 搜索建议API
  games/               // 分类游戏页面
    [category]/        // 分类页面（动态 SEO metadata）
      page.tsx
      [slug]/          // 游戏详情页（动态 SEO metadata）
        page.tsx
  [lang]/              // 多语言支持
    page.tsx           // 多语言首页（动态 SEO metadata）
    games/             // 多语言下的游戏页面
      [category]/
        [slug]/
          page.tsx     // 多语言游戏详情页（动态 SEO metadata）
  sitemap.ts           // 动态生成 sitemap.xml
  robots.ts            // 生成 robots.txt
/components/           // 复用组件（TopBar、GameCard、GameSearch、Sidebar等）
/lib/                  // 工具函数（如 games.ts 负责游戏数据读取和搜索）
/games/                // 游戏数据（按分类分目录，json文件存储）
/public/               // 静态资源（图片、icons等）
/styles/
  globals.css          // Tailwind 全局样式
/scripts/              // 可扩展脚本
/utils/                // 预留工具函数
```

---

## 主要功能与实现细节

### 1. 全局布局与导航

- `app/layout.tsx` 负责全局结构，包含 TopBar、Sidebar、Footer、ScrollToTop。
- `TopBar` 顶部导航栏，居中搜索框，左侧 Logo，右侧预留多语言切换（已隐藏）。
- `Sidebar` 侧边栏，显示所有游戏分类。
- `Footer` 页脚，包含主要分类和版权信息。

### 2. SEO 优化与搜索引擎

#### **Google Analytics 集成**
- 在 `app/layout.tsx` 中使用 Next.js Script 组件集成 GA4 跟踪代码（ID: G-RJFSSGBY99）
- 使用 `strategy="afterInteractive"` 确保不阻塞页面渲染
- 确保所有页面都被跟踪

#### **动态 Sitemap**
- `app/sitemap.ts` 自动生成包含所有页面和游戏的多语言 sitemap.xml
- 支持：
  - 静态页面（首页、关于页面）
  - 多语言首页（en、zh、fr、es、de）
  - 分类页面（默认和多语言版本）
  - 游戏详情页面（默认和多语言版本）
  - 智能优先级设置和更新频率配置

#### **Robots.txt**
- `app/robots.ts` 配置搜索引擎爬虫规则
- 允许访问所有公开页面，禁止访问 API 和内部文件
- 自动指向 sitemap.xml

#### **完整的 SEO Metadata 系统**
每个页面都包含完整的 metadata 配置：

**根布局 (`app/layout.tsx`)**
- 默认 title 模板：`%s - FreeOnlineGamesHub`
- 全局 description 和 keywords
- 多语言 alternate 链接配置
- OpenGraph 和 Twitter Cards 默认配置
- Robots 和 Google Bot 优化设置

**首页 (`app/page.tsx`)**
- Title: "Free Online Games - Play Thousands of Games for Free"
- 详细的游戏描述和关键词
- Canonical: 指向根路径
- 完整的社交媒体分享配置

**关于页面 (`app/about/page.tsx`)**
- Title: "About FreeOnlineGamesHub - Free Online Gaming Platform"
- 详细介绍网站特色
- Canonical: 指向 /about
- 完整的社交媒体配置

**多语言首页 (`app/[lang]/page.tsx`)**
- 动态 metadata：根据语言参数生成对应的标题和描述
- 多语言 canonical：支持语言切换的 canonical 链接
- 本地化配置：根据语言设置正确的 locale
- 支持 en、zh、fr、es、de 五种语言

**分类页面 (`app/games/[category]/page.tsx`)**
- 动态标题：根据分类自动生成标题
- 分类描述：每个分类都有专门的描述
- 关键词优化：包含分类相关的关键词
- Canonical：指向对应的分类页面
- 支持 action、adventure、puzzle、sports、io、casual 等分类

**搜索页面 (`app/search/page.tsx`)**
- 动态 metadata：根据搜索查询生成标题和描述
- 查询参数处理：正确处理搜索关键词
- Canonical：包含搜索参数的 canonical URL
- 支持空搜索和带查询的搜索

**游戏详情页面**
- **默认版本** (`app/games/[category]/[slug]/page.tsx`)
- **多语言版本** (`app/[lang]/games/[category]/[slug]/page.tsx`)
- 游戏特定信息：使用游戏的实际标题、描述和图片
- 多语言支持：支持不同语言版本的 canonical 链接
- 错误处理：游戏不存在时的 metadata 处理
- OpenGraph 图片：使用游戏封面图片
- 关键词：包含游戏标题、分类、标签等

#### **SEO 优化特性**
- **Title 优化**：使用模板系统，每个页面都有独特的标题
- **Description 优化**：每个页面都有独特的描述，长度控制在 150-160 字符
- **Canonical 链接**：所有页面都有正确的 canonical URL，避免重复内容
- **OpenGraph & Twitter Cards**：完整的社交媒体分享配置
- **关键词优化**：每个页面都有相关的关键词，支持多语言
- **多语言 SEO**：正确的 hreflang 配置，语言特定的 canonical 链接

#### **访问地址**
- Sitemap: `https://freeonlinegameshub.com/sitemap.xml`
- Robots: `https://freeonlinegameshub.com/robots.txt`

### 3. 首页与游戏列表

- 首页（`app/page.tsx`）展示所有游戏，支持"加载更多"功能（每次加载5行）。
- 游戏卡片使用 `GameCard` 组件，响应式布局。
- 分类页和多语言页同样支持"加载更多"功能。

### 4. 搜索与搜索建议

- 顶部搜索框（`GameSearch` 组件）支持：
  - 实时搜索建议（输入2个及以上字符触发，最多显示7条，超出显示"More"）。
  - 建议下拉层和遮罩层通过 Portal 渲染到 body，始终在主内容上方，且不会遮挡 TopBar。
  - 焦点模式：显示建议时主内容区出现半透明遮罩，TopBar 不被遮挡。
  - 点击建议项跳转详情页，点击"More"跳转完整搜索结果页。
  - 搜索建议和遮罩层有淡入淡出动画，体验流畅。
- 搜索结果页（`app/search/page.tsx`）居中显示搜索框和所有匹配游戏。

### 5. 游戏数据管理

- `/games/` 目录下按分类存储 json 文件，每个文件为一个游戏。
- `lib/games.ts` 提供游戏数据读取、搜索、分类等功能。

### 6. 其它页面

- `/about` 页面介绍网站特色和使用方式，内容美观，支持点击跳转首页。

### 7. 组件与样式

- 所有 UI 组件均在 `/components/` 下，便于复用和维护。
- 样式采用 Tailwind CSS，`globals.css` 只引入 Tailwind 基础内容。
- 搜索建议、遮罩、按钮等均有现代化动画和响应式设计。

### 8. API 路由

- `/api/search/route.ts` 提供搜索建议接口，前端异步请求，返回匹配游戏名、slug、category。

### 9. 多语言支持

- 结构已预留多语言目录（`app/[lang]/`），可扩展多语言首页和游戏详情页。
- 支持 en、zh、fr、es、de 五种语言。
- 每个多语言页面都有对应的 SEO metadata。

### 10. 交互与体验

- "返回顶部"按钮全局可用，滚动时自动浮现，点击平滑回顶。
- 搜索建议支持焦点模式，遮罩层只覆盖主内容区，TopBar 始终可见。
- 所有页面均为响应式设计，适配桌面和移动端。

### 11. 性能与优化

- 使用 Next.js 15 的 MetadataRoute API 生成 sitemap 和 robots.txt，性能最佳。
- Google Analytics 使用 `strategy="afterInteractive"` 确保不阻塞页面渲染。
- 所有 SEO 相关文件都是动态生成，自动包含新添加的游戏和页面。
- Metadata 使用 Next.js 15 的 `generateMetadata` 函数，支持动态生成。
- 图片优化：OpenGraph 图片支持动态尺寸和 alt 文本。

---

## 依赖与开发

- 主要依赖见 `package.json`，包含：
  - `@types/react-dom` - React DOM 类型支持
  - `@types/react` - React 类型支持
  - `@types/node` - Node.js 类型支持
- 开发命令：
  - `npm run dev` 启动开发环境
  - `npm run build` 构建生产环境
  - `npm run start` 启动生产环境
  - `npm run lint` 代码检查

---

## 未来可扩展点

- 多语言内容与切换
- 用户评论、点赞、收藏等互动功能
- 游戏数据支持 Markdown 格式
- 更多 SEO 优化（结构化数据、Open Graph 等）
- 性能监控和分析
- 更多社交媒体平台集成

---

如需更详细的页面代码模板或组件说明，请查阅 `/components/`、`/app/` 目录源码。
