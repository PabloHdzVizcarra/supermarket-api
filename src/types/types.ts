import mongoose, { Document } from 'mongoose'

export type UserModel = {
  name: string
  lastname: string
  username: string
  dateOfBirth: string
  email: string
  password: string
}

export interface DocArticleWithData extends mongoose.Document {
  articles: []
}

export type ResCreateCollection = {
  data?: Document
  message: string
  error?: boolean
  errorDb?: boolean
}

export interface SavedUserDocument extends mongoose.Document {
  name: string
  lastname: string
  username: string
  password: string
  email: string
  dateOfBirth: string
}

export type ResultSavedWithError = {
  message: string
  error: boolean
  databaseError?: boolean
  data?: DocArticleWithData
}

export type DataToResponse = {
  statusCode: number
  message: string
  data?: DocArticleWithData
}

export interface DocArticle extends mongoose.Document {
  name: string
  price: number
  category: string
  description: string
  creator_user: string
}
