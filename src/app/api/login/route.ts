// pages/api/auth/login.ts

import { compare } from "bcryptjs";
import { prisma } from "../../../lib/prisma"; // Adjust the import path according to your project structure
import { SignJWT } from "jose";

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
    return new Response("invalid email", {
      status: 401,
      statusText: "invalid email",
    });
  }

  const isValid = await compare(password, user.password);

  if (!isValid) {
    return new Response("Invalid credentials", { status: 401 });
  }
  // Generate JWT
  const token = await new SignJWT({ email: user.email, id: user.id })
    .setExpirationTime("2h")
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .sign(new TextEncoder().encode(getJwtSecret()));

  return new Response(token, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure`,
    },
  });
}
