// ============================================================
// GTGS Security Utilities
// ============================================================

import path from 'path'

// Allowed file extensions for uploads
export const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.pdf', '.gif'])

// Allowed MIME types
export const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/pdf',
])

// Maximum file size: 5MB
export const MAX_FILE_SIZE = 5 * 1024 * 1024

// Maximum total upload size: 20MB
export const MAX_TOTAL_UPLOAD_SIZE = 20 * 1024 * 1024

// Maximum request body size (non-file data): 100KB
export const MAX_DATA_SIZE = 100 * 1024

// Rate limiting configuration
export const RATE_LIMITS = {
  application: { windowMs: 15 * 60 * 1000, maxRequests: 3 },
  adminLogin: { windowMs: 15 * 60 * 1000, maxRequests: 10 },
  adminApi: { windowMs: 60 * 1000, maxRequests: 60 },
  documents: { windowMs: 60 * 1000, maxRequests: 30 },
} as const

// In-memory rate limit store
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

/**
 * Check rate limit for a given key
 */
export function checkRateLimit(
  key: string,
  windowMs: number,
  maxRequests: number
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt }
}

/**
 * Get client IP from request headers
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim()
    if (firstIp) return firstIp
  }
  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

/**
 * Sanitize a string — strip HTML tags and dangerous characters
 */
export function sanitizeString(input: unknown): string {
  if (typeof input !== 'string') return ''
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'&]/g, '')
    .trim()
    .slice(0, 500)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

/**
 * Validate phone number
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/[^0-9]/g, '')
  return digits.length >= 6 && digits.length <= 15
}

/**
 * Validate uploaded file — checks extension, MIME type, and size
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const ext = '.' + file.name.split('.').pop()?.toLowerCase()

  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return { valid: false, error: `File type ${ext} is not allowed. Use JPG, PNG, PDF, or GIF.` }
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return { valid: false, error: `MIME type ${file.type} is not allowed.` }
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is 5MB.` }
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty.' }
  }

  return { valid: true }
}

/**
 * Validate a file path to prevent directory traversal
 */
export function isPathSafe(filePath: string, baseDir: string): boolean {
  const resolved = path.resolve(baseDir, filePath)
  return resolved.startsWith(baseDir)
}
