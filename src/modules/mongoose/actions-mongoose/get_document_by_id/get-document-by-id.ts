import { Document, Model } from 'mongoose'

type ResultGetDocumentById = {
  error: boolean
  message?: string
  document?: Document
}

export async function getDocumentById(
  idDoc: string,
  schema: Model<Document>,
): Promise<ResultGetDocumentById> {
  try {
    const document: Document | null = await schema.findById(idDoc)
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
