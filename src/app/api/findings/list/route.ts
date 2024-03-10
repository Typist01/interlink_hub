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
  //   const { page = 1, limit = 10 } = query;
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
    console.log("entered api/hypothesis/list with GET");
    const searchParams = req.nextUrl.searchParams;

    // Validate page and limit using your preferred library (e.g., Zod, zod)
    const { page, limit, search } = getQueryParams(searchParams);

    console.log("got page ", page, "got limit ", limit);
    const findings = await prisma.finding.findMany({
      skip: (page - 1) * limit, // Skip records for previous pages
      take: limit, // Limit the number of records returned
      orderBy: {
        created: "desc", // Order by creation date (descending)
      },

      select: {
        id: true,
        updated: true,
        created: true,
        userId: true,
        description: true,
        hypothesisId: true,
        hypothesis: true,
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
                hypothesis: {
                  title: {
                    contains: search,
                  },
                },
              },
              {
                description: { contains: search },
              },
            ],
          }
        : undefined,
    });

    const totalFindings = await prisma.finding.count(); // Count total number

    // Send response with findngs, total count, and next page information (if applicable)
    return new Response(
      JSON.stringify({
        findings,
        total: totalFindings,
        nextPage:
          page + 1 <= Math.ceil(totalFindings / limit) ? page + 1 : null, // Check if there's a next page
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("got error: ", error);
    return new Response("Internal server error", { status: 500 });

    console.error(error);
  }
}
