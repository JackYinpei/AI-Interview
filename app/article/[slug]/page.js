import { getAllArticles, getArticleContent } from '@/lib/articles'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const articles = getAllArticles()
  const article = articles.find(a => a.slug === slug)
  if (!article) return { title: '文章不存在' }
  return {
    title: `${article.title} - Tech Blog`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const articles = getAllArticles()
  const article = articles.find(a => a.slug === slug)

  if (!article) notFound()

  const content = getArticleContent(slug) || '*文章内容暂未发布*'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/" className="hover:text-primary-600 transition-colors">首页</Link>
        <span>/</span>
        <span className="text-primary-600">{article.category}</span>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {article.category}
          </span>
          {article.tags.map(tag => (
            <span key={tag} className="text-xs text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="w-9 h-9 rounded-full bg-gray-100"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{article.author}</p>
              <p className="text-xs text-gray-400">作者</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400 ml-auto">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {article.publishedAt}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="mb-10 rounded-2xl overflow-hidden shadow-lg aspect-video">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Markdown Content */}
      <article className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12">
        <MarkdownRenderer content={content} />
      </article>

      {/* Back Button */}
      <div className="mt-10 flex justify-center">
        <Link href="/" className="btn-secondary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  )
}
