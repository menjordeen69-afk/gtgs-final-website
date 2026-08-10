import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir, existsSync } from 'fs/promises'
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

// Sync offline changes: accepts an array of queued actions
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
    const actions: Array<{ type: string; data: Record<string, unknown> }> = body.actions || []

    if (!Array.isArray(actions) || actions.length === 0) {
      return NextResponse.json({ error: 'No actions to sync.' }, { status: 400 })
    }

    if (actions.length > 50) {
      return NextResponse.json({ error: 'Too many actions (max 50 per sync).' }, { status: 400 })
    }

    const results: Array<{ type: string; id?: string; success: boolean; error?: string }> = []
    const posts = await getPosts()

    for (const action of actions) {
      try {
        const { type, data } = action

        if (type === 'create') {
          const title = sanitizeString(data.title)
          const content = sanitizeString(data.content)
          const category = VALID_CATEGORIES.has(sanitizeString(data.category) as string)
            ? sanitizeString(data.category) : 'announcement'

          if (!title || !content) {
            results.push({ type, success: false, error: 'Missing title or content' })
            continue
          }

          const post = {
            id: data.id || `POST-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            title,
            content,
            category,
            published: data.published !== false,
            createdAt: data.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }
          posts.push(post)
          results.push({ type, id: post.id, success: true })

        } else if (type === 'update') {
          const id = sanitizeString(data.id)
          const index = posts.findIndex(p => p.id === id)
          if (index === -1) {
            results.push({ type, success: false, error: 'Post not found' })
            continue
          }
          const title = sanitizeString(data.title)
          const content = sanitizeString(data.content)
          if (title) posts[index].title = title
          if (content) posts[index].content = content
          if (data.category && VALID_CATEGORIES.has(sanitizeString(data.category) as string)) {
            posts[index].category = sanitizeString(data.category)
          }
          if (data.published !== undefined) posts[index].published = data.published
          posts[index].updatedAt = new Date().toISOString()
          results.push({ type, id, success: true })

        } else if (type === 'delete') {
          const id = sanitizeString(data.id)
          const index = posts.findIndex(p => p.id === id)
          if (index === -1) {
            results.push({ type, success: false, error: 'Post not found' })
            continue
          }
          posts.splice(index, 1)
          results.push({ type, id, success: true })

        } else {
          results.push({ type, success: false, error: 'Unknown action type' })
        }
      } catch (err) {
        results.push({ type: action.type, success: false, error: String(err) })
      }
    }

    await savePosts(posts)

    const succeeded = results.filter(r => r.success).length
    const failed = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      synced: succeeded,
      failed,
      results,
    })
  } catch {
    return NextResponse.json({ error: 'Sync failed.' }, { status: 500 })
  }
}
