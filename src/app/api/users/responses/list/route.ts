import { getAuthenticatedUserId } from "@/lib/getAuthenticatedUserId";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  console;
  try {
    console.log("entered /resposnes/list route try block");
    // await getAuthenticatedUserId(req);
    const data = await req.json();

    const responses = await prisma.response.findMany({
      where: {
        postId: data.postId,
      },
    });

    return new Response(JSON.stringify(responses), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("could not create a new response", {
      status: 500,
    });
  }
}
