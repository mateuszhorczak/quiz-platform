import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'

export function generateJwtToken(event: any, payload: any) {
  const config = useRuntimeConfig(event)
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' })
}

export function isTokenExpired(event: H3Event, token: string): boolean {
  try {
    jwt.verify(token, useRuntimeConfig(event).jwtSecret)
    return false
  }
  catch {
    return true
  }
}
