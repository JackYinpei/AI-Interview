import { NextResponse } from 'next/server'
import {
  deleteArticleContent,
  getAllArticles,
  getArticleContent,
  renameArticleContent,
  saveArticleContent,
  saveArticles,
} from '@/lib/articles'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const articles = getAllArticles()
    const article = articles.find(item => item.id === id || item.slug === id)

    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    const content = getArticleContent(article.slug)
    return NextResponse.json({ ...article, content })
  } catch {
    return NextResponse.json({ error: '获取文章失败' }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params
    const body = await request.json()
    const articles = getAllArticles()
    const index = articles.findIndex(article => article.id === id)

    if (index === -1) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    const previous = articles[index]
    const nextSlug = body.slug || previous.slug
    const today = new Date().toISOString().split('T')[0]

    const updated = {
      ...previous,
      ...body,
      id,
      slug: nextSlug,
      description: body.description || body.excerpt || previous.description || previous.excerpt || '',
      keywords: body.keywords || body.tags || previous.keywords || previous.tags || [],
      lastModified: today,
    }

    delete updated.content
    articles[index] = updated
    saveArticles(articles)

    if (previous.slug !== updated.slug) {
      renameArticleContent(previous.slug, updated.slug)
    }

    if (body.content !== undefined) {
      saveArticleContent(updated.slug, body.content)
    }

    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: '更新文章失败' }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params
    const articles = getAllArticles()
    const index = articles.findIndex(article => article.id === id)

    if (index === -1) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    const [deleted] = articles.splice(index, 1)
    saveArticles(articles)
    deleteArticleContent(deleted.slug)

    return NextResponse.json({ message: '删除成功' })
  } catch {
    return NextResponse.json({ error: '删除文章失败' }, { status: 500 })
  }
}
