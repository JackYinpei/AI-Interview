import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles.filter(a => a.featured)
  const regular = articles.filter(a => !a.featured)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-ink mb-5 tracking-tight">
          探索技术的
          <span className="text-primary-600"> 无限可能</span>
        </h1>
        <p className="text-lg text-ink-secondary max-w-2xl mx-auto leading-relaxed">
          分享前端、后端与全栈开发的最佳实践，记录每一个成长的瞬间
        </p>
      </div>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-1 h-6 bg-vermilion rounded-full" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-ink">精选文章</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map(article => (
              <ArticleCard key={article.id} article={article} featured />
            ))}
          </div>
        </section>
      )}

      {/* Ink-brush divider */}
      {featured.length > 0 && regular.length > 0 && (
        <div className="ink-divider">
          <span className="text-sm text-ink-muted font-medium tracking-wide">更多文章</span>
        </div>
      )}

      {/* Regular Articles Grid */}
      {regular.length > 0 && (
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regular.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Empty State */}
      {articles.length === 0 && (
        <div className="text-center py-24">
          <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-ink mb-2">暂无文章</h3>
          <p className="text-ink-muted mb-8">去后台发布第一篇文章吧</p>
          <a href="/admin" className="btn-primary">前往后台</a>
        </div>
      )}
    </div>
  )
}
