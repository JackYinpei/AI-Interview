import { NextResponse } from 'next/server'
import { getAllArticles, saveArticleContent, saveArticles } from '@/lib/articles'

function buildSlug(input = '') {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function GET() {
  try {
    return NextResponse.json(getAllArticles())
  } catch {
    return NextResponse.json({ error: '获取文章列表失败' }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const articles = getAllArticles()
    const slug = body.slug || buildSlug(body.title)
    const today = new Date().toISOString().split('T')[0]

    const newArticle = {
      id: Date.now().toString(),
      slug,
      title: body.title,
      excerpt: body.excerpt || '',
      description: body.description || body.excerpt || '',
      coverImage: body.coverImage || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      category: body.category || '未分类',
      tags: body.tags || [],
      keywords: body.keywords || body.tags || [],
      author: body.author || '匿名',
      authorAvatar: body.authorAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default',
      authorBio: body.authorBio || '',
      publishedAt: today,
      lastModified: today,
      readingTime: body.readingTime || '5 分钟',
      featured: body.featured || false,
      structuredFaq: body.structuredFaq || [],
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
