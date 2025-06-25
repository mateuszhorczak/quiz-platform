import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jwt-decode'
import { jwtDecode } from 'jwt-decode'

export function generateJwtToken(event: any, payload: any) {
  const config = useRuntimeConfig(event)
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' })
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token)

    if (!decoded.exp) return true

    const currentTime = Math.floor(Date.now() / 1000)
    return decoded.exp < currentTime
  }
  catch (e) {
    console.error('Invalid token', e)
    return true
  }
}
