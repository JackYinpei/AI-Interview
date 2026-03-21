import { NextResponse } from 'next/server'
import { getAllArticles, getArticleContent, saveArticles, saveArticleContent, deleteArticleContent } from '@/lib/articles'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const articles = getAllArticles()
    const article = articles.find(a => a.id === id || a.slug === id)
    
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
    const index = articles.findIndex(a => a.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    const updated = { ...articles[index], ...body, id }
    delete updated.content
    articles[index] = updated
    saveArticles(articles)

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
    const index = articles.findIndex(a => a.id === id)
    
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
