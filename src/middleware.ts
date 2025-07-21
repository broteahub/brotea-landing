import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimit, getRateLimitHeaders } from '@/lib/rate-limit';

export async function middleware(request: NextRequest) {
  // Only apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateLimitResult = await rateLimit();
    
    // Add rate limit headers to all API responses
    const headers = getRateLimitHeaders(rateLimitResult);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          retryAfter: new Date(rateLimitResult.reset).toISOString(),
        },
        { 
          status: 429,
          headers: {
            ...headers,
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }
    
    // For successful requests, clone the response and add headers
    const response = NextResponse.next();
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};