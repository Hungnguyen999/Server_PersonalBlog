const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchemma = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false },
  password: { type: String, required: true },
  profilePicture: { type: String },
  role: { type: String, required: true }, // 1. Contributor 2. Admin
}, { timestamps: true, })

userSchemma.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next;
  }
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
  next();
})

const User = mongoose.model('User', userSchemma);
module.exports = User;