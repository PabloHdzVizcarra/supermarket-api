import { createArticle } from '../createArticle'
import { Request, Response } from 'express'
import { ArticleToSave } from '../../../../modules/mongoose/actions-mongoose/createOneDataInSchema'
import * as action from '../../../../modules/mongoose/actions-mongoose/createOneDataInSchema'

describe('Test in a controller createArticle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const article: ArticleToSave = {
    name: 'milk',
    price: 70,
    description: 'a good quality milk',
    category: 'food',
    creator_user: '5fda7c91ffb29976d34321bb',
  }
  const mockRequest = (body: Record<string, string | number | undefined>) =>
    ({
      body,
    } as Request)
  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }
  it('should return a status code 400 and json with a message property if an error occurs in the database', async () => {
    jest.spyOn(action, 'createOneDataInSchema').mockResolvedValue({
      error: true,
      message: 'an error occurred in the database',
    })
    const req = mockRequest({ ...article })
    const res = mockResponse()
    await createArticle(req, res)
    expect(res.json).toHaveBeenCalledWith({
      message: 'an error occurred in the database',
    })
    expect(res.status).toHaveBeenCalledWith(400)
  })
  it('should respond with a status code 201 and a json with the message and data properties, if all the correct data is sent in the request, and it is saved correctly in the database', async () => {
    jest.spyOn(action, 'createOneDataInSchema').mockResolvedValue({
      error: false,
      message: 'data saved correctly in database',
      data: article as never,
    })
    const req = mockRequest({ ...article })
    const res = mockResponse()
    await createArticle(req, res)
    expect(res.json).toHaveBeenCalledWith({
      message: 'data saved correctly in database',
      data: article,
    })
    expect(res.status).toHaveBeenCalledWith(201)
  })
})
