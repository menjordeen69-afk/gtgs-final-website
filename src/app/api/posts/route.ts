import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { sanitizeString, checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/security'

const DATA_DIR = path.join(process.cwd(), 'data')
const POSTS_FILE = path.join(DATA_DIR, 'posts.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gtgsadmin@2026'

const VALID_CATEGORIES = new Set(['announcement', 'news', 'event', 'notice'])

function verifyAuth(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) return false
  const provided = auth.replace('Bearer ', '')
  if (provided.length > 64) return false
  return provided === ADMIN_PASSWORD
}

async function getPosts(): Promise<Record<string, unknown>[]> {
  if (!existsSync(POSTS_FILE)) return []
  const raw = await readFile(POSTS_FILE, 'utf-8')
  return JSON.parse(raw)
}

async function savePosts(posts: Record<string, unknown>[]) {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
  await writeFile(POSTS_FILE, JSON.stringify(posts, null, 2))
}

export async function GET(request: NextRequest) {
  try {
    const posts = await getPosts()
    const published = posts.filter(p => p.published === true).sort((a, b) =>
      new Date(b.createdAt as string).getTime() - new Date(a.createdAt as string).getTime()
    )
    return NextResponse.json({ posts: published, total: published.length })
  } catch {
    return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rateResult = checkRateLimit(`admin:${ip}`, RATE_LIMITS.adminApi.windowMs, RATE_LIMITS.adminApi.maxRequests)
  if (!rateResult.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const title = sanitizeString(body.title)
    const content = sanitizeString(body.content)
    const category = sanitizeString(body.category) || 'announcement'
    const published = body.published !== false

    if (!title || title.length < 3) {
      return NextResponse.json({ error: 'Title is required (min 3 characters).' }, { status: 400 })
    }
    if (!content || content.length < 10) {
      return NextResponse.json({ error: 'Content is required (min 10 characters).' }, { status: 400 })
    }
    if (!VALID_CATEGORIES.has(category)) {
      return NextResponse.json({ error: `Invalid category. Use: ${[...VALID_CATEGORIES].join(', ')}` }, { status: 400 })
    }

    const posts = await getPosts()
    const post = {
      id: `POST-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      title,
      content,
      category,
      published,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    posts.push(post)
    await savePosts(posts)
    return NextResponse.json({ success: true, post }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create post.' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const ip = getClientIp(request)
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rateResult = checkRateLimit(`admin:${ip}`, RATE_LIMITS.adminApi.windowMs, RATE_LIMITS.adminApi.maxRequests)
  if (!rateResult.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const id = sanitizeString(body.id)
    if (!id || !id.startsWith('POST-')) {
      return NextResponse.json({ error: 'Invalid post ID.' }, { status: 400 })
    }

    const posts = await getPosts()
    const index = posts.findIndex((p: Record<string, unknown>) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 })
    }

    const title = sanitizeString(body.title)
    const content = sanitizeString(body.content)
    const category = sanitizeString(body.category)
    const published = body.published

    if (title) posts[index].title = title
    if (content) posts[index].content = content
    if (category && VALID_CATEGORIES.has(category)) posts[index].category = category
    if (published !== undefined) posts[index].published = published
    posts[index].updatedAt = new Date().toISOString()

    await savePosts(posts)
    return NextResponse.json({ success: true, post: posts[index] })
  } catch {
    return NextResponse.json({ error: 'Failed to update post.' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const ip = getClientIp(request)
  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const rateResult = checkRateLimit(`admin:${ip}`, RATE_LIMITS.adminApi.windowMs, RATE_LIMITS.adminApi.maxRequests)
  if (!rateResult.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = sanitizeString(searchParams.get('id') || '')
    if (!id || !id.startsWith('POST-')) {
      return NextResponse.json({ error: 'Invalid post ID.' }, { status: 400 })
    }

    const posts = await getPosts()
    const index = posts.findIndex((p: Record<string, unknown>) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found.' }, { status: 404 })
    }
    posts.splice(index, 1)
    await savePosts(posts)
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete post.' }, { status: 500 })
  }
}
