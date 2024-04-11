import { getAuthenticatedUserId } from "@/lib/getAuthenticatedUserId";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";
import { sendVerificationEmail } from "../sendVerificationLink";
import { Email } from "../email/Email";
import { getJwtSecret } from "@/lib/getJwtSecret";
import { SignJWT } from "jose";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    const data = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: { email: true },
    });

    if (!user) {
      throw new Error("could not find user with id " + userId);
    }
    if (!user.email) {
      throw new Error("could not find user email in database");
    }

    // Generate JWT for verification
    const verificationToken = await new SignJWT({
      id: userId,
      email: user.email,
    })
      .setExpirationTime("2h")
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(userId)
      .sign(new TextEncoder().encode(getJwtSecret()));
    sendVerificationEmail(user.email, verificationToken);

    return new Response("success", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("could not send a verification link to the user", {
      status: 500,
    });
  }
}
