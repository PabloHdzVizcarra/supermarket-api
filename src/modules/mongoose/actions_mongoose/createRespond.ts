import { DataToResponse, ResultSavedWithError } from '../../../types/types'

export async function createDataToRespond(
  resultFromDatabase: ResultSavedWithError,
): Promise<DataToResponse> {
  const { error, databaseError, data, message } = resultFromDatabase
  if (databaseError) {
    return {
      statusCode: 400,
      message,
    }
  }
  if (error) {
    return {
      statusCode: 404,
      message,
    }
  }
  return {
    statusCode: 200,
    message,
    data,
  }
}
