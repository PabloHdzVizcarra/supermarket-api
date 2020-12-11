import mongoose, { Connection } from "mongoose";

const dbName: string = 'supermarket'
const uri: string = 'mongodb://localhost:27017'

const options = {useUnifiedTopology: true, useNewUrlParser: true}
mongoose.connect(`${uri}/${dbName}`, options).then(() => (): void => {})

const db: Connection = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log('database connected')
})

