import { db } from '~/server/database';
import { users } from '~/server/schema'
import argon2 from 'argon2'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    if (!body.username || !body.password || !body.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'All fields are required!',
      })
    }

    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.username, body.username),
    })

    if (existingUser) {
      throw createError({
        statusCode: 409,
        statusMessage: 'There is already an account with the given username.',
      })
    }

    const existingEmail = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, body.email),
    })

    if (existingEmail) {
      throw createError({
        statusCode: 409,
        statusMessage: 'The email address provided already has an account assigned.',
      })
    }

    const hashedPassword = await argon2.hash(body.password)

    const [newUser] = await db.insert(users).values({
      username: body.username,
      password: hashedPassword,
      email: body.email,
      dateCreation: new Date().toISOString(),
    }).returning()

    const { password, ...userWithoutPassword } = newUser

    setResponseStatus(event, 201)
    return {
      success: true,
      data: userWithoutPassword
    }

  }
  catch (error) {
    console.error("Registration error:", error)

    // @ts-expect-error type error silence
    if (error.statusCode) {
      throw error
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    })
  }
})
