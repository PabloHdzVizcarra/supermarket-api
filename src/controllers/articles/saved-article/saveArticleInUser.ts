import { NextFunction, Request, Response } from 'express'
import { LogRoute } from '../../../modules/debug-logs/debug'
import { createDataToRespond } from '../../../modules/mongoose/actions-mongoose/createRespond'
import UserSchema from '../../../models/userModel'
import { embedDocument } from '../../../modules/mongoose/actions-mongoose/embedDocument'

export async function saveArticleInUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  LogRoute('POST /api/article/')
  const { creator_user } = req.body
  const { data, statusCode, message } = await createDataToRespond(
    await embedDocument(req.body, creator_user, UserSchema as never),
  )

  if (statusCode !== 201) {
    res.status(statusCode).json({ message })
    return
  }
  req.body.document = data
  next()
  return
}
