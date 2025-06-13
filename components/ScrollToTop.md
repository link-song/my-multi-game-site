# ScrollToTop 组件

一个可复用的"返回顶部"组件，提供平滑的滚动体验和优雅的动画效果。

## 功能特性

- 🎯 **智能显示**: 当页面滚动超过指定阈值时自动显示
- 🎨 **平滑动画**: 淡入淡出效果和悬停动画
- ⚡ **性能优化**: 防抖处理，避免频繁触发
- ♿ **可访问性**: 支持键盘导航和屏幕阅读器
- 🎛️ **高度可配置**: 支持自定义阈值、样式和行为
- 🔄 **防重复点击**: 滚动过程中禁用按钮

## 基本用法

```tsx
import ScrollToTop from '../components/ScrollToTop';

// 在 layout 或页面中使用
<ScrollToTop />
```

## 高级配置

```tsx
<ScrollToTop 
  threshold={1000}        // 显示阈值（像素）
  smooth={true}           // 是否使用平滑滚动
  debounceMs={150}        // 防抖延迟（毫秒）
  className="custom-class" // 自定义样式类
/>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `threshold` | `number` | `800` | 显示按钮的滚动阈值（像素） |
| `smooth` | `boolean` | `true` | 是否使用平滑滚动 |
| `className` | `string` | `''` | 自定义 CSS 类名 |
| `debounceMs` | `number` | `100` | 防抖延迟时间（毫秒） |

## 样式定制

组件使用 Tailwind CSS 类名，你可以通过 `className` 属性添加自定义样式：

```tsx
<ScrollToTop 
  className="bottom-8 right-8 w-14 h-14 bg-red-500 hover:bg-red-600"
/>
```

## 最佳实践

1. **在 Layout 中使用**: 将组件放在 `app/layout.tsx` 中，这样所有页面都会自动包含此功能
2. **合理设置阈值**: 根据页面内容长度调整 `threshold` 值
3. **性能考虑**: 使用默认的防抖设置，避免频繁触发滚动事件
4. **可访问性**: 组件已包含适当的 ARIA 标签和键盘支持

## 技术实现

- 使用 `useEffect` 监听滚动事件
- 使用 `useCallback` 优化性能
- 使用防抖函数减少事件触发频率
- 使用 CSS 动画提供流畅的视觉效果
- 支持被动事件监听器提升性能 