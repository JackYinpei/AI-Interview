import { getAllArticles } from '@/lib/articles'

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articles = getAllArticles()

  const articleUrls = articles.map(article => ({
    url: `${siteUrl}/article/${article.slug}`,
    lastModified: new Date(article.lastModified || article.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...articleUrls,
  ]
}
