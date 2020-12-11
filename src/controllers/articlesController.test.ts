import request from 'supertest'
import app from '../index'

describe('test in articleController', () => {
  test('must return', async () => {
    const result = await request(app).post('/api./article').send(
      {
        name: 'cereal'
      }
    )

    console.log(result.status)
  })
})