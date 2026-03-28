'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const statusOptions = [
  { value: null, label: '未读', color: 'text-ink-muted' },
  { value: 'reading', label: '在读', color: 'text-blue-600' },
  { value: 'read', label: '已读', color: 'text-emerald-600' },
]

const categoryLabels = {
  tech: '技术',
  economics: '经济',
  literature: '文学',
  history: '历史',
  psychology: '心理',
  philosophy: '哲学',
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const router = useRouter()

  useEffect(() => {
    fetchBooks()
  }, [])

  async function fetchBooks() {
    try {
      const res = await fetch('/api/books')
      const data = await res.json()
      setBooks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleStatusChange(book, newStatus) {
    setUpdating(book.title)
    try {
      const res = await fetch('/api/books', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: book.title, status: newStatus }),
      })
      if (res.ok) {
        setBooks(prev =>
          prev.map(b => (b.title === book.title ? { ...b, status: newStatus } : b))
        )
      }
    } catch (err) {
      console.error(err)
    } finally {
      setUpdating(null)
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  const filtered = useMemo(() => {
    let result = books
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      result = result.filter(b => b.title.toLowerCase().includes(q))
    }
    if (filterStatus !== 'all') {
      if (filterStatus === 'unread') {
        result = result.filter(b => !b.status)
      } else {
        result = result.filter(b => b.status === filterStatus)
      }
    }
    if (filterCategory !== 'all') {
      result = result.filter(b => b.category === filterCategory)
    }
    return result
  }, [books, search, filterStatus, filterCategory])

  const stats = useMemo(() => ({
    total: books.length,
    read: books.filter(b => b.status === 'read').length,
    reading: books.filter(b => b.status === 'reading').length,
    unread: books.filter(b => !b.status).length,
  }), [books])

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

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">书架管理</h1>
          <p className="mt-1 text-sm text-ink-muted">
            管理 <span className="tabular-nums">{books.length}</span> 本书的阅读状态
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin" className="btn-secondary flex items-center gap-2 text-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            文章管理
          </Link>
          <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 text-sm">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            退出
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl bg-primary-50 p-4 text-primary-700">
          <div className="tabular-nums text-2xl font-bold">{stats.total}</div>
          <div className="mt-1 text-sm font-medium opacity-70">全部书籍</div>
        </div>
        <div className="rounded-xl bg-emerald-50 p-4 text-emerald-700">
          <div className="tabular-nums text-2xl font-bold">{stats.read}</div>
          <div className="mt-1 text-sm font-medium opacity-70">已读完</div>
        </div>
        <div className="rounded-xl bg-blue-50 p-4 text-blue-700">
          <div className="tabular-nums text-2xl font-bold">{stats.reading}</div>
          <div className="mt-1 text-sm font-medium opacity-70">在读</div>
        </div>
        <div className="rounded-xl bg-amber-50 p-4 text-amber-700">
          <div className="tabular-nums text-2xl font-bold">{stats.unread}</div>
          <div className="mt-1 text-sm font-medium opacity-70">未读</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="搜索书名…"
            className="w-full rounded-lg border border-subtle bg-surface px-3 py-2 pl-9 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="rounded-lg border border-subtle bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">全部状态</option>
          <option value="read">已读</option>
          <option value="reading">在读</option>
          <option value="unread">未读</option>
        </select>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="rounded-lg border border-subtle bg-surface px-3 py-2 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">全部分类</option>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      <p className="mb-4 text-xs text-ink-muted">
        显示 {filtered.length} / {books.length} 本
      </p>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-subtle bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-subtle bg-surface-muted">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">封面</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted">书名</th>
                <th className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-ink-muted sm:table-cell">分类</th>
                <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-ink-muted">状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {filtered.map(book => (
                <tr key={book.title} className="transition-colors duration-150 hover:bg-surface-muted">
                  <td className="px-4 py-3">
                    <img
                      src={book.localCover}
                      alt=""
                      className="h-14 w-10 rounded object-cover shadow-sm"
                      loading="lazy"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-ink">{book.title}</p>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span className="rounded-full bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700">
                      {categoryLabels[book.category] || book.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1">
                      {statusOptions.map(opt => {
                        const isActive = book.status === opt.value
                        const isUpdatingThis = updating === book.title

                        let btnClass = 'rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors duration-200'
                        if (isActive && opt.value === 'read') {
                          btnClass += ' bg-emerald-100 text-emerald-700'
                        } else if (isActive && opt.value === 'reading') {
                          btnClass += ' bg-blue-100 text-blue-700'
                        } else if (isActive && opt.value === null) {
                          btnClass += ' bg-muted text-ink-muted'
                        } else {
                          btnClass += ' text-ink-muted hover:bg-surface-muted'
                        }

                        return (
                          <button
                            key={opt.label}
                            onClick={() => handleStatusChange(book, opt.value)}
                            disabled={isUpdatingThis}
                            className={btnClass}
                          >
                            {opt.label}
                          </button>
                        )
                      })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-ink-muted">没有匹配的书籍</p>
          </div>
        )}
      </div>
    </div>
  )
}
