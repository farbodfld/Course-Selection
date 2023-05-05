const mongoose = require("mongoose");

const connectDB = async () => {
  try {
      mongoose.connect(process.env.uri);
      console.log("DATABASE IS CONNECTED!");
  } catch (err) {
      console.log("Error: ", err);
      process.exit(1);
  }
};

module.exports = connectDB;