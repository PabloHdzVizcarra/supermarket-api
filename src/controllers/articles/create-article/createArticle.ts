import { Request, Response } from 'express'
import { createOneDataInSchema } from '../../../modules/mongoose/actions-mongoose/createOneDataInSchema'
import ArticleSchema from '../../../models/articlesModel/articlesModel'
import { createResponse } from '../../users/helpers/createResponse'
import { LogRoute } from '../../../modules/debug-logs/debug'
import { embedDocument } from '../../../modules/mongoose/actions-mongoose/embedDocument'
import UserSchema from '../../../models/userModel'
import { createDataToRespond } from '../../../modules/mongoose/actions-mongoose/createRespond'

export async function createArticle(
  req: Request,
  res: Response,
): Promise<void> {
  LogRoute('POST /api/article/')
  const { creator_user } = req.body
  const { statusCode, message, data } = await createResponse(
    await createOneDataInSchema(req.body, ArticleSchema),
  )
  const result = await createDataToRespond(
    await embedDocument(req.body, creator_user, UserSchema as never),
  )
  console.log(result)
  res.status(statusCode).json({ message, data })
}
