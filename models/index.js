const dbConfig = require('../config/db.config.js')
const mongoose = require('mongoose')

const studentDB ={}
studentDB.mongoose = mongoose
studentDB.url = dbConfig.uri
studentDB.models = require('./studentModel.js')(mongoose)

module.exports = studentDB