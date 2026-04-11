import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Apply i18n middleware first
  const response = intlMiddleware(request);
  
  // Add CSP headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://itan.b-cdn.net https://www.youtube.com https://player.vimeo.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://itan.b-cdn.net https://i.ytimg.com https://img.youtube.com https://vumbnail.com https://i.vimeocdn.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
    connect-src 'self' https://itan.b-cdn.net;
    media-src 'self' https://itan.b-cdn.net;
    frame-src 'self' https://www.youtube.com https://player.vimeo.com https://www.youtube-nocookie.com;
  `.replace(/\s{2,}/g, ' ').trim();
  
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // Add additional security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
