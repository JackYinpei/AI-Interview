'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      const response = await fetch('/api/articles')
      const data = await response.json()
      setArticles(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  async function handleDelete(id, title) {
    if (!confirm(`确认删除文章「${title}」？此操作不可撤销。`)) return

    setDeleting(id)

    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' })
      setArticles(prev => prev.filter(article => article.id !== id))
    } catch (error) {
      console.error(error)
      alert('删除失败，请重试')
    } finally {
      setDeleting(null)
    }
  }

  async function toggleFeatured(article) {
    try {
      const response = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...article, featured: !article.featured }),
      })

      const updated = await response.json()
      setArticles(prev => prev.map(item => (item.id === updated.id ? updated : item)))
    } catch (error) {
      console.error(error)
      alert('操作失败，请重试')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
          <p className="text-sm text-ink-muted">加载中…</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: '全部文章', value: articles.length, color: 'bg-primary-50 text-primary-700' },
    { label: '精选文章', value: articles.filter(article => article.featured).length, color: 'bg-amber-50 text-amber-700' },
    { label: '文章分类', value: new Set(articles.map(article => article.category)).size, color: 'bg-sky-50 text-sky-700' },
    { label: '作者数量', value: new Set(articles.map(article => article.author)).size, color: 'bg-emerald-50 text-emerald-700' },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">文章管理</h1>
          <p className="mt-1 text-sm text-ink-muted">
            共 <span className="tabular-nums">{articles.length}</span> 篇文章
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/articles/new" className="btn-primary flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            新建文章
          </Link>
          <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 text-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            退出
          </button>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
            <div className="tabular-nums text-2xl font-bold">{stat.value}</div>
            <div className="mt-1 text-sm font-medium opacity-70">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-subtle bg-surface shadow-sm">
        {articles.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted">
              <svg className="h-7 w-7 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="mb-2 font-medium text-ink-secondary">还没有文章</p>
            <p className="mb-6 text-sm text-ink-muted">开始创作你的第一篇文章吧</p>
            <Link href="/admin/articles/new" className="btn-primary">
              新建文章
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-subtle bg-surface-muted">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">文章</th>
                  <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted sm:table-cell">分类</th>
                  <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted md:table-cell">作者</th>
                  <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted lg:table-cell">发布日期</th>
                  <th className="px-4 py-4 text-center text-xs font-semibold uppercase tracking-wider text-ink-muted">精选</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-ink-muted">操作</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-subtle">
                {articles.map(article => (
                  <tr key={article.id} className="transition-colors duration-150 hover:bg-surface-muted">
                    <td className="px-6 py-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <img
                          src={article.coverImage}
                          alt=""
                          width={48}
                          height={36}
                          className="h-9 w-12 flex-shrink-0 rounded-lg object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="line-clamp-1 text-sm font-medium text-ink">{article.title}</p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-ink-muted">{article.excerpt}</p>
                        </div>
                      </div>
                    </td>

                    <td className="hidden px-4 py-4 sm:table-cell">
                      <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                        {article.category}
                      </span>
                    </td>

                    <td className="hidden px-4 py-4 md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={article.authorAvatar}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 rounded-full bg-surface-muted"
                          loading="lazy"
                        />
                        <span className="text-sm text-ink-secondary">{article.author}</span>
                      </div>
                    </td>

                    <td className="hidden px-4 py-4 lg:table-cell">
                      <span className="tabular-nums text-sm text-ink-muted">{article.publishedAt}</span>
                    </td>

                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleFeatured(article)}
                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                          article.featured
                            ? 'bg-amber-50 text-amber-500'
                            : 'text-ink-muted hover:bg-surface-muted'
                        }`}
                        aria-label={article.featured ? `取消「${article.title}」的精选` : `将「${article.title}」设为精选`}
                      >
                        <svg className="h-4 w-4" fill={article.featured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-ink-muted transition-colors duration-200 hover:bg-primary-50 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          预览
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary-600 transition-colors duration-200 hover:bg-primary-50 hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={deleting === article.id}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 disabled:opacity-50"
                        >
                          {deleting === article.id ? '删除中…' : '删除'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
