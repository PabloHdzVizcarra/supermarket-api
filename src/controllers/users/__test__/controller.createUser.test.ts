import { createUser } from '../createUser'
import { Request, Response } from 'express'
import * as mongoose from '../../../modules/mongoose/mongoose'

describe('test in controller POST: "/api/user"', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const dataUser = {
    name: 'John',
    password: '123456789',
    lastname: 'Smith',
    username: 'john182',
    email: 'example@data.com',
    dateOfBirth: '1992/12/01',
  }
  const mockRequest = (body: Record<string, string>) =>
    ({
      body,
    } as Request)
  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  it('should respond with a 204 status code, and an error message when all data in requested in the data request is not sent, data "name-username-password-lastname-email-dateOfBirth" ', async () => {
    const wrongDataUser = {
      name: 'John',
      password: '123456789',
      email: 'example@data.com',
    }
    const res = mockResponse()
    const req = mockRequest({ ...wrongDataUser })
    await createUser(req, res)
    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) })
  })

  it('should response a status code 400, and an error message when all the correct data is sent in te request, but an error occurs in the database when saving the data', async () => {
    jest
      .spyOn(mongoose, 'createDataInCollection')
      .mockResolvedValue({ error: true, message: 'some database error' })
    const res = mockResponse()
    const req = mockRequest({ ...dataUser })
    await createUser(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'some database error' })
  })

  it('should respond with a status code 201 and an object with the message and data properties with the user data if all the data is correctly sent to the database and saved correctly', async () => {
    jest.spyOn(mongoose, 'createDataInCollection').mockResolvedValue({
      error: false,
      message: 'document created',
      data: dataUser as never,
    })
    const res = mockResponse()
    const req = mockRequest({ ...dataUser })
    await createUser(req, res)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'document created',
      data: dataUser,
    })
  })
})
