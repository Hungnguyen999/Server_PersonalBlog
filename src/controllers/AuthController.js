const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../utils/verifyToken')
require("dotenv").config();

// Sign un function
async function signUp(req, res) {
  try {
    const { username, email, password, profilePicture } = req.body;
    const role = "contributor"
    const newUser = new User({ username, email, password, profilePicture, role });
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
    const { username, email, password, profilePicture, role } = req.body;
    const existedUser = await User.findOne({ username });
    if (existedUser == null) {
      return res.status(404).json({ message: "Invalid username or password" });
    }
    else {
      const matchedPassword = await bcrypt.compare(password, existedUser.password);
      if (matchedPassword) {
        const payload = {
          userId: existedUser._id,
          userName: existedUser.username,
          email: existedUser.email,
          role: existedUser.role,
          avatar: existedUser.profilePicture
        }; // Include user ID in payload
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.json({
          message: 'Login successful',
          token: token,
          user: {
            userId: existedUser._id,
            userName: existedUser.username,
            email: existedUser.email,
            role: existedUser.role,
            avatar: existedUser.profilePicture
          } // Send limited user info
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

async function userTokenVerify(req, res) {
  try {
    // Extract the token from the request headers
    const token = req.headers.authorization;
    console.log("asdasdasd " + JSON.stringify(token));
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not provided' });
    }

    // Verify the token using the verifyToken function
    const decoded = await verifyToken(token);
    // If the token is valid, return success response
    return res.status(200).json({ message: 'Token is valid', user: decoded });
  } catch (error) {
    // If the token is invalid or expired, return error response
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = {
  signIn, signUp, userTokenVerify
};