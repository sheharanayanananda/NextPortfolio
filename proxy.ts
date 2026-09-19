import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";
  const pathname = request.nextUrl.pathname;

  // Set AI-friendly headers
  const response = NextResponse.next();
  response.headers.set(
    "X-Robots-Tag",
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
  );

  // Content Negotiation: If client specifically requests text/markdown, serve llms-full.txt
  if (
    (pathname === "/" || pathname === "/slate") &&
    (acceptHeader.includes("text/markdown") || acceptHeader.includes("text/plain"))
  ) {
    const markdownUrl = new URL("/llms-full.txt", request.url);
    const rewriteResponse = NextResponse.rewrite(markdownUrl);
    rewriteResponse.headers.set("Content-Type", "text/plain; charset=utf-8");
    rewriteResponse.headers.set(
      "X-Robots-Tag",
      "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );
    return rewriteResponse;
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for static files (_next/static, _next/image, favicon.ico, fonts, public images)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2)$).*)",
  ],
};
