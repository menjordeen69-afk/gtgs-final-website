import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir, readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import {
  checkRateLimit,
  getClientIp,
  sanitizeString,
  isValidEmail,
  isValidPhone,
  validateFile,
  MAX_DATA_SIZE,
  MAX_TOTAL_UPLOAD_SIZE,
  RATE_LIMITS,
} from '@/lib/security'

const DATA_DIR = path.join(process.cwd(), 'data')
const APPS_FILE = path.join(DATA_DIR, 'applications.json')

const ALLOWED_DEPARTMENTS = new Set([
  'ICT', 'Graphic Design', 'Entrepreneurship', 'Catering', 'Cosmetology', 'Soap Making', 'Gara Tie-Dye',
])

const ALLOWED_GENDERS = new Set(['Male', 'Female'])

const ALLOWED_EXPERIENCE = new Set([
  'No Experience', 'Beginner (less than 1 year)', 'Intermediate (1-3 years)', 'Advanced (3+ years)',
])

const DOC_KEYS = ['nationalId', 'wassce', 'birthCert', 'passportPhoto', 'otherDoc']

async function saveApplication(data: Record<string, string>, files: { key: string; name: string; type: string; size: number; savedPath: string }[]) {
  if (!existsSync(DATA_DIR)) await mkdir(DATA_DIR, { recursive: true })

  let applications: Array<Record<string, unknown>> = []
  if (existsSync(APPS_FILE)) {
    const raw = await readFile(APPS_FILE, 'utf-8')
    applications = JSON.parse(raw)
  }

  const id = `APP-${Date.now()}`
  const record = {
    id,
    ...data,
    documents: files.map(f => ({ fileName: f.name, fileType: f.type, fileSize: f.size, key: f.key, savedPath: f.savedPath })),
    status: 'pending',
    submittedAt: new Date().toISOString(),
  }

  applications.push(record)
  await writeFile(APPS_FILE, JSON.stringify(applications, null, 2))
  return record
}

export async function POST(request: NextRequest) {
  try {
    // === Rate Limiting ===
    const ip = getClientIp(request)
    const rateResult = checkRateLimit(
      `app:${ip}`,
      RATE_LIMITS.application.windowMs,
      RATE_LIMITS.application.maxRequests
    )
    if (!rateResult.allowed) {
      return NextResponse.json(
        { error: 'Too many applications. Please try again later.' },
        {
          status: 429,
          headers: { 'Retry-After': Math.ceil((rateResult.resetAt - Date.now()) / 1000).toString() },
        }
      )
    }

    const formData = await request.formData()
    const dataStr = formData.get('data') as string
    if (!dataStr) return NextResponse.json({ error: 'Missing application data' }, { status: 400 })

    // === Data size check ===
    if (dataStr.length > MAX_DATA_SIZE) {
      return NextResponse.json({ error: 'Application data too large.' }, { status: 400 })
    }

    let data: Record<string, unknown>
    try {
      data = JSON.parse(dataStr)
    } catch {
      return NextResponse.json({ error: 'Invalid data format.' }, { status: 400 })
    }

    // === Sanitize and validate all fields ===
    const fullName = sanitizeString(data.fullName)
    const email = sanitizeString(data.email || data.gmail)
    const phoneNumber = sanitizeString(data.phoneNumber)
    const gender = sanitizeString(data.gender)
    const dateOfBirth = sanitizeString(data.dateOfBirth)
    const residentialAddress = sanitizeString(data.residentialAddress)
    const department = sanitizeString(data.department)
    const experienceLevel = sanitizeString(data.experienceLevel)
    const personalStatement = sanitizeString(data.personalStatement)

    // Required field checks
    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: 'Full name is required (min 2 characters).' }, { status: 400 })
    }

    if (!email.endsWith('@gmail.com') || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid Gmail address is required.' }, { status: 400 })
    }

    if (!isValidPhone(phoneNumber)) {
      return NextResponse.json({ error: 'A valid phone number is required.' }, { status: 400 })
    }

    if (!department || !ALLOWED_DEPARTMENTS.has(department)) {
      return NextResponse.json({ error: 'Please select a valid department.' }, { status: 400 })
    }

    if (gender && !ALLOWED_GENDERS.has(gender)) {
      return NextResponse.json({ error: 'Invalid gender value.' }, { status: 400 })
    }

    if (experienceLevel && !ALLOWED_EXPERIENCE.has(experienceLevel)) {
      return NextResponse.json({ error: 'Invalid experience level.' }, { status: 400 })
    }

    // === Validate date of birth (must be a valid date, not in the future, age 10-100) ===
    if (dateOfBirth) {
      const dob = new Date(dateOfBirth)
      const now = new Date()
      if (isNaN(dob.getTime())) {
        return NextResponse.json({ error: 'Invalid date of birth.' }, { status: 400 })
      }
      const age = (now.getTime() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      if (age < 10 || age > 100) {
        return NextResponse.json({ error: 'Date of birth indicates an invalid age (must be 10-100).' }, { status: 400 })
      }
    }

    // === File uploads ===
    const appId = `APP-${Date.now()}`
    const uploadDir = path.join(DATA_DIR, 'uploads', appId)
    if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true })

    const savedFiles: { key: string; name: string; type: string; size: number; savedPath: string }[] = []
    let totalUploadSize = 0

    for (const key of DOC_KEYS) {
      const file = formData.get(key) as File | null
      if (file && file.size > 0) {
        // Validate file
        const fileCheck = validateFile(file)
        if (!fileCheck.valid) {
          return NextResponse.json({ error: `${file.name}: ${fileCheck.error}` }, { status: 400 })
        }

        totalUploadSize += file.size
        if (totalUploadSize > MAX_TOTAL_UPLOAD_SIZE) {
          return NextResponse.json({ error: 'Total upload size exceeds 20MB limit.' }, { status: 400 })
        }

        const safeName = `${key}-${Date.now()}${path.extname(file.name).toLowerCase()}`
        const filePath = path.join(uploadDir, safeName)

        // Double-check path is safe
        const resolved = path.resolve(filePath)
        if (!resolved.startsWith(path.resolve(uploadDir))) {
          return NextResponse.json({ error: 'Invalid file path.' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        await writeFile(filePath, Buffer.from(bytes))
        savedFiles.push({
          key,
          name: file.name,
          type: file.type,
          size: file.size,
          savedPath: `uploads/${appId}/${safeName}`,
        })
      }
    }

    // Save to local database
    const sanitizedData: Record<string, string> = {
      fullName,
      email,
      phoneNumber,
      gender,
      dateOfBirth,
      residentialAddress,
      department,
      experienceLevel,
      personalStatement,
    }

    const record = await saveApplication(sanitizedData, savedFiles)

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      id: record.id,
    })
  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json({ error: 'Failed to submit application. Please try again later.' }, { status: 500 })
  }
}
