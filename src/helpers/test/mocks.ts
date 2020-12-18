import { NextFunction, Request, Response } from 'express'

export const mockRequest = (body: Record<never, never>): Request =>
  ({
    body,
  } as Request)
export const mockResponse = (): Response => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}
export const mockNextFunction = (): NextFunction => jest.fn() as NextFunction
