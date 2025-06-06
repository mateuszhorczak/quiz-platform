import { db } from "~/server/database";
import { questions, answers } from "~/server/schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, "id")
    const questionId = parseInt(id as string, 10)

    try {
        // Get single question
        const question = await db.select({
            id: questions.id,
            name: questions.name,
            quizId: questions.quizId
        })
            .from(questions)
            .where(eq(questions.id, questionId));

        const questionAnswers = await db.select({
            id: answers.id,
            name: answers.name,
            questionId: answers.questionId,
            isCorrect: answers.isCorrect
        })
            .from(answers)
            .where(eq(answers.questionId, questionId))

        return {
            data: {
                ...question,
                answers: questionAnswers
            }
        };

    } catch
        (error) {
        console.error("Error processing request:", error);
        throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
    }
});
