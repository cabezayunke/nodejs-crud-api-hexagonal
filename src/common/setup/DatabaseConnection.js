'use strict'
const mongoose = require('mongoose')
const Logger = require('../utils/Logger')

const DatabaseConnection = {
  create: async (config) => {
    const db = mongoose.connection
    const tags = { tags: 'init,mongodb' }
    db.on('connecting', () => {
      Logger.log(`connecting to mongodb://${config.host}:${config.port}/${config.database}`, tags)
    })
    db.on('error', (error) => {
      Logger.error('Error in MongoDb connection: ' + error.toString(), { ...tags, error })
    })
    db.on('connected', () => {
      Logger.log('MongoDB connected!', tags)
    })
    db.once('open', () => {
      Logger.log('MongoDB connection opened!', tags)
    })
    db.on('reconnected', () => {
      Logger.log('MongoDB reconnected!', tags)
    })
    db.on('disconnected', () => {
      Logger.log('MongoDB disconnected!', tags)
    })

    // mongoose debug
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', (coll, method, query, doc, options) =>
        Logger.debug(
          `${coll}.${method}(${JSON.stringify(query)}): ${JSON.stringify(doc)}`,
          { tags: 'mongodb,mongoose' }
        )
      )
    }

    return mongoose.connect(
      `mongodb://${config.host}:${config.port}/${config.database}`,
      {
        user: config.user,
        pass: config.password,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}
module.exports = DatabaseConnection
