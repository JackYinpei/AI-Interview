'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchArticles()
  }, [])

  async function fetchArticles() {
    try {
      const res = await fetch('/api/articles')
      const data = await res.json()
      setArticles(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id, title) {
    if (!confirm(`确认删除文章「${title}」？此操作不可撤销。`)) return
    setDeleting(id)
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' })
      setArticles(prev => prev.filter(a => a.id !== id))
    } catch (err) {
      alert('删除失败，请重试')
    } finally {
      setDeleting(null)
    }
  }

  async function toggleFeatured(article) {
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...article, featured: !article.featured }),
      })
      const updated = await res.json()
      setArticles(prev => prev.map(a => a.id === updated.id ? updated : a))
    } catch (err) {
      alert('操作失败，请重试')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ink-muted text-sm">加载中…</p>
        </div>
      </div>
    )
  }

  const stats = [
    { label: '全部文章', value: articles.length, color: 'bg-primary-50 text-primary-700' },
    { label: '精选文章', value: articles.filter(a => a.featured).length, color: 'bg-amber-50 text-amber-700' },
    { label: '文章分类', value: new Set(articles.map(a => a.category)).size, color: 'bg-purple-50 text-purple-700' },
    { label: '作者数量', value: new Set(articles.map(a => a.author)).size, color: 'bg-emerald-50 text-emerald-700' },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold text-ink">文章管理</h1>
          <p className="text-sm text-ink-muted mt-1">
            共 <span className="tabular-nums">{articles.length}</span> 篇文章
          </p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新建文章
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {stats.map(stat => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
            <div className="text-2xl font-bold tabular-nums">{stat.value}</div>
            <div className="text-sm font-medium opacity-70 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Articles Table */}
      <div className="bg-surface rounded-2xl border border-subtle shadow-sm overflow-hidden">
        {articles.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-full bg-surface-muted flex items-center justify-center mx-auto mb-5">
              <svg className="w-7 h-7 text-ink-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-ink-secondary font-medium mb-2">还没有文章</p>
            <p className="text-ink-muted text-sm mb-6">开始创作你的第一篇文章吧</p>
            <Link href="/admin/articles/new" className="btn-primary">新建文章</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-muted border-b border-subtle">
                  <th className="text-left text-xs font-semibold text-ink-muted uppercase tracking-wider px-6 py-4">文章</th>
                  <th className="text-left text-xs font-semibold text-ink-muted uppercase tracking-wider px-4 py-4 hidden sm:table-cell">分类</th>
                  <th className="text-left text-xs font-semibold text-ink-muted uppercase tracking-wider px-4 py-4 hidden md:table-cell">作者</th>
                  <th className="text-left text-xs font-semibold text-ink-muted uppercase tracking-wider px-4 py-4 hidden lg:table-cell">发布日期</th>
                  <th className="text-center text-xs font-semibold text-ink-muted uppercase tracking-wider px-4 py-4">精选</th>
                  <th className="text-right text-xs font-semibold text-ink-muted uppercase tracking-wider px-6 py-4">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-subtle">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-surface-muted transition-colors duration-150">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={article.coverImage}
                          alt=""
                          width={48}
                          height={36}
                          className="w-12 h-9 object-cover rounded-lg flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-ink text-sm line-clamp-1">{article.title}</p>
                          <p className="text-xs text-ink-muted line-clamp-1 mt-0.5">{article.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="bg-primary-50 text-primary-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={article.authorAvatar}
                          alt=""
                          width={20}
                          height={20}
                          className="w-5 h-5 rounded-full bg-surface-muted"
                          loading="lazy"
                        />
                        <span className="text-sm text-ink-secondary">{article.author}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-ink-muted tabular-nums">{article.publishedAt}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleFeatured(article)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
                          article.featured
                            ? 'bg-amber-50 text-amber-500'
                            : 'text-ink-muted hover:bg-surface-muted'
                        }`}
                        aria-label={article.featured ? `取消「${article.title}」的精选` : `将「${article.title}」设为精选`}
                      >
                        <svg className="w-4 h-4" fill={article.featured ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="text-xs text-ink-muted hover:text-primary-600 transition-colors duration-200 font-medium px-2.5 py-1.5 rounded-lg hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          预览
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="text-xs text-primary-600 hover:text-primary-700 transition-colors duration-200 font-medium px-2.5 py-1.5 rounded-lg hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={deleting === article.id}
                          className="text-xs text-red-500 hover:text-red-600 transition-colors duration-200 font-medium px-2.5 py-1.5 rounded-lg hover:bg-red-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
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
