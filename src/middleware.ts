import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { userRoles } from "~/common/types/user-role";
import { getCurrentSession } from "~/features/auth/auth.service";

const adminRoutes = ["/admin"];
const protectedRoutes = ["/settings", ...adminRoutes];
const authRoutes = ["/sign-in", "/create-account"];

const createRouteChecker = (routes: string[]) => (pathname: string) =>
  routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

const isAuthRoute = createRouteChecker(authRoutes);
const isProtectedRoute = createRouteChecker(protectedRoutes);
const isAdminRoute = createRouteChecker(adminRoutes);

function getValidRedirectPath(path: string | null): string {
  if (!path || path.startsWith("http") || path.includes("://")) {
    return "/";
  }

  if (!path.startsWith("/") || path.includes("..") || path.includes("//")) {
    return "/";
  }

  return path;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for non-auth and non-protected routes
  if (!isProtectedRoute(pathname) && !isAuthRoute(pathname)) {
    return NextResponse.next();
  }

  const currentSession = await getCurrentSession(request.headers);

  // Handle protected routes without session
  if (isProtectedRoute(pathname) && !currentSession) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Handle auth routes with existing session
  if (isAuthRoute(pathname) && currentSession) {
    const from = request.nextUrl.searchParams.get("from");
    const safePath = getValidRedirectPath(from);
    const redirectTo = new URL(safePath, request.url);
    return NextResponse.redirect(redirectTo);
  }

  // Handle admin routes with proper type checking
  if (isAdminRoute(pathname) && currentSession) {
    if (currentSession.user.role !== userRoles.ADMIN) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
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
