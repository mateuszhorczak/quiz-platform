import { db } from '~/server/database';
import { answers } from '~/server/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const id = getRouterParam(event, "id")
    const answerId = parseInt(id as string, 10)

    try {
        // update answer
        await db.update(answers)
            .set({
                isCorrect: body.isCorrect,
            })
            .where(eq(answers.id, answerId))

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
