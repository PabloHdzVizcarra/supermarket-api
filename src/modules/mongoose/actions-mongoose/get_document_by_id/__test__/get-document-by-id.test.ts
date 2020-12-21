import { getDocumentById } from '../get-document-by-id'

describe('when a document with the provided id is found', () => {
  const fakeSchema = {
    findById: jest.fn(() => ({
      _id: 'f5c37be3-1a6b-4ec7-ab21-f1a289e52d0b',
      name: 'milk',
      price: 20,
      category: 'food',
      description: 'good quality milk',
      creator_user: 'fbb0c58d-dfa0-44ef-bcff-9efba48f0afd',
      create_at: 934,
    })),
  }
  it('should return an object with the error and document properties', async () => {
    const result = await getDocumentById(
      '5fdb77852c9d80397daf00c3',
      fakeSchema as never,
    )
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('document')
  })
  it('should be a valid document', async function () {
    const { document } = await getDocumentById(
      '5fdb77852c9d80397daf00c3',
      fakeSchema as never,
    )
    expect(document).toBeTruthy()
  })
})

describe('when the id of the document to be search is not found in the database', () => {
  const fakeSchema = {
    findById: jest.fn(),
  }
  it('should return an object with the property document=undefined', async () => {
    const { document } = await getDocumentById(
      '5fdb77852c9d80397daf00c8',
      fakeSchema as never,
    )
    expect(document).toBe(undefined)
  })
  it('should return an object with the error and message properties, when a document with the provided id is not found', async () => {
    const result = await getDocumentById(
      '5fdb77852c9d80397daf00c8',
      fakeSchema as never,
    )
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('message')
  })
})

describe('when an error occurs with the database', () => {
  const fakeSchema = {
    findById: jest.fn().mockImplementation(() => {
      throw new Error('connection to the database could not be established')
    }),
  }
  it('should return an object with the error and message properties', async () => {
    const result = await getDocumentById(
      '5fdb77852c9d80397daf00c8',
      fakeSchema as never,
    )
    expect(fakeSchema.findById).toHaveBeenCalled()
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('message')
    const { message } = result
    expect(message).toBe('connection to the database could not be established')
  })
})
