import { Request, Response } from 'express'

export async function createArticle(
  req: Request,
  res: Response,
): Promise<void> {
  console.log(req.body)
  res.send('create article')
}
