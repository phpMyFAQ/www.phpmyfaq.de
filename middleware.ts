import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Match only /news/<segment> (single segment)
  const match = pathname.match(/^\/news\/([^\/]+)$/)
  if (match) {
    const year = match[1]
    // Return 404 for non four-digit or out-of-range years
    if (!/^\d{4}$/.test(year)) {
      return new NextResponse('Not Found', { status: 404 })
    }
    const yearNum = parseInt(year, 10)
    if (yearNum < 2001 || yearNum > 2025) {
      return new NextResponse('Not Found', { status: 404 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/news/:year*'],
}

