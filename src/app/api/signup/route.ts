// pages/api/auth/signup.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { prisma } from "../../../lib/prisma"; // Adjust the import path according to your project structure
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }
  const { email, password, name } = await req.json();

  console.log("entering POST function");
  console.log("GOT through if statemetn");

  console.log("got body", req.body);
  if (!email || !password || !email.includes("@")) {
    return new Response("Invalid input", { status: 422 });
  }
  console.log("got through validation 2");
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) {
    return new Response("User already exists", { status: 422 });
  }

  const hashedPassword = await hash(password, 12);

  const createdUser = await prisma.user.create({
    data: {
      email,
      name,
      isGuest: false,
      password: hashedPassword,
    },
  });

  return new Response("User created", { status: 201 });
}
