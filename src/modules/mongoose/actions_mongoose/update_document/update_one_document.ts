import { Model } from 'mongoose'
import { DocumentWithArticle } from '../../../../types/types'
import { ResultActionInDoc } from '../delete_document/delete-document'

interface DataToUpdate {
  name?: string
  price?: number
  description?: string
  category?: string
}

export async function updateOneDocument(
  id_document: string,
  data_update: DataToUpdate,
  Schema: Model<DocumentWithArticle>,
): Promise<ResultActionInDoc> {
  try {
    const doc: DocumentWithArticle | null = await Schema.findByIdAndUpdate(
      id_document,
      data_update,
      { new: true, useFindAndModify: false },
    )
    if (!doc) {
      return {
        message: 'the document does not exist in database',
        error: 'not-found',
      }
    }
    return {
      message: `the ${doc.name} document is updated successfully`,
      document: doc,
      error: 'null',
    }
  } catch (e) {
    return {
      message: e.message,
      error: 'database',
    }
  }
}
