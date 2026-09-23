import { db } from '~/server/database';
import { questions } from '~/server/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const questionId = parseId(event)
  await requireQuestionOwner(event, questionId)
  const body = await readBody(event);

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
