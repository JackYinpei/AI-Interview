import Link from 'next/link'

export default function ArticleCard({ article, featured = false }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-2xl"
    >
      <article className={`bg-surface rounded-2xl overflow-hidden border border-subtle card-hover cursor-pointer h-full flex flex-col ${featured ? 'lg:flex-row' : ''}`}>
        {/* Cover Image */}
        <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2 aspect-video lg:aspect-auto' : 'aspect-[16/10]'}`}>
          <img
            src={article.coverImage}
            alt=""
            width={640}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-primary-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
              {article.category}
            </span>
          </div>
          {article.featured && (
            <div className="absolute top-3 right-3">
              <span className="bg-vermilion text-white text-xs font-semibold px-2.5 py-1 rounded-full">
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
              <span key={tag} className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className={`font-semibold text-ink group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 mb-2 ${featured ? 'text-xl' : 'text-base'}`}>
            {article.title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm text-ink-secondary line-clamp-2 flex-1 mb-4 leading-relaxed">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-subtle">
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={article.authorAvatar}
                alt={`${article.author} 的头像`}
                width={28}
                height={28}
                className="w-7 h-7 rounded-full bg-surface-muted flex-shrink-0"
                loading="lazy"
              />
              <span className="text-xs text-ink-secondary font-medium truncate">{article.author}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-ink-muted flex-shrink-0">
              <span>{article.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
