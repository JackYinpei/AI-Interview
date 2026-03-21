'use client'

import { useEffect, useState } from 'react'
import { use } from 'react'
import ArticleForm from '@/components/ArticleForm'

export default function EditArticlePage({ params }) {
  const { id } = use(params)
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/articles/${id}`)
        if (!res.ok) throw new Error('文章不存在')
        const data = await res.json()
        setArticle(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">加载文章中...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">😔</p>
          <p className="text-gray-700 font-medium mb-2">加载失败</p>
          <p className="text-gray-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return <ArticleForm initialData={article} />
}
