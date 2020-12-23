import mongoose, { Connection, Document, Model } from 'mongoose'
import { ResCreateCollection, UserModel } from '../../types/types'
import { LogDatabase, LogError } from '../debug-logs/debug'
import { DocumentWithUser } from '../../models/userModel'

const dbName = 'supermarket'
const uri = 'mongodb://localhost:27017'

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
mongoose.connect(`${uri}/${dbName}`, options).then()
mongoose.set('useCreateIndex', true)
const db: Connection = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  LogDatabase('Connect to MongoDB')
})

export async function createDataInCollection(
  data: UserModel,
  Schema: Model<DocumentWithUser>,
): Promise<ResCreateCollection> {
  try {
    const result: Document = new Schema(data)
    await result.save()
    LogDatabase('saved in mongoose')
    return {
      error: false,
      message: 'document created in collection successfully',
      data: result,
    }
  } catch (e) {
    LogError('error mongoose')
    return {
      error: true,
      message: e.message,
    }
  }
}

type DataLog = {
  email: string
  password?: string
}

interface DataUSer extends mongoose.Document {
  password: string
  email: string
}

type GetOneData = {
  error?: boolean
  message: string
  data?: DataUSer | Document
  errorDB?: boolean
}

export async function getOneDataFromDB(
  data: DataLog,
  schema: Model<DocumentWithUser>,
): Promise<GetOneData> {
  try {
    const dataFromDatabase: Document | null = await schema.findOne({
      email: data.email,
    })
    if (!dataFromDatabase) {
      LogDatabase('data not found in database')
      return {
        error: true,
        message: 'No data found',
      }
    }
    LogDatabase('data found in database')
    return {
      error: false,
      message: 'Data found',
      data: dataFromDatabase,
    }
  } catch (e) {
    LogDatabase('database error')
    return {
      errorDB: true,
      message: e.message,
    }
  }
}
