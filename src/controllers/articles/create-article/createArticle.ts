import { Request, Response } from 'express'
import { createOneDataInSchema } from '../../../modules/mongoose/actions-mongoose/createOneDataInSchema'
import ArticleSchema from '../../../models/articlesModel/articlesModel'
import { createResponse } from '../../users/helpers/createResponse'

export async function createArticle(
  req: Request,
  res: Response,
): Promise<void> {
  console.log(req.body)
  const { statusCode, message, data } = await createResponse(
    await createOneDataInSchema(req.body, ArticleSchema),
  )
  res.status(statusCode).json({ message, data })
}
