import request from 'supertest'
import app from '../../../index'
import * as controller from '../../../controllers/users/createUser'
import * as helper from '../../../controllers/users/helpers/createResponse'

describe('Test in route POST: "api/user"', () => {
  test('it should return a status code 422, and an object with an errors property when the necessary data is not sent in the request to make the request', async () => {
    const mockCreateUser = jest.spyOn(controller, 'createUser')
    const result = await request(app).post('/api/user').send({})
    expect(result.status).toBe(422)
    expect(result.body.errors.length).toBeGreaterThan(1)
    expect(result.body).toHaveProperty('errors')
    expect(mockCreateUser).not.toHaveBeenCalled()
  })

  test('you should call the createUser controller when all the correct data is sent in the request', async () => {
    const createMock = jest.spyOn(helper, 'createResponse').mockResolvedValue({
      statusCode: 201,
      message: 'data is saved',
    })
    await request(app).post('/api/user').send({
      name: 'Ignacio',
      lastname: 'rodriguez',
      username: 'ignacio01',
      password: '123456789',
      dateOfBirth: '1992/01/13',
      email: 'data-test@gmail.com',
    })
    expect(createMock).toHaveBeenCalled()
  })
})
