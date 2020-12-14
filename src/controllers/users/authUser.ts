import { Request, Response } from 'express'

export async function authUser(req: Request, res: Response): Promise<void> {
  res.json({ message: 'authUser' })
}
