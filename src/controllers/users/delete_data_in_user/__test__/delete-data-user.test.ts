import { NextFunction, Request, Response } from 'express'
import { deleteDataUser } from '../delete-data-user'
import '../../../../modules/mongoose/mongoose'
import * as mongoose from '../../../../modules/mongoose/actions_mongoose/find_document_and_update/find-document-and-update'

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
const mockNextFunction = () => jest.fn() as NextFunction

describe('when the id_user and id_document properties are sent in the request.body and both are valid in the database', () => {
  it('the middleware must call next function', async () => {
    const req = mockRequest({
      id_user: '5fdb77852c9d80397daf00c3',
      id_document: '5fdb77852c9d80397daf00c3',
    })
    const res = mockResponse()
    const next = mockNextFunction()
    await deleteDataUser(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})

describe('when occurs error in a database', () => {
  jest.spyOn(mongoose, 'findDocumentAndUpdate').mockResolvedValue({
    message: 'database error',
    error: 'database',
  })
  const req = mockRequest({
    id_user: '5fdb77852c9d80397daf00c3',
    id_document: '5fdb77852c9d80397daf00c3',
  })
  const res = mockResponse()
  const next = mockNextFunction()
  it('should respond with a status code 400', async () => {
    await deleteDataUser(req, res, next)
    expect(res.status).toBeCalledWith(400)
  })
  it('should respond with a json with property message', async () => {
    await deleteDataUser(req, res, next)
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) })
  })
})

describe('when the id_user does not match any document in the database', () => {
  jest.spyOn(mongoose, 'findDocumentAndUpdate').mockResolvedValue({
    message: 'document not found',
    error: 'not-found',
  })
  const req = mockRequest({
    id_user: '5fdb77852c9d80397daf00c6',
    id_document: '5fdb77852c9d80397daf00c3',
  })
  const res = mockResponse()
  const next = mockNextFunction()
  it('should respond with a status code 400', async () => {
    await deleteDataUser(req, res, next)
    expect(res.status).toBeCalledWith(404)
  })
  it('should respond with a json with property message', async () => {
    await deleteDataUser(req, res, next)
    expect(res.json).toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) })
  })
})
