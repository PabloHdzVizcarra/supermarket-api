import { NextFunction, Request, Response, Errback } from 'express'

export function errorRoute(
  error: Errback,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): Response {
  return res.status(500).json({ error: error.toString() })
}
