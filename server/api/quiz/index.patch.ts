import { db } from '~/server/database';
import { quizzes } from '~/server/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        // update quiz
        await db.update(quizzes)
            .set({
                name: body.name,
            })
            .where(eq(quizzes.id, body.id))

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
