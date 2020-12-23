import { NextFunction, Request, Response } from 'express'
import { deleteDataUser } from '../delete-data-user'
import '../../../../modules/mongoose/mongoose'

describe('when the user id provided in the request body matches some user in the database', () => {
  const mockRequest = (body: Record<string, unknown>) =>
    ({
      body,
    } as Request)
  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }
  it('should return the document from the database', async () => {
    const req = mockRequest({
      id_user: '5fdb77852c9d80397daf00c3',
      id_document: '2c7ea3b1-8be1-40a7-b098-110f82dcb0e8',
    })
    const res = mockResponse()
    const next = jest.fn() as NextFunction
    await deleteDataUser(req, res, next)
  })
})
