import { db } from '~/server/database';
import { questions } from '~/server/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    // Create question
    await db.insert(questions).values({
      name: body.name,
      quizId: body.quizId,
    })

  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
