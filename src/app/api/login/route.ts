// pages/api/auth/login.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../../../lib/prisma"; // Adjust the import path according to your project structure

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return secret;
};

// POST /api/auth/login

export async function POST(req: Request, res: Response) {
  const { email, password } = await req.json();

  if (!email || !password || !email.includes("@")) {
    return new Response("Invalid input", { status: 422 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return new Response("Invalid credentials", { status: 401 });
  }
  // Generate JWT
  const token = jwt.sign({ email: user.email, id: user.id }, getJwtSecret(), {
    expiresIn: "1h",
  });

  return new Response(token, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure`,
    },
  });
}
