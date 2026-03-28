'use client'

import { useState, useMemo } from 'react'
import EditorialChrome from '@/components/EditorialChrome'
import { getAllBooks, getBookStats, categories } from '@/data/books'

const allBooks = getAllBooks()
const stats = getBookStats()
const readCount = allBooks.filter(b => b.status === 'read').length
const readingCount = allBooks.filter(b => b.status === 'reading').length

export default function ReadingPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredBooks = useMemo(() => {
    let books = activeCategory === 'all'
      ? allBooks
      : allBooks.filter(b => b.category === activeCategory)

    if (statusFilter !== 'all') {
      if (statusFilter === 'unread') {
        books = books.filter(b => !b.status)
      } else {
        books = books.filter(b => b.status === statusFilter)
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      books = books.filter(b => b.title.toLowerCase().includes(q))
    }

    return books
  }, [activeCategory, searchQuery, statusFilter])

  return (
    <EditorialChrome>
      <section className="pt-4">
        <p className="section-kicker">BOOKSHELF</p>
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_20rem] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-display text-[3.5rem] leading-[0.95] tracking-tight text-ink sm:text-[5rem]">
              我的书架
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-ink-secondary sm:text-lg">
              这里是我在微信读书上积累的书单。技术、经济、历史、哲学、文学、心理 —— 读得杂，但每一本都在某个时刻帮我多想了一步。
            </p>
          </div>

          <div className="ghost-panel rounded-[2rem] p-6">
            <p className="section-kicker">统计</p>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between border-b border-subtle pb-3">
                <span className="font-display text-3xl text-ink">{allBooks.length}</span>
                <span className="text-sm text-ink-muted">本书</span>
              </div>
              <div className="flex items-center justify-between border-b border-subtle pb-3">
                <span className="font-display text-3xl text-emerald-600">{readCount}</span>
                <span className="text-sm text-ink-muted">已读完</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl text-blue-600">{readingCount}</span>
                <span className="text-sm text-ink-muted">在读</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <section className="pt-16">
        <div className="flex flex-col gap-5">
          {/* Category filters */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-1">
              {Object.entries(categories).map(([key, label]) => {
                const count = stats[key] || 0
                const active = activeCategory === key
                return (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary-600 text-white'
                        : 'bg-surface text-ink-secondary ring-1 ring-black/5 hover:text-ink'
                    }`}
                  >
                    {label.zh}
                    <span className={`text-xs ${active ? 'text-white/70' : 'text-ink-muted'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              {/* Status filters */}
              <div className="flex gap-1 rounded-full bg-surface p-1 ring-1 ring-black/5">
                {[
                  { key: 'all', label: '全部' },
                  { key: 'read', label: '已读' },
                  { key: 'reading', label: '在读' },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => setStatusFilter(opt.key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                      statusFilter === opt.key
                        ? 'bg-primary-600 text-white'
                        : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="搜索书名..."
                  className="w-full rounded-full bg-surface px-5 py-2.5 pl-10 text-sm text-ink ring-1 ring-black/5 placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary-400 sm:w-56"
                />
                <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book grid */}
      <section className="pt-10 pb-8">
        <div className="mb-6 flex items-center gap-4">
          <p className="text-sm text-ink-muted">
            {filteredBooks.length} 本
          </p>
          <div className="h-px flex-1 bg-subtle" />
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8">
          {filteredBooks.map((book, i) => (
            <BookCard key={`${book.title}-${i}`} book={book} />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-ink-muted">没有找到匹配的书籍</p>
          </div>
        )}
      </section>
    </EditorialChrome>
  )
}

function BookCard({ book }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted shadow-[0_4px_20px_rgba(0,0,0,0.08)] ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
        {!imgError ? (
          <img
            src={book.localCover}
            alt={book.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-elevated p-3">
            <span className="text-center text-xs leading-tight text-ink-muted">{book.title}</span>
          </div>
        )}

        {/* Status badge */}
        {book.status === 'read' && (
          <div className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-md" title="已读完">
            <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {book.status === 'reading' && (
          <div className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 shadow-md" title="正在阅读">
            <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        )}
      </div>
      <div className="mt-2.5 min-h-[2.5rem]">
        <p className="line-clamp-2 text-xs font-medium leading-tight text-ink">{book.title}</p>
      </div>
    </div>
  )
}
