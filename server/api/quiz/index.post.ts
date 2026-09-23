import { db } from '~/server/database';
import { quizzes } from '~/server/schema';

export default defineEventHandler(async (event) => {
  const user = requireUser(event);
  const body = await readBody(event);

  try {
    // Create quiz
    const [quiz] = await db.insert(quizzes).values({
      name: body.name,
      description: body.description,
      userId: user.id,
    }).returning({ id: quizzes.id })

    setResponseStatus(event, 201)
    return { data: quiz }

  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
