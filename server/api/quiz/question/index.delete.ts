import { db } from '~/server/database';
import { questions, answers } from '~/server/schema';
import { and, eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    try {
        // Delete question
        console.log(typeof query.id) // TODO: delete, look at todo below

        // delete answers linked to this question
        await db.delete(answers)
            .where(eq(answers.questionId, parseInt(<string>query.id)))

        // delete question
        await db.delete(questions)
            .where(
                // eq(questions.id, query.id), // TODO: try it, and switch in all places
                eq(questions.id, parseInt(<string>query.id)),
            );

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
