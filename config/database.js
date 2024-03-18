const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://nguyenduyhunga7:hungreoA7@cluster0.lzdl89g.mongodb.net/personal_blog')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;