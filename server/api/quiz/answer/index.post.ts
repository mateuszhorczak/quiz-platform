import { db } from '~/server/database';
import { answers } from '~/server/schema';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    try {
        // Create answer
        await db.insert(answers).values({
            name: body.name,
            questionId: body.questionId,
            isCorrect: false,
        })

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
