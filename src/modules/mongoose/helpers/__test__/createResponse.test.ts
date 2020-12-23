import { createResponse } from '../create-response'

describe('Test in a helper createResponse', () => {
  it('should respond to an object with the code property with a value 400 and a message property with a string, when the error parameter has a "database" value', async () => {
    const result = await createResponse({
      message: 'error database',
      error: 'database',
    })
    expect(result).toHaveProperty('code')
    expect(result).toHaveProperty('message')

    const { message, code } = result
    expect(typeof message).toBe('string')
    expect(code).toBe(400)
  })
  it('should respond with an object with the code properties with a value of 404, and a message property of type string when the error parameter has a value of "not-found"', async () => {
    const result = await createResponse({
      message: 'document not found in database',
      error: 'not-found',
    })
    expect(result).toHaveProperty('code')
    expect(result).toHaveProperty('message')

    const { code, message } = result
    expect(typeof message).toBe('string')
    expect(code).toBe(404)
  })

  it('an object with the properties message: type "string", code: 200 and document: document from the database must answer, when the error type parameter has a values of null, and the optional parameter doc is added as an argument', async () => {
    const result = await createResponse({
      message: 'document successfully obtained',
      error: 'null',
      document: {
        name: 'milk',
      } as never,
    })
    expect(result).toHaveProperty('code')
    expect(result).toHaveProperty('message')
    expect(result).toHaveProperty('document')

    const { code, message, document } = result
    expect(code).toBe(200)
    expect(typeof message).toBe('string')
    expect(document).toEqual({
      name: 'milk',
    })
  })
})
