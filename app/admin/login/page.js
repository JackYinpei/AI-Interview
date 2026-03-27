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

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (!response.ok) {
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
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
        <p className="text-sm font-medium text-red-700">未配置管理员密码</p>
        <p className="mt-1 text-xs text-red-500">
          请设置环境变量 <code className="rounded bg-red-100 px-1.5 py-0.5">ADMIN_PASSWORD</code>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="password" className="sr-only">
          管理员密码
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          placeholder="输入管理员密码"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-xl border border-subtle bg-surface px-4 py-3 text-ink placeholder:text-ink-muted transition-shadow focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {error && (
        <p className="text-center text-sm text-red-600" role="alert">
          {error}
        </p>
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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-vermilion text-lg font-bold text-white -rotate-3">
            文
          </div>
          <h1 className="text-xl font-bold text-ink">管理后台</h1>
          <p className="mt-1 text-sm text-ink-muted">请输入管理员密码</p>
        </div>

        <Suspense
          fallback={
            <div className="py-4 text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
