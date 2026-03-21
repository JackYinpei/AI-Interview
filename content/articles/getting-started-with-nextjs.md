# Next.js 入门指南：从零开始构建现代 Web 应用

Next.js 是由 Vercel 开发的 React 框架，它在 React 的基础上提供了许多强大的功能，让构建生产级别的 Web 应用变得更加简单高效。

## 为什么选择 Next.js？

在现代 Web 开发中，我们面临许多挑战：

- **SEO 优化**：单页应用（SPA）对搜索引擎不友好
- **首屏加载速度**：大量 JavaScript 导致白屏时间长
- **开发体验**：配置繁琐，工程化难度高

Next.js 通过以下特性解决了这些问题：

### 1. 服务端渲染（SSR）

```javascript
// pages/blog/[slug].js
export async function getServerSideProps(context) {
  const { slug } = context.params
  const post = await fetchPost(slug)
  
  return {
    props: { post }
  }
}

export default function BlogPost({ post }) {
  return <article>{post.content}</article>
}
```

### 2. 静态生成（SSG）

静态生成在构建时预渲染页面，适合内容不频繁变化的场景：

```javascript
export async function getStaticProps() {
  const posts = await getAllPosts()
  
  return {
    props: { posts },
    revalidate: 3600 // ISR：每小时重新生成
  }
}
```

### 3. App Router（Next.js 13+）

App Router 是 Next.js 最新的路由系统，基于文件系统：

```
app/
├── layout.js          # 根布局
├── page.js            # 首页
├── blog/
│   ├── page.js        # 博客列表页
│   └── [slug]/
│       └── page.js    # 博客详情页
└── api/
    └── posts/
        └── route.js   # API 路由
```

## 快速开始

### 安装

```bash
npx create-next-app@latest my-blog --js --tailwind --app
cd my-blog
npm run dev
```

### 项目结构

```
my-blog/
├── app/
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/
├── package.json
└── next.config.js
```

## 核心概念

### 数据获取

Next.js 提供了多种数据获取方式：

| 方式 | 场景 | 说明 |
|------|------|------|
| `fetch` + `cache` | 静态数据 | 构建时获取，CDN 缓存 |
| `fetch` + `no-store` | 动态数据 | 每次请求都获取最新数据 |
| `revalidate` | ISR | 定期重新验证 |

### 图片优化

Next.js 的 `Image` 组件自动优化图片：

```jsx
import Image from 'next/image'

export default function Avatar() {
  return (
    <Image
      src="/avatar.jpg"
      width={100}
      height={100}
      alt="用户头像"
      priority
    />
  )
}
```

## 性能优化技巧

1. **使用 React Server Components**：减少客户端 JavaScript
2. **代码分割**：使用 `dynamic` 懒加载组件
3. **字体优化**：使用 `next/font` 避免布局偏移
4. **预取**：`Link` 组件自动预取页面

## 总结

Next.js 是构建现代 Web 应用的最佳选择之一，它不仅提供了出色的开发体验，还在性能和 SEO 方面给出了优秀的解决方案。随着 App Router 的成熟，Next.js 正在向全栈框架演进，值得每个前端开发者深入学习。

> 💡 **提示**：建议从官方文档开始学习，Next.js 的文档非常详尽，包含大量实际示例。
