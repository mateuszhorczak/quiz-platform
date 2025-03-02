import { db } from '~/server/database';
import { quizzes } from '~/server/schema';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        // Create quiz
        await db.insert(quizzes).values({
            name: body.name,
            description: body.description,
        })

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
