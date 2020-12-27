import { updateOneDocument } from '../update_one_document'

describe('when the id_document parameter matches some document in the database, and the document is modified successfully', () => {
  const mockArticleSchema = {
    findByIdAndUpdate: jest.fn(() => ({
      _id: '5fe39a5b74d75a574a80ac72',
      name: 'example article',
      price: '10',
      category: 'test',
      creator_user: '5fe39521db523853829dfbbc',
      create_at: '2020-12-23T19:28:27.217Z',
      __v: 0,
    })),
  }
  it('return an object with the properties message, document and error', async () => {
    const result = await updateOneDocument(
      '5fe39a4f74d75a574a80ac70',
      { name: 'cheese pizza', price: 200 },
      mockArticleSchema as never,
    )
    expect(result).toHaveProperty('message')
    expect(result).toHaveProperty('document')
    expect(result).toHaveProperty('error')
  })
  it('the message property must be of type string and error property must have a value fo null', async () => {
    const { message, error } = await updateOneDocument(
      '5fe39a4f74d75a574a80ac70',
      { name: 'cheese pizza', price: 200 },
      mockArticleSchema as never,
    )
    expect(typeof message).toBe('string')
    expect(error).toBe('null')
  })
})

describe('then the id_document provided does not match any document in the database', () => {
  const mockArticleSchema = {
    findByIdAndUpdate: jest.fn(),
  }
  it('must return an object with the properties message and error', async () => {
    const result = await updateOneDocument(
      '5fe39a4f74d75a574a80ac78',
      { name: 'cheese pizza', price: 200 },
      mockArticleSchema as never,
    )
    expect(result).toHaveProperty('message')
    expect(result).toHaveProperty('error')
  })
  it('the message property must have a values of type string, and the error must have a values of not-found', async () => {
    const result = await updateOneDocument(
      '5fe39a4f74d75a574a80ac78',
      { name: 'cheese pizza', price: 200 },
      mockArticleSchema as never,
    )
    const { message, error } = result
    expect(typeof message).toBe('string')
    expect(error).toBe('not-found')
  })
})

describe('when there is an error with the database at the time of execution', () => {
  const mockErrorSchema = {
    findByIdAndUpdate: jest.fn(() => {
      throw new Error('database error')
    }),
  }
  it('must return an object with the properties message and error', async () => {
    const result = await updateOneDocument(
      '5fe39a4f74d75a574a80ac78',
      { name: 'cheese pizza', price: 200 },
      mockErrorSchema as never,
    )
    expect(result).toHaveProperty('message')
    expect(result).toHaveProperty('error')
  })
  it('the message property must have a values of type string, and the error must have a values of not-found', async () => {
    const { message, error } = await updateOneDocument(
      '5fe39a4f74d75a574a80ac78',
      { name: 'cheese pizza', price: 200 },
      mockErrorSchema as never,
    )
    expect(typeof message).toBe('string')
    expect(error).toBe('database')
  })
})
