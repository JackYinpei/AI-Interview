import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Decorative 404 with seal overlay */}
        <div className="relative mb-8">
          <p
            className="text-[10rem] font-display font-bold leading-none text-primary-100 select-none"
            aria-hidden="true"
          >
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="w-20 h-20 rounded-lg bg-vermilion flex items-center justify-center text-white text-3xl font-bold -rotate-6 shadow-lg"
              aria-hidden="true"
            >
              空
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-ink mb-3">页面不存在</h1>
        <p className="text-ink-secondary mb-8 leading-relaxed">
          你访问的页面可能已被删除，或从未存在过
        </p>
        <Link href="/" className="btn-primary">返回首页</Link>
      </div>
    </div>
  )
}
