import './globals.css'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata = {
  title: 'Tech Blog - 技术博客',
  description: '分享前端、后端及全栈开发的最佳实践与经验',
}

// Inline script: restore theme before first paint to avoid flash
const themeInitScript = `
(function(){
  var t = localStorage.getItem('blog-theme') || 'songhua';
  document.documentElement.setAttribute('data-theme', t);
})();
`

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-primary-600 transition-colors">
                <span className="text-2xl">📝</span>
                <span>Tech Blog</span>
              </Link>
              <nav className="flex items-center gap-4">
                <Link href="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                  首页
                </Link>
                <Link href="/admin" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                  管理后台
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </div>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-100 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-sm text-gray-500">
              <p>© 2024 Tech Blog. 用 Next.js 和 ❤️ 构建</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
