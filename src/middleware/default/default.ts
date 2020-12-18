import { Request, Response } from 'express'
import { LogRoute } from '../../modules/debug-logs/debug'

export const defaultRoutes = (req: Request, res: Response): void => {
  LogRoute('GET /api/default-router')
  res.status(404).json({
    message: 'Sorry the route cannot be found',
  })
}
