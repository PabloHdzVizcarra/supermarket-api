import app from '../../../index'
import request from 'supertest'
import * as helper from '../../../controllers/users/helpers/authenticateToken'
import { Request, Response } from 'express'

describe('Test route "api/user/autologin"', () => {
  test('it should respond with a status code  401, and an object with the message property if there is no token in the request', async () => {
    const result = await request(app)
      .get('/api/user/autologin')
      .set('Cookie', [
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhdGExMEBleGFtcGxlLmNvbSIsInBhc3N3b3JkIjoiMTIzNDU2Nzg5IiwiaWF0IjoxNjA3OTY1ODk5LCJleHAiOjE2MDgwNTIyOTl9.Ec196SgbdPheSrL_zk8AtnNEWgSZxkXkBjPtBYTEA38',
      ])
    console.log(result.status)
  })
})
