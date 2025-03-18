import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|.*\\.).*)"],
};

const BLOCKED_PATHS = new Set(["/checkme"]);

const PUBLIC_DASHBOARD_PATH_SEGMENTS = new Set([
  "catalog",
  "login",
  "signup",
  "auth",
]);

// Marketing routes that should not be forwarded to dashboard
const MARKETING_FULL_PATHS = new Set([
  "/",
  "/about",
  "/blog",
  "/contact",
  "/legal",
]);

// Reserved paths that cannot be team slugs
const RESERVED_PATH_SEGMENTS = new Set([
  "signin",
  "signup",
  "auth",
  "api",
  "about",
  "legal",
  "catalog",
  "contact",
]);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  console.log("Dashboard Path ", path);
  // console.log("Dashboard Request");
  // console.log(request);

  if (BLOCKED_PATHS.has(path)) {
    console.log("Dashboard Blocked path ", path);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (path === "/") {
    console.log("Dashboard Root path");
  }

  // // 1. Allow static assets and API routes to pass through
  // // if (
  // //   path.startsWith("/_next/") ||
  // //   path.startsWith("/api/") ||
  // //   path.startsWith("/dashboard-static/") ||
  // //   path.includes(".")
  // // ) {
  // //   return NextResponse.next();
  // // }

  // 2. Handle public dashboard paths
  const firstSegment = path.split("/")[1] || "";

  if (PUBLIC_DASHBOARD_PATH_SEGMENTS.has(firstSegment)) {
    console.log("Dashboard Public path ", path);
    return NextResponse.next();
    // return NextResponse.rewrite(new URL(`/${path}`, request.url));
  }

  // 3. Refresh auth token, check if user is logged in
  const isLoggedIn = !!request.cookies.get("btm_session")?.value;

  if (
    !isLoggedIn &&
    !path.startsWith("/signin") &&
    !path.startsWith("/signup") &&
    !path.startsWith("/auth")
  ) {
    // Redirect to signin with return URL
    const returnUrl = encodeURIComponent(path);
    console.log("Potential team slug", path);

    return NextResponse.redirect(
      new URL(`/dashboard/auth/signin?next=${returnUrl}`, request.url)
    );
  }

  // 4. For authenticated users, check if path looks like a team slug
  if (
    firstSegment &&
    !RESERVED_PATH_SEGMENTS.has(firstSegment) &&
    /^[a-zA-Z0-9-]+$/.test(firstSegment) &&
    firstSegment.length > 2
  ) {
    // This looks like a team path - rewrite to dashboard app
    console.log("Looks like a team slug ", path);
    return NextResponse.rewrite(new URL(`/dashboard${path}`, request.url));
  }

  return NextResponse.next();
}
