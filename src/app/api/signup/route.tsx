// pages/api/auth/signup.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { prisma } from "../../../lib/prisma"; // Adjust the import path according to your project structure
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { SignJWT } from "jose";
import { getJwtSecret } from "@/middleware";
import { Resend } from "resend";
import { Email } from "./email/Email";

const getResendSecret = () => {
  const secret = process.env.RESEND_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return secret;
};

export async function POST(req: Request, res: Response) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const { email, password } = await req.json();

  if (!email || !password || !email.includes("@")) {
    return new Response("Invalid input", { status: 422 });
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return new Response("User already exists", {
      status: 422,
    });
  }

  const hashedPassword = await hash(password, 12);

  // create a token and append it to the
  const createdUser = await prisma.user.create({
    data: {
      email,
      isGuest: false,
      password: hashedPassword,
    },
  });

  // Generate JWT for verification
  const verificationToken = await new SignJWT({
    id: createdUser.id,
    email: email,
  })
    .setExpirationTime("2h")
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(createdUser.id)
    .sign(new TextEncoder().encode(getJwtSecret()));

  const resend = new Resend(getResendSecret());
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Hi! welcome to Interlink",
    react: <Email token={verificationToken} />,
  });

  // Login token
  const token = await new SignJWT({ id: createdUser.id, email: email })
    .setExpirationTime("2h")
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(createdUser.id)
    .sign(new TextEncoder().encode(getJwtSecret()));

  return new Response("User created", {
    status: 201,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure`,
    },
  });
}
