import { deleteData } from '../delete-data'
import { Request, Response } from 'express'
import * as mongoose from '../../../../modules/mongoose/actions-mongoose/delete_document/delete-document'

const mockRequest = (body: unknown, params: unknown) =>
  ({
    body,
    params,
  } as Request)
const mockResponse = () => {
  const res = {} as Response
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

const mockDocument = {
  _id: 'a96679f5-98bd-46c7-a969-0350e6dd8f30',
  name: 'sugar',
  price: 10,
  category: 'food',
  description: 'good sugar for coffee',
  creator_user: 'e1485c04-444c-4960-88a9-eaec5ba9e6c0',
  create_at: 143,
  __v: 0,
}

describe('Test a deleteData controller, when the document is deleted with success from the database', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const message = 'delete document success'
  const req = mockRequest(
    {},
    { idDocument: 'd4cdf13b-0685-4151-adba-f1c1a0625ecc' },
  )
  const res = mockResponse()
  it('should respond with a status code 200', async () => {
    jest.spyOn(mongoose, 'deleteOneDocument').mockResolvedValue({
      message,
      error: 'null',
      document: mockDocument as never,
    })
    await deleteData(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
  })
  it('should respond with a json with the message and data properties', async () => {
    jest.spyOn(mongoose, 'deleteOneDocument').mockResolvedValue({
      message,
      error: 'null',
      document: mockDocument as never,
    })
    await deleteData(req, res)
    expect(res.json).toHaveBeenCalledWith({
      message: message,
      data: mockDocument,
    })
  })
})

describe('the idDocument that you passed as params to the request does not match any document in the database', () => {
  const req = mockRequest(
    {},
    { idDocument: 'd4cdf13b-0685-4151-adba-f1c1a0625ecc' },
  )
  const res = mockResponse()
  it('should respond with a status code 404', async () => {
    jest.spyOn(mongoose, 'deleteOneDocument').mockResolvedValue({
      message: 'not found data in database',
      error: 'not-found',
    })
    await deleteData(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
  })
  it('should respond with a json with the message property', async () => {
    jest.spyOn(mongoose, 'deleteOneDocument').mockResolvedValue({
      message: 'not found data in database',
      error: 'not-found',
    })
    await deleteData(req, res)
    expect(res.json).toHaveBeenCalledWith({
      message: 'not found data in database',
    })
  })

  describe('an error occurred in the database when executing the controller', () => {
    it('should respond with a status code 400', async () => {
      jest.spyOn(mongoose, 'deleteOneDocument').mockResolvedValue({
        message: 'the connection to the database could not be created',
        error: 'database',
      })
      await deleteData(req, res)
      expect(res.status).toHaveBeenCalledWith(400)
    })
    it('should respond with a json with the message property', async () => {
      jest.spyOn(mongoose, 'deleteOneDocument').mockResolvedValue({
        message: 'the connection to the database could not be created',
        error: 'database',
      })
      await deleteData(req, res)
      expect(res.json).toHaveBeenCalledWith({
        message: 'the connection to the database could not be created',
      })
    })
  })
})
