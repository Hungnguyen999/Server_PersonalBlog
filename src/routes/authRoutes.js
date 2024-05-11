const express = require('express');
const router = express.Router();
const { signUp, signIn, userTokenVerify } = require("../controllers/AuthController");


// Defining Router API end points
router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/verify-token', userTokenVerify)


module.exports = router;