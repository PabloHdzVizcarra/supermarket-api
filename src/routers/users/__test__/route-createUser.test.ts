import request from 'supertest'
import app from '../../../index'

describe('Test in route POST: "api/user"', () => {
  test('it should return a status code 422, and an object with an errors property when the necessary data is not sent in the request to make the request', async () => {
    const result = await request(app).post('/api/user').send({})
    expect(result.status).toBe(422)
    expect(result.body.errors.length).toBeGreaterThan(1)
    expect(result.body).toHaveProperty('errors')
  })
})
