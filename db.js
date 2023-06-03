const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
require('dotenv').config()

exports.connectToDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING)
}
