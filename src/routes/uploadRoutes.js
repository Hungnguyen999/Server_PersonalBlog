const express = require('express');
const router = express.Router();
const { uploadFile } = require("../controllers/UploadfileController");

// Defining Router API end points
router.post('/post-preview-image', uploadFile);
module.exports = router;