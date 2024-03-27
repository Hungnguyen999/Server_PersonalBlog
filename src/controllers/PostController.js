const Post = require("../models/postModel");
async function getAllPostsByCategory(req, res) {
  try {
    const ListPost = await Post.findById(req.params.categoryId);
    if (!ListPost) {
      res.json({ message: "Oops ! There haven't any posts yet" })
    }
    else {
      res.status(200).json({ ListPost })
    }
  }
  catch (error) {
    console.log("Error while getting all post of this category");
    res.status(500).json({ message: "Server error" });
  }
}
async function getPostById(req, res) {
  try {
    const post = await Post.findById(req.params.blogID);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    else {
      res.status(200).json({ post });
    }
  }
  catch (error) {
    console.log("Error while getting post" + error.message);
    res.status(500).json({ message: "Server error" });
  }
}
async function createPost(req, res) {
  try {
    const { title, content, author_id, category_id } = req.body;

    const post = new Post({ title, content, author_id, category_id })
    // create new post
    if (post) {
      res.status(200).json({ post })
      await post.save();
    }
  }
  catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
async function deletePostById(req, res) {
  try {
    // Find and delete the category via ID
    const post = Post.findByIdAndDelete(req.params.blogID);
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    else {
      res.status(200).json({ message: "Deleted post successfully" });
    }
  }
  catch (error) {
    console.log("Error while deleting post" + error.message);
    res.status(500).json({ message: "Server error" })
  }
}
async function updatePostById(req, res) {
  try {
    // Handle name passed from param response
    const { title, content } = req.body
    // Find and update the category via ID
    const post = await Post.findByIdAndUpdate(req.params.blogID, { title, content }, { new: true });
    if (!post) {
      res.status(404).json({ message: "Post not found" });
    }
    else {
      res.status(201).json({ post });
    }
  }
  catch (error) {
    console.log("Error while updating post" + error.message);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getAllPostsByCategory,
  getPostById,
  createPost,
  deletePostById,
  updatePostById
}