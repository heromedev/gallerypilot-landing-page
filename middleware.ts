import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'fr', 'de', 'es', 'pt', 'ja', 'ko', 'ru', 'zh']
const defaultLocale = 'en'

function getLocaleFromPathname(pathname: string): string | null {
  const segment = pathname.split('/')[1]
  if (locales.includes(segment)) return segment
  return null
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) {
    return NextResponse.next()
  }

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return NextResponse.next()

  const locale = getLocaleFromPathname(pathname)

  if (!locale) {
    const url = request.nextUrl.clone()
    url.pathname = `/${defaultLocale}${pathname}`
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|.*\\..*).*)'],
}
