import { NextResponse } from 'next/server';

const protectedRoutes = [
  '/nutrition',
  '/meal-planner',
  '/shopping-list',
  '/restaurants',
  '/meal-preferences'
];

const authRoutes = ['/login', '/signup'];

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  // If trying to access protected route without token, redirect to login
  if (protectedRoutes.includes(pathname) && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  // If trying to access login/signup while logged in, redirect to meal planner
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/meal-planner', request.url));
  }

  // If accessing root path (/) while logged in, redirect to meal planner
  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL('/meal-planner', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/nutrition',
    '/meal-planner',
    '/shopping-list',
    '/restaurants',
    '/meal-preferences',
    '/login',
    '/signup'
  ],
}; 