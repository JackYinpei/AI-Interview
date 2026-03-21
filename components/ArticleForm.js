'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MarkdownRenderer from './MarkdownRenderer'

const defaultContent = `# 文章标题

在这里写你的文章内容...

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
    readingTime: initialData?.readingTime || '5 分钟',
    featured: initialData?.featured || false,
    content: initialData?.content || defaultContent,
  })

  const [activeTab, setActiveTab] = useState('edit')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e) {
    const { name, value, type, checked } = e.target
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

  function handleTitleChange(e) {
    const title = e.target.value
    setForm(prev => ({
      ...prev,
      title,
      slug: prev.slug || autoSlug(title),
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return setError('请填写文章标题')
    if (!form.content.trim()) return setError('请填写文章内容')

    setSaving(true)
    setError('')

    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      }

      const url = isEdit ? `/api/articles/${initialData.id}` : '/api/articles'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || '保存失败')
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? '编辑文章' : '新建文章'}</h1>
          <p className="text-sm text-gray-500 mt-1">{isEdit ? '修改并保存文章内容' : '创建一篇新的文章'}</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => router.back()} className="btn-secondary">
            取消
          </button>
          <button type="submit" disabled={saving} className="btn-primary flex items-center gap-2">
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                保存中...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {isEdit ? '保存修改' : '发布文章'}
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm flex items-center gap-2">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Meta Info */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">基本信息</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">文章标题 *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleTitleChange}
                  placeholder="输入文章标题..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                <input
                  name="slug"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="url-friendly-slug"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
                <textarea
                  name="excerpt"
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="一句话介绍这篇文章..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">分类与标签</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="如：技术、设计、随笔"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">标签（逗号分隔）</label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="React, Next.js, 前端"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-wide">作者与封面</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">封面图片 URL</label>
                <input
                  name="coverImage"
                  value={form.coverImage}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {form.coverImage && (
                  <div className="mt-2 rounded-lg overflow-hidden aspect-video">
                    <img src={form.coverImage} alt="封面预览" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">作者</label>
                <input
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  placeholder="作者姓名"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">阅读时间</label>
                <input
                  name="readingTime"
                  value={form.readingTime}
                  onChange={handleChange}
                  placeholder="5 分钟"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">设为精选文章 ⭐</label>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content Editor */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-100">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'edit' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-gray-500 hover:text-gray-700'}`}
              >
                ✏️ 编辑
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'preview' ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50/50' : 'text-gray-500 hover:text-gray-700'}`}
              >
                👁️ 预览
              </button>
            </div>

            {activeTab === 'edit' ? (
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="使用 Markdown 格式编写文章内容..."
                className="w-full h-[600px] p-6 text-sm font-mono leading-relaxed focus:outline-none resize-none text-gray-800"
              />
            ) : (
              <div className="p-6 h-[600px] overflow-y-auto">
                <MarkdownRenderer content={form.content} />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  )
}
