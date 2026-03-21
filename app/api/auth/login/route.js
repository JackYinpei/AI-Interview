import { NextResponse } from 'next/server'

const COOKIE_NAME = 'admin-auth-token'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function POST(request) {
  const { password } = await request.json()
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return NextResponse.json(
      { error: '未配置管理员密码，请设置 ADMIN_PASSWORD 环境变量' },
      { status: 500 }
    )
  }

  if (!password || password !== adminPassword) {
    return NextResponse.json(
      { error: '密码错误' },
      { status: 401 }
    )
  }

  const token = await sha256(adminPassword + '-admin-secret')
  const response = NextResponse.json({ success: true })

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })

  return response
}
