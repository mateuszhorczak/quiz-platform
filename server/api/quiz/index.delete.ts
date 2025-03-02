import { db } from '~/server/database';
import { questions, answers } from '~/server/schema';
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        // Delete quiz // TODO: delete quiz
        console.log('WORK IN PROGRESS ')
    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
