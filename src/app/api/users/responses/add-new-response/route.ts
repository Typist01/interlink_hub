import { getAuthenticatedUserId } from "@/lib/getAuthenticatedUserId";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

const validateData = (data: PostResponse) => {
  try {
    if (data.postType !== "hypothesis" && data.postType !== "finding") {
      console.log("invalid posttype");
      throw new Error("invalid postType");
    }
    // check if postId exists in database
    switch (data.postType) {
      case "hypothesis":
        prisma.hypothesis.findUnique({
          where: {
            id: data.postId,
          },
        });
      case "finding":
        prisma.hypothesis.findUnique({
          where: {
            id: data.postId,
          },
        });
    }
    if (data.content === "") {
      console.log("no cntent");
      throw new Error("no content");
    }
    return { valid: true, error: null };
  } catch (error) {
    console.log("errored out");
    console.error(error);
    return { valid: false, error };
  }
};

export async function POST(req: NextRequest) {
  try {
    const userId = await getAuthenticatedUserId(req);
    const data = await req.json();
    const validationResult = validateData(data);
    if (!validationResult?.valid) {
      console.log("validationResult", validationResult);

      return new Response(
        JSON.stringify({
          msg: "could not validate data",
          error: validationResult?.error,
        }),
        {
          status: 500,
        }
      );
    }
    const newResponse = await prisma.response.create({
      data: {
        userId: userId,
        responseToId: data.responseToId,
        postId: data.postId,
        postType: data.postType,
        content: data.content,
      },
    });

    return new Response(JSON.stringify(newResponse), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("could not create a new response", {
      status: 500,
    });
  }
}
