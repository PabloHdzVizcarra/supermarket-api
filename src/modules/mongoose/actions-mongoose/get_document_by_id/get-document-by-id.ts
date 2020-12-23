import { Model } from 'mongoose'
import { DocumentWithUser } from '../../../../models/userModel'

type ResultGetDocumentById = {
  error: boolean
  message?: string
  document?: DocumentWithUser
}

export async function getDocumentById(
  idDoc: string,
  schema: Model<DocumentWithUser>,
): Promise<ResultGetDocumentById> {
  try {
    const document: DocumentWithUser | null = await schema.findById(idDoc)
    if (!document) {
      return {
        error: true,
        message: 'document not-found',
      }
    }
    return {
      error: false,
      document,
    }
  } catch (e) {
    return {
      error: true,
      message: e.message,
    }
  }
}
