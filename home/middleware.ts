import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!_next|api|marketing-static|_marketing-static|dashboard|.*\\.).*)",
  ],
};

const BLOCKED_PATHS = new Set(["/checkme"]);

// Marketing routes that should not be forwarded to dashboard
const MARKETING_FULL_PATHS = new Set([
  "/",
  "/home",
  "/about",
  "/blog",
  "/contact",
  "/legal",
]);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("Home Path ", path);
  // console.log("Request");
  // console.log(request);

  if (BLOCKED_PATHS.has(path)) {
    console.log("Home Blocked path ", path);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path === "/") {
    console.log("Home Root path");
    return NextResponse.rewrite(new URL("/home", request.url));
  }

  // 1. Allow static assets and API routes to pass through
  // if (
  //   path.startsWith("/_next/") ||
  //   path.startsWith("/api/") ||
  //   path.startsWith("/dashboard-static/") ||
  //   path.includes(".")
  // ) {
  //   return NextResponse.next();
  // }

  // 2. Direct handling of marketing routes
  if (
    MARKETING_FULL_PATHS.has(path) ||
    Array.from(MARKETING_FULL_PATHS).some((p) => path.startsWith(`${p}/`))
  ) {
    console.log("Home Marketing route ", path);
    return NextResponse.next();
  }

  console.log("Home no match ", path);
  return NextResponse.next();

  // console.log("Home Redirecting to dashboard ", path);
  // return NextResponse.rewrite(new URL(`/${path}`, request.url));
}
