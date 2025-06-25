import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { questions } from "./index";

export const answers = sqliteTable("answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  questionId: integer("question_id").notNull().references(() => questions.id),
  isCorrect: integer("is_correct", { mode: 'boolean' }).default(false),
})

export const answersRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id]
  })
}));
