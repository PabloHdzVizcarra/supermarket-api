import required from 'supertest'
import app from '../../../index'
import * as mongoose from '../../../modules/mongoose/mongoose'
import UserSchema from '../../../models/userModel'

describe('Test in a controller loginUser for route POST "api/user/login"', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const testUser = new UserSchema({
    name: 'john',
    lastname: 'smith',
    username: 'smith15',
  })
  test('It should respond a status code 500, and a json with a message property if an error occurs in teh database', async () => {
    const mockFunc = jest
      .spyOn(mongoose, 'getOneDataFromDB')
      .mockResolvedValue({
        errorDB: true,
        message: 'database error',
      })
    const response = await required(app).post('/api/user/login').send({
      email: 'data10@example.com',
      password: '123456789',
    })
    expect(response.status).toBe(500)
    expect(response.body).toHaveProperty('message')
    expect(mockFunc).toHaveBeenCalled()
  })

  test('it should respond with a status code 200 and json with a property of message, if the user is not found in the database', async () => {
    const mockFunc = jest
      .spyOn(mongoose, 'getOneDataFromDB')
      .mockResolvedValue({
        error: true,
        message: 'not data found in database',
      })
    const response = await required(app).post('/api/user/login').send({
      email: 'data10@example.com',
      password: '123456789',
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).not.toHaveProperty('data')
    expect(response.type).toBe('application/json')
    expect(mockFunc).toHaveBeenCalled()
  })

  test('it must respond with a status code 200 and a json with the message and data properties when the user is in the database', async () => {
    const mockFunc = jest
      .spyOn(mongoose, 'getOneDataFromDB')
      .mockResolvedValue({
        error: false,
        message: 'data found',
        data: testUser,
      })
    const response = await required(app).post('/api/user/login').send({
      email: 'data10@example.com',
      password: '123456789',
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('data')
    expect(response.type).toBe('application/json')
    expect(mockFunc).toHaveBeenCalled()
  })
})
