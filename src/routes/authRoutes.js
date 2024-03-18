const express = require('express');
const router = express.Router();
const { signUp, signIn } = require("../controllers/AuthController");


router.post('/signup', signUp);
router.post('/login', signIn);
module.exports = router;