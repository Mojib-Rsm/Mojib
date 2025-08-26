
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
  const { pathname } = request.nextUrl;
  
  // Exclude API routes used for auth from the middleware checks themselves
  if (pathname.startsWith('/api/auth/')) {
      return NextResponse.next();
  }
  
  const isAuthed = await isAuthenticated(request);

  const adminRoutes = [
      '/admin', // Catch the base /admin route as well
      '/admin/dashboard', 
      '/admin/analytics', 
      '/admin/services',
      '/admin/projects',
      '/admin/blog',
      '/admin/testimonials',
      '/admin/messages',
      '/admin/content',
      '/admin/media',
      '/admin/requests',
      '/admin/history',
      '/admin/settings'
    ];
  
  const isPublicRoute = pathname === '/login';

  const isAccessingAdminRoute = adminRoutes.some(route => pathname.startsWith(route));

  if (isAccessingAdminRoute && !isAuthed) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isPublicRoute && isAuthed) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }
 
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
