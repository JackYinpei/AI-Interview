import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-8xl font-black text-gray-100 mb-4">404</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">页面不存在</h1>
        <p className="text-gray-500 mb-8">你访问的文章或页面不存在，可能已被删除。</p>
        <Link href="/" className="btn-primary">返回首页</Link>
      </div>
    </div>
  )
}
