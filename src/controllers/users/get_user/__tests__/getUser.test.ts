import { mockRequest, mockResponse } from '../../../../helpers/test/mocks'
import { getUser } from '../getUser'
import * as mongoose from '../../../../modules/mongoose/actions-mongoose/getDocById'

describe('Tests in getUser controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should respond with a status code 400 and message error, when occurs an error in database', async () => {
    jest.spyOn(mongoose, 'getDocById').mockResolvedValue({
      databaseError: true,
      error: true,
      message: 'database error',
    })
    const req = mockRequest({}, { idUser: 'user123' })
    const res = mockResponse()
    await getUser(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'database error' })
  })
  it('should respond with a status code 404 and message error in json when the required user not exists in database', async () => {
    jest.spyOn(mongoose, 'getDocById').mockResolvedValue({
      error: true,
      message: 'user not found',
    })
    const req = mockRequest({}, { idUser: 'user123' })
    const res = mockResponse()
    await getUser(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'user not found' })
  })
  it('should respond a status code 200 and a json with the message and data properties when the user is successfully obtained from the database', async () => {
    jest.spyOn(mongoose, 'getDocById').mockResolvedValue({
      error: false,
      message: 'success',
      data: {
        name: 'john',
        lastname: 'smith',
        email: 'example@example.com',
      } as never,
    })
    const req = mockRequest({}, { idUser: 'user123' })
    const res = mockResponse()
    await getUser(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'success',
      data: {
        name: 'john',
        lastname: 'smith',
        email: 'example@example.com',
      },
    })
  })
})
