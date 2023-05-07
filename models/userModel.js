const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    firstname: String,
    surname: String,
    userNumber: Number,
    password: String,
    email: String,
    mobilePhone: String,
    role: {
      type: String,
      enum: ["admin", "manager", "student", "professor"],
      required: [true]
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BaseUser", UserSchema);