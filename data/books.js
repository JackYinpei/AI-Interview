import booksData from './books.json'

export const categories = {
  all: { zh: '全部', en: 'All' },
  tech: { zh: '技术', en: 'Tech' },
  economics: { zh: '经济 / 商业', en: 'Economics' },
  literature: { zh: '文学 / 人文', en: 'Literature' },
  history: { zh: '历史 / 社会', en: 'History' },
  psychology: { zh: '心理 / 成长', en: 'Psychology' },
  philosophy: { zh: '哲学 / 思想', en: 'Philosophy' },
}

export function getAllBooks() {
  return booksData
}

export function getBooksByCategory(category) {
  if (category === 'all') return booksData
  return booksData.filter(b => b.category === category)
}

export function getBookStats() {
  const stats = {}
  for (const book of booksData) {
    stats[book.category] = (stats[book.category] || 0) + 1
  }
  stats.all = booksData.length
  return stats
}
