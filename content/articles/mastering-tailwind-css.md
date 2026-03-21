# 精通 Tailwind CSS：原子化 CSS 的艺术

Tailwind CSS 以其独特的实用优先（Utility-First）理念，彻底改变了前端开发者编写样式的方式。它不提供预制组件，而是提供大量低级别的工具类，让你直接在 HTML 中构建设计。

## 什么是原子化 CSS？

传统 CSS 写法：

```css
.card {
  border-radius: 0.5rem;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
```

Tailwind 写法：

```html
<div class="rounded-lg p-6 bg-white shadow-sm">
  <!-- 内容 -->
</div>
```

## 核心概念

### 响应式设计

Tailwind 内置响应式前缀，轻松实现自适应布局：

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 移动端单列，平板双列，桌面三列 -->
</div>
```

响应式断点：

| 前缀 | 最小宽度 | CSS |
|------|---------|-----|
| `sm` | 640px | `@media (min-width: 640px)` |
| `md` | 768px | `@media (min-width: 768px)` |
| `lg` | 1024px | `@media (min-width: 1024px)` |
| `xl` | 1280px | `@media (min-width: 1280px)` |

### 暗色模式

```html
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  支持暗色模式的卡片
</div>
```

### 状态变体

```html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
               focus:ring-2 focus:ring-blue-300 
               disabled:opacity-50 disabled:cursor-not-allowed
               transition-colors duration-200">
  交互按钮
</button>
```

## 自定义配置

### tailwind.config.js

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ]
}
```

## 常用组件模式

### 卡片组件

```html
<article class="group relative overflow-hidden rounded-2xl bg-white shadow-md 
                hover:shadow-xl transition-shadow duration-300">
  <div class="aspect-video overflow-hidden">
    <img class="w-full h-full object-cover group-hover:scale-105 
                transition-transform duration-500" />
  </div>
  <div class="p-6">
    <h2 class="text-xl font-bold text-gray-900 line-clamp-2">标题</h2>
    <p class="mt-2 text-gray-600 line-clamp-3">摘要内容</p>
  </div>
</article>
```

### Flex 布局技巧

```html
<!-- 居中 -->
<div class="flex items-center justify-center">

<!-- 两端对齐 -->
<div class="flex items-center justify-between">

<!-- 换行 -->
<div class="flex flex-wrap gap-2">
```

## 性能优化

Tailwind 通过 PurgeCSS 自动删除未使用的样式，确保生产包体积最小：

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
}
```

## 与组件库结合

Tailwind 可以与 shadcn/ui、Headless UI 等无样式组件库完美结合：

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card
```

## 总结

Tailwind CSS 的学习曲线初期较陡，但一旦熟悉了工具类命名规则，开发效率会大幅提升。其真正的价值在于：

- **一致性**：设计系统内置于配置中
- **可维护性**：样式与结构在同一处
- **灵活性**：不受预制组件束缚

对于追求高度定制化 UI 的团队，Tailwind CSS 是绝佳选择。
