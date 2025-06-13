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
  layout.tsx           // 全局布局（TopBar、Sidebar、Footer、ScrollToTop）
  page.tsx             // 首页
  about/page.tsx       // 关于页面
  search/page.tsx      // 搜索结果页
  api/search/route.ts  // 搜索建议API
  games/               // 分类游戏页面
  [lang]/              // 多语言支持
    page.tsx           // 多语言首页
    games/             // 多语言下的游戏页面
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

### 2. 首页与游戏列表

- 首页（`app/page.tsx`）展示所有游戏，支持"加载更多"功能（每次加载5行）。
- 游戏卡片使用 `GameCard` 组件，响应式布局。
- 分类页和多语言页同样支持"加载更多"功能。

### 3. 搜索与搜索建议

- 顶部搜索框（`GameSearch` 组件）支持：
  - 实时搜索建议（输入2个及以上字符触发，最多显示7条，超出显示"More"）。
  - 建议下拉层和遮罩层通过 Portal 渲染到 body，始终在主内容上方，且不会遮挡 TopBar。
  - 焦点模式：显示建议时主内容区出现半透明遮罩，TopBar 不被遮挡。
  - 点击建议项跳转详情页，点击"More"跳转完整搜索结果页。
  - 搜索建议和遮罩层有淡入淡出动画，体验流畅。
- 搜索结果页（`app/search/page.tsx`）居中显示搜索框和所有匹配游戏。

### 4. 游戏数据管理

- `/games/` 目录下按分类存储 json 文件，每个文件为一个游戏。
- `lib/games.ts` 提供游戏数据读取、搜索、分类等功能。

### 5. 其它页面

- `/about` 页面介绍网站特色和使用方式，内容美观，支持点击跳转首页。

### 6. 组件与样式

- 所有 UI 组件均在 `/components/` 下，便于复用和维护。
- 样式采用 Tailwind CSS，`globals.css` 只引入 Tailwind 基础内容。
- 搜索建议、遮罩、按钮等均有现代化动画和响应式设计。

### 7. API 路由

- `/api/search/route.ts` 提供搜索建议接口，前端异步请求，返回匹配游戏名、slug、category。

### 8. 多语言支持

- 结构已预留多语言目录（`app/[lang]/`），可扩展多语言首页和游戏详情页。

### 9. 交互与体验

- "返回顶部"按钮全局可用，滚动时自动浮现，点击平滑回顶。
- 搜索建议支持焦点模式，遮罩层只覆盖主内容区，TopBar 始终可见。
- 所有页面均为响应式设计，适配桌面和移动端。

---

## 依赖与开发

- 主要依赖见 `package.json`，如需类型支持可安装 `@types/react-dom` 等。
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
- SEO、sitemap、结构化数据等

---

如需更详细的页面代码模板或组件说明，请查阅 `/components/`、`/app/` 目录源码。
