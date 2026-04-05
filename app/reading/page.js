import ReadingPageClient from '@/components/ReadingPageClient'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata = {
  title: '书架',
  description:
    '我在微信读书上积累的 400+ 本书单——技术、经济、历史、哲学、文学、心理学，每一本都在某个时刻帮我多想了一步。',
  openGraph: {
    title: '书架 | Jack Yinpei',
    description: '400+ 本书单：技术、经济、哲学、历史、文学。来自微信读书的积累。',
    url: `${siteUrl}/reading`,
    siteName: 'Jack Yinpei',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: '书架 — Jack Yinpei',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '书架 | Jack Yinpei',
    description: '400+ 本书单：技术、经济、哲学、历史、文学。',
    images: ['/images/og-default.png'],
  },
  alternates: {
    canonical: `${siteUrl}/reading`,
  },
}

export default function ReadingPage() {
  return <ReadingPageClient />
}
