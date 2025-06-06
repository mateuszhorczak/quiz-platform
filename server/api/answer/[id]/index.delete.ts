import { db } from '~/server/database';
import { answers } from '~/server/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const answerId = parseInt(id as string, 10)

  try {
    // Delete answer
    await db.delete(answers)
      .where(
        eq(answers.id, answerId),
      );

  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
