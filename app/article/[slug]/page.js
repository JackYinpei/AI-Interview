import { getAllArticles, getArticleContent } from '@/lib/articles'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import JsonLd from '@/components/JsonLd'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const articles = getAllArticles()
  const article = articles.find(a => a.slug === slug)
  if (!article) return { title: '文章不存在' }

  const articleUrl = `${siteUrl}/article/${article.slug}`

  return {
    title: article.title,
    description: article.description || article.excerpt,
    keywords: article.keywords || article.tags,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description || article.excerpt,
      url: articleUrl,
      siteName: 'Tech Blog',
      locale: 'zh_CN',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.lastModified || article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || article.excerpt,
      images: [article.coverImage],
    },
    alternates: {
      canonical: articleUrl,
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const articles = getAllArticles()
  const article = articles.find(a => a.slug === slug)

  if (!article) notFound()

  const content = getArticleContent(slug) || '*文章内容暂未发布*'
  const articleUrl = `${siteUrl}/article/${article.slug}`

  // Article / BlogPosting JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description || article.excerpt,
    image: article.coverImage,
    url: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.lastModified || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author,
      description: article.authorBio || undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Tech Blog',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: (article.keywords || article.tags).join(', '),
    articleSection: article.category,
    inLanguage: 'zh-CN',
    wordCount: content.length,
  }

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: article.category,
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  }

  // FAQPage JSON-LD (if article has structuredFaq)
  const faqJsonLd = article.structuredFaq?.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.structuredFaq.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }
    : null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Structured Data */}
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      {faqJsonLd && <JsonLd data={faqJsonLd} />}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-ink-muted mb-10" aria-label="面包屑导航">
        <Link href="/" className="hover:text-primary-600 transition-colors duration-200">首页</Link>
        <span aria-hidden="true">/</span>
        <span className="text-primary-600">{article.category}</span>
        <span aria-hidden="true">/</span>
        <span className="text-ink-secondary truncate max-w-xs">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-10">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
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
        <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-ink leading-tight mb-8">
          {article.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 pb-6 border-b border-subtle">
          <div className="flex items-center gap-3">
            <img
              src={article.authorAvatar}
              alt={`${article.author} 的头像`}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full bg-surface-muted"
            />
            <div>
              <p className="text-sm font-semibold text-ink">{article.author}</p>
              {article.authorBio && (
                <p className="text-xs text-ink-muted">{article.authorBio}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-ink-muted ml-auto">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={article.publishedAt}>{article.publishedAt}</time>
            </span>
            {article.lastModified && article.lastModified !== article.publishedAt && (
              <span className="text-xs">(更新于 <time dateTime={article.lastModified}>{article.lastModified}</time>)</span>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {article.readingTime}
            </span>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="mb-12 rounded-2xl overflow-hidden shadow-lg aspect-video">
        <img
          src={article.coverImage}
          alt={`${article.title} 封面图`}
          width={960}
          height={540}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Markdown Content — Server-rendered for SEO */}
      <article className="bg-surface rounded-2xl shadow-sm border border-subtle p-8 sm:p-12">
        <MarkdownRenderer content={content} />
      </article>

      {/* Back Button */}
      <div className="mt-12 flex justify-center">
        <Link href="/" className="btn-secondary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  )
}
