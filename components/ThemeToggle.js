'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const THEMES = [
  {
    id: 'songhua',
    label: '松花',
    desc: '绿色系',
    swatch: ['#eef8ec', '#9ccf90', '#4d8a3e', '#26461f'],
  },
  {
    id: 'daiqingshan',
    label: '黛青山',
    desc: '青蓝色系',
    swatch: ['#e0f4fa', '#52b3d8', '#176382', '#0c3347'],
  },
]

export default function ThemeToggle() {
  const [current, setCurrent] = useState('songhua')
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem('blog-theme') || 'songhua'
    setCurrent(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    buttonRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    function handleKeyDown(e) {
      if (e.key === 'Escape') close()
    }
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, close])

  function applyTheme(id) {
    setCurrent(id)
    setOpen(false)
    localStorage.setItem('blog-theme', id)
    document.documentElement.setAttribute('data-theme', id)
  }

  const active = THEMES.find(t => t.id === current)

  return (
    <div className="relative" ref={containerRef}>
      <button
        ref={buttonRef}
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-subtle bg-surface hover:border-ink-muted transition-colors duration-200 text-sm font-medium text-ink-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        aria-label="切换主题"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex gap-0.5" aria-hidden="true">
          {active.swatch.map((c, i) => (
            <span key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </span>
        <span>{active.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-ink-muted transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-surface border border-subtle rounded-xl shadow-lg z-50 overflow-hidden"
          role="listbox"
          aria-label="选择主题"
        >
          <p className="px-3 pt-3 pb-1.5 text-xs font-semibold text-ink-muted uppercase tracking-wider">
            主题色
          </p>
          {THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => applyTheme(theme.id)}
              role="option"
              aria-selected={current === theme.id}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors duration-150 ${
                current === theme.id
                  ? 'bg-primary-50 text-ink font-semibold'
                  : 'text-ink-secondary hover:bg-surface-muted'
              } focus-visible:outline-none focus-visible:bg-primary-50`}
            >
              <span className="flex gap-0.5" aria-hidden="true">
                {theme.swatch.map((c, i) => (
                  <span key={i} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </span>
              <span className="flex-1 text-left">{theme.label}</span>
              {current === theme.id && (
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
