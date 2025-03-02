import { db } from '~/server/database';
import { answers } from '~/server/schema';
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        // Delete answer
        console.log(typeof query.id) // TODO: delete, look at todo below

        await db.delete(answers)
            .where(
                // eq(answers.id, query.id), // TODO: try it, and switch in all places
                eq(answers.id, parseInt(<string>query.id)),
            );

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
