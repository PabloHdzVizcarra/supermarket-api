import { Request, Response } from 'express'
import { generateAccessToken } from './helpers/generateAccesToken'
import UserSchema from '../../models/userModel'
import { getOneDataFromDB } from '../../modules/mongoose/mongoose'
import { createResponse } from './helpers/createResponse/createResponseForGetDataFromDatabase'

export async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body
  const { statusCode, message, data } = await createResponse(
    await getOneDataFromDB({ email, password }, UserSchema),
  )
  const token = generateAccessToken(email, password)
  res.cookie('token', token, {
    httpOnly: true,
  })
  res.status(statusCode).json({ message, data })
}
