import jwt from 'jsonwebtoken'
import dotenv = require('dotenv')
import { LogInfo } from '../../../modules/debug-logs/debug'
dotenv.config()

export function generateAccessToken(email: string, password: string): string {
  const { TOKEN_SECRET } = process.env
  if (!TOKEN_SECRET) return 'error'
  LogInfo('generate token')
  return jwt.sign({ email, password }, TOKEN_SECRET, { expiresIn: '1d' })
}
