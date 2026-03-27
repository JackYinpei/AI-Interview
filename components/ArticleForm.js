'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownRenderer from './MarkdownRenderer'

const defaultContent = `# 文章标题

在这里写你的文章内容…

## 章节一

正文内容。

\`\`\`javascript
// 代码示例
console.log('Hello World')
\`\`\`

## 总结

总结内容。
`

export default function ArticleForm({ initialData = null }) {
  const router = useRouter()
  const isEdit = !!initialData

  const [form, setForm] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    coverImage: initialData?.coverImage || '',
    category: initialData?.category || '',
    tags: initialData?.tags?.join(', ') || '',
    author: initialData?.author || '',
    authorBio: initialData?.authorBio || '',
    readingTime: initialData?.readingTime || '5 分钟',
    featured: initialData?.featured || false,
    content: initialData?.content || defaultContent,
  })

  const [activeTab, setActiveTab] = useState('edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value, type, checked } = event.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function autoSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  function handleTitleChange(event) {
    const title = event.target.value
    setForm(prev => ({
      ...prev,
      title,
      slug: prev.slug || autoSlug(title),
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!form.title.trim()) {
      setError('请填写文章标题')
      return
    }

    if (!form.content.trim()) {
      setError('请填写文章内容')
      return
    }

    setSaving(true)
    setError('')

    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      }

      const url = isEdit ? `/api/articles/${initialData.id}` : '/api/articles'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '保存失败')
      }

      router.push('/admin')
      router.refresh()
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-subtle bg-surface px-3 py-2 text-sm text-ink focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500'

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink">{isEdit ? '编辑文章' : '新建文章'}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {isEdit ? '修改并保存文章内容' : '创建一篇新的文章'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            取消
          </button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                  aria-hidden="true"
                />
                保存中…
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isEdit ? '保存修改' : '发布文章'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div
          className="mb-8 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-5">
          <fieldset className="rounded-2xl border border-subtle bg-surface p-5 shadow-sm">
            <legend className="sr-only">基本信息</legend>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">基本信息</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink-secondary">
                  文章标题 *
                </label>
                <input
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="输入文章标题…"
                  autoComplete="off"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="slug" className="mb-1 block text-sm font-medium text-ink-secondary">
                  URL Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="url-friendly-slug"
                  autoComplete="off"
                  className={`${inputClass} font-mono`}
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="mb-1 block text-sm font-medium text-ink-secondary">
                  摘要
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="一句话介绍这篇文章…"
                  rows={3}
                  autoComplete="off"
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-subtle bg-surface p-5 shadow-sm">
            <legend className="sr-only">分类与标签</legend>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">分类与标签</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="category" className="mb-1 block text-sm font-medium text-ink-secondary">
                  分类
                </label>
                <input
                  id="category"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="如：技术、设计、随笔"
                  autoComplete="off"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="tags" className="mb-1 block text-sm font-medium text-ink-secondary">
                  标签（逗号分隔）
                </label>
                <input
                  id="tags"
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="React, Next.js, 前端"
                  autoComplete="off"
                  className={inputClass}
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="rounded-2xl border border-subtle bg-surface p-5 shadow-sm">
            <legend className="sr-only">作者与封面</legend>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-ink">作者与封面</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="coverImage" className="mb-1 block text-sm font-medium text-ink-secondary">
                  封面图片 URL
                </label>
                <input
                  id="coverImage"
                  name="coverImage"
                  value={form.coverImage}
                  onChange={handleChange}
                  placeholder="https://..."
                  type="url"
                  autoComplete="url"
                  className={inputClass}
                />
                {form.coverImage && (
                  <div className="mt-2 aspect-video overflow-hidden rounded-lg">
                    <img
                      src={form.coverImage}
                      alt="封面预览"
                      width={320}
                      height={180}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="author" className="mb-1 block text-sm font-medium text-ink-secondary">
                  作者
                </label>
                <input
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="作者姓名"
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="authorBio" className="mb-1 block text-sm font-medium text-ink-secondary">
                  作者简介
                </label>
                <textarea
                  id="authorBio"
                  name="authorBio"
                  value={form.authorBio}
                  onChange={handleChange}
                  placeholder="一句话介绍作者"
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div>
                <label htmlFor="readingTime" className="mb-1 block text-sm font-medium text-ink-secondary">
                  阅读时间
                </label>
                <input
                  id="readingTime"
                  name="readingTime"
                  value={form.readingTime}
                  onChange={handleChange}
                  placeholder="5 分钟"
                  autoComplete="off"
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-subtle text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-ink-secondary">
                  设为精选文章
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-subtle bg-surface shadow-sm">
            <div className="flex border-b border-subtle" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'edit'}
                onClick={() => setActiveTab('edit')}
                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 ${
                  activeTab === 'edit'
                    ? 'border-b-2 border-primary-600 bg-[#edf4ff] text-primary-600'
                    : 'text-ink-muted hover:text-ink-secondary'
                }`}
              >
                编辑
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'preview'}
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 ${
                  activeTab === 'preview'
                    ? 'border-b-2 border-primary-600 bg-[#edf4ff] text-primary-600'
                    : 'text-ink-muted hover:text-ink-secondary'
                }`}
              >
                预览
              </button>
            </div>

            {activeTab === 'edit' ? (
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="使用 Markdown 格式编写文章内容…"
                className="h-[600px] w-full resize-none bg-surface p-6 font-mono text-sm leading-relaxed text-ink focus:outline-none"
                spellCheck="false"
              />
            ) : (
              <div className="h-[600px] overflow-y-auto p-6">
                <MarkdownRenderer content={form.content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
