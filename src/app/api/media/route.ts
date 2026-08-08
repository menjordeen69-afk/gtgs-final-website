import { NextResponse } from 'next/server'
import { readdirSync, existsSync } from 'fs'
import path from 'path'

const VALID_TYPES = ['students', 'tutor', 'products'] as const
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type')

  if (!type || !VALID_TYPES.includes(type as (typeof VALID_TYPES)[number])) {
    return NextResponse.json(
      { error: 'Invalid type. Must be one of: students, tutor, products' },
      { status: 400 }
    )
  }

  try {
    const mediaDir = path.join(process.cwd(), 'public', 'media', type)

    if (!existsSync(mediaDir)) {
      return NextResponse.json(
        { error: `Media directory for '${type}' not found` },
        { status: 404 }
      )
    }

    const files = readdirSync(mediaDir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase()
        return IMAGE_EXTENSIONS.has(ext)
      })
      .sort()
      .map((file) => `/media/${type}/${file}`)

    return NextResponse.json(files)
  } catch {
    return NextResponse.json(
      { error: 'Failed to read media directory' },
      { status: 500 }
    )
  }
}
