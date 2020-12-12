import { ResCreateCollection } from "../../../types/types"
import { Document } from "mongoose";

type Result = {
  statusCode: number
  message: string
  data?: Document
}

export async function createResponse(result: ResCreateCollection): Promise<Result> {
  if (result.error) {
    return {
      statusCode: 400,
      message: result.message
    }
  }

  return {
    statusCode: 201,
    message: result.message,
    data: result.data
  }
}