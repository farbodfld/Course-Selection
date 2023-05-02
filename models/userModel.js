module.exports = mongoose => {

  const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    userNumber: Number,
    password: String,
    email: String,
    mobilePhone: String,
    userType: String,
  });

  return User 
}