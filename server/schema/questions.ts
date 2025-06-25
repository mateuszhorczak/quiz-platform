import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { answers, quizzes } from "./index";

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  quizId: integer("quiz_id"),
})

export const questionsRelations = relations(questions, ({ many, one }) => ({
  answers: many(answers),
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id]
  })
}));
