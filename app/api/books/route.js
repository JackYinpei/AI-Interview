import { NextResponse } from 'next/server'
import { getAllBooks, updateBookStatus } from '@/lib/books'

export async function GET() {
  try {
    return NextResponse.json(getAllBooks())
  } catch {
    return NextResponse.json({ error: '获取书籍列表失败' }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { title, status } = await request.json()
    if (!title) {
      return NextResponse.json({ error: '缺少书名' }, { status: 400 })
    }
    const validStatuses = ['read', 'reading', null]
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: '无效的状态' }, { status: 400 })
    }
    const book = updateBookStatus(title, status)
    if (!book) {
      return NextResponse.json({ error: '未找到该书' }, { status: 404 })
    }
    return NextResponse.json(book)
  } catch {
    return NextResponse.json({ error: '更新失败' }, { status: 500 })
  }
}
