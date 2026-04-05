import Image from 'next/image'
import Link from 'next/link'
import EditorialChrome from '@/components/EditorialChrome'
import { getAllArticles } from '@/lib/articles'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata = {
  title: 'Journal',
  description:
    '技术思考、AI 工程、Agent 架构、RAG 系统——这里是我把复杂问题拆解成可读文章的地方。长期更新，深度优先。',
  openGraph: {
    title: 'Journal | Jack Yinpei',
    description:
      '技术思考、AI 工程、Agent 架构、RAG 系统——把复杂问题拆解成可读文章。',
    url: `${siteUrl}/journal`,
    siteName: 'Jack Yinpei',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Journal — Jack Yinpei',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Journal | Jack Yinpei',
    description: '技术思考、AI 工程、Agent 架构、RAG 系统。',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: `${siteUrl}/journal`,
  },
}

export default function JournalPage() {
  const articles = getAllArticles()
  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <EditorialChrome>
      <section className="pt-4">
        <p className="section-kicker">JOURNAL</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_20rem] lg:items-start">
          <div>
            <h1 className="max-w-4xl font-display text-[3.5rem] leading-[0.95] tracking-tight text-ink sm:text-[5rem]">
              这里放的是我平时写下来的技术思考。
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-ink-secondary sm:text-lg">
              有些文章是为了把一个问题讲透，有些是为了整理我自己在 AI、Agent、RAG
              这些方向上的理解。它们更像是我的长期笔记：一边学习，一边拆解，一边把复杂问题说明白。
            </p>
          </div>

          <div className="ghost-panel rounded-[2rem] p-6">
            <p className="section-kicker">文章目录</p>
            <div className="mt-5 max-h-64 space-y-4 overflow-y-auto pr-1 lg:max-h-[28rem]">
              {articles.map(article => (
                <Link key={article.slug} href={`/article/${article.slug}`} className="block border-l border-subtle pl-4 transition-colors hover:border-primary-500">
                  <p className="font-display text-xl text-ink">{article.title}</p>
                  <p className="mt-1 text-sm text-ink-muted">{article.readingTime}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {featured && (
        <section className="pt-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center">
            <div className="project-surface overflow-hidden rounded-[2.25rem] p-5 sm:p-6">
              <div className="aspect-[16/10] overflow-hidden rounded-[1.7rem]">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  width={1200}
                  height={750}
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="label-chip">{featured.category}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                  {featured.publishedAt}
                </span>
              </div>
              <h2 className="mt-6 max-w-xl font-display text-4xl leading-tight text-ink sm:text-5xl">
                {featured.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-ink-secondary sm:text-lg">
                {featured.excerpt}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {featured.tags.map(tag => (
                  <span key={tag} className="tag-chip">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex items-center justify-between gap-4">
                <Link href={`/article/${featured.slug}`} className="editorial-link">
                  阅读全文
                </Link>
                <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                  {featured.readingTime}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {rest.length > 0 && (
        <section className="pt-20">
          <div className="mb-10 flex items-center gap-4">
            <p className="section-kicker">更多文章</p>
            <div className="h-px flex-1 bg-subtle" />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {rest.map(article => (
              <article
                key={article.slug}
                className="rounded-[2rem] bg-surface p-6 shadow-[0_18px_40px_rgba(26,28,27,0.04)] ring-1 ring-black/5"
              >
                <div className="flex h-full flex-col justify-between gap-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="label-chip">{article.category}</span>
                      <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                        {article.publishedAt}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-3xl leading-tight text-ink">
                      {article.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-ink-secondary sm:text-base">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <Link href={`/article/${article.slug}`} className="editorial-link">
                      打开文章
                    </Link>
                    <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                      {article.readingTime}
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
