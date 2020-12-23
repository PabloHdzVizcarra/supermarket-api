import { ResultActionInDoc } from '../actions_mongoose/delete_document/delete-document'
import { Document } from 'mongoose'

type DataToResponse = {
  code: number
  message: string
  document?: Document | unknown
}

export async function createResponse({
  message,
  error,
  document,
}: ResultActionInDoc): Promise<DataToResponse> {
  switch (error) {
    case 'database': {
      return {
        code: 400,
        message,
      }
    }

    case 'not-found': {
      return {
        code: 404,
        message,
      }
    }

    case 'null': {
      return {
        code: 200,
        message,
        document: document,
      }
    }
  }
}
