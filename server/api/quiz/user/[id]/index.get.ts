import { db } from "~/server/database";
import { quizzes } from "~/server/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id")
  const userIdNum = parseInt(userId as string, 10)

  try {
    // Get a list of quizzes created by user
    const result = await db.select({
      id: quizzes.id,
      name: quizzes.name,
      description: quizzes.description
    })
      .from(quizzes)
      .where(eq(quizzes.userId, userIdNum))

    return { data: result };

  }
  catch
    (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
