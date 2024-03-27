const mongoose = require("mongoose");
const Counter = require('./counterModel');

const postSchema = new mongoose.Schema({
  post_id: { type: Number, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  author_id: { type: String, required: true },
  category_id: { type: String, required: true }
}, { timestamps: true })

// Pre-save middleware to generate auto-incrementing postId
postSchema.pre('save', async function (next) {
  if (!this.post_id) {
    this.post_id = await Counter.getNextSequenceValue('post_id');
  }
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;