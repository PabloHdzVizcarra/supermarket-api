import app from '../../../index'
import request from 'supertest'

describe('Test route "api/user/autologin"', () => {
  test('it should respond with a status code  401, and an object with the message property if there is no token in the request', done => {
    request(app)
      .get('/api/user/autologin')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).toHaveProperty('message')
        done()
      })
  })
  it('shout respond with a status code 403 and a message property, when an invalid a token is sent by the request', done => {
    request(app)
      .get('/api/user/autologin')
      .set('Accept', 'application/json')
      .set('Cookie', ['tokenWrong'])
      .expect('Content-Type', /json/)
      .expect(403)
      .end((error, result) => {
        if (error) return done(error)
        expect(result.body).toHaveProperty('message')
        return done()
      })
  })
  //
  // it('should pass to following middleware when a correct token is sent in the request to the endpoint', done => {
  //   const res = {} as Response
  //   const req = {} as Request
  //   const next = jest.fn()
  //   res.status = jest.fn().mockReturnValue(res)
  //   res.json = jest.fn().mockReturnValue(res)
  //   jest
  //     .spyOn(helper, 'authenticateToken')
  //     .mockImplementation((req, res, next) => undefined)
  //   request(app)
  //     .get('/api/user/autologin')
  //     .set('Accept', 'application/json')
  //     .set('Cookie', ['correct-token'])
  //     .end((error, response) => {
  //       if (error) return done(error)
  //       expect(response.status).toBe(400)
  //       return done()
  //     })
  // })
})
