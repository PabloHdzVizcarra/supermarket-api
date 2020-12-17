import { Document, Model } from 'mongoose'

type ArticleToSaved = {
  name: string
  price: number
  description: string
  category: string
}

type ResultDataSaved = {
  error: boolean
  message: string
  data?: Document
}

export async function createOneDataInSchema(
  data: ArticleToSaved,
  schema: Model<Document>,
): Promise<ResultDataSaved> {
  try {
    const result = new schema(data)
    await result.save()

    return {
      error: false,
      message: 'data is saved correctly',
      data: result,
    }
  } catch (e) {
    return {
      error: true,
      message: e.error,
    }
  }
}
