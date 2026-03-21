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
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">文章管理</h1>
          <p className="text-sm text-gray-500 mt-1">共 {articles.length} 篇文章</p>
        </div>
        <Link href="/admin/articles/new" className="btn-primary flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          新建文章
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: '全部文章', value: articles.length, icon: '📄', color: 'bg-blue-50 text-blue-700' },
          { label: '精选文章', value: articles.filter(a => a.featured).length, icon: '⭐', color: 'bg-amber-50 text-amber-700' },
          { label: '文章分类', value: new Set(articles.map(a => a.category)).size, icon: '🏷️', color: 'bg-purple-50 text-purple-700' },
          { label: '作者数量', value: new Set(articles.map(a => a.author)).size, icon: '👤', color: 'bg-green-50 text-green-700' },
        ].map(stat => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4`}>
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm font-medium opacity-75">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">📭</p>
            <p className="text-gray-500 mb-4">还没有文章，开始创作吧！</p>
            <Link href="/admin/articles/new" className="btn-primary">新建第一篇文章</Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">文章</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4 hidden sm:table-cell">分类</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4 hidden md:table-cell">作者</th>
                  <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4 hidden lg:table-cell">发布日期</th>
                  <th className="text-center text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-4">精选</th>
                  <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map(article => (
                  <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-12 h-9 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm line-clamp-1">{article.title}</p>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{article.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-1.5">
                        <img src={article.authorAvatar} alt={article.author} className="w-5 h-5 rounded-full bg-gray-100" />
                        <span className="text-sm text-gray-600">{article.author}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-gray-500">{article.publishedAt}</span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => toggleFeatured(article)}
                        className={`text-lg transition-transform hover:scale-110 ${article.featured ? 'opacity-100' : 'opacity-25 hover:opacity-60'}`}
                        title={article.featured ? '取消精选' : '设为精选'}
                      >
                        ⭐
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/article/${article.slug}`}
                          target="_blank"
                          className="text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium px-2 py-1 rounded hover:bg-blue-50"
                        >
                          预览
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="text-xs text-blue-600 hover:text-blue-700 transition-colors font-medium px-2 py-1 rounded hover:bg-blue-50"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={deleting === article.id}
                          className="text-xs text-red-500 hover:text-red-600 transition-colors font-medium px-2 py-1 rounded hover:bg-red-50 disabled:opacity-50"
                        >
                          {deleting === article.id ? '删除中...' : '删除'}
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
