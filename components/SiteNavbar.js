'use client'

import { startTransition, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { portfolioContent } from '@/data/portfolio'

const LOCALE_STORAGE_KEY = 'portfolio-locale'

export default function SiteNavbar({ locale: controlledLocale, onLocaleChange }) {
  const pathname = usePathname()
  const isControlled = controlledLocale === 'zh' || controlledLocale === 'en'
  const [uncontrolledLocale, setUncontrolledLocale] = useState('zh')

  useEffect(() => {
    if (isControlled) return
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') {
      setUncontrolledLocale(saved)
    }
  }, [isControlled])

  const locale = isControlled ? controlledLocale : uncontrolledLocale
  const content = portfolioContent[locale]

  useEffect(() => {
    document.documentElement.lang = content.locale
    document.documentElement.setAttribute('data-locale', locale)
  }, [content.locale, locale])

  function handleLocaleChange(nextLocale) {
    if (nextLocale === locale) return
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    document.documentElement.lang = nextLocale === 'en' ? 'en' : 'zh-CN'
    document.documentElement.setAttribute('data-locale', nextLocale)

    if (onLocaleChange) {
      startTransition(() => onLocaleChange(nextLocale))
      return
    }

    setUncontrolledLocale(nextLocale)
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-nav border-b border-subtle">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={pathname === '/' ? '#top' : '/'}
            className="font-display text-2xl font-semibold tracking-tight text-ink transition-opacity hover:opacity-75"
          >
            {content.brand}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {content.nav.map(item => {
              const href = resolveHref(item.href, pathname)
              const active = isActiveNav(item.href, pathname)

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={`font-display text-lg italic transition-colors ${
                    active ? 'text-primary-600' : 'text-ink-secondary hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <LanguageToggle
              locale={locale}
              labels={content.switcher}
              ariaLabel={content.header.languageAriaLabel}
              onChange={handleLocaleChange}
            />
            <a
              href="https://github.com/JackYinpei"
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full bg-surface px-4 py-2 text-sm font-medium text-ink-secondary shadow-[0_10px_30px_rgba(26,28,27,0.05)] ring-1 ring-black/5 transition-colors hover:text-primary-600 sm:inline-flex"
            >
              {content.header.githubLabel}
            </a>
          </div>
        </div>

        <nav className="scrollbar-none overflow-x-auto border-t border-subtle px-4 py-3 md:hidden" aria-label="Mobile primary">
          <div className="mx-auto flex max-w-7xl gap-6 text-sm">
            {content.nav.map(item => {
              const href = resolveHref(item.href, pathname)
              const active = isActiveNav(item.href, pathname)

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={`whitespace-nowrap font-medium transition-colors ${
                    active ? 'text-primary-600' : 'text-ink-secondary hover:text-primary-600'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </header>
  )
}

function resolveHref(href, pathname) {
  if (!href.startsWith('#')) return href
  return pathname === '/' ? href : `/${href}`
}

function isActiveNav(href, pathname) {
  if (href === '/journal') {
    return pathname === '/journal' || pathname.startsWith('/article/')
  }
  return false
}

function LanguageToggle({ locale, labels, ariaLabel, onChange }) {
  return (
    <div
      className="inline-flex rounded-full bg-surface p-1 shadow-[0_10px_30px_rgba(26,28,27,0.05)] ring-1 ring-black/5"
      role="group"
      aria-label={ariaLabel}
    >
      {['zh', 'en'].map(code => {
        const active = locale === code

        return (
          <button
            key={code}
            type="button"
            onClick={() => onChange(code)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              active ? 'bg-primary-600 text-white' : 'text-ink-secondary hover:text-ink'
            }`}
            aria-pressed={active}
          >
            {labels[code]}
          </button>
        )
      })}
    </div>
  )
}
