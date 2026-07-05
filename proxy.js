import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

/**
 * Route interceptor (Proxy) to protect dashboard routes and redirect
 * authenticated users away from the login page.
 * 
 * @param {NextRequest} request - Incoming request object.
 */
export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // Retrieve token from request cookies
  const token = request.cookies.get("auth_token")?.value;
  const decoded = await verifyToken(token);

  // If path is under /dashboard and user is not verified, redirect to /login
  if (pathname.startsWith("/dashboard")) {
    if (!decoded) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If path is /login and user is already logged in, redirect to /dashboard
  if (pathname === "/login") {
    if (decoded) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify matching routes for the proxy
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
