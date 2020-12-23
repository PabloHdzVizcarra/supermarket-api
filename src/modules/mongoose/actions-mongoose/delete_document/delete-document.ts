import { Model } from 'mongoose'
import { DocumentWithUser } from '../../../../models/userModel'

export type ErrorString = 'database' | 'not-found' | 'null'
export type ResultActionInDoc = {
  message: string
  error: ErrorString
  document?: DocumentWithUser
}

export async function deleteOneDocument(
  id: string,
  Schema: Model<DocumentWithUser>,
): Promise<ResultActionInDoc> {
  try {
    const doc = await Schema.findByIdAndRemove(id)
    if (!doc) {
      return {
        message: 'document not found',
        error: 'not-found',
      }
    }
    return {
      message: `the document with the id ${id} was successfully removed from the database`,
      error: 'null',
      document: doc,
    }
  } catch (e) {
    return {
      message: e.message,
      error: 'database',
    }
  }
}
