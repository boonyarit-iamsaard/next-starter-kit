import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
const authRoutes = ["/sign-in", "/create-account"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);
  if (isProtectedRoute) {
    if (!sessionCookie) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("from", pathname);

      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (sessionCookie) {
      const redirectTo =
        request.nextUrl.searchParams.get("from") ?? "/dashboard";

      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Better Auth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, icons, etc.)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).+)",
  ],
};
