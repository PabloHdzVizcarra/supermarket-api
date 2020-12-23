import { Request, Response } from 'express'
import UserSchema from '../../../models/userModel'
import { getDocumentById } from '../../../modules/mongoose/actions-mongoose/get_document_by_id/get-document-by-id'
import { createResponse } from '../../../modules/mongoose/helpers/create-response'

export async function getUser(req: Request, res: Response): Promise<void> {
  const { idUser } = req.params
  const { code, message, document } = await createResponse(
    await getDocumentById(idUser, UserSchema),
  )
  res.status(code).json({
    message,
    data: document,
  })
}
