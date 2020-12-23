import { findDocumentAndUpdate } from '../find-document-and-update'

describe('when the id_document_user matches some document in the database and within that document the articles field can be updated with the id_doc_modified', () => {
  const mock_schema = {
    findOneAndUpdate: jest.fn(() => ({
      _id: '5acc55d8-f2ce-4630-8ecc-a2188ba16fc2',
      name: 'john',
      lastname: 'carter',
      username: 'john182',
      email: 'example@test.com',
      dateOfBirth: '1990/12/01',
      password: '4ee5535e-3951-485b-a324-11c96271c98b',
      create_at: '23/12/2020',
      articles: [],
    })),
  }
  it('must return an object with the document, type_error and message properties', async () => {
    const id_user = '5fdb77852c9d80397daf00c3'
    const id_document = '5fdb9dbf0808a047bd8593b9'
    const result = await findDocumentAndUpdate(
      id_user,
      id_document,
      mock_schema as never,
    )
    expect(result).toHaveProperty('document')
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('message')
  })
  it('the error property must have a value of null', async () => {
    const id_user_wrong = '5fdb77852c9d80397daf00c9'
    const id_document = '5fdb9dbf0808a047bd8593b9'
    const { error, message } = await findDocumentAndUpdate(
      id_user_wrong,
      id_document,
      mock_schema as never,
    )
    expect(error).toBe('null')
    expect(message).toStrictEqual(expect.any(String))
  })
})

describe('when the id_user does not match any document in the database', () => {
  const mockSchema = {
    findOneAndUpdate: jest.fn(),
  }
  it('must return an object with the error and message properties', async () => {
    const id_user_wrong = '5fdb77852c9d80397daf00c9'
    const id_document = '5fdb9dbf0808a047bd8593b9'
    const result = await findDocumentAndUpdate(
      id_user_wrong,
      id_document,
      mockSchema as never,
    )
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('message')
  })
  it('the error property must have a value of not-found', async () => {
    const id_user_wrong = '5fdb77852c9d80397daf00c9'
    const id_document = '5fdb9dbf0808a047bd8593b9'
    const { error, message } = await findDocumentAndUpdate(
      id_user_wrong,
      id_document,
      mockSchema as never,
    )
    expect(error).toBe('not-found')
    expect(message).toStrictEqual(expect.any(String))
  })
})

describe('when an error occurs with the database at execution time', () => {
  const mockSchema = {
    findOneAndUpdate: jest.fn(() => {
      throw new Error('database error')
    }),
  }
  it('must return an object with the error and message properties', async () => {
    const id_user = '5fdb77852c9d80397daf00c3'
    const id_document = '5fdb9dbf0808a047bd8593b9'
    const result = await findDocumentAndUpdate(
      id_user,
      id_document,
      mockSchema as never,
    )
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('message')
  })
  it('the error property must have a value of "database"', async () => {
    const id_user = '5fdb77852c9d80397daf00c3'
    const id_document = '5fdb9dbf0808a047bd8593b9'
    const { error, message } = await findDocumentAndUpdate(
      id_user,
      id_document,
      mockSchema as never,
    )
    expect(error).toBe('database')
    expect(message).toStrictEqual(expect.any(String))
  })
})
