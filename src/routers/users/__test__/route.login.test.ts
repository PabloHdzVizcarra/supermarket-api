import request from 'supertest'
import app from '../../../index'
import * as mongoose from '../../../modules/mongoose/mongoose'
import UserSchema from '../../../models/userModel'

describe('Test route "route /api/user/login"', () => {
  const user = new UserSchema({
    name: 'Andreu',
    lastname: 'smith',
    username: 'addr1515asd',
    password: '123456789',
    dateOfBirth: '1990/12/01',
    email: 'example@test.com',
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('it should return a status code 422, and an error property if the complete data is not sent in the request', async () => {
    const result = await request(app).post('/api/user/login')
    expect(result.status).toBe(422)
    expect(result.body).toHaveProperty('errors')
  })

  test('you should call getOneDataFrDB function when all correct and complete data is sent in the request', async () => {
    const mockGetOneDataFromDB = jest
      .spyOn(mongoose, 'getOneDataFromDB')
      .mockResolvedValue({
        error: false,
        message: 'Data found',
        data: user,
      })
    await request(app).post('/api/user/login').send({
      email: 'data10@example.com',
      password: '123456789',
    })
    expect(mockGetOneDataFromDB).toHaveBeenCalled()
  })
})
