const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
require('dotenv').config()

const dbURI = process.env.DB_CONNECTION_STRING || 'mongodb+srv://sebin123:sebin123@cluster0.7at80te.mongodb.net/local_library?retryWrites=true&w=majority'

exports.connectToDB = async () => {
  await mongoose.connect(dbURI)
}
