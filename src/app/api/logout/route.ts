// pages/api/auth/logout.ts

// POST /api/auth/logout

export function POST() {
  // Set the token cookie to a past date, effectively expiring it
  return new Response("Logged out", {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure`,
    },
  });
}
