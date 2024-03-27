const express = require('express');
const router = express.Router();
const { signUp, signIn } = require("../controllers/AuthController");

// Defining Router API end points
router.post('/signup', signUp);
router.post('/login', signIn);

module.exports = router;