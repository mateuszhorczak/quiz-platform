import { db } from "~/server/database";
import { quizzes, questions, answers } from "~/server/schema";
import { eq, inArray, sql } from "drizzle-orm";
import type { AnswerSolve, Quiz } from "~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const quizId = parseInt(id as string, 10)
  const query = getQuery(event)

  const allQuestions = query.allQuestionInQuiz === 'true'

  try {
    // Get quiz to solve
    const quiz = await db.select({
      id: quizzes.id,
      name: quizzes.name,
      description: quizzes.description,
    })
      .from(quizzes)
      .where(eq(quizzes.id, quizId));

    // Get quiz questions
    let questionsQuery = db.select({
      id: questions.id,
      name: questions.name,
      quizId: questions.quizId,
    })
      .from(questions)
      .where(eq(questions.quizId, quizId))
      .orderBy(sql`RANDOM()`);

    if (!allQuestions) {
      // @ts-expect-error ..........
      questionsQuery = questionsQuery.limit(5);
    }

    const quizQuestions = await questionsQuery;

    // Get questions id
    const questionsIds = quizQuestions.map((q) => q.id);

    // Get answers to questions
    const questionsAnswers = questionsIds.length
      ? await db.select({
        id: answers.id,
        name: answers.name,
        questionId: answers.questionId,
      })
        .from(answers)
        .where(inArray(answers.questionId, questionsIds))
        .orderBy(sql`RANDOM()`)
        .then((rows) =>
          rows.reduce((acc, row) => {
            if (!acc[row.questionId]) acc[row.questionId] = [];
            acc[row.questionId].push(row);
            return acc;
          }, {} as Record<number, typeof rows[0][]>)
        )
      : {};

    // Merge data
    const quizData: Quiz = {
      id: quiz[0].id,
      name: quiz[0].name!,
      description: quiz[0].description!,
      // @ts-expect-error .................
      questions: quizQuestions.map((q) => ({
        id: q.id,
        name: q.name,
        quizId: q.quizId,
        answers: (questionsAnswers[q.id] || []).map((a) => ({
          id: a.id,
          name: a.name,
          questionId: a.questionId,
          selected: false,
        }))
      })),
    };

    return { data: quizData };

  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});
