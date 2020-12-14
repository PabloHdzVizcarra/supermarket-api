import { Document } from 'mongoose'

type ResGetDataFromDB = {
  errorDB?: boolean
  message: string
  error?: boolean
  data?: Document
}

type DataToRes = {
  statusCode: number
  message: string
  data?: Document
}

export async function createResponse(
  result: ResGetDataFromDB,
): Promise<DataToRes> {
  if (result.errorDB) {
    return {
      statusCode: 500,
      message: result.message,
    }
  }
  if (result.error) {
    return {
      statusCode: 200,
      message: result.message,
    }
  }
  return {
    statusCode: 200,
    message: result.message,
    data: result.data,
  }
}
