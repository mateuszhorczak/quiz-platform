import { db } from '~/server/database';
import { questions } from '~/server/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = getRouterParam(event, "id")
  const questionId = parseInt(id as string, 10)

  try {
    // update question
    await db.update(questions)
      .set({
        name: body.name,
      })
      .where(eq(questions.id, questionId))

  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
