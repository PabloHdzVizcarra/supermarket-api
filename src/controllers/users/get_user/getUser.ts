import { Request, Response } from 'express'
import { getDocById } from '../../../modules/mongoose/actions-mongoose/getDocById'
import UserSchema from '../../../models/userModel'
import { createDataToRespond } from '../../../modules/mongoose/actions-mongoose/createRespond'

export async function getUser(req: Request, res: Response): Promise<void> {
  const { idUser } = req.params
  const { data, statusCode, message } = await createDataToRespond(
    await getDocById(idUser, UserSchema),
  )
  res.status(statusCode).json({
    message,
    data,
  })
}
