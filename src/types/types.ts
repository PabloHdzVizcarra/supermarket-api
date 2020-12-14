import { Document } from 'mongoose'

export type UserModel = {
  name: string
  lastname: string
  username: string
  dateOfBirth: string
  email: string
  password: string
}

export type ResCreateCollection = {
  data?: Document
  message: string
  error?: boolean
  errorDb?: boolean
}
