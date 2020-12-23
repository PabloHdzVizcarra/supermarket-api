import { NextFunction, Request, Response } from 'express'
import { LogInfo, LogRoute } from '../../../modules/debug-logs/debug'
import UserSchema from '../../../models/userModel'
import { findDocumentAndUpdate } from '../../../modules/mongoose/actions_mongoose/find_document_and_update/find-document-and-update'
import { createResponse } from '../../../modules/mongoose/helpers/create-response'

export async function deleteDataUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  LogRoute('DELETE /api/article')
  const { id_user, id_document } = req.body
  console.log(id_document)
  console.log(id_user)
  const { code, message } = await createResponse(
    await findDocumentAndUpdate(id_user, id_document, UserSchema),
  )
  if (code === 200) {
    LogInfo('call next middleware deleteData')
    next()
    return
  }
  res.status(code).json({
    message,
  })
}
