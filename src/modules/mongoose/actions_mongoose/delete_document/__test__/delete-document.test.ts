import { deleteOneDocument } from '../delete-document'

describe('Test in deleteOneDocument function', () => {
  const schemaTestNotFound = {
    findByIdAndRemove: jest.fn().mockResolvedValue(null),
  }
  const schemaTestErrorDB = {
    findByIdAndRemove: jest.fn().mockImplementation(async () => {
      throw new Error('database error')
    }),
  }
  const schemaTestFoundData = {
    findByIdAndRemove: jest.fn().mockResolvedValue({
      name: 'milk',
      price: 60,
    }),
  }
  test('should return an object with message and error properties, when not found data by an id in the database', async () => {
    const result = await deleteOneDocument(
      '22877809-832b-4999-b41b-62f888c58e5b',
      schemaTestNotFound as never,
    )
    expect(result).toHaveProperty('message')
    expect(result).toHaveProperty('error')
  })
  test('the error property must have a value of not-found, when the document is not found in the database', async () => {
    const { error } = await deleteOneDocument(
      '22877809-832b-4999-b41b-62f888c58e5b',
      schemaTestNotFound as never,
    )
    expect(error).toBe('not-found')
  })
  test('the message property must be of type string, when the document is not found in the database', async () => {
    const { message } = await deleteOneDocument(
      '22877809-832b-4999-b41b-62f888c58e5b',
      schemaTestNotFound as never,
    )
    expect(typeof message).toBe('string')
  })
  test('should return an object with message, error and doc properties, when the document is found in the database', async () => {
    const result = await deleteOneDocument(
      '229e50fb-90d2-4665-9fe2-465c28f7750b',
      schemaTestFoundData as never,
    )
    expect(result).toHaveProperty('message')
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('document')
  })
  test('the error property must have a value of null, when the document is found in the database', async () => {
    const { error } = await deleteOneDocument(
      '22877809-832b-4999-b41b-62f888c58e5b',
      schemaTestFoundData as never,
    )
    expect(error).toBe('null')
  })
  test('should return an object with message and error properties, when occurs a database error', async () => {
    const result = await deleteOneDocument(
      '22877809-832b-4999-b41b-62f888c58e5b',
      schemaTestErrorDB as never,
    )
    expect(result).toHaveProperty('message')
    expect(result).toHaveProperty('error')
  })
  test('the error property must have a value of database, when occurs error in the database', async () => {
    const { error } = await deleteOneDocument(
      '22877809-832b-4999-b41b-62f888c58e5b',
      schemaTestErrorDB as never,
    )
    expect(error).toBe('database')
  })
})
