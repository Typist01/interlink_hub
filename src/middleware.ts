import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { getJwtSecret } from "./lib/getJwtSecret";

export function middleware(request: NextRequest) {
  // Auth checking can be done in api routes
  if (request.nextUrl.pathname.startsWith("/api/users/add-new-hypothesis")) {
    try {
      const token = request.cookies.get("token")?.value;
      if (!token) {
        return new Response("Authentication token not found", { status: 401 });
      }
      // Verify the token
      jwtVerify(token, new TextEncoder().encode(getJwtSecret()));
      // If the token is valid, return the response
      return NextResponse.next();
    } catch (error) {
      console.log("error", error);
      // return new Response("Invalid authentication token", { status: 401 });
      return NextResponse.rewrite(new URL("/login", request.url));
    }
    // return NextResponse.rewrite(new URL("/userss/addHypothesis", request.url));
  }
}
export { getJwtSecret };
