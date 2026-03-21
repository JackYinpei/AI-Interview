import { NextResponse } from 'next/server'
import { getAllArticles, saveArticles, saveArticleContent } from '@/lib/articles'

export async function GET() {
  try {
    const articles = getAllArticles()
    return NextResponse.json(articles)
  } catch {
    return NextResponse.json({ error: '获取文章列表失败' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const articles = getAllArticles()

    const newArticle = {
      id: Date.now().toString(),
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: body.title,
      excerpt: body.excerpt || '',
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      category: body.category || '未分类',
      tags: body.tags || [],
      author: body.author || '匿名',
      authorAvatar: body.authorAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      publishedAt: new Date().toISOString().split('T')[0],
      readingTime: body.readingTime || '5 分钟',
      featured: body.featured || false,
    }

    articles.push(newArticle)
    saveArticles(articles)

    if (body.content) {
      saveArticleContent(newArticle.slug, body.content)
    }

    return NextResponse.json(newArticle, { status: 201 })
  } catch {
    return NextResponse.json({ error: '创建文章失败' }, { status: 500 })
  }
}
