
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function isAuthenticated(request: NextRequest): Promise<boolean> {
    try {
        const session = request.cookies.get('session')?.value;
        if (!session) return false;

        // Instead of using firebase-admin in middleware, we call an API route
        // that runs in the Node.js runtime and can use firebase-admin.
        const response = await fetch(new URL('/api/auth/verify', request.url), {
            headers: {
                Cookie: `session=${session}`
            }
        });

        return response.ok;
    } catch (error) {
        console.error('Authentication check failed:', error);
        return false;
    }
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // We need to exclude the verification api route from auth checks
  if (pathname.startsWith('/api/auth/verify')) {
      return NextResponse.next();
  }
  
  const isAuthed = await isAuthenticated(request);

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

  if (adminRoutes.some(route => pathname.startsWith(route)) && !isAuthed) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && isAuthed) {
    const redirectUrl = request.nextUrl.searchParams.get('redirect') || '/admin/dashboard';
    return NextResponse.redirect(new URL(redirectUrl, request.url))
  }
 
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login', '/api/auth/verify'],
}
