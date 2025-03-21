import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of paths that don't require authentication
const publicPaths = ['/login', '/register', '/forgot-password', '/reset-password'];

export default function middleware(request: NextRequest) {
  // Get the path of the request
  const path = request.nextUrl.pathname;
  
  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));
  
  // Get the session cookie
  const appwriteSession = request.cookies.get('a_session_');
  const isAuthenticated = !!appwriteSession;
  
  // Redirect logic
  if (!isAuthenticated && !isPublicPath) {
    // Redirect to login if trying to access a protected route while unauthenticated
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }
  
  if (isAuthenticated && isPublicPath) {
    // Redirect to dashboard if trying to access public routes while authenticated
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Configure paths that this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. All static files (e.g. favicon.ico, images, etc.)
     */
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};