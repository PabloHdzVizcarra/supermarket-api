import { Document, Model } from 'mongoose'
import { LogDatabase } from '../../debug-logs/debug'

export type ArticleToSave = {
  name: string
  price: number
  description: string
  category: string
  creator_user: string
}

export type ResultSavedArticle = {
  error: boolean
  message: string
  data?: Document
}

export async function createOneDataInSchema(
  data: ArticleToSave,
  Schema: Model<Document>,
): Promise<ResultSavedArticle> {
  try {
    const result: Document = new Schema(data)
    await result.save()
    LogDatabase(`article ${data.name} saved correctly in database`)
    return {
      error: false,
      message: 'data is saved correctly',
      data: result,
    }
  } catch (error) {
    LogDatabase('Error: not saved data')
    return {
      error: true,
      message: error.message,
    }
  }
}
