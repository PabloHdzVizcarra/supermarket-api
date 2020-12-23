import { Document, Model } from 'mongoose'
import { ResultSavedWithError } from '../../../types/types'

export async function getDocById(
  id: string,
  Schema: Model<Document>,
): Promise<ResultSavedWithError> {
  try {
    const docFromDB = await Schema.findById(id)
    if (!docFromDB) {
      return {
        error: true,
        message: 'document not found in teh database',
      }
    }
    return {
      error: false,
      message: 'the document is obtained correctly from the database',
      data: docFromDB as never,
    }
  } catch (e) {
    return {
      databaseError: true,
      error: true,
      message: e.message,
    }
  }
}
