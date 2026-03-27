import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="max-w-xl text-center">
        <p className="section-kicker">404 / Not Found</p>
        <h1 className="mt-6 font-display text-5xl leading-none tracking-tight text-ink sm:text-7xl">
          This page drifted out of the archive.
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-base leading-8 text-ink-secondary sm:text-lg">
          这个页面暂时不在当前作品集结构里。返回首页会更有用。
        </p>
        <div className="mt-10">
          <Link href="/" className="btn-primary">
            Back To Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
