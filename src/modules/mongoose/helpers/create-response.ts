import { ResultActionInDoc } from '../actions-mongoose/delete_document/delete-document'
import { Document } from 'mongoose'

type DataToResponse = {
  code: number
  message: string
  document?: Document
}

export async function createResponse({
  message,
  error,
  doc,
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
        document: doc,
      }
    }
  }
}
