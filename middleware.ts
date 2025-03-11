import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Allow public files to be accessed
  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  // If the user is authenticated and tries to access the login page, redirect to home
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // If the user is not authenticated and tries to access any page other than login, redirect to login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is authenticated, allow access to all other pages
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
