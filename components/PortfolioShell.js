'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SiteNavbar from '@/components/SiteNavbar'
import { portfolioContent } from '@/data/portfolio'
import { getAllBooks } from '@/data/books'

const readBooks = getAllBooks().filter(b => b.status === 'read')

const LOCALE_STORAGE_KEY = 'portfolio-locale'

export default function PortfolioShell() {
  const [locale, setLocale] = useState('zh')
  const content = portfolioContent[locale]

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (saved === 'zh' || saved === 'en') {
      setLocale(saved)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = content.locale
    document.documentElement.setAttribute('data-locale', locale)
  }, [content.locale, locale])

  function handleLocaleChange(nextLocale) {
    if (nextLocale === locale) return
    localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale)
    setLocale(nextLocale)
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] opacity-80"
        aria-hidden="true"
      >
        <div className="absolute left-[-8rem] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[#8fb3ff]/25 blur-3xl" />
        <div className="absolute right-[-6rem] top-16 h-[18rem] w-[18rem] rounded-full bg-tertiary-soft blur-3xl" />
      </div>

      <SiteNavbar locale={locale} onLocaleChange={handleLocaleChange} />

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8 lg:pt-14">
        <section id="top" className="scroll-mt-28 pt-4">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_22rem] lg:items-end">
            <div>
              <p className="section-kicker">{content.hero.eyebrow}</p>
              <h1 className="mt-6 max-w-5xl font-display text-[3.6rem] leading-[0.95] tracking-tight text-ink sm:text-[5.25rem] lg:text-[7rem]">
                {content.hero.lead}{' '}
                <span className="italic text-primary-600">{content.hero.accentA}</span>
                {content.hero.middle}{' '}
                <span className="italic text-tertiary">{content.hero.accentB}</span>
                <br className="hidden sm:block" />
                {content.hero.tail}
              </h1>

              <p className="mt-8 max-w-3xl text-base leading-8 text-ink-secondary sm:text-lg">
                {content.hero.description}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a href="#work" className="btn-primary">
                  {content.hero.primaryCta}
                </a>
                <a
                  href="https://github.com/JackYinpei"
                  target="_blank"
                  rel="noreferrer"
                  className="editorial-link"
                >
                  {content.hero.secondaryCta}
                </a>
              </div>

              <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {content.hero.stats.map(stat => (
                  <div key={stat.value} className="ghost-panel rounded-[1.6rem] p-5">
                    <p className="font-display text-[1.55rem] leading-tight text-ink">{stat.value}</p>
                    <p className="mt-2 text-sm leading-6 text-ink-secondary">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-4 lg:pb-9">
              <div className="ghost-panel rounded-[2rem] p-6">
                <p className="section-kicker">{content.hero.highlightTitle}</p>
                <div className="mt-5 space-y-5">
                  {content.hero.highlights.map(item => (
                    <div key={item.title} className="border-l border-subtle pl-4">
                      <p className="font-display text-xl text-ink">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-ink-secondary">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {content.hero.quickFacts.map(fact => (
                  <div key={fact.label} className="rounded-[1.6rem] bg-surface px-5 py-4 shadow-[0_12px_32px_rgba(26,28,27,0.04)] ring-1 ring-black/5">
                    <p className="text-xs uppercase tracking-[0.22em] text-ink-muted">{fact.label}</p>
                    <p className="mt-2 text-sm leading-6 text-ink">{fact.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section id="work" className="scroll-mt-28 pt-24">
          <SectionHeading
            eyebrow={content.work.eyebrow}
            title={content.work.title}
            description={content.work.description}
          />

          <div className="mt-16 space-y-24 lg:space-y-28">
            {content.projects.map((project, index) => {
              const reversed = index % 2 === 1

              return (
                <article key={project.slug} className="scroll-mt-28" id={project.slug}>
                  <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.92fr)] lg:items-center">
                    <div className={reversed ? 'lg:order-2' : undefined}>
                      <ProjectVisual project={project} />
                    </div>

                    <div className={reversed ? 'lg:order-1' : undefined}>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="label-chip">{project.label}</span>
                        <span className="text-xs uppercase tracking-[0.22em] text-ink-muted">
                          {project.status}
                        </span>
                      </div>

                      <h3 className="mt-6 max-w-xl font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                        {project.title}
                      </h3>

                      <p className="mt-5 max-w-xl text-base leading-8 text-ink-secondary sm:text-lg">
                        {project.description}
                      </p>

                      <ul className="mt-7 space-y-3">
                        {project.details.map(detail => (
                          <li key={detail} className="flex gap-3 text-sm leading-7 text-ink-secondary sm:text-base">
                            <span className="mt-3 h-1.5 w-1.5 rounded-full bg-primary-500" aria-hidden="true" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {project.stack.map(item => (
                          <span key={item} className="tag-chip">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-10 flex flex-wrap items-center gap-5">
                        <SmartLink href={project.link.href} className="editorial-link">
                          {project.link.label}
                        </SmartLink>
                        <div className="flex flex-wrap gap-2">
                          {project.metrics.map(metric => (
                            <span key={metric} className="metric-pill">
                              {metric}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="systems" className="scroll-mt-28 pt-24">
          <div className="rounded-[2.5rem] bg-surface p-8 shadow-[0_24px_70px_rgba(26,28,27,0.05)] ring-1 ring-black/5 sm:p-10 lg:p-14">
            <div className="grid gap-10 lg:grid-cols-[20rem_minmax(0,1fr)]">
              <SectionHeading
                eyebrow={content.systems.eyebrow}
                title={content.systems.title}
                description={content.systems.description}
                compact
              />

              <div className="grid gap-5 md:grid-cols-3">
                {content.systems.pillars.map(pillar => (
                  <div key={pillar.title} className="rounded-[1.75rem] bg-paper px-6 py-7 shadow-[0_12px_30px_rgba(26,28,27,0.04)] ring-1 ring-black/5">
                    <p className="font-display text-3xl leading-tight text-ink">{pillar.title}</p>
                    <p className="mt-4 text-sm leading-7 text-ink-secondary">{pillar.description}</p>
                    <div className="mt-6 space-y-3">
                      {pillar.items.map(item => (
                        <div key={item} className="border-l border-subtle pl-3 text-sm text-ink">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="writing" className="scroll-mt-28 pt-24">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
            <div>
              <SectionHeading
                eyebrow={content.writing.eyebrow}
                title={content.writing.title}
                description={content.writing.description}
              />

              <blockquote className="mt-10 border-l border-tertiary pl-6 font-display text-3xl italic leading-tight text-ink sm:text-4xl">
                “{content.writing.quote}”
              </blockquote>

              <div className="mt-10 ghost-panel rounded-[2rem] p-6 sm:p-8">
                <p className="section-kicker">{content.writing.processTitle}</p>
                <div className="mt-6 space-y-7">
                  {content.writing.steps.map(step => (
                    <div key={step.index} className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4">
                      <span className="font-display text-2xl italic text-primary-600">{step.index}</span>
                      <div>
                        <p className="font-display text-2xl leading-tight text-ink">{step.title}</p>
                        <p className="mt-2 text-sm leading-7 text-ink-secondary sm:text-base">{step.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {content.writing.cards.map((card, index) => (
                <div
                  key={card.title}
                  className={`rounded-[2rem] p-7 shadow-[0_18px_40px_rgba(26,28,27,0.04)] ring-1 ring-black/5 ${
                    index === 2 ? 'md:col-span-2 bg-surface' : 'bg-paper'
                  }`}
                >
                  <div className="flex h-full flex-col justify-between gap-10">
                    <div>
                      <p className="section-kicker">{card.eyebrow}</p>
                      <h3 className="mt-5 font-display text-3xl leading-tight text-ink">{card.title}</h3>
                    </div>
                    <p className="max-w-md text-sm leading-7 text-ink-secondary sm:text-base">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="scroll-mt-28 pt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="section-kicker">{locale === 'zh' ? 'READING' : 'READING'}</p>
              <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                {locale === 'zh' ? '最近读过的书' : 'Books I have read'}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-ink-secondary sm:text-lg">
                {locale === 'zh'
                  ? '技术、经济、哲学、历史、文学 —— 读得杂，但每一本都在某个时刻帮我多想了一步。'
                  : 'Tech, economics, philosophy, history, literature — wide-ranging reads that each shaped how I think.'}
              </p>
            </div>
            <Link
              href="/reading"
              className="editorial-link shrink-0"
            >
              {locale === 'zh' ? '查看全部书架' : 'Full bookshelf'}
            </Link>
          </div>

          <div className="mt-10 overflow-hidden">
            <BookMarquee books={readBooks} direction="left" />
            <BookMarquee books={[...readBooks].reverse()} direction="right" className="mt-4" />
          </div>
        </section>

        <section id="connect" className="scroll-mt-28 pt-24">
          <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.75),rgba(244,243,241,0.98))] p-8 shadow-[0_24px_70px_rgba(26,28,27,0.05)] ring-1 ring-black/5 sm:p-10 lg:p-14">
            <SectionHeading
              eyebrow={content.connect.eyebrow}
              title={content.connect.title}
              description={content.connect.description}
            />

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {content.connect.links.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[1.8rem] bg-surface px-6 py-6 shadow-[0_12px_32px_rgba(26,28,27,0.04)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-3xl leading-tight text-ink">{link.label}</p>
                      <p className="mt-3 text-sm leading-7 text-ink-secondary">{link.meta}</p>
                    </div>
                    <span className="rounded-full bg-primary-50 p-3 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      <ArrowUpRight />
                    </span>
                  </div>
                </a>
              ))}
            </div>

            <p className="mt-8 text-sm leading-7 text-ink-muted">{content.connect.footnote}</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p className="font-display text-xl italic text-ink">{content.brand}</p>
          <p className="text-sm uppercase tracking-[0.18em] text-ink-muted">{content.footer}</p>
        </div>
      </footer>
    </div>
  )
}

function SectionHeading({ eyebrow, title, description, compact = false }) {
  return (
    <div className={compact ? 'max-w-sm' : 'max-w-3xl'}>
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-ink-secondary sm:text-lg">{description}</p>
    </div>
  )
}

function SmartLink({ href, className, children }) {
  const external = href.startsWith('http')

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} className={className}>
      {children}
    </a>
  )
}

function ProjectVisual({ project }) {
  if (project.visual === 'magnet') {
    return <MagnetPreview />
  }

  if (project.visual === 'music') {
    return <MusicPreview />
  }

  if (project.visual === 'talk-news') {
    return <TalkNewsPreview />
  }

  return <WritingPreview />
}

function MagnetPreview() {
  return (
    <div className="project-surface aspect-[16/10] overflow-hidden rounded-[2.25rem] p-5 sm:p-6">
      <div className="flex h-full flex-col rounded-[1.6rem] bg-[#091528] p-4 text-white sm:p-5">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span>magnet2video</span>
          <span>download pipeline</span>
        </div>

        <div className="mt-4 grid flex-1 gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[1.3rem] bg-white/6 p-4 ring-1 ring-white/10">
            <p className="text-xs uppercase tracking-[0.25em] text-[#79a8ff]">magnet hash</p>
            <div className="mt-3 space-y-3">
              <div className="h-3 rounded-full bg-white/10" />
              <div className="h-3 w-4/5 rounded-full bg-white/10" />
              <div className="h-3 w-3/5 rounded-full bg-white/10" />
            </div>

            <div className="mt-6 space-y-3">
              {['Download', 'Transcode', 'Upload to S3'].map((item, index) => (
                <div key={item}>
                  <div className="mb-2 flex items-center justify-between text-xs text-white/70">
                    <span>{item}</span>
                    <span>{index === 2 ? 'queued' : 'running'}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? 'w-[92%]' : index === 1 ? 'w-[68%]' : 'w-[28%]'
                      } bg-gradient-to-r from-[#0a4ef5] to-[#76c4ff]`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[1.3rem] bg-gradient-to-br from-[#0a4ef5] to-[#74c0ff] p-[1px]">
              <div className="rounded-[1.2rem] bg-[#10213a] p-4">
                <div className="flex items-center justify-between text-xs text-white/70">
                  <span>Poster source</span>
                  <span>IMDB / upload</span>
                </div>
                <div className="mt-4 grid grid-cols-[5.3rem_minmax(0,1fr)] gap-3">
                  <div className="aspect-[3/4] rounded-[1rem] bg-[linear-gradient(180deg,#f7dcc3,#a55d34)]" />
                  <div className="space-y-3">
                    <div className="h-3 w-3/4 rounded-full bg-white/10" />
                    <div className="h-3 w-full rounded-full bg-white/10" />
                    <div className="h-3 w-5/6 rounded-full bg-white/10" />
                    <div className="mt-4 rounded-full bg-white/10 px-3 py-2 text-[11px] text-white/70">
                      Metadata matched
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-1 items-end rounded-[1.3rem] bg-white/6 p-4 ring-1 ring-white/10">
              <div className="w-full rounded-[1.1rem] bg-black/30 p-3">
                <div className="aspect-[16/8] rounded-[0.9rem] bg-[linear-gradient(120deg,#132846,#0a4ef5_45%,#6dbaff)]" />
                <div className="mt-3 flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-white/90" />
                  <div className="h-1.5 flex-1 rounded-full bg-white/20">
                    <div className="h-1.5 w-[62%] rounded-full bg-white/80" />
                  </div>
                  <span className="text-[11px] text-white/60">Stream ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MusicPreview() {
  return (
    <div className="project-surface aspect-[16/10] overflow-hidden rounded-[2.25rem] p-5 sm:p-6">
      <div className="grid h-full items-center gap-4 md:grid-cols-[1fr_15rem]">
        <div className="rounded-[1.7rem] bg-surface px-5 py-6 shadow-[0_16px_34px_rgba(26,28,27,0.06)] ring-1 ring-black/5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">playlist mood</p>
          <div className="mt-4 space-y-3">
            {[
              ['Sunset Run', '03:24'],
              ['After Rain', '04:08'],
              ['Blue Hour', '02:56'],
              ['Night Bus', '03:47'],
            ].map(item => (
              <div key={item[0]} className="flex items-center justify-between rounded-[1rem] bg-paper px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-[0.9rem] bg-[linear-gradient(135deg,#1f3559,#0a4ef5,#84d2ff)]" />
                  <div>
                    <p className="text-sm font-medium text-ink">{item[0]}</p>
                    <p className="text-xs text-ink-muted">Mini Program queue</p>
                  </div>
                </div>
                <span className="text-xs text-ink-muted">{item[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[15rem] rounded-[2.3rem] bg-[#121a2a] p-3 shadow-[0_24px_50px_rgba(18,26,42,0.22)]">
          <div className="rounded-[1.9rem] bg-[linear-gradient(180deg,#18345f_0%,#26497d_20%,#e17b45_78%,#f7d194_100%)] p-4 text-white">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/70">
              <span>playing</span>
              <span>wechat</span>
            </div>
            <div className="mt-5 aspect-square rounded-[1.5rem] bg-[linear-gradient(140deg,rgba(255,255,255,0.24),rgba(255,255,255,0.02))] p-4">
              <div className="h-full rounded-[1.15rem] border border-white/30" />
            </div>
            <div className="mt-5">
              <p className="font-display text-2xl italic">Blue Hour</p>
              <p className="mt-1 text-sm text-white/75">Ambient pop / curated flow</p>
            </div>
            <div className="mt-5 h-1.5 rounded-full bg-white/20">
              <div className="h-1.5 w-[58%] rounded-full bg-white" />
            </div>
            <div className="mt-5 flex items-center justify-between">
              <div className="h-10 w-10 rounded-full bg-white/15" />
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#121a2a]">
                <div className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-current" />
              </div>
              <div className="h-10 w-10 rounded-full bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TalkNewsPreview() {
  return (
    <div className="project-surface aspect-[16/10] overflow-hidden rounded-[2.25rem] p-5 sm:p-6">
      <div className="flex h-full flex-col rounded-[1.7rem] bg-[#15171f] p-5 text-white shadow-[0_20px_45px_rgba(21,23,31,0.25)]">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-white/45">
          <span>talk news</span>
          <span>audio-first learning</span>
        </div>

        <div className="mt-5 grid flex-1 gap-4 md:grid-cols-[1fr_14rem]">
          <div className="rounded-[1.4rem] bg-white/5 p-4 ring-1 ring-white/10">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-full bg-[#2d68f4]/70" />
              <div className="max-w-[18rem] rounded-[1.2rem] rounded-tl-sm bg-white/10 px-4 py-3 text-sm leading-6 text-white/80">
                Tell me the biggest story today, and explain the hard words.
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-3">
              <div className="max-w-[19rem] rounded-[1.2rem] rounded-tr-sm bg-[#0a4ef5]/20 px-4 py-3 text-sm leading-6 text-white/90">
                Today’s topic is inflation. I also extracted three useful vocabulary words from this article.
              </div>
              <div className="h-10 w-10 rounded-full bg-tertiary" />
            </div>

            <div className="mt-6 rounded-[1.25rem] bg-black/20 p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-white/60">
                <span>audio waveform</span>
                <span>live</span>
              </div>
              <div className="flex h-16 items-end gap-1">
                {[24, 38, 16, 44, 28, 52, 22, 35, 58, 20, 46, 29, 34, 54, 18, 40].map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className="w-full rounded-full bg-gradient-to-t from-[#0a4ef5] to-[#7cc8ff]"
                    style={{ height }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[1.35rem] bg-white/6 p-4 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">vocabulary</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['inflation', 'policy rate', 'consumer demand', 'headline news'].map(word => (
                  <span key={word} className="rounded-full bg-white/10 px-3 py-2 text-xs text-white/75">
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex-1 rounded-[1.35rem] bg-gradient-to-br from-white/8 to-white/4 p-4 ring-1 ring-white/10">
              <p className="text-xs uppercase tracking-[0.24em] text-white/45">learning loop</p>
              <div className="mt-5 space-y-4">
                {['Listen', 'Speak', 'Extract', 'Review'].map(item => (
                  <div key={item} className="rounded-[1rem] bg-black/20 px-4 py-3 text-sm text-white/85">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function WritingPreview() {
  return (
    <div className="project-surface aspect-[16/10] overflow-hidden rounded-[2.25rem] p-5 sm:p-6">
      <div className="grid h-full gap-4 md:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.7rem] bg-surface px-5 py-6 shadow-[0_16px_34px_rgba(26,28,27,0.06)] ring-1 ring-black/5">
          <p className="text-xs uppercase tracking-[0.24em] text-ink-muted">world rules</p>
          <div className="mt-5 space-y-4">
            {[
              'Power has a material cost.',
              'Every faction protects a different memory of history.',
              'AI can continue scenes, but cannot alter canon without review.',
            ].map(rule => (
              <div key={rule} className="rounded-[1rem] bg-paper px-4 py-4 text-sm leading-7 text-ink-secondary">
                {rule}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex-1 rounded-[1.7rem] bg-[linear-gradient(160deg,#f4e1cf_0%,#c68654_42%,#724027_100%)] p-6 text-[#2e180f] shadow-[0_18px_44px_rgba(148,91,48,0.18)]">
            <p className="text-xs uppercase tracking-[0.24em] text-[#5a3422]/65">excerpt logic</p>
            <blockquote className="mt-6 font-display text-3xl italic leading-tight">
              “The world stays coherent only when every new paragraph still obeys its old wounds.”
            </blockquote>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ['Lore', 'Keep canon stable'],
              ['Rewrite', 'Human editing pass'],
            ].map(card => (
              <div key={card[0]} className="rounded-[1.35rem] bg-surface px-4 py-5 shadow-[0_12px_32px_rgba(26,28,27,0.04)] ring-1 ring-black/5">
                <p className="font-display text-2xl text-ink">{card[0]}</p>
                <p className="mt-2 text-sm leading-6 text-ink-secondary">{card[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function BookMarquee({ books, direction = 'left', className = '' }) {
  const doubled = [...books, ...books]
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className={`relative ${className}`}>
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />

      <div className={`flex gap-4 ${animClass}`} style={{ width: 'max-content' }}>
        {doubled.map((book, i) => (
          <div
            key={`${book.title}-${i}`}
            className="group relative w-[5.5rem] shrink-0 sm:w-24"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.1)] ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
              <img
                src={book.localCover}
                alt={book.title}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}
