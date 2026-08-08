import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir, rm } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import {
  checkRateLimit,
  getClientIp,
  RATE_LIMITS,
  sanitizeString,
} from '@/lib/security'

const DATA_DIR = path.join(process.cwd(), 'data')
const APPS_FILE = path.join(DATA_DIR, 'applications.json')
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gtgsadmin@2026'

const VALID_STATUSES = new Set(['pending', 'approved', 'rejected'])

// Brute-force tracking: lock IPs after 5 failed attempts in 15 minutes
const failedAttempts = new Map<string, { count: number; lockedUntil: number }>()
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

function verifyAuth(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  if (!auth || !auth.startsWith('Bearer ')) return false
  // Use timing-safe comparison to prevent timing attacks
  const provided = auth.replace('Bearer ', '')
  if (provided.length > 64) return false // Unreasonably long
  return provided === ADMIN_PASSWORD
}

function checkBruteForce(ip: string): { locked: boolean; remainingAttempts: number } {
  const entry = failedAttempts.get(ip)
  if (!entry) return { locked: false, remainingAttempts: MAX_FAILED_ATTEMPTS }

  const now = Date.now()
  if (entry.lockedUntil > now) {
    return { locked: true, remainingAttempts: 0 }
  }

  // Lockout expired, reset
  if (now > entry.lockedUntil && entry.lockedUntil > 0) {
    failedAttempts.delete(ip)
    return { locked: false, remainingAttempts: MAX_FAILED_ATTEMPTS }
  }

  return { locked: false, remainingAttempts: MAX_FAILED_ATTEMPTS - entry.count }
}

function recordFailedAttempt(ip: string) {
  const entry = failedAttempts.get(ip) || { count: 0, lockedUntil: 0 }
  entry.count++
  if (entry.count >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_DURATION
  }
  failedAttempts.set(ip, entry)
}

function resetFailedAttempts(ip: string) {
  failedAttempts.delete(ip)
}

async function getApplications() {
  if (!existsSync(APPS_FILE)) return []
  const raw = await readFile(APPS_FILE, 'utf-8')
  return JSON.parse(raw)
}

export async function GET(request: NextRequest) {
  const ip = getClientIp(request)

  // Brute-force check
  const bf = checkBruteForce(ip)
  if (bf.locked) {
    return NextResponse.json(
      { error: 'Too many failed attempts. Account locked for 15 minutes.' },
      { status: 429 }
    )
  }

  if (!verifyAuth(request)) {
    recordFailedAttempt(ip)
    const remaining = checkBruteForce(ip).remainingAttempts
    return NextResponse.json(
      { error: 'Unauthorized', remainingAttempts: remaining },
      { status: 401 }
    )
  }

  // Successful auth — reset brute-force counter
  resetFailedAttempts(ip)

  // Rate limiting
  const rateResult = checkRateLimit(`admin:${ip}`, RATE_LIMITS.adminApi.windowMs, RATE_LIMITS.adminApi.maxRequests)
  if (!rateResult.allowed) {
    return NextResponse.json({ error: 'Too many requests. Slow down.' }, { status: 429 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format')
    const applications = await getApplications()

    if (format === 'csv') {
      if (applications.length === 0) {
        return NextResponse.json({ error: 'No applications to export' }, { status: 404 })
      }
      const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Gender', 'DOB', 'Address', 'Department', 'Experience', 'Status', 'Submitted At']
      const rows = applications.map((a: Record<string, unknown>) => [
        a.id, a.fullName, a.email, a.phoneNumber, a.gender, a.dateOfBirth, a.residentialAddress, a.department, a.experienceLevel || '', a.status, a.submittedAt
      ].map(v => `"${String(v || '').replace(/"/g, '""')}"`).join(','))
      const csv = [headers.join(','), ...rows].join('\n')
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="gtgs-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      })
    }

    return NextResponse.json({ applications, total: applications.length })
  } catch {
    return NextResponse.json({ error: 'Failed to read applications' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const ip = getClientIp(request)
  const bf = checkBruteForce(ip)
  if (bf.locked) {
    return NextResponse.json({ error: 'Locked. Try again later.' }, { status: 429 })
  }

  if (!verifyAuth(request)) {
    recordFailedAttempt(ip)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  resetFailedAttempts(ip)

  // Rate limit
  const rateResult = checkRateLimit(`admin:${ip}`, RATE_LIMITS.adminApi.windowMs, RATE_LIMITS.adminApi.maxRequests)
  if (!rateResult.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = sanitizeString(searchParams.get('id') || '')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    // Validate ID format (APP-numeric)
    if (!/^APP-\d+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid application ID' }, { status: 400 })
    }

    const applications = await getApplications()
    const index = applications.findIndex((a: Record<string, unknown>) => a.id === id)
    if (index === -1) return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    applications.splice(index, 1)
    if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
    await writeFile(APPS_FILE, JSON.stringify(applications, null, 2))

    // Delete uploaded files safely
    const uploadDir = path.join(DATA_DIR, 'uploads', id)
    const resolvedDir = path.resolve(uploadDir)
    if (resolvedDir.startsWith(path.resolve(DATA_DIR))) {
      try { await rm(resolvedDir, { recursive: true, force: true }) } catch { /* ignore */ }
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const ip = getClientIp(request)
  const bf = checkBruteForce(ip)
  if (bf.locked) {
    return NextResponse.json({ error: 'Locked. Try again later.' }, { status: 429 })
  }

  if (!verifyAuth(request)) {
    recordFailedAttempt(ip)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  resetFailedAttempts(ip)

  // Rate limit
  const rateResult = checkRateLimit(`admin:${ip}`, RATE_LIMITS.adminApi.windowMs, RATE_LIMITS.adminApi.maxRequests)
  if (!rateResult.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const id = sanitizeString(body.id)
    const status = sanitizeString(body.status)

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
    }

    // Validate ID format
    if (!/^APP-\d+$/.test(id)) {
      return NextResponse.json({ error: 'Invalid application ID' }, { status: 400 })
    }

    // Validate status value
    if (!VALID_STATUSES.has(status)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 })
    }

    const applications = await getApplications()
    const index = applications.findIndex((a: Record<string, unknown>) => a.id === id)
    if (index === -1) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 })
    }

    applications[index].status = status
    if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })
    await writeFile(APPS_FILE, JSON.stringify(applications, null, 2))

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}
