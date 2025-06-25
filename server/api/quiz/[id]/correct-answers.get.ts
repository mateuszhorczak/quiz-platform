import { db } from "~/server/database";
import { quizzes, questions, answers } from "~/server/schema";
import { eq, inArray, and } from "drizzle-orm";
import type { Quiz } from "~/types";
import { Readable } from "stream";
import PDFDocument from "pdfkit";
import { join } from "path";
import { readFileSync } from "fs";

const FONT_PATH = join(process.cwd(), "public", "fonts", "NotoSans-Regular.ttf");

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "Missing quiz ID" });
  }
  const quizId = parseInt(id, 10);
  if (isNaN(quizId)) {
    throw createError({ statusCode: 400, statusMessage: "Invalid quiz ID" });
  }

  try {
    const quiz = await db
      .select({
        id: quizzes.id,
        name: quizzes.name,
        description: quizzes.description,
      })
      .from(quizzes)
      .where(eq(quizzes.id, quizId))
      .limit(1);

    if (!quiz.length) {
      throw createError({ statusCode: 404, statusMessage: "Quiz not found" });
    }

    const allQuestions = await db
      .select({
        id: questions.id,
        name: questions.name,
        quizId: questions.quizId,
      })
      .from(questions)
      .where(eq(questions.quizId, quizId));

    const questionIds = allQuestions.map((q) => q.id);

    const correctAnswers = questionIds.length > 0
      ? await db
        .select({
          id: answers.id,
          name: answers.name,
          questionId: answers.questionId,
          isCorrect: answers.isCorrect,
        })
        .from(answers)
        .where(
          and(
            inArray(answers.questionId, questionIds),
            eq(answers.isCorrect, true)
          )
        )
      : [];

    const quizData: Quiz = {
      id: quiz[0].id,
      name: quiz[0].name!,
      description: quiz[0].description!,

      // @ts-expect-error ..........
      questions: allQuestions.map((q) => ({
        id: q.id,
        name: q.name!,
        quizId: q.quizId,
        answers: correctAnswers
          .filter((a) => a.questionId === q.id)
          .map((a) => ({
            id: a.id,
            name: a.name!,
            questionId: a.questionId,
            isCorrect: a.isCorrect,
          })),
      })),
    };

    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    try {
      const font = readFileSync(FONT_PATH);
      doc.registerFont("NotoSans", font);
      doc.font("NotoSans");
    }
    catch (error) {
      console.error("Failed to load Noto font", error);
      throw createError({
        statusCode: 500,
        statusMessage: "Font loading error",
        data: "Failed to load Noto Sans font",
      });
    }

    doc.on("data", (chunk) => buffers.push(chunk));
    const pdfPromise = new Promise<Buffer>((resolve, reject) => {
      doc.on("end", () => resolve(Buffer.concat(buffers)));
      doc.on("error", reject);
    });

    doc.fontSize(20).text(quizData.name, { align: "center" });
    doc.moveDown();

    if (quizData.description) {
      doc.fontSize(12).text(quizData.description, { align: "center" });
      doc.moveDown(2);
    }

    // Dodawanie pytań i odpowiedzi
    quizData.questions.forEach((question, index) => {
      doc.fontSize(14).text(`${ index + 1 }. ${ question.name }`);
      doc.moveDown(0.5);

      // Dodaj poprawne odpowiedzi
      if (question.answers.length > 0) {
        doc.fontSize(12).text("Poprawne odpowiedzi:");
        question.answers.forEach((answer) => {
          doc.text(`  • ${ answer.name }`);
        });
      } else {
        doc.fontSize(12).text("Brak poprawnych odpowiedzi");
      }

      doc.moveDown(1.5);
    });

    // Stopka
    const date = new Date().toLocaleDateString("pl-PL");
    doc
      .fontSize(10)
      .text(`Wygenerowano: ${ date }`, 50, doc.page.height - 50, {
        align: "left",
      });

    doc.end();

    // Konwertuj do bufora
    const pdfBuffer = await pdfPromise;

    // Poprawne kodowanie nazwy pliku dla polskich znaków
    const filename = `${ quizData.name.replace(/\s+/g, "_") }_poprawne_odpowiedzi.pdf`;
    const encodedFilename = encodeURIComponent(filename);

    // Ustaw nagłówki odpowiedzi
    setResponseHeaders(event, {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename*=UTF-8''${ encodedFilename }`,
    });

    return sendStream(event, Readable.from(pdfBuffer));
  }
  catch (error) {
    console.error("Error generating PDF:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      data: (error as Error).message,
    });
  }
});
