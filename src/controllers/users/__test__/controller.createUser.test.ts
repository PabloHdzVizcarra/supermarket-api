import request from 'supertest'
import app from '../../../index'
import * as func from '../helpers/createResponse'

describe('test in controller POST: "/api/user"', () => {
  test('it should return a status code 400, and an error message, when an error occurs when saving the data in the database', async () => {
    const mock = jest.spyOn(func, 'createResponse').mockResolvedValue({
      statusCode: 400,
      message: 'error save data',
    })
    const result = await request(app).post('/api/user').send({
      name: 'pablo',
      lastname: 'viscera',
      username: 'dev-text',
      password: '12345678',
      yearOfBirth: '1992/07/13',
      email: 'textemail@google.com',
    })
    expect(result.status).toBe(400)
    expect(result.body).toEqual({
      message: expect.any(String),
    })
    mock.mockRestore()
  })
})
