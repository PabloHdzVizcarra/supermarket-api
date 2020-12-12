import { Request, Response } from "express"
import UserSchema from '../../models/userModel'
import { createDataInCollection } from "../../modules/mongoose/mongoose";

export async function createUser(req: Request, res: Response): Promise<void> {
  console.log(req.body)
  const result = await createDataInCollection(req.body, UserSchema)
  console.log(result)
  res.json({
    action: 'create a new user'
  })
}