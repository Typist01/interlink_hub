// pages/api/auth/logout.ts

import type { NextApiRequest, NextApiResponse } from "next";

// POST /api/auth/logout

export function POST(req: NextApiRequest, res: NextApiResponse) {
  // Set the token cookie to a past date, effectively expiring it
  console.log("hello from /api/logout");

  return new Response("Logged out", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
    },
  });
}
