const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require("./src/routes/categoryRoutes");
const postRoutes = require("./src/routes/postRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");


const cors = require('cors');
const db = require('./config/database');
const path = require('path');

const corsOptions = {
  origin: 'http://localhost:3000',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};

const app = express();

// Generate ra folder static cho file url
// ví dụ: http://localhost:3001/upload/1712734638295-Banner-tap-hoa.jpeg
// còn API để upload là http://localhost:3001/uploads/post-preview-image
app.use('/upload', cors(corsOptions), express.static(path.join(__dirname, 'public', 'uploads')));


app.use(cors())
// app.use(cookieParser());
app.use(bodyParser.json());
app.use('/auth', cors(corsOptions), authRoutes);
app.use('/category', cors(corsOptions), categoryRoutes);
app.use('/post', cors(corsOptions), postRoutes);
app.use('/upload', cors(corsOptions), uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});