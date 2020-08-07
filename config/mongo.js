const mongoose = require('mongoose')
// const DB_URL = process.env.MONGO_URI
const loadModels = require('../models')
const createRolesDB = require('../models/roles.data')

module.exports = () => {
    const connect = () => {
        mongoose.Promise = global.Promise
        mongoose.connect(
            "mongodb+srv://admin:C6MiAIkSYxg3T9cZ@std-daily-report.8pv7c.mongodb.net/stdio-daily-report?retryWrites=true&w=majority"
            ,
          {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
          },
          (err) => {
            let dbStatus = ''
            if (err) {
              dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
            }
            dbStatus = `*    DB Connection: OK\n****************************\n`
            if (process.env.NODE_ENV !== 'test') {
              // Prints initialization
              console.log('****************************')
              console.log('*    Starting Server')
              console.log(`*    Port: ${process.env.PORT || 3000}`)
              console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`)
              console.log(`*    Database: MongoDB`)
              console.log(dbStatus)
            }
          }
        )
        mongoose.set('useCreateIndex', true)
        mongoose.set('useFindAndModify', false)
      }
      connect()
    
      mongoose.connection.on('error', console.log)
      mongoose.connection.on('disconnected', connect)
    
      loadModels()
      createRolesDB()
}