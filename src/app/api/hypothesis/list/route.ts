import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const getQueryParams = (query: URLSearchParams) => {
  let page = 1;
  let limit = 10;
  if (query.get("page") !== null) {
    page = Number(query.get("page"));
  }
  if (query.get("limit") !== null) {
    limit = Number(query.get("limit"));
  }
  if (page && isNaN(Number(page))) {
    throw new Error("Invalid page query parameter");
  }
  if (limit && isNaN(Number(limit))) {
    throw new Error("Invalid limit query parameter");
  }
  return {
    page: Number(page),
    limit: Number(limit),
    search: query.get("q") || undefined,
  };
};

// Handler function
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Validate page and limit using your preferred library (e.g., Zod, zod)
    const { page, limit, search } = getQueryParams(searchParams);

    const hypotheses = await prisma.hypothesis.findMany({
      skip: (page - 1) * limit, // Skip records for previous pages
      take: limit, // Limit the number of records returned
      orderBy: {
        created: "desc", // Order by creation date (descending)
      },

      select: {
        id: true,
        title: true,
        updated: true,
        created: true,
        userId: true,
        description: true,
        likes: true,
        user: {
          select: {
            email: true,
            name: true,
            created: true,
          },
        },
        // responses
        Response: {
          select: {
            id: true,
            content: true,
            created: true,
            updated: true,
            userId: true,
            user: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
      where: search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                },
              },
              {
                description: { contains: search },
              },
            ],
          }
        : undefined,
    });

    const totalHypotheses = await prisma.hypothesis.count(); // Count total number

    return new Response(
      JSON.stringify({
        hypotheses,
        total: totalHypotheses,
        nextPage:
          page + 1 <= Math.ceil(totalHypotheses / limit) ? page + 1 : null, // Check if there's a next page
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("got error: ", error);
    return new Response("Internal server error", { status: 500 });
  }
}
