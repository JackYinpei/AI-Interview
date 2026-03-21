'use client'

import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const noPassword = searchParams.get('error') === 'no-password'
  const from = searchParams.get('from') || '/admin'

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '登录失败')
        return
      }

      router.push(from)
      router.refresh()
    } catch {
      setError('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  if (noPassword) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
        <p className="text-sm text-red-700 font-medium">未配置管理员密码</p>
        <p className="text-xs text-red-500 mt-1">
          请设置环境变量 <code className="bg-red-100 px-1.5 py-0.5 rounded">ADMIN_PASSWORD</code>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="sr-only">管理员密码</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="输入管理员密码"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full px-4 py-3 rounded-xl border border-subtle bg-surface text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-shadow"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center" role="alert">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !password}
        className="btn-primary w-full justify-center disabled:opacity-50"
      >
        {loading ? '验证中…' : '登录'}
      </button>
    </form>
  )
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-vermilion flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 -rotate-3">
            文
          </div>
          <h1 className="text-xl font-bold text-ink">管理后台</h1>
          <p className="text-sm text-ink-muted mt-1">请输入管理员密码</p>
        </div>

        <Suspense fallback={
          <div className="text-center py-4">
            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        }>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
