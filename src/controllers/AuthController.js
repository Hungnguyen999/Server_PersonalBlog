const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Sign un function
async function signUp(req, res) {
  try {
    const { username, email, password, profilePicture } = req.body;
    const newUser = new User({ username, email, password, profilePicture });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user" });
  }
}

// Sign in function
async function signIn() {
  try {
    const { username, email, password, profilePicture } = req.body;
    const existedUser = User.findOne({ username });
    if (!existedUser) {
      return res.status(404).json({ message: "Invalid username or password" });
    }
    else {
      const matchedPassword = await bcrypt.compare(password, user.password);
      matchedPassword ? res.status(200).json({ message: "Login successfully" }) : res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to authenticate user" });
  }
}

module.exports = [
  signIn, signUp
];