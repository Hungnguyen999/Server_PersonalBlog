const express = require("express");
const router = express.Router();
const { getAllPostsByCategory, getPostById, createPost, deletePostById, updatePostById } = require("../controllers/PostController");

//Defining Router API end points
router.get("/get-all-posts", getAllPostsByCategory);
router.get("/get-post-id/:blogID", getPostById);
router.post("/admin/create-new-post", createPost);
router.post("/admin/delete/:blogID", deletePostById);
router.post("/admin/update-post/:blogID", updatePostById);

module.exports = router;