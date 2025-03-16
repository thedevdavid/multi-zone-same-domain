import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next/|api/|dashboard-static/|.*\\.).*)"],
};

// Marketing app paths that should not be sent to dashboard
const MARKETING_PATHS = new Set(["/", "/about"]);

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // If this is a marketing path, handle it here
  if (
    MARKETING_PATHS.has(path) ||
    Array.from(MARKETING_PATHS).some((p) => path.startsWith(`${p}/`))
  ) {
    return NextResponse.next();
  }

  // Check if this looks like a team slug
  const segments = path.split("/").filter(Boolean);
  if (segments.length > 0) {
    const firstSegment = segments[0];

    // Simple validation - in production you'd check against your database
    if (/^[a-z0-9-]+$/.test(firstSegment) && firstSegment.length > 2) {
      // This is the key part: Add a special header for the rewrite rule
      const headers = new Headers(request.headers);
      headers.set("x-use-dashboard", "1");

      // Continue with the modified headers
      // This will trigger the rewrite rule to send to the dashboard app
      return NextResponse.next({
        request: {
          headers,
        },
      });
    }
  }

  return NextResponse.next();
}
