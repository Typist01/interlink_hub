import { jwtVerify } from "jose";
import { getJwtSecret } from "./getJwtSecret";
import { NextRequest } from "next/server";

export const getAuthenticatedUserId = async (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;

  console.log("token is ", token);
  if (!token) {
    throw new Error("No token provided");
  }
  const decoded = await jwtVerify(
    token,
    new TextEncoder().encode(getJwtSecret())
  );
  const userId = decoded.payload.sub;
  if (!userId) {
    throw new Error("Invalid token");
  }
  return userId;
};
