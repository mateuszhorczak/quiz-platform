import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";
import { questions } from "./index";

export const quizzes = sqliteTable("quizzes", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name"),
    description: text("description"),
})

export const quizzesRelations = relations(questions, ({ many }) => ({
    questions: many(questions),
}));
