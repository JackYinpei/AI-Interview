import ArticleCard from '@/components/ArticleCard'
import { getAllArticles } from '@/lib/articles'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles.filter(a => a.featured)
  const regular = articles.filter(a => !a.featured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="text-center mb-14">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
          探索技术的{' '}
          <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            无限可能
          </span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          分享前端、后端与全栈开发的最佳实践，记录每一个成长的瞬间
        </p>
      </div>

      {/* Featured Articles */}
      {featured.length > 0 && (
        <section className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">⭐</span>
            <h2 className="text-xl font-bold text-gray-900">精选文章</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featured.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Divider */}
      {featured.length > 0 && regular.length > 0 && (
        <div className="flex items-center gap-4 mb-10">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-sm text-gray-400 font-medium">更多文章</span>
          <div className="flex-1 h-px bg-gray-100" />
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
          <p className="text-6xl mb-4">📭</p>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">暂无文章</h3>
          <p className="text-gray-400 mb-6">去后台发布第一篇文章吧！</p>
          <a href="/admin" className="btn-primary">前往后台</a>
        </div>
      )}
    </div>
  )
}
