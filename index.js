const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const cors = require('cors');
const db = require('./config/database');

const corsOptions = {
  origin: 'http://localhost:3000',//(https://your-client-app.com)
  optionsSuccessStatus: 200,
};



const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});