const express = require("express");
const router = express.Router();
const { getAllPostsByCategory, getAllPost, getPostById, createPost, deletePostById, updatePostById } = require("../controllers/PostController");

//Defining Router API end points
router.get("/get-all-posts/:categoryID", getAllPostsByCategory);
router.get("/get-all-posts", getAllPost);
router.get("/get-post-id/:blogID", getPostById);
router.post("/admin/create-new-post", createPost);
router.post("/admin/delete/:blogID", deletePostById);
router.post("/admin/update-post/:blogID", updatePostById);

module.exports = router;