const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  comment_id: { type: String, required: true, unique: true },
  content: { type: String },
  post_id: { type: String, required: true },
  author_id: { type: String, required: true },
}, { timestamps: true })

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;