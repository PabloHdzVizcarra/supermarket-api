import { mockRequest, mockResponse } from '../../../../helpers/test/mocks'
import { updateArticle } from '../update_article'
import * as helper from '../../../../modules/mongoose/actions_mongoose/update_document/update_one_document'
import { mockArticleDocument } from '../../../../helpers/test/mock_article_document'

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

describe('when a correct id_article is submitted, and the update data is correct', () => {
  jest.spyOn(helper, 'updateOneDocument').mockResolvedValue({
    message: 'success',
    document: mockArticleDocument as never,
    error: 'null',
  })
  it('should respond with a status code 200 and a json with the message and data properties', async () => {
    await updateArticle(req, res)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
      data: expect.any(Object),
    })
  })
})

describe('if the id_document provided in the body is not valid in the database', () => {
  jest.spyOn(helper, 'updateOneDocument').mockResolvedValue({
    message: 'the document is not found in the database',
    error: 'not-found',
  })
  it('should respond with a status code 404 and message error', async () => {
    await updateArticle(req, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    })
  })
})

describe('when there is an error with the database', () => {
  jest.spyOn(helper, 'updateOneDocument').mockResolvedValue({
    message: 'database error',
    error: 'database',
  })
  it('should respond with a status code 404 and message error', async () => {
    await updateArticle(req, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: expect.any(String),
    })
  })
})
