import * as Mongoose from 'mongoose'
import config from '../../config'

let database: Mongoose.Connection
export const connect = () => {
  // add your own url below
  const url = config.mongoDbUrl
  if (database) {
    return
  }
  Mongoose.connect(url, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  database = Mongoose.connection
  database.once('open', async () => {
    console.log('Connected to database')
  })
  database.on('error', () => {
    console.log('Error connecting to database')
  })
}
export const disconnect = () => {
  if (!database) {
    return
  }
  Mongoose.disconnect()
}
