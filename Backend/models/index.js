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

const ApprovedCourseDB ={}
ApprovedCourseDB.mongoose = mongoose
ApprovedCourseDB.url = dbConfig.uri
ApprovedCourseDB.models = require('./approvedCourseModel')(mongoose)

const SemesterCourseDB ={}
SemesterCourseDB.mongoose = mongoose
SemesterCourseDB.url = dbConfig.uri
SemesterCourseDB.models = require('./semesterCourseModel.js')(mongoose)

const SemesterDB ={}
SemesterDB.mongoose = mongoose
SemesterDB.url = dbConfig.uri
SemesterDB.models = require('./semesterModel.js')(mongoose)

const FacultyDB ={}
FacultyDB.mongoose = mongoose
FacultyDB.url = dbConfig.uri
FacultyDB.models = require('./facultyModel.js')(mongoose)

const CourseRequestDB ={}
CourseRequestDB.mongoose = mongoose
CourseRequestDB.url = dbConfig.uri
CourseRequestDB.models = require('./courseRequestModel.js')(mongoose)

const CourseRegistrationDB ={}
CourseRegistrationDB.mongoose = mongoose
CourseRegistrationDB.url = dbConfig.uri
CourseRegistrationDB.models = require('./courseRegistrationModel.js')(mongoose)

module.exports = {studentDB, professorDB, EducationalManagerDB, ApprovedCourseDB, SemesterCourseDB, SemesterDB, FacultyDB, CourseRequestDB, CourseRegistrationDB}