import { mockRequest, mockResponse } from '../../../../helpers/test/mocks'
import { updateArticle } from '../update_article'
import * as helper from '../../../../modules/mongoose/actions_mongoose/update_document/update_one_document'
import { mockArticleDocument } from '../../../../helpers/test/mock_article_document'

describe('Integration test for updateArticle controller', () => {
  const req = mockRequest(
    {
      id_document: '5fe39a5b74d75a574a80ac72',
      data_update: {
        name: 'new milk',
        price: 150,
      },
    },
    {},
  )
  const res = mockResponse()
  it('should respond with a status code 200 and a json with the message and data properties, when a correct id_article is submitted, and the update data is correct', async () => {
    jest.spyOn(helper, 'updateOneDocument').mockResolvedValue({
      message: 'success',
      document: mockArticleDocument as never,
      error: 'null',
    })
    await updateArticle(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
      data: expect.any(Object),
    })
  })
  // when there is an error with the database
  it('should respond with a status code 404 and message error', async () => {
    jest.spyOn(helper, 'updateOneDocument').mockResolvedValue({
      message: 'database error',
      error: 'database',
    })
    await updateArticle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    })
  })
  // if the id_document provided in the body is not valid in the database
  it('should respond with a status code 404 and message error', async () => {
    jest.spyOn(helper, 'updateOneDocument').mockResolvedValue({
      message: 'the document is not found in the database',
      error: 'not-found',
    })
    await updateArticle(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    })
  })
})
