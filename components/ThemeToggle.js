'use client'

import { useState, useEffect } from 'react'

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

  useEffect(() => {
    const saved = localStorage.getItem('blog-theme') || 'songhua'
    setCurrent(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  function applyTheme(id) {
    setCurrent(id)
    setOpen(false)
    localStorage.setItem('blog-theme', id)
    document.documentElement.setAttribute('data-theme', id)
  }

  const active = THEMES.find(t => t.id === current)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-gray-300 transition-colors text-sm font-medium text-gray-700"
        aria-label="切换主题"
      >
        {/* Colour swatches preview */}
        <span className="flex gap-0.5">
          {active.swatch.map((c, i) => (
            <span key={i} className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </span>
        <span>{active.label}</span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">
            <p className="px-3 pt-2.5 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">主题色</p>
            {THEMES.map(theme => (
              <button
                key={theme.id}
                onClick={() => applyTheme(theme.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                  current === theme.id
                    ? 'bg-gray-50 text-gray-900 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="flex gap-0.5">
                  {theme.swatch.map((c, i) => (
                    <span key={i} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: c }} />
                  ))}
                </span>
                <span className="flex-1 text-left">{theme.label}</span>
                {current === theme.id && (
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
