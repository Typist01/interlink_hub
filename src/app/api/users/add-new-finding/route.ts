import { getJwtSecret } from "@/lib/getJwtSecret";
import { PrismaClient } from "@prisma/client";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const request = (await req.json()) as {
      description: string;
      hypothesisId?: string;
      title?: string;
    };
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return new Response("Could not find authentication token", {
        status: 401,
      });
    }

    const result = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecret())
    );
    const sub = result.payload.sub;
    if (!sub) {
      return new Response("Could not find sub claim in JWT", {
        status: 401,
      });
    }

    if (request.title && !request.hypothesisId) {
      const hypothesis = await prisma.hypothesis.create({
        data: {
          userId: sub,
          title: request.title,
          description: "",
          isPlaceholder: true,
        },
      });
      request.hypothesisId = hypothesis.id;
    }

    if (!request.hypothesisId) {
      return new Response("Could not find hypothesis id", {
        status: 400,
      });
    }

    const newFinding = await prisma.finding.create({
      data: {
        userId: sub,
        description: request.description,
        hypothesisId: request.hypothesisId,
      },
    });

    return new Response(JSON.stringify(newFinding), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Could not create a new finding", {
      status: 500,
    });
  }
}
