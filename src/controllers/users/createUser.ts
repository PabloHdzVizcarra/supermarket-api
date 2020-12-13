import { Request, Response } from 'express'
import UserSchema from '../../models/userModel'
import { createDataInCollection } from '../../modules/mongoose/mongoose'
import { createResponse } from './helpers/createResponse'
import { LogRoute } from '../../modules/debug-logs/debug'
import { hashPassword } from './helpers/hashPassword'
import { UserModel } from '../../types/types'

export async function createUser(req: Request, res: Response): Promise<void> {
  LogRoute('POST: /api/user')
  const dataHash: UserModel = hashPassword(req.body)
  const { statusCode, message, data } = await createResponse(
    await createDataInCollection(dataHash, UserSchema),
  )
  res.status(statusCode).json({
    message,
    data,
  })
}
