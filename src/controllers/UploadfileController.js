const multer = require('multer');
const path = require('path');
const PORT = process.env.PORT || 3001;

// Set up Multer storage to save files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", "..", 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("error:" + err.message)
      return res.status(500).json({ error: err.message });
    } else if (err) {
      console.log("errorsdsd:" + err.message)
      return res.status(500).json({ error: 'An unknown error occurred' });
    }
    console.log("file" + JSON.stringify(req.file));
    // If file uploaded successfully, send back the URL of the uploaded image
    const imageUrl = `http://localhost:${PORT}/upload/${req.file.filename}`;
    console.log("file" + imageUrl);
    return res.status(200).json({ imageUrl: imageUrl });

  });
};

module.exports = { uploadFile };
