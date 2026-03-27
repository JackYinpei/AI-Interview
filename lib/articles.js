import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'articles.json')
const contentDir = path.join(process.cwd(), 'content', 'articles')

function ensureDirectories() {
  if (!fs.existsSync(path.dirname(dataPath))) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true })
  }

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true })
  }
}

export function getAllArticles() {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  const articles = JSON.parse(raw)

  return articles.sort((a, b) => {
    const timeA = new Date(b.publishedAt).getTime()
    const timeB = new Date(a.publishedAt).getTime()
    return timeA - timeB
  })
}

export function getArticleBySlug(slug) {
  return getAllArticles().find(article => article.slug === slug) || null
}

export function getArticleContent(slug) {
  const filePath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

export function saveArticles(articles) {
  ensureDirectories()
  fs.writeFileSync(dataPath, `${JSON.stringify(articles, null, 2)}\n`, 'utf-8')
}

export function saveArticleContent(slug, content) {
  ensureDirectories()
  const filePath = path.join(contentDir, `${slug}.md`)
  fs.writeFileSync(filePath, content, 'utf-8')
}

export function deleteArticleContent(slug) {
  const filePath = path.join(contentDir, `${slug}.md`)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

export function renameArticleContent(fromSlug, toSlug) {
  if (!fromSlug || !toSlug || fromSlug === toSlug) return

  const fromPath = path.join(contentDir, `${fromSlug}.md`)
  const toPath = path.join(contentDir, `${toSlug}.md`)

  if (fs.existsSync(fromPath)) {
    ensureDirectories()
    fs.renameSync(fromPath, toPath)
  }
}
