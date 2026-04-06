import { NextRequest, NextResponse } from 'next/server'

const privateRoutes = [
  '/dashboard',
  '/projects',
  '/settings',
  '/reports',
  '/profile',
  '/admin'
]

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isPrivate = privateRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  if (isPrivate && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  return NextResponse.next()
}