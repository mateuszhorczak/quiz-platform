import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import { eq } from 'drizzle-orm'
import { db } from '~/server/database'
import { answers, questions, quizzes } from '~/server/schema'

export interface AuthUser {
  id: number
  username: string
}

// Reads the JWT from the `auth:token` cookie (set by stores/auth.ts) or an Authorization header
export function requireUser(event: H3Event): AuthUser {
  const header = getHeader(event, 'authorization')
  const token = header?.startsWith('Bearer ') ? header.slice(7) : getCookie(event, 'auth:token')

  if (!token) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  try {
    const payload = jwt.verify(token, useRuntimeConfig(event).jwtSecret) as jwt.JwtPayload
    return { id: payload.id, username: payload.username }
  }
  catch {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }
}

export function parseId(event: H3Event, name = 'id'): number {
  const id = parseInt(getRouterParam(event, name) as string, 10)
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
  }
  return id
}

export async function requireQuizOwner(event: H3Event, quizId: number): Promise<AuthUser> {
  const user = requireUser(event)
  await assertQuizOwner(user, quizId)
  return user
}

export async function requireQuestionOwner(event: H3Event, questionId: number): Promise<AuthUser> {
  const user = requireUser(event)
  await assertQuestionOwner(user, questionId)
  return user
}

export async function requireAnswerOwner(event: H3Event, answerId: number): Promise<AuthUser> {
  const user = requireUser(event)

  const answer = await db.query.answers.findFirst({ where: eq(answers.id, answerId) })
  if (!answer) {
    throw createError({ statusCode: 404, statusMessage: 'Answer not found' })
  }
  await assertQuestionOwner(user, answer.questionId)
  return user
}

async function assertQuestionOwner(user: AuthUser, questionId: number) {
  const question = await db.query.questions.findFirst({ where: eq(questions.id, questionId) })
  if (!question?.quizId) {
    throw createError({ statusCode: 404, statusMessage: 'Question not found' })
  }
  await assertQuizOwner(user, question.quizId)
}

async function assertQuizOwner(user: AuthUser, quizId: number) {
  const quiz = await db.query.quizzes.findFirst({ where: eq(quizzes.id, quizId) })
  if (!quiz) {
    throw createError({ statusCode: 404, statusMessage: 'Quiz not found' })
  }
  if (quiz.userId !== user.id) {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }
}
