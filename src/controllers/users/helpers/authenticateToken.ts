import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | undefined {
  const token: string | undefined = req.headers.cookie
  if (token === undefined) {
    return res.status(401).json({ message: 'not set credentials' })
  }
  const sliceToken: string = token.slice(6)

  jwt.verify(sliceToken, process.env.TOKEN_SECRET as string, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'not valid user' })
    }
    req.body.user = user
    next()
  })
}
