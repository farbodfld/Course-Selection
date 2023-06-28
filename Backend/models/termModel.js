const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  studentNo: String,
  teacherNo: String,
  userNo: String,
  SemesterCourse: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SemesterCourse'
  }],
  preregistrationCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CourseRequest'
  }]
});

module.exports = mongoose.model('Term', termSchema);
