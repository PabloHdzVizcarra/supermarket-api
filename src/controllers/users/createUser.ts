import { Request, Response } from 'express'
import UserSchema from '../../models/userModel'
import { createDataInCollection } from '../../modules/mongoose/mongoose'
import { createResponse } from './helpers/createResponse'
import { LogRoute } from '../../modules/debug-logs/debug'

export async function createUser(req: Request, res: Response): Promise<void> {
  LogRoute('POST: /api/user')
  const { statusCode, message, data } = await createResponse(
    await createDataInCollection(req.body, UserSchema),
  )
  res.status(statusCode).json({
    message,
    data,
  })
}
