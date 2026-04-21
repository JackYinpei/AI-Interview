import './globals.css'
import JsonLd from '@/components/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'YangProfile | Portfolio',
    template: '%s | YangProfile',
  },
  description:
    'Portfolio of YangProfile, a full-stack developer building low-friction content products across better viewing experiences, useful news audio, mini programs, and narrative systems.',
  keywords: [
    'YangProfile',
    'Portfolio',
    'Next.js',
    'Media Pipeline',
    'AI Audio',
    'WeChat Mini Program',
    'LingDaily',
    'Magnet2Video',
  ],
  authors: [{ name: 'YangProfile' }],
  creator: 'YangProfile',
  publisher: 'YangProfile',
  formatDetection: {
    email: false,
    telephone: false,
  },
  openGraph: {
    title: 'YangProfile | Portfolio',
    description:
      'Full-stack developer portfolio featuring better viewing systems, a Spotify-style WeChat music player, LingDaily, and narrative-driven product work.',
    url: '/',
    siteName: 'YangProfile',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: 'YangProfile — Full-Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YangProfile | Portfolio',
    description:
      'Better viewing experiences, useful news audio, mini-program products, and narrative-driven systems.',
    images: ['/images/og-default.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const clientInitScript = `
(function () {
  var theme = localStorage.getItem('blog-theme') || 'songhua';
  var locale = localStorage.getItem('portfolio-locale') || 'zh';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-locale', locale);
  document.documentElement.lang = locale === 'en' ? 'en' : 'zh-CN';
})();
`

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'YangProfile',
  url: siteUrl,
  sameAs: ['https://github.com/JackYinpei'],
  jobTitle: 'Full-Stack Developer',
  description:
    'Full-stack developer building low-friction content products, useful news audio experiences, mini programs, and narrative systems.',
  knowsAbout: [
    'Next.js',
    'Node.js',
    'AI audio interfaces',
    'WeChat Mini Programs',
    'Media pipelines',
    'Narrative design',
  ],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'YangProfile',
  url: siteUrl,
  description:
    'Portfolio featuring content products, useful news audio, live product links, and narrative workflows.',
  inLanguage: ['en', 'zh-CN'],
  author: {
    '@type': 'Person',
    name: 'YangProfile',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: clientInitScript }} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body className="min-h-screen bg-paper font-body text-ink antialiased">
        {children}
      </body>
    </html>
  )
}
