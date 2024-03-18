import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

const getQueryParams = (query: URLSearchParams) => {
  const postId = query.get("postId");
  const postType = query.get("postType");

  if (postId === null) {
    throw new Error("Missing postId in search params");
  }
  if (postType === null) {
    throw new Error("Missing postType in search params");
  }
  if (postType !== "hypothesis" && postType !== "finding") {
    throw new Error("Missing postType in search params");
  }
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
    postId,
    postType,
  };
};

// Handler function
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // Validate page and limit using your preferred library (e.g., Zod, zod)
    const { postId, postType, page, limit } = getQueryParams(searchParams);

    // validate post
    let post;
    switch (postType) {
      case "hypothesis":
        post = await prisma.hypothesis.findUnique({
          where: { id: postId },
        });
        break;
      case "finding":
        post = await prisma.hypothesis.findUnique({
          where: { id: postId },
        });
        break;
    }

    if (!post) {
      return new Response(`Could not find post with id ${postId}`, {
        status: 400,
      });
    }

    // todo add pagination
    const responses = await prisma.response.findMany({
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
        content: true,
        votes: true,
        user: {
          select: {
            email: true,
            id: true,
            name: true,
            created: true,
          },
        },
      },
      where: { postId: post.id },
    });

    const totalResponses = responses.length; // Count total number

    return new Response(
      JSON.stringify({
        responses,
        total: totalResponses,
        nextPage: null, // TODO: Check if there's a next page
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("got error: ", error);
    return new Response("Internal server error", { status: 500 });
  }
}
