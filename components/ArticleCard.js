import Link from 'next/link'
import Image from 'next/image'

export default function ArticleCard({ article, featured = false }) {
  return (
    <Link href={`/article/${article.slug}`}>
      <article className={`group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 card-hover cursor-pointer h-full flex flex-col ${featured ? 'md:flex-row' : ''}`}>
        {/* Cover Image */}
        <div className={`relative overflow-hidden ${featured ? 'md:w-1/2 aspect-video md:aspect-auto' : 'aspect-video'}`}>
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          {article.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-amber-400 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-full">
                精选
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-50">
            <div className="flex items-center gap-2">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-7 h-7 rounded-full bg-gray-100"
              />
              <span className="text-xs text-gray-500 font-medium">{article.author}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{article.publishedAt}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
