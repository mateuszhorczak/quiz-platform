import { db } from '~/server/database';
import { questions, answers } from '~/server/schema';
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const questionId = parseInt(query.id as string, 10)

    try {
        // Delete question

        // delete answers linked to this question
        await db.delete(answers)
            .where(eq(answers.questionId, questionId));

        // delete question
        await db.delete(questions)
            .where(eq(questions.id, questionId));

    } catch (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
