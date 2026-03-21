import './globals.css'
import Link from 'next/link'
import { Cormorant_Garamond } from 'next/font/google'
import ThemeToggle from '@/components/ThemeToggle'
import JsonLd from '@/components/JsonLd'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Tech Blog - AI 技术面试博客',
    template: '%s | Tech Blog',
  },
  description: '专注于 AI Agent、RAG、LLM 等前沿技术的面试八股文与深度解析，助你系统掌握大模型应用开发核心知识。',
  keywords: ['AI面试', 'Agent', 'RAG', 'LLM', '大模型', '面试八股文', 'Transformer', 'Function Calling', '检索增强生成'],
  authors: [{ name: 'AI面试官' }],
  creator: 'Tech Blog',
  publisher: 'Tech Blog',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: 'Tech Blog - AI 技术面试博客',
    description: '专注于 AI Agent、RAG、LLM 等前沿技术的面试八股文与深度解析。',
    url: '/',
    siteName: 'Tech Blog',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - AI 技术面试博客',
    description: '专注于 AI Agent、RAG、LLM 等前沿技术的面试八股文与深度解析。',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
}

const themeInitScript = `
(function(){
  var t = localStorage.getItem('blog-theme') || 'songhua';
  document.documentElement.setAttribute('data-theme', t);
})();
`

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tech Blog',
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  description: '专注于 AI Agent、RAG、LLM 等前沿技术的面试八股文与深度解析博客',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tech Blog',
  url: siteUrl,
  description: '专注于 AI Agent、RAG、LLM 等前沿技术的面试八股文与深度解析',
  inLanguage: 'zh-CN',
  publisher: {
    '@type': 'Organization',
    name: 'Tech Blog',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" className={cormorant.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body>
        <header className="sticky top-0 z-50 header-blur border-b border-subtle">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="flex items-center gap-3 group rounded-lg px-2 py-1 -ml-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <span
                  className="w-8 h-8 rounded-sm bg-vermilion flex items-center justify-center text-white text-xs font-bold -rotate-3 transition-transform duration-200 group-hover:rotate-0"
                  aria-hidden="true"
                >
                  文
                </span>
                <span className="font-display text-xl font-semibold tracking-tight text-ink">
                  Tech Blog
                </span>
              </Link>

              <nav className="flex items-center gap-1" role="navigation" aria-label="主导航">
                <Link
                  href="/"
                  className="text-sm font-medium text-ink-secondary px-3 py-2 rounded-lg hover:text-ink hover:bg-surface-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  首页
                </Link>
                <Link
                  href="/admin"
                  className="text-sm font-medium text-ink-secondary px-3 py-2 rounded-lg hover:text-ink hover:bg-surface-muted transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                >
                  管理后台
                </Link>
                <div className="ml-2 pl-2 border-l border-subtle">
                  <ThemeToggle />
                </div>
              </nav>
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="mt-20 border-t border-subtle">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span
                  className="w-6 h-6 rounded-sm bg-vermilion flex items-center justify-center text-white text-[10px] font-bold -rotate-3"
                  aria-hidden="true"
                >
                  文
                </span>
                <span className="text-sm font-medium text-ink-secondary">Tech Blog</span>
              </div>
              <p className="text-sm text-ink-muted">
                © 2024 Tech Blog · 以 Next.js 构建
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
