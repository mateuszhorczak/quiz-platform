import { db } from "~/server/database";
import { quizzes } from "~/server/schema";

export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const quizId = parseInt(<string>query.id, 10)

    try {
        // Get list of quizzes
        const result = await db.select({
            id: quizzes.id,
            name: quizzes.name,
            description: quizzes.description
        })
            .from(quizzes)

        return { data: result };

    } catch
        (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
