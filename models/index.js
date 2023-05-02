const dbConfig = require('../config/db.config.js')
const mongoose = require('mongoose')

const studentDB ={}
studentDB.mongoose = mongoose
studentDB.url = dbConfig.uri
studentDB.models = require('./studentModel.js')(mongoose)

const professorDB ={}
professorDB.mongoose = mongoose
professorDB.url = dbConfig.uri
professorDB.models = require('./professorModel.js')(mongoose)

const EducationalManagerDB ={}
EducationalManagerDB.mongoose = mongoose
EducationalManagerDB.url = dbConfig.uri
EducationalManagerDB.models = require('./educationalManagerModel.js')(mongoose)

module.exports = {studentDB, professorDB, EducationalManagerDB}