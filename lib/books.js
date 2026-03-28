import fs from 'fs'
import path from 'path'

const dataPath = path.join(process.cwd(), 'data', 'books.json')

export function getAllBooks() {
  const raw = fs.readFileSync(dataPath, 'utf-8')
  return JSON.parse(raw)
}

export function saveBooks(books) {
  fs.writeFileSync(dataPath, `${JSON.stringify(books, null, 2)}\n`, 'utf-8')
}

export function updateBookStatus(title, status) {
  const books = getAllBooks()
  const book = books.find(b => b.title === title)
  if (!book) return null
  book.status = status
  saveBooks(books)
  return book
}
