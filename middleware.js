import { NextResponse } from 'next/server'

const COOKIE_NAME = 'admin-auth-token'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Skip login page and auth API routes
  if (pathname === '/admin/login' || pathname.startsWith('/api/auth/')) {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value
  const password = process.env.ADMIN_PASSWORD

  if (!password) {
    // No password configured — block access and show error
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('error', 'no-password')
    return NextResponse.redirect(loginUrl)
  }

  if (!token) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const expectedToken = await sha256(password + '-admin-secret')
  if (token !== expectedToken) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete(COOKIE_NAME)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
