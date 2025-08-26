
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('firebaseAuthToken')?.value;

  const adminRoutes = [
      '/admin/dashboard', 
      '/admin/analytics', 
      '/admin/content', 
      '/admin/blog',
      '/admin/projects',
      '/admin/media',
      '/admin/requests',
      '/admin/messages',
      '/admin/testimonials',
      '/admin/history',
      '/admin/settings'
    ];
  
  const isPublicRoute = pathname === '/login';

  if (adminRoutes.some(route => pathname.startsWith(route)) && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }
 
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
