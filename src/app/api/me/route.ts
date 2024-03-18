// pages/api/auth/me.js

import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma"; // Adjust the import path according to your project structure
import jwt from "jsonwebtoken";

export const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return secret;
};

export async function GET(req: NextRequest, res: Response) {
  // Extract the token from the Authorization header
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return new Response("Could not find authentication token", { status: 401 });
  }

  try {
    // Verify the token
    interface JwtPayload {
      id: string;
    }
    const decoded = jwt.verify(token, getJwtSecret()) as JwtPayload;

    // Find the user based on the token's payload
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        verified: true,
        // Exclude sensitive information like password
      },
    });

    if (!user) {
      return new Response("Could not find user with the provided token", {
        status: 404,
      });
    }

    // Return user information
    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response("Failed to authenticate token", { status: 401 });
  }
}
