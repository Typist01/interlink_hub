// pages/api/auth/me.js

import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma"; // Adjust the import path according to your project structure
import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }
  return secret;
};

export async function GET(req: NextRequest, res: Response) {
  // Extract the token from the Authorization header
  //   const token = req.headers.get("Authorization")?.split(" ")[1]; // Bearer <token>
  //   const token = req.cookies.get("auth");
  const token = req.cookies.get("token")?.value;
  //   console.log(req.headers.getSetCookie());
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
    console.log("decoded:", decoded);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        email: true,
        name: true,
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
