import { Model } from 'mongoose'
import { DocumentWithUser } from '../../../../models/userModel'
import { ResultActionInDoc } from '../delete_document/delete-document'

export async function findDocumentAndUpdate(
  id_user_document: string,
  id_doc_modified: string,
  Schema: Model<DocumentWithUser>,
): Promise<ResultActionInDoc> {
  try {
    const document_from_db = await Schema.findOneAndUpdate(
      { _id: id_user_document },
      { $pull: { articles: { _id: id_doc_modified } } },
      { new: true, useFindAndModify: false },
    )
    if (!document_from_db) {
      return {
        message: 'not document found',
        error: 'not-found',
      }
    }

    return {
      message: 'document successfully modified',
      error: 'null',
      document: document_from_db,
    }
  } catch (error) {
    return {
      message: error.message,
      error: 'database',
    }
  }
}
