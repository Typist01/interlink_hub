import { getAuthenticatedUserId } from "@/lib/getAuthenticatedUserId";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Handler function
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name } = await req.json();
    const userId = await getAuthenticatedUserId(req);

    if (!name) {
      return new Response("Missing name", { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
      },
    });

    return new Response(JSON.stringify("Completed profile"), { status: 200 });
  } catch (error) {
    console.error("got error: ", error);
    return new Response("Internal server error", { status: 500 });
  }
}
