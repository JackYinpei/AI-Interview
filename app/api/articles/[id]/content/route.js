import { NextResponse } from 'next/server'
import { getAllArticles, getArticleContent } from '@/lib/articles'

export async function GET(request, { params }) {
  try {
    const { id } = await params
    const articles = getAllArticles()
    const article = articles.find(a => a.id === id || a.slug === id)
    
    if (!article) {
      return NextResponse.json({ error: '文章不存在' }, { status: 404 })
    }

    const content = getArticleContent(article.slug)
    if (content === null) {
      return NextResponse.json({ error: '文章内容不存在' }, { status: 404 })
    }

    return NextResponse.json({ content })
  } catch {
    return NextResponse.json({ error: '获取文章内容失败' }, { status: 500 })
  }
}
