import { Request, Response } from 'express'
import UserSchema from '../../models/userModel'
import { createDataInCollection } from '../../modules/mongoose/mongoose'
import { createResponse } from './helpers/createResponse'
import { LogRoute } from '../../modules/debug-logs/debug'
import { hashPassword } from './helpers/hashPassword'
import { UserModel } from '../../types/types'
import { checkPropertiesInObject } from './helpers/checkProperties/checkPropertiesInObject'

export async function createUser(req: Request, res: Response): Promise<void> {
  LogRoute('POST: /api/user')
  const checked = checkPropertiesInObject(
    ['name', 'username', 'password', 'lastname', 'email', 'dateOfBirth'],
    req.body.data,
  )
  if (!checked) {
    res.status(204).json({ message: 'empty fields were sent' })
    return
  }
  const dataHash: UserModel = hashPassword(req.body.data)
  const { statusCode, message, data } = await createResponse(
    await createDataInCollection(dataHash, UserSchema),
  )

  res.status(statusCode).json({
    message,
    data,
  })
}
