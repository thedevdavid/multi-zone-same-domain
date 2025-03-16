/**
 * Test file for the rewrites in next.config.js. This is useful to test the logic for rewriting
 * paths to multi zones to make sure that the logic is correct before deploying the application.
 */

import { type MatchResult, compile, match } from "path-to-regexp";
import nextConfig from "../next.config";

function getDestination(destination: string, pathMatch: MatchResult): string {
  const hasDifferentHost = destination.startsWith("https://");
  if (hasDifferentHost) {
    const destinationUrl = new URL(destination);
    destinationUrl.pathname = compile(destinationUrl.pathname, {
      encode: encodeURIComponent,
    })(pathMatch.params);
    return destinationUrl.toString();
  }
  return compile(destination, {
    encode: encodeURIComponent,
  })(pathMatch.params);
}

const DASHBOARD_URL = "https://with-zones-dashboard.vercel.app";

describe("next.config.js test", () => {
  describe("rewrites", () => {
    let rewrites: Awaited<ReturnType<NonNullable<typeof nextConfig.rewrites>>>;

    beforeAll(async () => {
      process.env.DASHBOARD_URL = DASHBOARD_URL;
      rewrites = await nextConfig.rewrites!();
    });

    function getRewrittenUrl(path: string): string | undefined {
      const allRewrites =
        "beforeFiles" in rewrites
          ? [...rewrites.beforeFiles, ...rewrites.afterFiles]
          : rewrites;
      for (const rewrite of allRewrites) {
        if (rewrite.has?.length) {
          continue;
        }
        const rewriteMatch = match(rewrite.source)(path);
        if (rewriteMatch) {
          return getDestination(rewrite.destination, rewriteMatch);
        }
      }
      return undefined;
    }

    it("non dashboard pages are not rewritten", () => {
      expect(getRewrittenUrl("/")).toEqual(undefined);
      expect(getRewrittenUrl("/dashboard-not")).toEqual(undefined);
      expect(getRewrittenUrl("/dashboard2")).toEqual(undefined);
    });

    it("/dashboard is rewritten to child zone", () => {
      expect(getRewrittenUrl("/dashboard")).toEqual(
        `${DASHBOARD_URL}/dashboard`
      );
      expect(getRewrittenUrl("/dashboard/post/1")).toEqual(
        `${DASHBOARD_URL}/dashboard/post/1`
      );
    });

    it("/dashboard static resources are rewritten to child zone", () => {
      expect(
        getRewrittenUrl("/dashboard-static/_next/static/chunks/chunk.css")
      ).toEqual(
        `${DASHBOARD_URL}/dashboard-static/_next/static/chunks/chunk.css`
      );
    });
  });
});
