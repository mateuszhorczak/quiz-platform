import { db } from "~/server/database";
import { quizzes, questions, answers } from "~/server/schema";
import { eq, inArray } from "drizzle-orm";
import type { Answer, Quiz } from "~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const quizId = parseInt(id as string, 10)

  try {
    // Get quiz
    const quiz = await db.select({
      id: quizzes.id,
      name: quizzes.name,
      description: quizzes.description,
    })
      .from(quizzes)
      .where(eq(quizzes.id, quizId));

    // Get quiz questions
    const quizQuestions = await db.select({
      id: questions.id,
      name: questions.name,
      quizId: questions.quizId,
    })
      .from(questions)
      .where(eq(questions.quizId, quizId));

    // Get questions id
    const questionsIds = quizQuestions.map((q) => q.id);

    // Get answers to questions
    const questionsAnswers = questionsIds.length
      ? await db.select({
        id: answers.id,
        name: answers.name,
        questionId: answers.questionId,
        isCorrect: answers.isCorrect,
      })
        .from(answers)
        .where(inArray(answers.questionId, questionsIds))
        .then((rows) =>
          rows.reduce((acc, row) => {
            if (!acc[row.questionId]) acc[row.questionId] = [];
            // @ts-expect-error ........
            acc[row.questionId].push(row);
            return acc;
          }, {} as Record<number, Answer[]>)
        )
      : {};

    // Merge data
    const quizData: Quiz = {
      id: quiz[0].id,
      name: quiz[0].name!,
      description: quiz[0].description!,
      // @ts-expect-error ........
      questions: quizQuestions.map((q) => ({
        id: q.id,
        name: q.name,
        quizId: q.quizId,
        answers: questionsAnswers[q.id] || [],
      })),
    };

    return { data: quizData };

  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
