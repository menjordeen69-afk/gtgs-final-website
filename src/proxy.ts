import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const response = NextResponse.next()
  const url = request.nextUrl

  // ===== Security Headers =====

  // Prevent clickjacking
  response.headers.set('X-Frame-Options', 'DENY')

  // Prevent MIME type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')

  // XSS Protection (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block')

  // Referrer policy — send origin only
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Permissions policy — disable unnecessary browser features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()'
  )

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')
  response.headers.set('Content-Security-Policy', csp)

  // HSTS — enforce HTTPS (1 year, include subdomains)
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )

  // Remove server identity
  response.headers.set('X-Powered-By', 'GTGS')

  // ===== Block direct access to data directory =====
  if (url.pathname.startsWith('/data/') || url.pathname === '/data') {
    return new NextResponse(null, { status: 404 })
  }

  // ===== Block access to common attack paths =====
  const blockedPaths = [
    '/.env', '/.git', '/.git/', '/wp-admin', '/wp-login', '/admin/config',
    '/phpmyadmin', '/phpmyadmin/', '/config.php', '/.htaccess',
    '/server-status', '/server-info', '/.well-known/security.txt',
    '/robots.txt.bak', '/sitemap.xml.bak',
  ]
  if (blockedPaths.some(p => url.pathname.toLowerCase().startsWith(p.toLowerCase()))) {
    return new NextResponse(null, { status: 404 })
  }

  return response
}

export const config = {
  matcher: [
    // Match all paths except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|logo\.svg|gtgs-logo\.jpg|hero-bg\.jpg).*)',
  ],
}
