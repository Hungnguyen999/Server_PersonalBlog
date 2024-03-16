const express = require('express');
const router = express.Router();
const { signUp, signIn } = require("../controllers/AuthController");

router.post('/signup', (req, res) => {
  // Your callback function logic here
  res.send('POST request received');
});

router.post('/login', (req, res) => {
  // Your callback function logic here
  res.send('POST request received');
});

module.exports = router;