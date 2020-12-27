import { Request, Response } from 'express'
import { createResponse } from '../../../modules/mongoose/helpers/create-response'
import { updateOneDocument } from '../../../modules/mongoose/actions_mongoose/update_document/update_one_document'
import ArticleSchema from '../../../models/articlesModel/articlesModel'

export async function updateArticle(
  req: Request,
  res: Response,
): Promise<void> {
  const { id_document, data_update } = req.body
  const { document, code, message } = await createResponse(
    await updateOneDocument(id_document, data_update, ArticleSchema as never),
  )
  res.status(code).json({
    message,
    data: document,
  })
}
