const dbConfig = require('../config/db.config.js')
const mongoose = require('mongoose')

const db ={}
db.mongoose = mongoose
db.url = dbConfig.uri
db.models = require('./model.js')(mongoose)

module.exports = db