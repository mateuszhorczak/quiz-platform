import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { questions, users } from "./index";

export const quizzes = sqliteTable("quizzes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name"),
  description: text("description"),
  userId: integer("user_id"),
})

export const quizzesRelations = relations(quizzes, ({ many, one }) => ({
  questions: many(questions),
  user: one(users, {
    fields: [quizzes.userId],
    references: [users.id],
  })
}));
