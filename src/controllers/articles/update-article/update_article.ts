import { Request, Response } from 'express'
import { createResponse } from '../../../modules/mongoose/helpers/create-response'
import { updateOneDocument } from '../../../modules/mongoose/actions_mongoose/update_document/update_one_document'
import ArticleSchema from '../../../models/articlesModel/articlesModel'
import { DocumentWithArticle } from '../../../types/types'
import { Document } from 'mongoose'

function getProperty(obj: DocumentWithArticle): string {
  return obj.name
}

type DocFromDb = Document | DocumentWithArticle | null
export async function updateArticle(
  req: Request,
  res: Response,
): Promise<void> {
  const { id_document, data_update } = req.body
  const article_doc: DocFromDb = await ArticleSchema.findById(id_document)
  if (!article_doc) {
    res.status(404).json({
      message: `the document with id ${id_document} is not exists in the database`,
    })
  }
  req.body.article_delete = getProperty(article_doc as DocumentWithArticle)
  const { document, code, message } = await createResponse(
    await updateOneDocument(id_document, data_update, ArticleSchema as never),
  )
  res.status(code).json({
    message,
    data: document,
  })
}
