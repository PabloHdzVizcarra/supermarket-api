import { Request, Response } from "express";

export async function createUser(req: Request, res: Response): Promise<void> {
  res.json({
    action: 'create a new user'
  })
}