import SiteNavbar from '@/components/SiteNavbar'

export default function EditorialChrome({ children }) {
  return (
    <div className="min-h-screen">
      <SiteNavbar />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        {children}
      </main>

      <footer className="border-t border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-display text-xl italic text-ink">YangProfile</p>
          <p className="text-sm uppercase tracking-[0.18em] text-ink-muted">
            Systems, journal notes, and narrative work.
          </p>
        </div>
      </footer>
    </div>
  )
}
