import { getAllArticles } from '@/lib/articles'

export default function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const articles = getAllArticles()

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteUrl}/journal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...articles.map(article => ({
      url: `${siteUrl}/article/${article.slug}`,
      lastModified: new Date(article.lastModified || article.publishedAt),
      changeFrequency: 'yearly',
      priority: 0.7,
    })),
  ]
}
