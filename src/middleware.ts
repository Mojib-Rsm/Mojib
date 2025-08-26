
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from 'firebase-admin/auth';
import { getApp, getApps, initializeApp } from 'firebase-admin/app';
import { serviceAccount } from '@/lib/firebase-admin';

const adminApp = !getApps().length ? initializeApp({
    credential: {
        projectId: serviceAccount.project_id,
        clientEmail: serviceAccount.client_email,
        privateKey: serviceAccount.private_key,
    }
}) : getApp();

async function isAuthenticated(request: NextRequest): Promise<boolean> {
    try {
        const session = request.cookies.get('session')?.value;
        if (!session) return false;
        await getAuth(adminApp).verifySessionCookie(session, true);
        return true;
    } catch (error) {
        return false;
    }
}


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
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
  matcher: ['/admin/:path*', '/login'],
}
