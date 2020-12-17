import { Document, Model } from 'mongoose'

export type ArticleToSave = {
  name: string
  price: number
  description: string
  category: string
  creator_user: string
}

type ResultSavedArticle = {
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
    return {
      error: false,
      message: 'data is saved correctly',
      data: result,
    }
  } catch (error) {
    return {
      error: true,
      message: error.message,
    }
  }
}
