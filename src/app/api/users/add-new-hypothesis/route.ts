import { getAuthenticatedUserId } from "@/lib/getAuthenticatedUserId";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const userId = await getAuthenticatedUserId(req);
    const newHypothesis = await prisma.hypothesis.create({
      data: {
        userId: userId,
        title: data.title,
        description: data.description,
      },
    });

    return new Response(JSON.stringify(newHypothesis), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Could not create a new hypothesis", {
      status: 500,
    });
  }
}
