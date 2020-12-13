import mongoose, { Connection, Document, Model } from 'mongoose'
import { ResCreateCollection, UserModel } from '../../types/types'

const dbName = 'supermarket'
const uri = 'mongodb://localhost:27017'

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}
mongoose.connect(`${uri}/${dbName}`, options).then(() => {
  console.log('tyr connection')
})

const db: Connection = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('database connected')
})

export async function createDataInCollection(
  data: UserModel,
  Schema: Model<Document>,
): Promise<ResCreateCollection> {
  try {
    const result: Document = new Schema(data)
    await result.save()

    return {
      error: false,
      message: 'document created in collection successfully',
      data: result,
    }
  } catch (e) {
    return {
      error: true,
      message: e.message,
    }
  }
}
