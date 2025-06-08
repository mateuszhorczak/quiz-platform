import { db } from "~/server/database";
import { quizzes, questions, answers } from "~/server/schema";
import { eq, inArray, and } from "drizzle-orm";
import type { QuestionWithUserAnswers, Quiz, Answer } from "~/types";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const quizId = parseInt(id as string, 10);

  const body = await readBody(event);
  const userAnswers: QuestionWithUserAnswers[] = body.userAnswers;

  try {
    const quiz = await db.select({
      id: quizzes.id,
      name: quizzes.name,
      description: quizzes.description,
    })
      .from(quizzes)
      .where(eq(quizzes.id, quizId));

    if (quiz.length === 0) {
      throw createError({ statusCode: 404, statusMessage: "Quiz not found" });
    }

    const questionsIds = userAnswers.map((q) => q.questionId);

    const quizQuestions = await db.select({
      id: questions.id,
      name: questions.name,
      quizId: questions.quizId,
    })
      .from(questions)
      .where(and(
        eq(questions.quizId, quizId),
        inArray(questions.id, questionsIds)
      ));

    const allAnswers = questionsIds.length
      ? await db.select({
        id: answers.id,
        name: answers.name,
        questionId: answers.questionId,
        isCorrect: answers.isCorrect,
      })
        .from(answers)
        .where(inArray(answers.questionId, questionsIds))
      : [];

    const quizData: Quiz = {
      id: quiz[0].id,
      name: quiz[0].name!,
      description: quiz[0].description!,
      // @ts-expect-error ..................
      questions: quizQuestions.map((q) => ({
        id: q.id,
        name: q.name,
        quizId: q.quizId,
        answers: allAnswers
          .filter(a => a.questionId === q.id)
          .map(a => ({
            id: a.id,
            name: a.name,
            questionId: a.questionId,
            isCorrect: a.isCorrect,
          }) as Answer)
      })),
    };

    let correctQuestions = 0;

    const result = {
      ...quizData,
      questions: quizData.questions.map(question => {
        const userAnswer = userAnswers.find(u => u.questionId === question.id);
        const userSelectedIds = userAnswer?.selectedAnswers || [];

        const answersWithSelection = question.answers.map(answer => ({
          ...answer,
          userSelected: userSelectedIds.includes(answer.id)
        }));

        const correctAnswerIds = question.answers
          .filter(a => a.isCorrect)
          .map(a => a.id);

        const isCorrect =
          correctAnswerIds.length === userSelectedIds.length &&
          correctAnswerIds.every(id => userSelectedIds.includes(id));

        if (isCorrect) correctQuestions++;

        return {
          ...question,
          answers: answersWithSelection,
          isCorrect
        };
      })
    };

    return {
      data: {
        quiz: result,
        score: {
          correct: correctQuestions,
          total: quizData.questions.length
        }
      }
    };
  }
  catch (error) {
    console.error("Error processing request:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error"
    });
  }
});
