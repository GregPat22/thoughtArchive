import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ACCESS_COOKIE = "thought_archive_access";

function isPublicPath(pathname: string) {
  return (
    pathname === "/access" ||
    pathname.startsWith("/api/access") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  );
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const requiredPassword = process.env.SITE_ACCESS_PASSWORD;
  if (!requiredPassword) {
    return NextResponse.next();
  }

  const expectedToken = process.env.SITE_ACCESS_TOKEN ?? requiredPassword;
  const accessCookie = request.cookies.get(ACCESS_COOKIE)?.value;

  if (accessCookie === expectedToken) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/access";
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/:path*"],
};

