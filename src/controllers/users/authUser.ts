import { Request, Response } from 'express'
import { getOneDataFromDB } from '../../modules/mongoose/mongoose'
import UserSchema from '../../models/userModel'
import { createResponse } from './helpers/createResponse/createResponseForGetDataFromDatabase'
import { LogInfo, LogRoute } from '../../modules/debug-logs/debug'

export async function authUser(req: Request, res: Response): Promise<void> {
  LogRoute('GET /api/user/autologin')
  const { email } = req.body.user
  if (!email) {
    res.status(401).json({ message: 'there is no email in the request' })
    return
  }
  const { statusCode, message, data } = await createResponse(
    await getOneDataFromDB({ email }, UserSchema),
  )
  LogInfo('success user login')
  res.status(statusCode).json({ message, data })
  return
}
