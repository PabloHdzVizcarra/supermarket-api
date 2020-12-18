import {
  mockNextFunction,
  mockRequest,
  mockResponse,
} from '../../../../helpers/test/mocks'
import { saveArticleInUser } from '../saveArticleInUser'
import * as action from '../../../../modules/mongoose/actions-mongoose/embedDocument'
import { ResultSavedWithError } from '../../../../types/types'

describe('Test in saveArticleInUser controller', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should respond with a status code 400, and an error message, if an error occurs in the database', async () => {
    jest.spyOn(action, 'embedDocument').mockResolvedValue({
      databaseError: true,
      message: 'error database',
      error: true,
    } as ResultSavedWithError)
    const res = mockResponse()
    const req = mockRequest({})
    const next = mockNextFunction()
    await saveArticleInUser(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'error database' })
  })
  it('should respond with a status code 404, and an error message if the user to whom you want to add the article does not exist in the database', async () => {
    jest.spyOn(action, 'embedDocument').mockResolvedValue({
      message: 'the document not exists in the database',
      error: true,
    } as ResultSavedWithError)
    const res = mockResponse()
    const req = mockRequest({})
    const next = mockNextFunction()
    await saveArticleInUser(req, res, next)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: 'the document not exists in the database',
    })
  })

  it('should call next function and add found a document to request body when user is found and document is successfully saved in user', async () => {
    jest.spyOn(action, 'embedDocument').mockResolvedValue({
      message: 'article is saved correctly in user document',
      error: false,
      data: {
        name: 'milk',
        price: 5,
        description: 'good quality milk',
      } as never,
    } as ResultSavedWithError)
    const res = mockResponse()
    const req = mockRequest({})
    const next = mockNextFunction()
    await saveArticleInUser(req, res, next)
    console.log(req.body)
    expect(req.body).toHaveProperty('document')
    expect(next).toHaveBeenCalled()
  })
})
