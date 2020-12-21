import { Request, Response } from 'express'
import { deleteOneDocument } from '../../../modules/mongoose/actions-mongoose/delete_document/delete-document'
import ArticleSchema from '../../../models/articlesModel/articlesModel'
import { createResponse } from '../../../modules/mongoose/helpers/create-response'
import { LogRoute } from '../../../modules/debug-logs/debug'

export async function deleteData(req: Request, res: Response): Promise<void> {
  LogRoute('DELETE /api/article/:idDocument')
  const { code, message, document } = await createResponse(
    await deleteOneDocument(req.params.idDocument, ArticleSchema),
  )
  res.status(code).json({
    message,
    data: document,
  })
}
