import { Model } from 'mongoose'
import { DocumentWithUser } from '../../../../models/userModel'
import { ResultActionInDoc } from '../delete_document/delete-document'

export async function getDocumentById(
  idDoc: string,
  schema: Model<DocumentWithUser>,
): Promise<ResultActionInDoc> {
  try {
    const document: DocumentWithUser | null = await schema.findById(idDoc)
    if (!document) {
      return {
        error: 'not-found',
        message: 'document not-found',
      }
    }
    return {
      error: 'null',
      document: document,
      message: 'success get document',
    }
  } catch (e) {
    return {
      error: 'database',
      message: e.message,
    }
  }
}
