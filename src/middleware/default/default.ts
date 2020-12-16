import { Request, Response } from 'express'

export const defaultRoutes = (req: Request, res: Response): void => {
  res.status(404).json({
    message: 'Sorry the route cannot be found',
  })
}
