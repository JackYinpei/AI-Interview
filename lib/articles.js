import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'articles.json')
const contentDir = path.join(process.cwd(), 'content', 'articles')

export function getAllArticles() {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(raw)
}

export function getArticleBySlug(slug) {
  const articles = getAllArticles()
  return articles.find(a => a.slug === slug) || null
}

export function getArticleContent(slug) {
  const filePath = path.join(contentDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  return fs.readFileSync(filePath, 'utf-8')
}

export function saveArticles(articles) {
  fs.writeFileSync(dataPath, JSON.stringify(articles, null, 2), 'utf-8')
}

export function saveArticleContent(slug, content) {
  const filePath = path.join(contentDir, `${slug}.md`)
  fs.writeFileSync(filePath, content, 'utf-8')
}

export function deleteArticleContent(slug) {
  const filePath = path.join(contentDir, `${slug}.md`)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}
