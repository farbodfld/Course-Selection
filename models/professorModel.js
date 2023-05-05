const BaseUser = require('./userModel')
const mongoose = require('mongoose')

const ProfessorSchema = new mongoose.Schema(
  {
    faculty: String,
    field: String,
    order: String,
  },
  {
    timestamps: true,
  }
);

module.exports = BaseUser.discriminator("Professor", ProfessorSchema);