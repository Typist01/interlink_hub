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

  // Generate JWTd
  const token = await new SignJWT({ id: createdUser.id, email: email })
    .setExpirationTime("2h")
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(createdUser.id)
    .sign(new TextEncoder().encode(getJwtSecret()));

  const resend = new Resend("re_Z8Yhjjy4_CJrWgZd9b8AovXLaEgT1qyAJ");

  resend.emails.send({
    from: "onboarding@resend.dev",
    to: "travellingtypist1@gmail.com",
    subject: "Hello World",
    react: <Email token={token} />,
  });

  // TODO: send an email with token

  return new Response("User created", { status: 201 });
}