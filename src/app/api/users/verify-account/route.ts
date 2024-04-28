// pages/api/users/verify-account.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SignJWT } from "jose";
import { getAuthenticatedUserId } from "@/lib/getAuthenticatedUserId";
import { getJwtSecret } from "@/lib/getJwtSecret";

export async function POST(req: NextRequest, res: NextResponse) {
  // Verify the token
  try {
    const userId = await getAuthenticatedUserId(req);

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    if (!user.email) {
      return new Response("Email not found in database", { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verified: true,
      },
    });

    // Generate JWT
    const newToken = await new SignJWT({ email: user.email, id: user.id })
      .setExpirationTime("2h")
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(user.id)
      .sign(new TextEncoder().encode(getJwtSecret()));

    return new Response(newToken, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `token=${newToken}; Path=/; HttpOnly; Secure`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response("Something went wrong", { status: 500 });
  }
}
