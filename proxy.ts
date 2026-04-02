import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 只保护 /admin，但放行登录页本身
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const cookie = request.cookies.get('admin_auth')
    if (cookie?.value !== '1') {
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
