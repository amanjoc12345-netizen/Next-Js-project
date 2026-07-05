import { NextResponse } from "next/server";
import { auth } from "./auth";

/**
 * Route interceptor (Proxy) to protect dashboard routes and redirect
 * authenticated users away from the login page.
 * 
 * @param {NextRequest} request - Incoming request object.
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Retrieve session using Auth.js auth helper
  const session = await auth();

  // If path is under /dashboard and user is not authenticated, redirect to /login
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If path is /login and user is already logged in, redirect to /dashboard
  if (pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify matching routes for the proxy
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
