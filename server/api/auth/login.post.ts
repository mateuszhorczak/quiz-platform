import { generateJwtToken } from "~/server/jwtModule";
import { users, quizzes } from "~/server/schema";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import { db } from '~/server/database';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (!body.username || !body.password) {
      throw createError({
        statusCode: 400,
        statusMessage: "Username and password required!",
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.username, body.username)
    });

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User with the given name does not exist.",
      });
    }

    const isMatch = await argon2.verify(user.password, body.password);
    if (!isMatch) {
      throw createError({
        statusCode: 401,
        statusMessage: "Invalid password",
      });
    }

    const userQuizzes = await db.select({
      id: quizzes.id,
    })
      .from(quizzes)
      .where(eq(quizzes.userId, user.id))

    const userQuizzesId = userQuizzes.map((q) => q.id)

    const { password, ...userWithoutPassword } = user;

    return {
      token: generateJwtToken(event, userWithoutPassword),
      user: { ...userWithoutPassword, userQuizzesId }
    };
  }
  catch (error) {
    console.error("Login error:", error);

    // @ts-expect-error type error silence
    if (error.statusCode) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: "Internal server error",
    });
  }
});
