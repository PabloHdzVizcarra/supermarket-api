import { Model } from 'mongoose'
import { LogDatabase } from '../../debug-logs/debug'
import {
  DocArticle,
  DocArticleWithData,
  ResultSavedWithError,
} from '../../../types/types'

export async function embedDocument(
  data: DocArticle,
  idDoc: string,
  Schema: Model<DocArticleWithData>,
): Promise<ResultSavedWithError> {
  try {
    const doc = await Schema.findById(idDoc)
    if (!doc) {
      LogDatabase(
        `the document you are trying to assing the ${data.name} article to, does not exist in the database`,
      )
      return {
        error: true,
        message: `the document you are trying to assing the ${data.name} article to, does not exist in the database`,
      }
    }
    doc.articles.push(data as never)
    await doc.save()
    LogDatabase('data saved successfully')
    return {
      error: false,
      message: `${data.name} article is saved successfully in database`,
      data: doc,
    }
  } catch (error) {
    LogDatabase('error database')
    return {
      databaseError: true,
      error: true,
      message: error.message,
    }
  }
}
