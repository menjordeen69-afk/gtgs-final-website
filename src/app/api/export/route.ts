import { NextRequest, NextResponse } from 'next/server'
import { readFile, existsSync } from 'fs/promises'
import path from 'path'
import { getClientIp, sanitizeString, checkRateLimit, RATE_LIMITS } from '@/lib/security'

const DATA_DIR = path.join(process.cwd(), 'data')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gtgsadmin@2026'

function verifyAuth(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) return false
  const provided = auth.replace('Bearer ', '')
  if (provided.length > 64) return false
  return provided === ADMIN_PASSWORD
}

async function readJsonFile(filePath: string): Promise<unknown> {
  if (!existsSync(filePath)) return []
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function GET(request: NextRequest) {
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
    const format = searchParams.get('format') || 'json'

    const applications = await readJsonFile(path.join(DATA_DIR, 'applications.json'))
    const posts = await readJsonFile(path.join(DATA_DIR, 'posts.json'))

    const exportData = {
      exportedAt: new Date().toISOString(),
      institution: 'Global Technology and General Services (GTGS)',
      applications,
      posts,
      summary: {
        totalApplications: Array.isArray(applications) ? applications.length : 0,
        totalPosts: Array.isArray(posts) ? posts.length : 0,
        pendingApplications: Array.isArray(applications) ? (applications as Record<string, unknown>[]).filter((a: Record<string, unknown>) => a.status === 'pending').length : 0,
        approvedApplications: Array.isArray(applications) ? (applications as Record<string, unknown>[]).filter((a: Record<string, unknown>) => a.status === 'approved').length : 0,
        rejectedApplications: Array.isArray(applications) ? (applications as Record<string, unknown>[]).filter((a: Record<string, unknown>) => a.status === 'rejected').length : 0,
      },
    }

    if (format === 'json') {
      return new NextResponse(JSON.stringify(exportData, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="gtgs-data-${new Date().toISOString().slice(0, 10)}.json"`,
        },
      })
    }

    return NextResponse.json(exportData)
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Failed to export data.' }, { status: 500 })
  }
}
