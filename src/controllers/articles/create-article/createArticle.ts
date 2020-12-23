import { Request, Response } from 'express'
import { createOneDataInSchema } from '../../../modules/mongoose/actions_mongoose/createOneDataInSchema'
import ArticleSchema from '../../../models/articlesModel/articlesModel'
import { createResponse } from '../../users/helpers/createResponse'

export async function createArticle(
  req: Request,
  res: Response,
): Promise<void> {
  const { statusCode, message, data } = await createResponse(
    await createOneDataInSchema(req.body, ArticleSchema),
  )
  res.status(statusCode).json({ message, data })
}
