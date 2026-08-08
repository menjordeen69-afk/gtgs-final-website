import { NextRequest, NextResponse } from 'next/server'
import { readFile, stat } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/security'

const DATA_DIR = path.join(process.cwd(), 'data')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gtgsadmin@2026'

function verifyAuth(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) return false
  const provided = auth.replace('Bearer ', '')
  if (provided.length > 64) return false
  return provided === ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request)

  // Rate limit
  const rateResult = checkRateLimit(`docs:${ip}`, RATE_LIMITS.documents.windowMs, RATE_LIMITS.documents.maxRequests)
  if (!rateResult.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  if (!verifyAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get('file')
    if (!filePath) {
      return NextResponse.json({ error: 'Missing file path' }, { status: 400 })
    }

    // Prevent directory traversal — must stay within DATA_DIR
    const resolved = path.resolve(DATA_DIR, filePath)
    if (!resolved.startsWith(path.resolve(DATA_DIR))) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    // Must be inside uploads/ subdirectory only
    if (!filePath.startsWith('uploads/')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 })
    }

    // No symlinks or double dots allowed in the path
    if (filePath.includes('..') || filePath.includes('//')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
    }

    if (!existsSync(resolved)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const fileStat = await stat(resolved)

    // Don't serve directories or files over 50MB
    if (fileStat.isDirectory()) {
      return NextResponse.json({ error: 'Not a file' }, { status: 400 })
    }
    if (fileStat.size > 50 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const fileBuffer = await readFile(resolved)
    const ext = path.extname(resolved).toLowerCase()

    const mimeTypes: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
    }

    const contentType = mimeTypes[ext] || 'application/octet-stream'
    const fileName = path.basename(resolved)

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileStat.size.toString(),
        'Content-Disposition': `inline; filename="${fileName}"`,
        'Cache-Control': 'no-store', // Don't cache sensitive documents
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 })
  }
}
