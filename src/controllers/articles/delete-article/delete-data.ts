import { Request, Response } from 'express'
import { deleteOneDocument } from '../../../modules/mongoose/actions_mongoose/delete_document/delete-document'
import ArticleSchema from '../../../models/articlesModel/articlesModel'
import { createResponse } from '../../../modules/mongoose/helpers/create-response'
import { LogRoute } from '../../../modules/debug-logs/debug'

export async function deleteData(req: Request, res: Response): Promise<void> {
  LogRoute('DELETE /api/article/')
  const { code, message } = await createResponse(
    await deleteOneDocument(
      req.body.id_article_document,
      ArticleSchema as never,
    ),
  )
  res.status(code).json({
    message,
  })
}
