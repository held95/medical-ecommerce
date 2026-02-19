/**
 * Next.js Middleware for Supabase Auth
 * Protects routes and refreshes auth tokens
 */

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Avoid hard-failing edge middleware when env vars are missing in deployment.
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  try {
    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              request.cookies.set(name, value)
            )
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    // Refresh session if expired
    const {
      data: { user },
    } = await supabase.auth.getUser()

  // Protected routes - require authentication
  const protectedRoutes = ['/dashboard', '/experiences', '/member', '/concierge']
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  // Auth routes - redirect to dashboard if already logged in
  const authRoutes = ['/login', '/signup']
  const isAuthRoute = authRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

    // Redirect to unauthorized if trying to access protected route without auth
    if (isProtectedRoute && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    }

    // Redirect to dashboard if logged in user tries to access auth pages
    if (isAuthRoute && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  } catch (error) {
    // Fail open instead of returning 500 from edge middleware.
    console.error('Middleware auth check failed:', error)
    return NextResponse.next({ request })
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
