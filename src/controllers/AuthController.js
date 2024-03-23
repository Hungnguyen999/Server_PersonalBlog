const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require("dotenv").config();

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
async function signIn(req, res) {
  try {
    const { username, email, password, profilePicture } = req.body;
    const existedUser = await User.findOne({ username });
    if (existedUser == null) {
      return res.status(404).json({ message: "Invalid username or password" });
    }
    else {
      const matchedPassword = await bcrypt.compare(password, existedUser.password);
      if (matchedPassword) {
        const payload = { userId: existedUser._id }; // Include user ID in payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({
          message: 'Login successful',
          token,
          user: { username: existedUser.username } // Send limited user info
        });
      } else {
        res.status(401).json({ message: "Invalid username or password. Please try again" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to authenticate user" });
  }
}

module.exports = {
  signIn, signUp
};