import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import EditorialChrome from '@/components/EditorialChrome'
import JsonLd from '@/components/JsonLd'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import { getAllArticles, getArticleBySlug, getArticleContent } from '@/lib/articles'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function generateStaticParams() {
  return getAllArticles().map(article => ({ slug: article.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    return { title: 'Article Not Found' }
  }

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
      siteName: 'Jack Yinpei',
      locale: 'zh_CN',
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.lastModified || article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: article.coverImage
        ? [
            {
              url: article.coverImage,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || article.excerpt,
      images: article.coverImage ? [article.coverImage] : [],
    },
    alternates: {
      canonical: articleUrl,
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const content = getArticleContent(slug)
  if (!content) notFound()

  const related = getAllArticles().filter(item => item.slug !== article.slug).slice(0, 2)
  const articleUrl = `${siteUrl}/article/${article.slug}`

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
      '@type': 'Person',
      name: 'Jack Yinpei',
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

  return (
    <EditorialChrome>
      <JsonLd data={articleJsonLd} />

      <section className="pt-4">
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/journal" className="section-kicker transition-colors hover:text-primary-600">
            JOURNAL
          </Link>
          <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">/</span>
          <span className="section-kicker">{article.category}</span>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_20rem] lg:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label-chip">{article.category}</span>
              <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                {article.publishedAt}
              </span>
              <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                {article.readingTime}
              </span>
            </div>

            <h1 className="mt-6 max-w-5xl font-display text-[3.3rem] leading-[0.97] tracking-tight text-ink sm:text-[4.6rem]">
              {article.title}
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-ink-secondary sm:text-lg">
              {article.excerpt}
            </p>
          </div>

          <aside className="ghost-panel rounded-[2rem] p-6">
            <p className="section-kicker">ARTICLE NOTES</p>
            <div className="mt-5 space-y-4">
              <div className="border-l border-subtle pl-4">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Author</p>
                <p className="mt-2 font-display text-xl text-ink">{article.author}</p>
              </div>
              <div className="border-l border-subtle pl-4">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Updated</p>
                <p className="mt-2 text-sm text-ink-secondary">{article.lastModified || article.publishedAt}</p>
              </div>
              <div className="border-l border-subtle pl-4">
                <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">Tags</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="tag-chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {article.coverImage && (
        <section className="pt-14">
          <div className="project-surface overflow-hidden rounded-[2.5rem] p-5 sm:p-6">
            <div className="aspect-[16/8] overflow-hidden rounded-[1.8rem]">
              <Image
                src={article.coverImage}
                alt={article.title}
                width={1600}
                height={800}
                sizes="100vw"
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>
      )}

      <section className="pt-14">
        <div className="rounded-[2.5rem] bg-surface px-6 py-8 shadow-[0_20px_50px_rgba(26,28,27,0.05)] ring-1 ring-black/5 sm:px-10 sm:py-12 lg:px-14">
          <MarkdownRenderer content={content} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="pt-16">
          <div className="mb-10 flex items-center gap-4">
            <p className="section-kicker">RELATED</p>
            <div className="h-px flex-1 bg-subtle" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {related.map(item => (
              <article
                key={item.slug}
                className="rounded-[2rem] bg-paper p-6 shadow-[0_18px_40px_rgba(26,28,27,0.04)] ring-1 ring-black/5"
              >
                <div className="flex h-full flex-col justify-between gap-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="label-chip">{item.category}</span>
                      <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                        {item.publishedAt}
                      </span>
                    </div>
                    <h2 className="mt-6 font-display text-3xl leading-tight text-ink">{item.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-ink-secondary sm:text-base">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Link href={`/article/${item.slug}`} className="editorial-link">
                      Read next
                    </Link>
                    <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                      {item.readingTime}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </EditorialChrome>
  )
}
