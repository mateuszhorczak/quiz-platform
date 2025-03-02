import { db } from '~/server/database';
import { answers } from '~/server/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        // Delete answer

        await db.delete(answers)
            .where(
                eq(answers.id, parseInt(query.id as string, 10)),
            );

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
